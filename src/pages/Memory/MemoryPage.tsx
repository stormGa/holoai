import React, { useState, useEffect } from 'react';
import { Aperture, Search, Filter, Calendar, Glasses, Wifi, ChevronLeft, ChevronRight, LayoutGrid, List } from 'lucide-react';
import { getMemories, MemoryEvent, updateMemory, deleteMemory } from '../../services/memoryService.ts';
import { CompactEventCard } from './components/CompactEventCard.tsx';
import { MemorySidebar } from './components/MemorySidebar.tsx';
import { MemoryActionModal } from './components/MemoryActionModal.tsx';

const MemoryPage: React.FC = () => {
    const [events, setEvents] = useState<MemoryEvent[]>([]);
    const [loading, setLoading] = useState(true);
    const [isGlassesConnected, setIsGlassesConnected] = useState(false);
    const [activeFilter, setActiveFilter] = useState<string>('all');

    // Modal State
    const [selectedMemory, setSelectedMemory] = useState<MemoryEvent | null>(null);
    const [modalMode, setModalMode] = useState<'view' | 'edit'>('view');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const loadMemories = async () => {
        setLoading(true);
        const data = await getMemories();
        setEvents(data);
        setLoading(false);
    };

    useEffect(() => {
        loadMemories();
    }, []);

    const handleAction = (action: 'view' | 'edit' | 'delete', event: MemoryEvent) => {
        if (action === 'delete') {
            if (window.confirm('确定要删除这条记忆吗？此操作不可恢复。')) {
                deleteMemory(event.id).then(() => {
                    loadMemories();
                });
            }
            return;
        }

        setSelectedMemory(event);
        setModalMode(action);
        setIsModalOpen(true);
    };

    const handleSave = async (id: string, updates: Partial<MemoryEvent>) => {
        await updateMemory(id, updates);
        loadMemories();
    };

    // Filter events based on active selection
    const filteredEvents = React.useMemo(() => {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        const isSameDay = (d1: Date, d2: Date) =>
            d1.getDate() === d2.getDate() &&
            d1.getMonth() === d2.getMonth() &&
            d1.getFullYear() === d2.getFullYear();

        return events.filter(event => {
            if (activeFilter === 'all') return true;

            const date = new Date(event.timestamp);

            if (activeFilter === 'today') return isSameDay(date, today);
            if (activeFilter === 'yesterday') return isSameDay(date, yesterday);
            if (activeFilter === 'week') {
                const diffTime = Math.abs(today.getTime() - date.getTime());
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                return diffDays <= 7;
            }
            if (activeFilter === 'month') {
                return date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
            }

            // Handle 'YYYY-MM' format
            if (activeFilter.includes('-')) {
                const [year, month] = activeFilter.split('-').map(Number);
                return date.getFullYear() === year && date.getMonth() + 1 === month;
            }

            return true;
        });
    }, [events, activeFilter]);

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-slate-950 overflow-hidden">
            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Header */}
                <header className="flex-shrink-0 h-16 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 flex items-center justify-between px-6 z-10">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-rose-50 dark:bg-rose-900/20 rounded-lg">
                                <Aperture className="text-rose-500 dark:text-rose-400" size={24} />
                            </div>
                            <div>
                                <h1 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">全息记忆</h1>
                                <p className="text-xs text-gray-500 dark:text-slate-500 font-medium">HoloMemory Dashboard</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setIsGlassesConnected(!isGlassesConnected)}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${isGlassesConnected
                                ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
                                : 'bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-slate-400 border border-transparent'
                                }`}
                        >
                            <Glasses size={16} />
                            {isGlassesConnected ? '全息眼镜已连接' : '连接全息眼镜'}
                            {isGlassesConnected && <span className="relative flex h-2 w-2 ml-1">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>}
                        </button>
                    </div>
                </header>

                <main className="flex-1 overflow-hidden flex">
                    <div className="flex-1 flex overflow-hidden max-w-[1600px] mx-auto w-full">

                        {/* LEFT COLUMN: Navigation & Filters (20%) */}
                        <div className="w-64 flex-shrink-0 border-r border-gray-200 dark:border-slate-800 p-6 overflow-y-auto hidden xl:block">
                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-wider mb-4">时间视图</h3>
                                    <div className="space-y-6">
                                        {/* Recent Section */}
                                        <div className="space-y-1">
                                            <h4 className="px-3 text-[10px] font-bold text-gray-400 dark:text-slate-600 uppercase tracking-wider mb-2">最近</h4>

                                            <button
                                                onClick={() => setActiveFilter('all')}
                                                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors mb-1 ${activeFilter === 'all'
                                                    ? 'bg-rose-50 dark:bg-rose-900/10 text-rose-600 dark:text-rose-400 font-medium'
                                                    : 'text-gray-600 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800'
                                                    }`}
                                            >
                                                <span>全部记忆</span>
                                            </button>

                                            {[
                                                { id: 'today', label: '今天', count: 12 },
                                                { id: 'yesterday', label: '昨天', count: 5 },
                                                { id: 'week', label: '本周', count: 28 },
                                                { id: 'month', label: '本月', count: 145 },
                                            ].map(item => (
                                                <button
                                                    key={item.id}
                                                    onClick={() => setActiveFilter(item.id)}
                                                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${activeFilter === item.id
                                                        ? 'bg-rose-50 dark:bg-rose-900/10 text-rose-600 dark:text-rose-400 font-medium'
                                                        : 'text-gray-600 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800'
                                                        }`}
                                                >
                                                    <span>{item.label}</span>
                                                    <span className={`${activeFilter === item.id ? 'bg-white dark:bg-slate-800 text-rose-500' : 'text-gray-400'
                                                        } text-xs`}>{item.count}</span>
                                                </button>
                                            ))}
                                        </div>

                                        {/* Annual View */}
                                        <div className="space-y-1">
                                            <h4 className="px-3 text-[10px] font-bold text-gray-400 dark:text-slate-600 uppercase tracking-wider mb-2">2025年年度时间轴</h4>
                                            {Array.from({ length: 12 }).map((_, i) => {
                                                const d = new Date();
                                                d.setMonth(d.getMonth() - i);
                                                const year = d.getFullYear();
                                                const month = d.getMonth() + 1;
                                                const filterKey = `${year}-${month}`;
                                                const monthStr = `${year}年${month}月`;
                                                const isActive = activeFilter === filterKey;

                                                return (
                                                    <button
                                                        key={i}
                                                        onClick={() => setActiveFilter(filterKey)}
                                                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${isActive
                                                            ? 'text-gray-900 dark:text-white font-medium bg-gray-100 dark:bg-slate-800'
                                                            : 'text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800'
                                                            }`}
                                                    >
                                                        <span>{monthStr}</span>
                                                        {isActive && <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-wider mb-4">智能分类</h3>
                                    <div className="space-y-2">
                                        {['会议', '学习', '社交', '通勤', '娱乐'].map(cat => (
                                            <div key={cat} className="flex items-center gap-2 text-sm text-gray-600 dark:text-slate-400 cursor-pointer hover:text-gray-900 dark:hover:text-slate-200">
                                                <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-slate-700"></div>
                                                {cat}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* CENTER COLUMN: Stream (55-60%) */}
                        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-slate-700 min-w-0">
                            <div className="max-w-3xl mx-auto p-6">
                                {/* Search/Filter Bar (Sticky) */}
                                <div className="sticky top-0 z-20 bg-gray-50/95 dark:bg-slate-950/95 backdrop-blur-sm pb-4 pt-2 mb-2">
                                    <div className="flex gap-3">
                                        <div className="relative flex-1">
                                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                            <input
                                                type="text"
                                                placeholder="搜索记忆流..."
                                                className="w-full pl-9 pr-4 py-2 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 dark:text-white placeholder-gray-400"
                                            />
                                        </div>
                                        <div className="flex gap-1 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg p-1">
                                            <button className="p-1.5 rounded bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white"><List size={16} /></button>
                                            <button className="p-1.5 rounded text-gray-400 hover:text-gray-600 dark:hover:text-slate-300"><LayoutGrid size={16} /></button>
                                        </div>
                                    </div>
                                </div>

                                {/* Status Banner */}
                                {isGlassesConnected && (
                                    <div className="mb-6 p-3 bg-gradient-to-r from-rose-500/10 to-indigo-500/10 border border-rose-100 dark:border-rose-900/30 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                                        <div className="relative flex h-3 w-3">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
                                        </div>
                                        <span className="text-sm font-medium text-rose-600 dark:text-rose-400">正在实时记录您的体验...</span>
                                    </div>
                                )}

                                {/* Dense Stream */}
                                <div className="space-y-6">
                                    {loading ? (
                                        <div className="py-10 flex justify-center">
                                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-500"></div>
                                        </div>
                                    ) : (
                                        <>
                                            {/* Group events by date category */}
                                            {(() => {
                                                const today = new Date();
                                                const yesterday = new Date(today);
                                                yesterday.setDate(yesterday.getDate() - 1);

                                                const isSameDay = (d1: Date, d2: Date) =>
                                                    d1.getDate() === d2.getDate() &&
                                                    d1.getMonth() === d2.getMonth() &&
                                                    d1.getFullYear() === d2.getFullYear();

                                                const grouped = filteredEvents.reduce((acc, event) => {
                                                    const date = new Date(event.timestamp);
                                                    let key = 'Earlier';

                                                    if (isSameDay(date, today)) key = 'Today';
                                                    else if (isSameDay(date, yesterday)) key = 'Yesterday';
                                                    else key = `${date.getFullYear()}年${date.getMonth() + 1}月`; // Group older by month

                                                    if (!acc[key]) acc[key] = [];
                                                    acc[key].push(event);
                                                    return acc;
                                                }, {} as Record<string, MemoryEvent[]>);

                                                // Custom sort order for keys
                                                const sortedKeys = Object.keys(grouped).sort((a, b) => {
                                                    if (a === 'Today') return -1;
                                                    if (b === 'Today') return 1;
                                                    if (a === 'Yesterday') return -1;
                                                    if (b === 'Yesterday') return 1;
                                                    return b.localeCompare(a); // Descending for months
                                                });

                                                return sortedKeys.map(group => (
                                                    <div key={group}>
                                                        <div className="flex items-center justify-between mb-4 mt-2 sticky top-14 z-10 bg-gray-50/95 dark:bg-slate-950/95 py-2 backdrop-blur-sm">
                                                            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                                                                {group === 'Today' ? '今天' : group === 'Yesterday' ? '昨天' : group}
                                                            </h2>
                                                            {group === 'Today' && (
                                                                <span className="text-xs text-gray-500 dark:text-slate-500 bg-white dark:bg-slate-900 px-2 py-1 rounded-full border border-gray-100 dark:border-slate-800">
                                                                    {new Date().toLocaleDateString('zh-CN', { month: 'short', day: 'numeric', weekday: 'short' })}
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div className="space-y-1">
                                                            {grouped[group].map(event => (
                                                                <CompactEventCard
                                                                    key={event.id}
                                                                    event={event}
                                                                    onAction={handleAction}
                                                                />
                                                            ))}
                                                        </div>
                                                    </div>
                                                ));
                                            })()}
                                        </>
                                    )}

                                    {!loading && (
                                        <div className="relative pt-8 pb-4">
                                            <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                                <div className="w-full border-t border-gray-200 dark:border-slate-800"></div>
                                            </div>
                                            <div className="relative flex justify-center">
                                                <span className="px-3 bg-gray-50 dark:bg-slate-950 text-xs font-medium text-gray-400 uppercase tracking-wider">End of Stream</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: Sidebar Widgets (25%) */}
                        <div className="border-l border-gray-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50">
                            <MemorySidebar />
                        </div>

                    </div>
                </main>
            </div>


            <MemoryActionModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                mode={modalMode}
                memory={selectedMemory}
                onSave={handleSave}
                onDelete={(id) => deleteMemory(id).then(loadMemories)}
            />
        </div >
    );
};

export default MemoryPage;
