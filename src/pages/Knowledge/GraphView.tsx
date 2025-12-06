import React, { useState, useMemo } from 'react';
import { Share2, Maximize2 } from 'lucide-react';
import { GraphNode, GraphLink } from './types.ts';

const GraphView = () => {
    const [hoverNodeId, setHoverNodeId] = useState<string | null>(null);

    // Mock Graph Data
    const graphData = useMemo(() => {
        const nodes: GraphNode[] = [
            { id: 'me', x: 400, y: 300, r: 40, label: '我 (My AI)', group: 'hub', color: '#3B82F6', description: '知识中枢' },
            { id: 'react', x: 250, y: 150, r: 25, label: 'React', group: 'tech', color: '#06B6D4', description: '前端框架' },
            { id: 'ts', x: 300, y: 100, r: 20, label: 'TypeScript', group: 'tech', color: '#2563EB', description: '类型安全' },
            { id: 'hooks', x: 180, y: 180, r: 18, label: 'Hooks', group: 'tech', color: '#06B6D4', description: 'React 特性' },
            { id: 'css', x: 550, y: 150, r: 30, label: 'CSS', group: 'design', color: '#6366F1', description: '样式设计' },
            { id: 'grid', x: 620, y: 100, r: 20, label: 'Grid', group: 'design', color: '#6366F1', description: '布局系统' },
            { id: 'fin', x: 350, y: 450, r: 35, label: '财务', group: 'finance', color: '#10B981', description: '公司财务' },
            { id: 'audit', x: 280, y: 520, r: 22, label: '审计', group: 'finance', color: '#10B981', description: 'Q1 审计' },
            { id: 'arch', x: 550, y: 400, r: 28, label: '架构', group: 'tech', color: '#F59E0B', description: '系统设计' },
            { id: 'micro', x: 650, y: 450, r: 20, label: '微服务', group: 'tech', color: '#F59E0B', description: '后端架构' },
        ];

        const links: GraphLink[] = [
            { source: 'me', target: 'react', strength: 0.8 },
            { source: 'me', target: 'css', strength: 0.7 },
            { source: 'me', target: 'fin', strength: 0.9 },
            { source: 'me', target: 'arch', strength: 0.5 },
            { source: 'react', target: 'ts', strength: 0.6 },
            { source: 'react', target: 'hooks', strength: 0.9 },
            { source: 'css', target: 'grid', strength: 0.8 },
            { source: 'fin', target: 'audit', strength: 0.9 },
            { source: 'arch', target: 'micro', strength: 0.7 },
        ];
        return { nodes, links };
    }, []);

    return (
        <div className="h-[calc(100vh-140px)] w-full bg-white dark:bg-slate-950 rounded-3xl shadow-sm overflow-hidden relative group border border-gray-100 dark:border-slate-800 m-8 mr-8 transition-colors duration-300">
            {/* Animated Background Mesh */}
            <div className="absolute inset-0 opacity-40 dark:opacity-20 pointer-events-none" style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
                backgroundSize: '40px 40px'
            }}></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-white via-transparent to-blue-50/30 dark:from-slate-950 dark:to-blue-900/10 pointer-events-none transition-colors duration-300"></div>

            {/* Info Overlay */}
            <div className="absolute top-6 left-6 z-10 pointer-events-none">
                <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white tracking-tight">全息神经网络</h2>
                </div>
                <p className="text-gray-400 dark:text-gray-500 text-sm max-w-xs font-light">
                    Deep Space Visualization v2.0
                </p>
            </div>

            {/* Ambient Controls */}
            <div className="absolute bottom-6 right-6 z-10 flex gap-2">
                <button className="p-2.5 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-gray-200 dark:border-slate-800 rounded-full text-gray-400 dark:text-gray-500 hover:text-blue-500 hover:border-blue-200 dark:hover:border-blue-700 transition-all shadow-sm hover:shadow-md"><Share2 size={18} /></button>
                <button className="p-2.5 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-gray-200 dark:border-slate-800 rounded-full text-gray-400 dark:text-gray-500 hover:text-blue-500 hover:border-blue-200 dark:hover:border-blue-700 transition-all shadow-sm hover:shadow-md"><Maximize2 size={18} /></button>
            </div>

            {/* SVG Graph */}
            <svg className="w-full h-full cursor-magnify active:cursor-grabbing relative z-0 text-slate-200 dark:text-slate-800">
                <defs>
                    <radialGradient id="hubCore" cx="0.5" cy="0.5" r="0.5">
                        <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
                        <stop offset="60%" stopColor="#0EA5E9" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                    </radialGradient>
                    <radialGradient id="nodeGlow" cx="0.5" cy="0.5" r="0.5">
                        <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.15" />
                        <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                    </radialGradient>
                    <filter id="glassBlur">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
                        <feComposite in="SourceGraphic" in2="goo" operator="atop" />
                    </filter>
                    <linearGradient id="linkHolo" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#93C5FD" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="#C4B5FD" stopOpacity="0.6" />
                    </linearGradient>
                </defs>

                {/* Links */}
                {graphData.links.map((link, i) => {
                    const s = graphData.nodes.find(n => n.id === link.source)!;
                    const t = graphData.nodes.find(n => n.id === link.target)!;
                    // Focus Mode Logic
                    const isConnected = hoverNodeId && (link.source === hoverNodeId || link.target === hoverNodeId);
                    const isDimmed = hoverNodeId && !isConnected;

                    return (
                        <line
                            key={i}
                            x1={s.x} y1={s.y} x2={t.x} y2={t.y}
                            stroke={isConnected ? "url(#linkHolo)" : "currentColor"}
                            strokeOpacity={isDimmed ? 0.1 : (isConnected ? 1 : 1)}
                            strokeWidth={isConnected ? 3 : 1.5}
                            strokeLinecap="round"
                            className="transition-all duration-500 ease-out text-slate-200 dark:text-slate-700"
                        />
                    );
                })}

                {/* Nodes */}
                {graphData.nodes.map((node) => {
                    const isHovered = hoverNodeId === node.id;
                    const isConnected = hoverNodeId && graphData.links.some(l => (l.source === hoverNodeId && l.target === node.id) || (l.target === hoverNodeId && l.source === node.id));
                    const isDimmed = hoverNodeId && !isHovered && !isConnected;

                    return (
                        <g
                            key={node.id}
                            className="transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
                            style={{
                                transformOrigin: `${node.x}px ${node.y}px`,
                                opacity: isDimmed ? 0.2 : 1,
                                transform: isHovered ? 'scale(1.15)' : 'scale(1)',
                            }}
                            onMouseEnter={() => setHoverNodeId(node.id)}
                            onMouseLeave={() => setHoverNodeId(null)}
                        >
                            {/* Hub Pulse Effect */}
                            {node.group === 'hub' && (
                                <circle cx={node.x} cy={node.y} r={node.r * 2} fill="url(#hubCore)" className="animate-[pulse_3s_ease-in-out_infinite]" />
                            )}

                            {/* Outer Glow on Hover */}
                            <circle
                                cx={node.x} cy={node.y} r={node.r + 15}
                                fill="url(#nodeGlow)"
                                className={`transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                            />

                            {/* Node Body (Glass) */}
                            <circle
                                cx={node.x} cy={node.y} r={node.r}
                                fill="currentColor" // Using currentColor to inherit from class
                                fillOpacity="0.9"
                                stroke={isHovered ? '#3B82F6' : node.color}
                                strokeWidth={isHovered ? 3 : 2}
                                className="shadow-sm transition-colors duration-300 text-white dark:text-slate-900"
                            />

                            {/* Inner Core */}
                            <circle cx={node.x} cy={node.y} r={node.r * 0.4} fill={isHovered ? '#3B82F6' : node.color} className="transition-colors duration-300 opacity-80" />

                            {/* Label */}
                            <text
                                x={node.x} y={node.y + node.r + 28}
                                textAnchor="middle"
                                fill="currentColor"
                                fontSize={13}
                                fontWeight={isHovered ? '700' : '500'}
                                className={`pointer-events-none select-none tracking-wide transition-all duration-300 drop-shadow-sm ${isHovered ? 'text-slate-800 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}
                            >
                                {node.label}
                            </text>

                            {/* Tooltip (Light Holo Style) */}
                            {isHovered && (
                                <foreignObject x={node.x + node.r + 15} y={node.y - 30} width="180" height="80" className="overflow-visible z-50 pointer-events-none">
                                    <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-blue-100 dark:border-slate-700 text-slate-600 dark:text-slate-300 p-3 rounded-xl shadow-xl shadow-blue-500/10 dark:shadow-black/20">
                                        <div className="text-xs text-blue-500 font-bold mb-1 uppercase tracking-wider">{node.group.toUpperCase()}</div>
                                        <div className="font-bold text-gray-800 dark:text-white mb-1">{node.label}</div>
                                        <div className="text-[10px] text-slate-400 dark:text-slate-500 leading-tight">{node.description}</div>
                                    </div>
                                </foreignObject>
                            )}
                        </g>
                    );
                })}
            </svg>
        </div>
    );
};

export default GraphView;
