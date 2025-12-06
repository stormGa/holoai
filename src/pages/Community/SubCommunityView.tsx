import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Shield, Users, Coins, TrendingUp, Lock, ShieldCheck, AlertTriangle, FileCheck, CheckCircle2 } from 'lucide-react';
import { Community, Content } from './types.ts';

// Mock Data
const mockCommunity: Community = {
    id: 'c1', type: 'SUB', name: '未来财经 DAO', description: '去中心化金融、流动性挖矿及宏观经济深度分析。', memberCount: 1200, icon: '💰', taxRate: 0.01, accessType: 'PUBLIC', tags: ['金融'],
    isInstitution: true, trustedScore: 92, trustedContentCount: 450, reportedContentCount: 3, complaintCount: 0
};

const mockContents: Content[] = [
    { id: '101', title: '流动性池无常损失深度解析', summary: '深入探讨 Uniswap V3 中的无常损失计算模型与对冲策略。', authorId: 'u4', communityId: 'c1', status: 'VERIFIED', category: 'CAT_II', riskFactor: 1.0, rewardPool: 150, createdAt: '1小时前', tags: ['DeFi'] },
    { id: '102', title: '新型算法稳定币提案', summary: '关于引入动态锚定机制的治理提案讨论。', authorId: 'u5', communityId: 'c1', status: 'PENDING', category: 'CAT_I', riskFactor: 1.5, rewardPool: 300, createdAt: '3小时前', tags: ['治理'] },
];

const SubCommunityView: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [isJoined, setIsJoined] = useState(false);

    // In a real app, fetch community by ID
    const community = mockCommunity;

    return (
        <div className="h-full bg-gray-50 dark:bg-slate-950 flex flex-col transition-colors duration-300">
            {/* Community Banner / Header */}
            <div className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 transition-colors">
                <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-600 relative">
                    <div className="absolute -bottom-8 left-8 size-20 rounded-2xl bg-white dark:bg-slate-800 border-4 border-white dark:border-slate-900 shadow-md flex items-center justify-center text-4xl">
                        {community.icon}
                    </div>
                </div>
                <div className="pt-10 pb-6 px-8 flex justify-between items-start">
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                {community.name}
                                {community.accessType === 'INVITE_ONLY' && <Lock size={16} className="text-gray-400" />}
                            </h1>
                            {community.isInstitution && (
                                <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-bold px-2 py-0.5 rounded flex items-center gap-1">
                                    <ShieldCheck size={12} /> 机构认证
                                </span>
                            )}
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 mt-1 max-w-2xl">{community.description}</p>

                        {/* Trusted Stats Row */}
                        <div className="flex items-center gap-6 mt-4 p-3 bg-gray-50 dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 w-fit transition-colors">
                            <div className="flex items-center gap-2">
                                <div className={`text-lg font-bold ${community.trustedScore >= 90 ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>
                                    {community.trustedScore}
                                </div>
                                <span className="text-xs text-gray-500 dark:text-gray-400">信誉分</span>
                            </div>
                            <div className="w-px h-4 bg-gray-200 dark:bg-slate-700"></div>
                            <div className="flex items-center gap-2">
                                <span className="text-lg font-bold text-gray-900 dark:text-white">{community.trustedContentCount}</span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">可信内容</span>
                            </div>
                            <div className="w-px h-4 bg-gray-200 dark:bg-slate-700"></div>
                            <div className="flex items-center gap-2">
                                <span className="text-lg font-bold text-gray-900 dark:text-white">{community.reportedContentCount}</span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">被举报</span>
                            </div>
                            <div className="w-px h-4 bg-gray-200 dark:bg-slate-700"></div>
                            <div className="flex items-center gap-2">
                                <span className="text-lg font-bold text-gray-900 dark:text-white">{community.complaintCount}</span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">投诉</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 mt-3 text-sm text-gray-500 dark:text-gray-400">
                            <span className="flex items-center gap-1"><Users size={14} /> {community.memberCount} 成员</span>
                            <span className="flex items-center gap-1"><Coins size={14} /> {community.taxRate * 100}% 交易税</span>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        {!isJoined ? (
                            <button
                                onClick={() => setIsJoined(true)}
                                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl shadow-sm transition-all"
                            >
                                加入社区
                            </button>
                        ) : (
                            <button className="px-6 py-2.5 bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 font-medium rounded-xl border border-gray-200 dark:border-slate-700 transition-colors">已加入</button>
                        )}
                    </div>
                </div>
            </div>

            {/* Content Feed */}
            <div className="flex-1 overflow-y-auto p-8">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">社区动态</h2>
                    <button className="text-sm text-indigo-600 dark:text-indigo-400 font-medium hover:underline">发布内容</button>
                </div>

                <div className="space-y-4">
                    {mockContents.map(item => (
                        <div key={item.id} className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-md dark:hover:shadow-black/20 transition-all group">
                            <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center gap-2">
                                    <span className="bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded text-[10px] font-bold tracking-wide uppercase">
                                        {item.category.replace('_', ' ')}
                                    </span>
                                    {item.status === 'VERIFIED' && (
                                        <span className="flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 rounded-full">
                                            <CheckCircle2 size={10} /> 已验证
                                        </span>
                                    )}
                                    <span className="text-xs text-gray-400 dark:text-gray-500">• {item.createdAt}</span>
                                </div>
                                <span className="text-sm font-bold text-gray-900 dark:text-white">{item.rewardPool} TCC</span>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{item.title}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{item.summary}</p>

                            <div className="flex items-center justify-between border-t border-gray-50 dark:border-slate-800 pt-3">
                                <div className="flex gap-2">
                                    {item.tags.map(tag => (
                                        <span key={tag} className="text-xs bg-gray-50 dark:bg-slate-800 text-gray-500 dark:text-gray-400 px-2 py-1 rounded">#{tag}</span>
                                    ))}
                                </div>
                                {item.status === 'PENDING' && (
                                    <button className="px-3 py-1 bg-indigo-50 dark:bg-indigo-900/30 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 text-xs font-semibold rounded-lg transition-colors">
                                        参与验证
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SubCommunityView;
