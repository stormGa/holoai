import React, { useState } from 'react';
import { Search, Users, Zap, Check, Plus, Compass } from 'lucide-react';
import { Community } from './types.ts';

const mockCommunities: Community[] = [
    {
        id: 'c1', type: 'INTEREST', name: '未来财经 DAO', description: '去中心化金融、流动性挖矿及宏观经济深度分析。', memberCount: 1200, icon: '💰', accessType: 'PUBLIC', tags: ['金融'],
    },
    {
        id: 'c2', type: 'INTEREST', name: '极客前沿', description: '全球领先的科技媒体，提供即时新闻与深度评论。', memberCount: 85000, icon: 'TC', accessType: 'PUBLIC', tags: ['科技', '新闻'],
    },
    {
        id: 'c3', type: 'INTEREST', name: '元宇宙公会', description: '链游打金策略与元宇宙生态研究。', memberCount: 5000, icon: '🎮', accessType: 'PUBLIC', tags: ['游戏'],
    },
];

const CommunityDirectory: React.FC = () => {
    const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(null);
    const [followedIds, setFollowedIds] = useState<string[]>([]);

    const toggleFollow = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        setFollowedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
        // In a real app, this would update the backend and trigger a sidebar refresh
        const event = new CustomEvent('communityFollowed', { detail: { id, followed: !followedIds.includes(id) } });
        window.dispatchEvent(event);
    };

    return (
        <div className="h-full bg-gray-50 dark:bg-slate-950 p-6 relative transition-colors duration-300 overflow-y-auto">
            <div className="mb-6 flex justify-between items-end">
                <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <Compass className="text-indigo-500" /> 发现兴趣社区
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">探索你感兴趣的领域，加入共同话题</p>
                </div>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="搜索社区..."
                        className="pl-10 pr-4 py-2 rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900/30 outline-none w-64 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={16} />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
                {mockCommunities.map(community => (
                    <div
                        key={community.id}
                        className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-gray-100 dark:border-slate-800 hover:shadow-lg dark:hover:shadow-black/20 hover:border-indigo-100 dark:hover:border-indigo-900/30 transition-all cursor-pointer group relative overflow-hidden flex flex-col h-full"
                        onClick={() => setSelectedCommunity(community)}
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="size-14 rounded-full bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 flex items-center justify-center text-xl font-bold text-gray-700 dark:text-gray-300 shadow-sm shrink-0">
                                {community.icon}
                            </div>
                            <button
                                onClick={(e) => toggleFollow(e, community.id)}
                                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1 ${followedIds.includes(community.id)
                                    ? 'bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-gray-400'
                                    : 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/40'
                                    }`}
                            >
                                {followedIds.includes(community.id) ? (
                                    <>
                                        <Check size={12} /> 已关注
                                    </>
                                ) : (
                                    <>
                                        <Plus size={12} /> 关注
                                    </>
                                )}
                            </button>
                        </div>

                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{community.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2 min-h-[40px]">{community.description}</p>

                        <div className="flex flex-wrap gap-2 mb-4">
                            {community.tags.map(tag => (
                                <span key={tag} className="px-2 py-0.5 bg-gray-50 dark:bg-slate-800 text-gray-500 dark:text-gray-400 text-[10px] rounded-md border border-gray-100 dark:border-slate-700">
                                    #{tag}
                                </span>
                            ))}
                        </div>

                        <div className="mt-auto pt-4 border-t border-gray-50 dark:border-slate-800 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                            <div className="flex items-center gap-3">
                                <span className="flex items-center gap-1"><Users size={12} /> {community.memberCount} 成员</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Detail Modal */}
            {selectedCommunity && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
                    {/* Simplified Modal - Implementation Omitted for Brevity if not strictly asked, but I'll keep it simple */}
                    <div
                        className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-lg shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-200 border border-gray-100 dark:border-slate-800"
                        onClick={e => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setSelectedCommunity(null)}
                            className="absolute top-4 right-4 p-1.5 bg-gray-100 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-gray-500 dark:text-gray-400 rounded-full transition-colors z-10"
                        >
                            ✕
                        </button>
                        <div className="h-24 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
                        <div className="px-8 pb-8 -mt-10">
                            <div className="size-20 rounded-2xl bg-white dark:bg-slate-800 border-4 border-white dark:border-slate-900 shadow-md flex items-center justify-center text-4xl mb-4">
                                {selectedCommunity.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{selectedCommunity.name}</h3>
                            <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">{selectedCommunity.description}</p>

                            <div className="flex gap-3">
                                <button className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors shadow-sm">
                                    进入社区
                                </button>
                                <button
                                    onClick={(e) => toggleFollow(e, selectedCommunity.id)}
                                    className={`flex-1 py-2.5 border font-semibold rounded-xl transition-colors ${followedIds.includes(selectedCommunity.id)
                                            ? 'border-gray-200 dark:border-slate-700 text-gray-500'
                                            : 'border-indigo-200 dark:border-indigo-900/30 text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/10'
                                        }`}
                                >
                                    {followedIds.includes(selectedCommunity.id) ? '已关注' : '关注'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CommunityDirectory;
