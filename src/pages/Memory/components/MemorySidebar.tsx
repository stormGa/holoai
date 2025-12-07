import React from 'react';
import { MapPin, Users, Hash, TrendingUp } from 'lucide-react';
import { moodStats, peopleMet, topTopics } from '../../../services/memoryStatsService.ts';

import { useNavigate } from 'react-router-dom';

export const MemorySidebar: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className="w-80 flex-shrink-0 flex flex-col gap-6 overflow-y-auto pl-2 pr-6 py-6 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-slate-800">

            {/* Widget: Today's Footprint (Map Placeholder) */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-800 p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                    <MapPin size={16} className="text-rose-500" />
                    <h3 className="font-bold text-gray-900 dark:text-white text-sm">今日足迹</h3>
                </div>
                <div className="h-40 bg-gray-100 dark:bg-slate-800 rounded-xl relative overflow-hidden group">
                    {/* Abstract Map Style */}
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#e11d48_1px,transparent_1px)] [background-size:16px_16px]"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <div className="w-3 h-3 bg-rose-500 rounded-full animate-ping"></div>
                    </div>
                    <div className="absolute bottom-2 left-2 text-xs text-xs font-mono text-gray-500">SoHo, NYC</div>
                </div>
            </div>

            {/* Widget: Social Graph (People) */}
            <div
                className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-800 p-4 shadow-sm cursor-pointer hover:shadow-md transition-all group"
                onClick={() => navigate('/platform/knowledge/graph')}
            >
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                        <Users size={16} className="text-indigo-500" />
                        <h3 className="font-bold text-gray-900 dark:text-white text-sm group-hover:text-indigo-500 transition-colors">社交图谱</h3>
                    </div>
                    <span className="text-[10px] text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">点击查看</span>
                </div>
                <div className="flex -space-x-2 overflow-hidden py-1 pl-1">
                    {peopleMet.slice(0, 5).map((person, i) => (
                        <div key={i} className="relative group/avatar cursor-pointer">
                            <img
                                className="inline-block h-10 w-10 rounded-full ring-2 ring-white dark:ring-slate-900"
                                src={person.avatar}
                                alt={person.name}
                            />
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover/avatar:opacity-100 transition-opacity whitespace-nowrap z-20 pointer-events-none">
                                {person.name} • {person.role}
                            </div>
                        </div>
                    ))}
                    <div className="flex items-center justify-center h-10 w-10 rounded-full ring-2 ring-white dark:ring-slate-900 bg-gray-100 dark:bg-slate-800 text-xs text-gray-500 font-medium hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors">
                        +
                    </div>
                </div>
            </div>

            {/* Widget: Topics & Mood */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-800 p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                    <TrendingUp size={16} className="text-emerald-500" />
                    <h3 className="font-bold text-gray-900 dark:text-white text-sm">今日状态</h3>
                </div>

                <div className="flex items-center justify-between mb-4 p-3 bg-emerald-50 dark:bg-emerald-900/10 rounded-xl">
                    <span className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">效率指数</span>
                    <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">{moodStats.score}</span>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center gap-2 mb-1">
                        <Hash size={14} className="text-gray-400" />
                        <span className="text-xs text-gray-500 font-medium">热门话题</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {topTopics.map(topic => (
                            <span key={topic.tag} className="px-2 py-1 rounded-lg bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 text-xs text-gray-600 dark:text-slate-300">
                                {topic.tag}
                                <span className="ml-1 opacity-50 text-[10px]">{topic.count}</span>
                            </span>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
};
