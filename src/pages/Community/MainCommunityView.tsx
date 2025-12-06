import React, { useState } from 'react';
import { Shield, TrendingUp, Filter, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Content, ContentStatus } from './types.ts';

// Mock Data
const mockContents: Content[] = [
    { id: '1', title: '2025 全球宏观经济展望', summary: '对未来一年利率趋势与通胀压力的深度分析与预测。', authorId: 'u1', communityId: null, status: 'VERIFIED', category: 'CAT_I', riskFactor: 1.5, rewardPool: 500, createdAt: '2小时前', tags: ['金融', '宏观'] },
    { id: '2', title: 'React Server Components 最佳实践', summary: '关于服务端组件性能优化与架构设计的深度剖析。', authorId: 'u2', communityId: null, status: 'PENDING', category: 'CAT_II', riskFactor: 1.0, rewardPool: 200, createdAt: '10分钟前', tags: ['技术', 'React'] },
    { id: '3', title: '美国大选政策影响分析', summary: '客观评估候选人经济政策对加密市场的潜在影响。', authorId: 'u3', communityId: null, status: 'VERIFIED', category: 'CAT_I', riskFactor: 1.5, rewardPool: 800, createdAt: '1天前', tags: ['政治', '经济'] },
];

const MainCommunityView: React.FC = () => {
    const [activeFeed, setActiveFeed] = useState<'TRUSTED' | 'GENERAL'>('TRUSTED');

    const displayedContent = activeFeed === 'TRUSTED'
        ? mockContents.filter(c => c.status === 'VERIFIED')
        : mockContents.filter(c => c.status === 'PENDING'); // General feed shows Pending (Validation Queue)

    return (
        <div className="h-full bg-gray-50 dark:bg-slate-950 flex flex-col transition-colors duration-300">
            {/* Header */}
            <div className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 px-6 py-4 flex items-center justify-between sticky top-0 z-10 transition-colors">
                <div>
                    <h1 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <Shield className="text-indigo-600 dark:text-indigo-400 fill-indigo-100 dark:fill-indigo-900/30" /> TCC 主社区
                    </h1>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">DAO 治理中心 • 高风险内容验证 • 全球视野</p>
                </div>

                <div className="flex bg-gray-100 dark:bg-slate-800 p-1 rounded-lg transition-colors">
                    <button
                        onClick={() => setActiveFeed('TRUSTED')}
                        className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeFeed === 'TRUSTED' ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}
                    >
                        可信流 (Trusted)
                    </button>
                    <button
                        onClick={() => setActiveFeed('GENERAL')}
                        className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeFeed === 'GENERAL' ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}
                    >
                        验证池 (General)
                    </button>
                </div>
            </div>

            {/* Stats Banner for General Feed */}
            {activeFeed === 'GENERAL' && (
                <div className="bg-indigo-50 dark:bg-indigo-900/20 px-6 py-3 border-b border-indigo-100 dark:border-indigo-900/30 flex items-center gap-4 text-xs text-indigo-800 dark:text-indigo-300 transition-colors">
                    <span className="font-bold flex items-center gap-1"><TrendingUp size={14} /> 混合关联排序生效中</span>
                    <span>您的专业领域: <span className="font-semibold">Tech, Finance</span></span>
                    <span className="ml-auto">待验证队列: 1,240 篇</span>
                </div>
            )}

            {/* List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {displayedContent.map(item => (
                    <div key={item.id} className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-md dark:hover:shadow-black/20 transition-all group">
                        <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-2">
                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-wide uppercase ${item.category === 'CAT_I' ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400' :
                                    item.category === 'CAT_II' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                                    }`}>
                                    {item.category.replace('_', ' ')}
                                </span>
                                {item.status === 'VERIFIED' && (
                                    <span className="flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 rounded-full">
                                        <CheckCircle2 size={10} /> 已验证
                                    </span>
                                )}
                                <span className="text-xs text-gray-400 dark:text-gray-500">• {item.createdAt}</span>
                            </div>
                            <div className="text-right">
                                <span className="block text-sm font-bold text-gray-900 dark:text-white">{item.rewardPool} TCC</span>
                                <span className="text-[10px] text-gray-400 dark:text-gray-500">奖励池</span>
                            </div>
                        </div>

                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{item.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">{item.summary}</p>

                        <div className="flex items-center justify-between border-t border-gray-50 dark:border-slate-800 pt-3">
                            <div className="flex gap-2">
                                {item.tags.map(tag => (
                                    <span key={tag} className="text-xs bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-slate-700 cursor-pointer transition-colors">#{tag}</span>
                                ))}
                            </div>

                            <div className="flex items-center gap-3">
                                {item.status === 'PENDING' ? (
                                    <button className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg transition-colors shadow-sm shadow-indigo-200 dark:shadow-none">
                                        验证赚币
                                    </button>
                                ) : (
                                    <div className="text-xs text-gray-500 dark:text-gray-400">
                                        共识度 <span className="font-bold text-gray-900 dark:text-white">88%</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MainCommunityView;
