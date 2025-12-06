import React, { useState } from 'react';
import { Search, Users, Zap, Coins, ShieldCheck, AlertTriangle, FileCheck, X } from 'lucide-react';
import { Community } from './types.ts';

const mockCommunities: Community[] = [
    {
        id: 'c1', type: 'SUB', name: '未来财经 DAO', description: '去中心化金融、流动性挖矿及宏观经济深度分析。', memberCount: 1200, icon: '💰', taxRate: 0.01, accessType: 'PUBLIC', tags: ['金融'],
        isInstitution: false, trustedScore: 88, trustedContentCount: 342, reportedContentCount: 12, complaintCount: 2
    },
    {
        id: 'c2', type: 'SUB', name: '极客前沿', description: '全球领先的科技媒体，提供即时新闻与深度评论。', memberCount: 85000, icon: 'TC', taxRate: 0.00, accessType: 'PUBLIC', tags: ['科技', '新闻'],
        isInstitution: true, trustedScore: 98, trustedContentCount: 15400, reportedContentCount: 5, complaintCount: 0
    },
    {
        id: 'c3', type: 'SUB', name: '元宇宙公会', description: '链游打金策略与元宇宙生态研究。', memberCount: 5000, icon: '🎮', taxRate: 0.05, accessType: 'PUBLIC', tags: ['游戏'],
        isInstitution: false, trustedScore: 72, trustedContentCount: 120, reportedContentCount: 45, complaintCount: 8
    },
];

