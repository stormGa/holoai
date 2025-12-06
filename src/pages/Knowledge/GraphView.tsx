import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Share2, Maximize2, Plus, UserPlus, X, Save, Search } from 'lucide-react';
import { GraphNode, GraphLink } from './types.ts';

const SocialGraphView = () => {
    const navigate = useNavigate();
    const [hoverNodeId, setHoverNodeId] = useState<string | null>(null);
    const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    // Simulation State
    const [version, setVersion] = useState(0); // Tick toggler for render

    // Using Ref for Physics State to ensure high-performance mutable updates without React batching interfering with math
    const nodesRef = React.useRef<(GraphNode & { vx: number; vy: number })[]>([
        { id: 'me', x: 400, y: 300, vx: 0, vy: 0, r: 45, label: '我 (Admin)', group: 'hub', color: '#3B82F6', description: '社交中枢', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin' },
        { id: 'alice', x: 250, y: 200, vx: 0, vy: 0, r: 30, label: 'Alice', group: 'friend', color: '#EC4899', description: '大学同学 / 产品经理', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice' },
        { id: 'bob', x: 550, y: 200, vx: 0, vy: 0, r: 30, label: 'Bob', group: 'colleague', color: '#10B981', description: '技术主管', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob' },
        { id: 'charlie', x: 300, y: 450, vx: 0, vy: 0, r: 25, label: 'Charlie', group: 'colleague', color: '#F59E0B', description: '设计师', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie' },
        { id: 'david', x: 500, y: 450, vx: 0, vy: 0, r: 25, label: 'David', group: 'friend', color: '#8B5CF6', description: '网球球友', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David' },
    ]);

    const linksRef = React.useRef<GraphLink[]>([
        { source: 'me', target: 'alice', strength: 0.9 },
        { source: 'me', target: 'bob', strength: 0.8 },
        { source: 'me', target: 'charlie', strength: 0.6 },
        { source: 'me', target: 'david', strength: 0.7 },
        { source: 'alice', target: 'bob', strength: 0.4 },
    ]);

    // Drag State
    const draggingNodeRef = React.useRef<string | null>(null);

    // Derived state for rendering
    const nodes = nodesRef.current;
    const links = linksRef.current;

    // Physics Loop
    React.useEffect(() => {
        let animationFrameId: number;
        let isPreWarmed = false;

        const runSimulationStep = () => {
            const nodes = nodesRef.current;
            const links = linksRef.current;
            const center = { x: 400, y: 300 }; // Viewport center (approx)

            // Adjusted Constants for Stability
            const REPULSION = 3000;   // Reduced from 5000 for less explosive layout
            const SPRING_LENGTH = 120; // Reduced from 150
            const SPRING_STRENGTH = 0.05;
            const CENTER_GRAVITY = 0.0005;
            const DAMPING = 0.6; // Increased friction (was 0.85) for faster settling

            // 1. Apply Forces
            for (let i = 0; i < nodes.length; i++) {
                const node = nodes[i];
                if (node.id === draggingNodeRef.current) continue; // Don't move dragging node

                let fx = 0, fy = 0;

                // Repulsion (Push away from others)
                for (let j = 0; j < nodes.length; j++) {
                    if (i === j) continue;
                    const other = nodes[j];
                    const dx = node.x - other.x;
                    const dy = node.y - other.y;
                    const distSq = dx * dx + dy * dy || 1; // Avoid div by zero
                    const dist = Math.sqrt(distSq);

                    // Coulomb's Law
                    const force = REPULSION / distSq;
                    fx += (dx / dist) * force;
                    fy += (dy / dist) * force;

                    // Collision Avoidance (Hard Repulsion if touching)
                    const minDist = node.r + other.r + 5;
                    if (dist < minDist) {
                        const push = (minDist - dist) * 0.5; // Stronger push
                        fx += (dx / dist) * push * 50;
                        fy += (dy / dist) * push * 50;
                    }
                }

                // Center Gravity (Keep in view)
                fx += (center.x - node.x) * CENTER_GRAVITY * node.r;
                fy += (center.y - node.y) * CENTER_GRAVITY * node.r;

                // Apply to velocity
                node.vx += fx;
                node.vy += fy;
            }

            // 2. Spring Forces (Links)
            links.forEach(link => {
                const s = nodes.find(n => n.id === link.source);
                const t = nodes.find(n => n.id === link.target);
                if (s && t) {
                    const dx = t.x - s.x;
                    const dy = t.y - s.y;
                    const dist = Math.sqrt(dx * dx + dy * dy) || 1;

                    // Spring force
                    const force = (dist - SPRING_LENGTH) * SPRING_STRENGTH;

                    const fx = (dx / dist) * force;
                    const fy = (dy / dist) * force;

                    if (s.id !== draggingNodeRef.current) { s.vx += fx; s.vy += fy; }
                    if (t.id !== draggingNodeRef.current) { t.vx -= fx; t.vy -= fy; }
                }
            });

            // 3. Update Positions & Damping
            let maxVelocity = 0;
            for (let i = 0; i < nodes.length; i++) {
                const node = nodes[i];
                if (node.id === 'me') {
                    node.vx *= 0.9; node.vy *= 0.9; // Anchor 'Me' slightly stronger
                }

                if (node.id !== draggingNodeRef.current) {
                    node.vx *= DAMPING;
                    node.vy *= DAMPING;

                    // Cap max velocity to prevent explosions
                    if (Math.abs(node.vx) > 30) node.vx *= 0.5;
                    if (Math.abs(node.vy) > 30) node.vy *= 0.5;

                    node.x += node.vx;
                    node.y += node.vy;
                }

                const v = Math.sqrt(node.vx * node.vx + node.vy * node.vy);
                if (v > maxVelocity) maxVelocity = v;
            }
            return maxVelocity;
        };

        // Pre-warm (Synchronous stabilization)
        if (!isPreWarmed) {
            for (let i = 0; i < 300; i++) {
                runSimulationStep();
            }
            isPreWarmed = true;
            setVersion(v => v + 1); // Initial render with stable positions
        }

        const tick = () => {
            const maxV = runSimulationStep();

            // Only re-render if meaningful movement or user interacting
            if (maxV > 0.1 || draggingNodeRef.current) {
                setVersion(v => v + 1);
            }

            animationFrameId = requestAnimationFrame(tick);
        };

        tick();
        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    // Drag Handlers
    const handleDragStart = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        draggingNodeRef.current = id;
    };

    // Global mouseup/move to handle drag outside node
    React.useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (draggingNodeRef.current) {
                // Convert screen coordinates to SVG - Simplified
                const node = nodesRef.current.find(n => n.id === draggingNodeRef.current);
                if (node) {
                    const svg = document.getElementById('social-graph-svg');
                    if (svg) {
                        const rect = svg.getBoundingClientRect();
                        node.x = e.clientX - rect.left;
                        node.y = e.clientY - rect.top;
                        // Reset velocity on drag to prevent post-drag slide
                        node.vx = 0;
                        node.vy = 0;
                    }
                }
            }
        };
        const handleMouseUp = () => {
            draggingNodeRef.current = null;
        };
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);


    // Add Person Logic
    const [newPersonName, setNewPersonName] = useState('');
    const [newPersonRole, setNewPersonRole] = useState('');

    const handleAddPerson = () => {
        if (!newPersonName) return;
        const id = `user-${Date.now()}`;
        const newNode: GraphNode & { vx: number, vy: number } = {
            id,
            x: 400, // Spawn exactly at center
            y: 300,
            vx: (Math.random() - 0.5) * 2, // Very gentle initial nudge
            vy: (Math.random() - 0.5) * 2,
            r: 30,
            label: newPersonName,
            group: 'new',
            color: '#64748B',
            description: newPersonRole || '新添加联系人',
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${newPersonName}`
        };

        nodesRef.current.push(newNode);
        linksRef.current.push({ source: 'me', target: id, strength: 0.5 });

        setNewPersonName('');
        setNewPersonRole('');
        setIsAddModalOpen(false);
    };


    return (
        <div className="h-[calc(100vh-140px)] w-full bg-white dark:bg-slate-950 rounded-3xl shadow-sm overflow-hidden relative group border border-gray-100 dark:border-slate-800 m-8 mr-8 transition-colors duration-300">
            {/* Animated Background Mesh */}
            <div className="absolute inset-0 opacity-40 dark:opacity-20 pointer-events-none" style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
                backgroundSize: '40px 40px'
            }}></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-white via-transparent to-rose-50/30 dark:from-slate-950 dark:to-rose-900/10 pointer-events-none transition-colors duration-300"></div>

            {/* Info Overlay */}
            <div className="absolute top-6 left-6 z-10 pointer-events-none">
                <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white tracking-tight">社交图谱</h2>
                </div>
                <p className="text-gray-400 dark:text-gray-500 text-sm max-w-xs font-light">
                    Social Connection Network v1.0
                </p>
            </div>

            {/* Controls */}
            <div className="absolute top-6 right-6 z-20 flex gap-3">
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-full shadow-lg shadow-rose-500/20 transition-all font-medium text-sm"
                >
                    <UserPlus size={16} />
                    添加人物
                </button>
            </div>


            {/* SVG Graph */}
            <svg id="social-graph-svg" className="w-full h-full cursor-move active:cursor-grabbing relative z-0 text-slate-200 dark:text-slate-800">
                <defs>
                    <radialGradient id="hubCore" cx="0.5" cy="0.5" r="0.5">
                        <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
                        <stop offset="60%" stopColor="#0EA5E9" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                    </radialGradient>
                    <filter id="glassBlur">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
                        <feComposite in="SourceGraphic" in2="goo" operator="atop" />
                    </filter>
                </defs>

                {/* Links */}
                {links.map((link, i) => {
                    const s = nodes.find(n => n.id === link.source)!;
                    const t = nodes.find(n => n.id === link.target)!;
                    const isConnected = hoverNodeId && (link.source === hoverNodeId || link.target === hoverNodeId);

                    return (
                        <line
                            key={i}
                            x1={s.x} y1={s.y} x2={t.x} y2={t.y}
                            stroke="currentColor"
                            strokeOpacity={isConnected ? 0.8 : 0.3}
                            strokeWidth={isConnected ? 2 : 1}
                            className={`transition-all duration-300 ${isConnected ? 'text-rose-400 dark:text-rose-500' : 'text-slate-300 dark:text-slate-700'}`}
                        />
                    );
                })}

                {/* Nodes */}
                {nodes.map((node) => {
                    const isHovered = hoverNodeId === node.id;
                    const isHub = node.id === 'me';

                    return (
                        <g
                            key={node.id}
                            className="transition-all duration-500 ease-out cursor-pointer"
                            style={{
                                transformOrigin: `${node.x}px ${node.y}px`,
                                transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                            }}
                            onMouseEnter={() => setHoverNodeId(node.id)}
                            onMouseLeave={() => setHoverNodeId(null)}
                            onMouseDown={(e) => handleDragStart(e, node.id)}
                            onClick={(e) => { e.stopPropagation(); setSelectedNode(node); }}
                        >
                            {/* Outer Ring */}
                            <circle
                                cx={node.x} cy={node.y} r={node.r + 4}
                                fill="none"
                                stroke={node.color}
                                strokeWidth={2}
                                strokeOpacity={isHovered ? 1 : 0.5}
                                className="transition-all duration-300"
                            />

                            {/* Avatar Circle */}
                            {node.avatar ? (
                                <image
                                    x={node.x - node.r} y={node.y - node.r}
                                    width={node.r * 2} height={node.r * 2}
                                    href={node.avatar}
                                    clipPath={`circle(${node.r}px at ${node.r}px ${node.r}px)`} // Simple clip (SVG2) or stick to standard pattern
                                    className="rounded-full"
                                />
                            ) : (
                                <circle cx={node.x} cy={node.y} r={node.r} fill={node.color} />
                            )}

                            {/* Fallback clip via mask if needed, but simple image href often works. 
                                Let's use a pattern for reliable avatar clipping in SVG 1.1 if needed, 
                                but modern browsers support CSS rounded on foreignObject or clip-path. 
                                For simplicity in this edit, we'll assume basic rect/image overlay.
                            */}

                            <foreignObject x={node.x - node.r} y={node.y - node.r} width={node.r * 2} height={node.r * 2} className="pointer-events-none">
                                <div className="w-full h-full rounded-full overflow-hidden border-2 border-white dark:border-slate-800">
                                    <img src={node.avatar} alt={node.label} className="w-full h-full object-cover" />
                                </div>
                            </foreignObject>


                            {/* Label */}
                            <text
                                x={node.x} y={node.y + node.r + 20}
                                textAnchor="middle"
                                fill="currentColor"
                                fontSize={12}
                                fontWeight="bold"
                                className={`pointer-events-none select-none transition-all duration-300 ${isHovered ? 'text-slate-800 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}
                            >
                                {node.label}
                            </text>
                        </g>
                    );
                })}
            </svg>

            {/* Add Person Modal */}
            {isAddModalOpen && (
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-6 w-full max-w-sm border border-gray-100 dark:border-slate-800">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">添加新联系人</h3>
                            <button onClick={() => setIsAddModalOpen(false)}><X size={20} className="text-gray-400" /></button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">姓名</label>
                                <input
                                    autoFocus
                                    type="text"
                                    value={newPersonName}
                                    onChange={e => setNewPersonName(e.target.value)}
                                    className="w-full px-3 py-2 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                                    placeholder="输入姓名"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">关系/角色</label>
                                <input
                                    type="text"
                                    value={newPersonRole}
                                    onChange={e => setNewPersonRole(e.target.value)}
                                    className="w-full px-3 py-2 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                                    placeholder="例如：同事、球友"
                                />
                            </div>
                            <button
                                onClick={handleAddPerson}
                                className="w-full py-2.5 bg-rose-500 hover:bg-rose-600 text-white rounded-xl font-medium shadow-lg shadow-rose-500/20 transition-all mt-2"
                            >
                                确认添加
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Selected Node Details Side Panel */}
            {selectedNode && (
                <div className="absolute top-6 left-6 z-30 w-80 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-gray-200 dark:border-slate-800 rounded-2xl shadow-2xl p-6 animate-in slide-in-from-left-4">
                    <div className="flex justify-between items-start mb-6">
                        <div className="flex items-center gap-4">
                            <img src={selectedNode.avatar} className="w-16 h-16 rounded-full border-4 border-white dark:border-slate-800 shadow-md" />
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{selectedNode.label}</h3>
                                <p className="text-sm text-rose-500 font-medium">{selectedNode.group}</p>
                            </div>
                        </div>
                        <button onClick={() => setSelectedNode(null)}><X size={18} className="text-gray-400 hover:text-gray-600" /></button>
                    </div>

                    <div className="space-y-4">
                        <div className="bg-gray-50 dark:bg-slate-800/50 p-3 rounded-lg border border-gray-100 dark:border-slate-800">
                            <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">备注信息</label>
                            <p className="text-sm text-gray-700 dark:text-slate-300 leading-relaxed">{selectedNode.description}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <button className="flex items-center justify-center gap-2 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg text-sm font-medium text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
                                <Search size={14} /> 查看记忆
                            </button>
                            <button className="flex items-center justify-center gap-2 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg text-sm font-medium text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
                                <Share2 size={14} /> 更多操作
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SocialGraphView;
