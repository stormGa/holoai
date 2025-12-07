import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Share2, Maximize2, Plus, UserPlus, X, Save, Search, Upload, Edit3, Clock, Activity, Users, Sparkles, Loader2, User, Trophy, Heart, Zap } from 'lucide-react';
import { GraphNode, GraphLink } from './types.ts';

// Mock Memories Data Removed - Using memoryService
import { getMemories, MemoryEvent } from '../../services/memoryService.ts';

// Grouping Helper
const groupMemoriesByMonth = (memories: MemoryEvent[]) => {
    const groups: Record<string, MemoryEvent[]> = {};
    memories.forEach(m => {
        const date = new Date(m.timestamp);
        const key = `${date.getFullYear()}年${date.getMonth() + 1}月`;
        if (!groups[key]) groups[key] = [];
        groups[key].push(m);
    });
    return groups;
};

const SocialGraphView = () => {
    const navigate = useNavigate();
    const [hoverNodeId, setHoverNodeId] = useState<string | null>(null);
    const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

    // Search State
    const [searchTerm, setSearchTerm] = useState('');

    // Optimization State
    const [isCalculating, setIsCalculating] = useState(false);
    const [version, setVersion] = useState(0);

    // Memory State
    const [memories, setMemories] = useState<MemoryEvent[]>([]);
    const [loadingMemories, setLoadingMemories] = useState(false);

    useEffect(() => {
        setLoadingMemories(true);
        getMemories().then(data => {
            setMemories(data);
            setLoadingMemories(false);
        });
    }, []);

    const groupedMemories = React.useMemo(() => groupMemoriesByMonth(memories), [memories]);

    // Graph Data Refs
    const nodesRef = useRef<(GraphNode & { vx: number; vy: number })[]>([
        { id: 'me', x: 400, y: 300, vx: 0, vy: 0, r: 55, label: '我 (Admin)', group: 'hub', color: '#6366f1', description: '社交中枢', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin' },
        { id: 'alice', x: 250, y: 200, vx: 0, vy: 0, r: 35, label: 'Alice', group: 'friend', color: '#ec4899', description: '大学同学 / 产品经理', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice' },
        { id: 'bob', x: 550, y: 200, vx: 0, vy: 0, r: 35, label: 'Bob', group: 'colleague', color: '#10b981', description: '技术主管', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob' },
        { id: 'charlie', x: 300, y: 450, vx: 0, vy: 0, r: 30, label: 'Charlie', group: 'colleague', color: '#f59e0b', description: '设计师', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie' },
        { id: 'david', x: 500, y: 450, vx: 0, vy: 0, r: 30, label: 'David', group: 'friend', color: '#8b5cf6', description: '网球球友', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David' },
    ]);

    const linksRef = useRef<GraphLink[]>([
        { source: 'me', target: 'alice', strength: 0.9 },
        { source: 'me', target: 'bob', strength: 0.8 },
        { source: 'me', target: 'charlie', strength: 0.6 },
        { source: 'me', target: 'david', strength: 0.7 },
        { source: 'alice', target: 'bob', strength: 0.4 },
    ]);

    const nodes = nodesRef.current;
    const links = linksRef.current;

    /**
     * Physics Optimization Logic (Extracted)
     */
    const runOptimization = useCallback(() => {
        setIsCalculating(true);

        // Immediate timeout to let React render the "Calculating" state first
        setTimeout(() => {
            const nodes = nodesRef.current;
            const links = linksRef.current;

            // Layout Parameters - TUNED FOR SPACING
            const center = { x: (window.innerWidth - 320 - 64) / 2, y: window.innerHeight / 2 - 100 };
            const REPULSION = 10000;      // Increased from 4000
            const SPRING_LENGTH = 280;    // Increased from 160
            const SPRING_STRENGTH = 0.05; // Reduced from 0.08
            const CENTER_GRAVITY = 0.001; // Reduced from 0.002
            const ITERATIONS = 300;

            for (let k = 0; k < ITERATIONS; k++) {
                // Forces
                for (let i = 0; i < nodes.length; i++) {
                    const node = nodes[i];
                    let fx = 0, fy = 0;

                    // Repulsion
                    for (let j = 0; j < nodes.length; j++) {
                        if (i === j) continue;
                        const other = nodes[j];
                        const dx = node.x - other.x;
                        const dy = node.y - other.y;
                        const distSq = dx * dx + dy * dy || 1;
                        const dist = Math.sqrt(distSq);

                        const force = REPULSION / distSq;
                        fx += (dx / dist) * force;
                        fy += (dy / dist) * force;
                    }

                    // Center Gravity
                    fx += (center.x - node.x) * CENTER_GRAVITY * node.r;
                    fy += (center.y - node.y) * CENTER_GRAVITY * node.r;

                    node.vx += fx;
                    node.vy += fy;
                }

                // Spring Forces
                links.forEach(link => {
                    const s = nodes.find(n => n.id === link.source);
                    const t = nodes.find(n => n.id === link.target);
                    if (s && t) {
                        const dx = t.x - s.x;
                        const dy = t.y - s.y;
                        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
                        const force = (dist - SPRING_LENGTH) * SPRING_STRENGTH;
                        const fx = (dx / dist) * force;
                        const fy = (dy / dist) * force;

                        s.vx += fx; s.vy += fy;
                        t.vx -= fx; t.vy -= fy;
                    }
                });

                // Update Position & Damp
                for (let i = 0; i < nodes.length; i++) {
                    const node = nodes[i];

                    // Fixed Center Node
                    if (node.id === 'me') {
                        node.vx = 0; node.vy = 0;
                        node.x = center.x;
                        node.y = center.y;
                        continue;
                    }

                    node.vx *= 0.6;
                    node.vy *= 0.6;
                    node.x += node.vx;
                    node.y += node.vy;
                }
            }

            setIsCalculating(false);
            setVersion(v => v + 1); // Only trigger ONE render update after calculation
        }, 50);
    }, []);

    // Initial Mount Optimization
    useEffect(() => {
        runOptimization();
    }, [runOptimization]);


    // --- Add / Edit Logic ---
    const [personForm, setPersonForm] = useState({ name: '', role: '', avatar: '' });

    const DEFAULT_AVATARS = [
        'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
        'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka',
        'https://api.dicebear.com/7.x/avataaars/svg?seed=Mark',
        'https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica',
        'https://api.dicebear.com/7.x/avataaars/svg?seed=Luis'
    ];

    const openAddModal = () => {
        setIsEditMode(false);
        setPersonForm({ name: '', role: '', avatar: '' });
        setIsAddModalOpen(true);
    };

    const openEditModal = () => {
        if (!selectedNode) return;
        setIsEditMode(true);
        setPersonForm({
            name: selectedNode.label,
            role: selectedNode.description || '',
            avatar: selectedNode.avatar || ''
        });
        setIsAddModalOpen(true);
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPersonForm(prev => ({ ...prev, avatar: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmitPerson = () => {
        if (!personForm.name) return;
        const finalAvatar = personForm.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${personForm.name}`;

        if (isEditMode && selectedNode) {
            // Update Existing Node
            selectedNode.label = personForm.name;
            selectedNode.description = personForm.role;
            selectedNode.avatar = finalAvatar;
            setVersion(v => v + 1);
        } else {
            // Add New Node
            const id = `user-${Date.now()}`;
            const center = { x: (window.innerWidth - 320 - 64) / 2, y: window.innerHeight / 2 - 100 };
            const newNode: GraphNode & { vx: number, vy: number } = {
                id,
                x: center.x + (Math.random() - 0.5) * 50,
                y: center.y + (Math.random() - 0.5) * 50,
                vx: 0,
                vy: 0,
                r: 30,
                label: personForm.name,
                group: 'new',
                color: '#64748B',
                description: personForm.role || '新添加联系人',
                avatar: finalAvatar
            };
            nodesRef.current.push(newNode);
            linksRef.current.push({ source: 'me', target: id, strength: 0.5 });
            runOptimization();
        }

        setIsAddModalOpen(false);
    };


    return (
        <div className="h-[calc(100vh-140px)] w-full flex gap-6 px-8 pb-8">

            {/* === LEFT: GRAPH AREA (75%) === */}
            <div className="flex-1 relative bg-slate-50 dark:bg-slate-950 rounded-3xl shadow-sm overflow-hidden border border-gray-100 dark:border-slate-800 group">

                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}>
                </div>

                {/* Subtle Loading Badge */}
                {isCalculating && (
                    <div className="absolute top-6 right-6 z-30 flex items-center gap-2 px-3 py-1.5 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-full shadow-sm border border-rose-100 dark:border-rose-900/30 animate-in fade-in slide-in-from-top-2">
                        <Loader2 size={14} className="text-rose-500 animate-spin" />
                        <span className="text-xs font-medium text-rose-600 dark:text-rose-400">正在优化布局...</span>
                    </div>
                )}

                {/* Top Toolbar */}
                <div className="absolute top-6 left-6 z-20 flex items-center gap-3">
                    <button
                        onClick={openAddModal}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white rounded-full shadow-lg shadow-rose-500/20 transition-all font-medium text-sm"
                    >
                        <UserPlus size={16} />
                        添加人物
                    </button>
                    <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-full shadow-sm border border-gray-200 dark:border-slate-700 p-2 flex items-center gap-2 px-4 transition-all focus-within:ring-2 focus-within:ring-rose-500/20 focus-within:border-rose-500/50">
                        <Search size={14} className="text-gray-400" />
                        <input
                            type="text"
                            placeholder="搜索图谱..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-transparent text-sm min-w-[120px] focus:outline-none dark:text-gray-200"
                        />
                    </div>
                </div>

                {/* SVG Graph */}
                <svg id="social-graph-svg"
                    className="w-full h-full relative z-10"
                    onClick={() => setSelectedNode(null)}
                >
                    <defs>
                        {/* Gradients */}
                        <linearGradient id="link-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#94a3b8" stopOpacity="0.3" />
                        </linearGradient>
                        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                            <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000" floodOpacity="0.1" />
                        </filter>
                    </defs>

                    {links.map((link, i) => {
                        const sourceNode = nodes.find(n => n.id === link.source)!;
                        const targetNode = nodes.find(n => n.id === link.target)!;

                        if (!sourceNode || !targetNode) return null;

                        // Search Filter Logic
                        const isMatch = !searchTerm ||
                            sourceNode.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            targetNode.label.toLowerCase().includes(searchTerm.toLowerCase());

                        const isSelected = selectedNode?.id === sourceNode.id || selectedNode?.id === targetNode.id;

                        // Dim if searching and neither node matches
                        const opacity = searchTerm && !isMatch ? 0.05 : (isSelected ? 0.8 : 0.4);

                        return (
                            <line
                                key={i}
                                x1={sourceNode.x} y1={sourceNode.y} x2={targetNode.x} y2={targetNode.y}
                                stroke={isSelected ? 'url(#link-grad)' : '#cbd5e1'}
                                strokeOpacity={opacity}
                                strokeWidth={isSelected ? 2 : 1}
                                className={`transition-all duration-300 ${isSelected ? 'stroke-rose-400 dark:stroke-rose-500' : 'stroke-slate-300 dark:stroke-slate-700'}`}
                            />
                        );
                    })}

                    {nodes.map((node) => {
                        const isHovered = hoverNodeId === node.id || selectedNode?.id === node.id;
                        const isMe = node.id === 'me';

                        // Search Filter Logic
                        const isMatch = !searchTerm ||
                            node.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            (node.description && node.description.toLowerCase().includes(searchTerm.toLowerCase()));

                        // Dim if searching and not a match
                        const opacity = searchTerm && !isMatch ? 0.1 : 1;
                        const scale = searchTerm && isMatch ? 'scale-110' : '';

                        return (
                            <g
                                key={node.id}
                                className={`transition-all duration-500 ease-out cursor-pointer group/node ${scale}`}
                                style={{ transform: `translate(${node.x}px, ${node.y}px)`, opacity }}
                                onMouseEnter={() => setHoverNodeId(node.id)}
                                onMouseLeave={() => setHoverNodeId(null)}
                                onClick={(e) => { e.stopPropagation(); setSelectedNode(node); }}
                            >
                                {/* Hit Target (Invisible but clickable) */}
                                <circle r={node.r} fill="#fff" fillOpacity="0" />

                                {/* Glow / Pulse for Me */}
                                {isMe && (
                                    <circle r={node.r + 15} className="fill-indigo-500/10 animate-pulse-slow" />
                                )}

                                {/* Outer Ring */}
                                <circle
                                    r={node.r + (isHovered ? 4 : 0)}
                                    fill="none"
                                    stroke={node.color}
                                    strokeWidth={isHovered ? 2 : 0}
                                    strokeOpacity={0.5}
                                    className="transition-all duration-300"
                                />

                                {/* Main Node Container */}
                                <foreignObject x={-node.r} y={-node.r} width={node.r * 2} height={node.r * 2} className="pointer-events-none overflow-visible">
                                    <div className={`w-full h-full rounded-full overflow-hidden border-[3px] transition-all duration-300 shadow-xl bg-white dark:bg-slate-900 group-hover/node:scale-105 ${selectedNode?.id === node.id
                                        ? 'border-rose-400 shadow-rose-500/40 ring-4 ring-rose-100 dark:ring-rose-900/20'
                                        : isMe
                                            ? 'border-indigo-500 shadow-indigo-500/30'
                                            : 'border-white dark:border-slate-800 shadow-slate-300/50 dark:shadow-black/50'
                                        }`}>
                                        <img src={node.avatar} className="w-full h-full object-cover" />

                                        {/* Gloss Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-tr from-white/30 to-transparent opacity-50 pointer-events-none"></div>
                                    </div>
                                </foreignObject>

                                {/* Label */}
                                <text
                                    y={node.r + 20}
                                    textAnchor="middle"
                                    className={`text-[11px] font-bold pointer-events-none select-none transition-all duration-300 ${isHovered || isMe
                                        ? 'fill-slate-800 dark:fill-slate-200 translate-y-0 opacity-100'
                                        : 'fill-slate-500 dark:fill-slate-400 opacity-80'
                                        }`}
                                    style={{ textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
                                >
                                    {node.label}
                                </text>
                            </g>
                        );
                    })}
                </svg>

                {/* Bottom Panel Integration */}
                <div className={`absolute bottom-0 left-0 right-0 transition-transform duration-500 ease-spring z-30 ${selectedNode ? 'translate-y-0' : 'translate-y-full'}`}>
                    {selectedNode && (
                        <div className="mx-6 mb-6 rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-white/20 dark:border-slate-800 shadow-2xl overflow-hidden ring-1 ring-black/5">

                            {/* Logic Switch: Personal Profile vs Memory Timeline */}
                            {selectedNode.id === 'me' ? (
                                // === PERSONAL PROFILE VIEW ===
                                <div className="p-0 flex h-64">
                                    {/* Left: Avatar & Quick Stats */}
                                    <div className="w-1/3 bg-slate-50/50 dark:bg-slate-800/30 p-6 flex flex-col items-center justify-center border-r border-slate-100 dark:border-slate-800/50 relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-3 opacity-10">
                                            <User size={100} />
                                        </div>
                                        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white dark:border-slate-800 shadow-lg mb-4 relative z-10">
                                            <img src={selectedNode.avatar} className="w-full h-full object-cover" />
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">{selectedNode.label}</h3>
                                        <p className="text-sm text-indigo-500 font-medium mb-1">HoloAI 探索者</p>
                                        <div className="flex gap-2 mt-2">
                                            <span className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs rounded-md font-bold">Level 8</span>
                                            <span className="px-2 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-xs rounded-md font-bold">Pro</span>
                                        </div>
                                    </div>

                                    {/* Right: Detailed Info */}
                                    <div className="flex-1 p-8 flex flex-col justify-center">
                                        <div className="grid grid-cols-3 gap-6 mb-6">
                                            <div className="p-4 rounded-xl bg-orange-50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-900/20 text-center">
                                                <div className="text-orange-500 mb-1 flex justify-center"><Heart size={20} /></div>
                                                <div className="text-2xl font-black text-slate-800 dark:text-slate-200">{nodes.length}</div>
                                                <div className="text-xs text-orange-600/70 font-bold uppercase tracking-wide">好友连接</div>
                                            </div>
                                            <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/20 text-center">
                                                <div className="text-blue-500 mb-1 flex justify-center"><Zap size={20} /></div>
                                                <div className="text-2xl font-black text-slate-800 dark:text-slate-200">85%</div>
                                                <div className="text-xs text-blue-600/70 font-bold uppercase tracking-wide">活跃指数</div>
                                            </div>
                                            <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-900/10 border border-purple-100 dark:border-purple-900/20 text-center">
                                                <div className="text-purple-500 mb-1 flex justify-center"><Trophy size={20} /></div>
                                                <div className="text-2xl font-black text-slate-800 dark:text-slate-200">12</div>
                                                <div className="text-xs text-purple-600/70 font-bold uppercase tracking-wide">成就勋章</div>
                                            </div>
                                        </div>
                                        <div className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed italic">
                                            "热爱科技与艺术的结合，致力于构建更有温度的数字世界。Thinking in Graph, Living in Flow."
                                        </div>
                                        <div className="absolute top-4 right-4">
                                            <button onClick={() => setSelectedNode(null)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-400 transition-colors">
                                                <X size={20} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                // === SHARED MEMORY VIEW (Original) ===
                                <div className="p-6 h-64 overflow-y-auto custom-scrollbar">
                                    <div className="flex justify-between items-center mb-4 sticky top-0 pb-2 z-10 bg-inherit"> {/* Fixed Sticky bg */}
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white dark:border-slate-700 shadow-md">
                                                <img src={selectedNode.avatar} className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                                    {selectedNode.label}
                                                    <span className="text-xs px-2 py-0.5 bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-full font-medium border border-rose-200 dark:border-rose-900/50">{selectedNode.group}</span>
                                                </h3>
                                                <p className="text-xs text-slate-500">{selectedNode.description}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button onClick={openEditModal} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500 transition-colors tooltip" title="编辑信息">
                                                <Edit3 size={18} />
                                            </button>
                                            <button onClick={() => setSelectedNode(null)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500 transition-colors">
                                                <X size={18} />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="space-y-4 pl-3">
                                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                                            <Clock size={12} /> 共同记忆 (Memory Timeline)
                                        </h4>
                                        <div className="space-y-6 pl-3">
                                            {/* Group by Month */}
                                            {loadingMemories ? (
                                                <div className="flex justify-center py-8 text-slate-400">
                                                    <Loader2 className="animate-spin" size={24} />
                                                </div>
                                            ) : Object.keys(groupedMemories).length === 0 ? (
                                                <div className="text-center py-8 text-slate-400 text-xs">暂无共同记忆</div>
                                            ) : (
                                                Object.entries(groupedMemories).map(([month, items]) => (
                                                    <div key={month} className="relative">
                                                        <div className="sticky top-0 z-10 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm py-2 px-2 -mx-2 mb-2 border-b border-dashed border-slate-100 dark:border-slate-800 flex items-center gap-2">
                                                            <div className="w-2 h-2 rounded-full bg-rose-400 ring-2 ring-rose-100 dark:ring-rose-900/30"></div>
                                                            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{month}</span>
                                                        </div>

                                                        <div className="space-y-4">
                                                            {items.map((mem) => (
                                                                <div key={mem.id} className="relative pl-6 border-l-2 border-slate-100 dark:border-slate-800 pb-2 group/item">
                                                                    <div className="absolute -left-[5px] top-3 w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700 group-hover/item:bg-rose-400 transition-colors ring-2 ring-white dark:ring-slate-900"></div>
                                                                    <div className="bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl border border-dashed border-slate-200 dark:border-slate-700 hover:border-solid hover:border-rose-200 dark:hover:border-rose-800 transition-all cursor-pointer">
                                                                        <div className="flex justify-between mb-1">
                                                                            <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">{mem.title}</span>
                                                                            <span className="text-[10px] text-slate-400 font-mono bg-white dark:bg-slate-900 px-1.5 py-0.5 rounded border border-slate-100 dark:border-slate-800">
                                                                                {new Date(mem.timestamp).toLocaleDateString()}
                                                                            </span>
                                                                        </div>
                                                                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-2 line-clamp-2">{mem.summary}</p>
                                                                        <div className="flex items-center gap-2">
                                                                            {/* Type Icon */}
                                                                            <span className={`text-[10px] px-1.5 py-0.5 rounded-md flex items-center gap-1 border ${mem.type === 'video' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                                                                                mem.type === 'doc' ? 'bg-orange-50 text-orange-600 border-orange-100' :
                                                                                    'bg-green-50 text-green-600 border-green-100'
                                                                                }`}>
                                                                                {mem.type === 'video' && '🎥 Video'}
                                                                                {mem.type === 'doc' && '📄 Doc'}
                                                                                {mem.type === 'chat' && '💬 Chat'}
                                                                            </span>
                                                                            {mem.tags.map(tag => (
                                                                                <span key={tag} className="text-[10px] px-1.5 py-0.5 bg-white dark:bg-slate-900 rounded-md text-slate-500 border border-slate-100 dark:border-slate-800 shadow-sm">#{tag}</span>
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* === RIGHT: SIDEBAR (25%) === */}
            <div className="w-80 bg-white dark:bg-slate-950 flex flex-col z-20 shadow-sm border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
                {/* Header */}
                <div className="p-6 border-b border-gray-100 dark:border-slate-800">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                        <Activity size={20} className="text-rose-500" />
                        图谱概览
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">Social Graph Overview</p>
                </div>

                {/* Content Scroll */}
                <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
                    {/* density stats */}
                    <div className="space-y-4">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">统计数据</h3>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-2 opacity-5"><Users size={40} /></div>
                                <div className="text-2xl font-black text-slate-800 dark:text-white relative z-10">{nodes.length - 1}</div>
                                <div className="text-xs text-slate-500 mt-1 relative z-10">好友人数</div>
                            </div>
                            <div className="bg-gradient-to-br from-rose-50 to-rose-100 dark:from-rose-900/20 dark:to-rose-900/10 p-4 rounded-xl border border-rose-100 dark:border-rose-900/30 shadow-sm relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-2 opacity-5"><Share2 size={40} /></div>
                                <div className="text-2xl font-black text-rose-500 relative z-10">{links.length}</div>
                                <div className="text-xs text-rose-600/70 mt-1 relative z-10">互动羁绊</div>
                            </div>
                        </div>
                    </div>

                    {/* Suggestions */}
                    <div className="space-y-4">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                            <Sparkles size={12} /> 为您推荐
                        </h3>
                        {['Sarah (设计师)', 'Mike (AI Engineer)', 'Emma (PM)'].map((name, i) => (
                            <div key={i} className="flex items-center gap-3 p-3 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-xl transition-colors cursor-pointer group border border-transparent hover:border-slate-100 dark:hover:border-slate-800">
                                <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`} alt={name} />
                                </div>
                                <div className="flex-1">
                                    <div className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-rose-500 transition-colors">{name.split(' ')[0]}</div>
                                    <div className="text-[10px] text-slate-400">{name.split(' ')[1]}</div>
                                </div>
                                <button className="w-7 h-7 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-400 hover:bg-rose-500 hover:text-white transition-all shadow-sm">
                                    <Plus size={14} />
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Recent */}
                    <div className="space-y-4">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                            <Users size={12} /> 最近添加
                        </h3>
                        <div className="flex -space-x-2 overflow-hidden py-1 px-1">
                            {nodes.slice(1, 6).map(n => (
                                <img key={n.id} src={n.avatar} className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-slate-950 shadow-sm" title={n.label} />
                            ))}
                            {nodes.length > 6 && (
                                <div className="h-8 w-8 rounded-full ring-2 ring-white dark:ring-slate-950 bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-500">+{nodes.length - 6}</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal - Reused for Add/Edit */}
            {isAddModalOpen && (
                <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-6 w-full max-w-sm border border-gray-100 dark:border-slate-800 scale-100 animate-in zoom-in-95 duration-200">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">{isEditMode ? '编辑联系人' : '添加新联系人'}</h3>
                            <button onClick={() => setIsAddModalOpen(false)}><X size={20} className="text-gray-400" /></button>
                        </div>
                        <div className="space-y-5">
                            <div className="flex flex-col gap-3">
                                <label className="block text-xs font-semibold text-gray-400 uppercase">头像设置</label>
                                <div className="flex items-start gap-4">
                                    <div className="relative group shrink-0">
                                        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-slate-100 dark:border-slate-700 shadow-sm bg-slate-50">
                                            <img
                                                src={personForm.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${personForm.name || 'placeholder'}`}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex-1 space-y-3">
                                        <div className="flex gap-2 flex-wrap">
                                            {DEFAULT_AVATARS.map((url, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => setPersonForm(prev => ({ ...prev, avatar: url }))}
                                                    className={`w-8 h-8 rounded-full overflow-hidden border hover:scale-110 transition-transform ${personForm.avatar === url ? 'border-rose-500 ring-2 ring-rose-500/20' : 'border-slate-200 dark:border-slate-700'}`}
                                                >
                                                    <img src={url} className="w-full h-full" />
                                                </button>
                                            ))}
                                        </div>
                                        <div className="relative">
                                            <input
                                                type="file"
                                                id="avatar-upload"
                                                accept="image/*"
                                                onChange={handleFileUpload}
                                                className="hidden"
                                            />
                                            <label
                                                htmlFor="avatar-upload"
                                                className="flex items-center justify-center gap-2 w-full py-1.5 px-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg text-xs font-medium cursor-pointer transition-colors border border-slate-200 dark:border-slate-700"
                                            >
                                                <Upload size={12} />
                                                {isEditMode ? '更换图片' : '上传图片'}
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">姓名</label>
                                    <input
                                        autoFocus
                                        type="text"
                                        value={personForm.name}
                                        onChange={e => setPersonForm(prev => ({ ...prev, name: e.target.value }))}
                                        className="w-full px-3 py-2 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                                        placeholder="输入姓名"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">关系/角色</label>
                                    <input
                                        type="text"
                                        value={personForm.role}
                                        onChange={e => setPersonForm(prev => ({ ...prev, role: e.target.value }))}
                                        className="w-full px-3 py-2 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                                        placeholder="例如：同事、球友"
                                    />
                                </div>
                            </div>

                            <button
                                onClick={handleSubmitPerson}
                                className="w-full py-2.5 bg-rose-500 hover:bg-rose-600 text-white rounded-xl font-medium shadow-lg shadow-rose-500/20 transition-all"
                            >
                                {isEditMode ? '保存修改' : '确认添加'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default SocialGraphView;