const CommunityDirectory: React.FC = () => {
    const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(null);

    return (
        <div className="h-full bg-gray-50 dark:bg-slate-950 p-6 relative transition-colors duration-300 overflow-y-auto">
            <div className="mb-6 flex justify-between items-end">
                <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">发现子社区 & 机构</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">浏览经过验证的专业社区与媒体机构</p>
                </div>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="搜索社区或机构..."
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
                        {/* Tags & Badges */}
                        <div className="absolute top-0 right-0 flex">
                            {community.isInstitution && (
                                <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-[10px] font-bold px-3 py-1 rounded-bl-xl flex items-center gap-1">
                                    <ShieldCheck size={12} /> 机构认证
                                </div>
                            )}
                        </div>

                        <div className="flex items-start justify-between mb-4">
                            <div className="size-14 rounded-full bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 flex items-center justify-center text-xl font-bold text-gray-700 dark:text-gray-300 shadow-sm shrink-0">
                                {community.icon}
                            </div>
                            <div className="flex flex-col items-end gap-1 mt-1">
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${community.trustedScore >= 90 ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400' : 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400'}`}>
                                    信誉分: {community.trustedScore}
                                </span>
                            </div>
                        </div>

                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{community.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2 min-h-[40px]">{community.description}</p>

                        {/* Trusted Stats Grid */}
                        <div className="grid grid-cols-3 gap-2 bg-gray-50 dark:bg-slate-800 rounded-xl p-3 mb-4 border border-gray-50 dark:border-slate-700/50">
                            <div className="text-center">
                                <span className="block text-xs font-bold text-gray-900 dark:text-gray-100">{community.trustedContentCount}</span>
                                <span className="text-[10px] text-gray-400 dark:text-gray-500 flex justify-center items-center gap-0.5"><FileCheck size={10} /> 可信</span>
                            </div>
                            <div className="text-center border-l border-gray-200 dark:border-slate-700">
                                <span className="block text-xs font-bold text-gray-900 dark:text-gray-100">{community.reportedContentCount}</span>
                                <span className="text-[10px] text-gray-400 dark:text-gray-500 flex justify-center items-center gap-0.5"><AlertTriangle size={10} /> 举报</span>
                            </div>
                            <div className="text-center border-l border-gray-200 dark:border-slate-700">
                                <span className="block text-xs font-bold text-gray-900 dark:text-gray-100">{community.complaintCount}</span>
                                <span className="text-[10px] text-gray-400 dark:text-gray-500">投诉</span>
                            </div>
                        </div>

                        <div className="mt-auto pt-4 border-t border-gray-50 dark:border-slate-800 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                            <div className="flex items-center gap-3">
                                <span className="flex items-center gap-1"><Users size={12} /> {community.memberCount}</span>
                            </div>
                            <button className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400 font-bold hover:underline">
                                详情 <Zap size={12} fill="currentColor" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Detail Modal */}
            {selectedCommunity && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
                    <div
                        className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-lg shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-200 border border-gray-100 dark:border-slate-800"
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Header Banner */}
                        <div className="h-24 bg-gradient-to-r from-indigo-500 to-purple-600 relative">
                            <button
                                onClick={() => setSelectedCommunity(null)}
                                className="absolute top-4 right-4 p-1.5 bg-black/20 hover:bg-black/30 text-white rounded-full transition-colors"
                            >
                                <X size={16} />
                            </button>
                            <div className="absolute -bottom-8 left-8 size-20 rounded-2xl bg-white dark:bg-slate-800 border-4 border-white dark:border-slate-900 shadow-md flex items-center justify-center text-4xl">
                                {selectedCommunity.icon}
                            </div>
                        </div>

                        <div className="pt-10 px-8 pb-8">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                        {selectedCommunity.name}
                                        {selectedCommunity.isInstitution && <ShieldCheck className="text-blue-500" size={20} />}
                                    </h3>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{selectedCommunity.description}</p>
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{selectedCommunity.trustedScore}</div>
                                    <div className="text-xs text-gray-400 dark:text-gray-500">信誉评分</div>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-6">
                                {selectedCommunity.tags.map(tag => (
                                    <span key={tag} className="px-2.5 py-1 bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 text-xs font-medium rounded-lg">#{tag}</span>
                                ))}
                                <span className="px-2.5 py-1 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 text-xs font-medium rounded-lg flex items-center gap-1">
                                    <Coins size={12} /> 税率 {selectedCommunity.taxRate * 100}%
                                </span>
                            </div>

                            {/* Detailed Stats */}
                            <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-4 mb-6 border border-gray-100 dark:border-slate-700">
                                <h4 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">可信数据看板</h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex items-center justify-between p-2 bg-white dark:bg-slate-900 rounded-lg border border-gray-100 dark:border-slate-800">
                                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                                            <FileCheck size={16} className="text-emerald-500" /> 已验证内容
                                        </div>
                                        <span className="font-bold text-gray-900 dark:text-white">{selectedCommunity.trustedContentCount}</span>
                                    </div>
                                    <div className="flex items-center justify-between p-2 bg-white dark:bg-slate-900 rounded-lg border border-gray-100 dark:border-slate-800">
                                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                                            <AlertTriangle size={16} className="text-amber-500" /> 被举报次数
                                        </div>
                                        <span className="font-bold text-gray-900 dark:text-white">{selectedCommunity.reportedContentCount}</span>
                                    </div>
                                    <div className="flex items-center justify-between p-2 bg-white dark:bg-slate-900 rounded-lg border border-gray-100 dark:border-slate-800">
                                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                                            <ShieldCheck size={16} className="text-blue-500" /> 投诉处理率
                                        </div>
                                        <span className="font-bold text-gray-900 dark:text-white">100%</span>
                                    </div>
                                    <div className="flex items-center justify-between p-2 bg-white dark:bg-slate-900 rounded-lg border border-gray-100 dark:border-slate-800">
                                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                                            <Users size={16} className="text-purple-500" /> 活跃成员
                                        </div>
                                        <span className="font-bold text-gray-900 dark:text-white">{selectedCommunity.memberCount}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <button className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors shadow-sm">
                                    申请加入
                                </button>
                                <button className="flex-1 py-2.5 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-200 font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
                                    查看主页
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
