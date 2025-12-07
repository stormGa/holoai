import React, { useState } from 'react';
import { LayoutGrid, Filter, MessageSquare, Heart, Share2, MoreHorizontal, Zap } from 'lucide-react';
import { Content } from './types.ts';

// Mock Data for Holo Plaza
const mockContents: any[] = [
    {
        id: '1',
        type: 'ARTICLE',
        title: '2025 全球宏观经济展望：利率与通胀的博弈',
        summary: '深度解析美联储最新货币政策对新兴市场的影响，以及加密资产在其中的避险属性变化。',
        author: { name: '未来财经', avatar: '💰' },
        stats: { likes: 1240, comments: 45, shares: 12 },
        time: '2小时前',
        tags: ['宏观', '金融']
    },
    {
        id: '2',
        type: 'DISCUSSION',
        title: '关于 React Server Components 的最佳实践讨论',
        summary: '大家在生产环境中使用 RSC 遇到了哪些坑？我们在迁移过程中发现了一些性能瓶颈...',
        author: { name: '极客前沿', avatar: 'TC' },
        stats: { likes: 89, comments: 156, shares: 5 },
        time: '4小时前',
        tags: ['技术', 'React']
    },
    {
        id: '3',
        type: 'UPDATE',
        title: '元宇宙公会第 42 期治理提案公示',
        summary: '本期提案涉及金库资金分配与新区土地开发计划，请各位成员及时参与投票。',
        author: { name: '元宇宙公会', avatar: '🎮' },
        stats: { likes: 342, comments: 12, shares: 8 },
        time: '5小时前',
        tags: ['治理', 'GameFi']
    },
    {
        id: '4',
        type: 'ARTICLE',
        title: 'AGI 时代的个体生存指南',
        summary: '当 AI 开始接管创造性工作，人类的核心竞争力将转向何方？',
        author: { name: '深蓝思考', avatar: '🧠' },
        stats: { likes: 2100, comments: 340, shares: 150 },
        time: '1天前',
        tags: ['AI', '哲学']
    },
    {
        id: '5',
        type: 'DISCUSSION',
        title: '有没有推荐的 Notion 高效模版？',
        summary: '最近在整理知识库，求推荐适合科研人员的 Notion 模版体系。',
        author: { name: '效率控', avatar: '⚡' },
        stats: { likes: 45, comments: 23, shares: 2 },
        time: '1天前',
        tags: ['工具', '效率']
    },
];

const MainCommunityView: React.FC = () => {
    const [filter, setFilter] = useState('RECOMMEND');

    return (
        <div className="h-full bg-gray-50 dark:bg-slate-950 flex flex-col transition-colors duration-300">
            {/* Header */}
            <div className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 px-6 py-4 flex items-center justify-between sticky top-0 z-10 transition-colors">
                <div>
                    <h1 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <LayoutGrid className="text-indigo-600 dark:text-indigo-400" /> 全息广场
                    </h1>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">汇聚全球前沿思想与社区动态</p>
                </div>

                <div className="flex bg-gray-100 dark:bg-slate-800 p-1 rounded-lg transition-colors">
                    {['RECOMMEND', 'LATEST', 'HOT'].map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${filter === f ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}
                        >
                            {f === 'RECOMMEND' ? '推荐' : f === 'LATEST' ? '最新' : '热榜'}
                        </button>
                    ))}
                </div>
            </div>

            {/* Dense Feed List */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-3">
                {mockContents.map(item => (
                    <div key={item.id} className="bg-white dark:bg-slate-900 rounded-lg p-4 border border-gray-100 dark:border-slate-800 hover:border-indigo-100 dark:hover:border-indigo-900/30 transition-all group cursor-pointer">
                        <div className="flex justify-between items-start gap-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1.5">
                                    <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 dark:text-gray-300">
                                        <span className="size-5 rounded-full bg-gray-100 dark:bg-slate-800 flex items-center justify-center text-[10px]">{item.author.avatar}</span>
                                        {item.author.name}
                                    </div>
                                    <span className="text-gray-300 dark:text-slate-700">•</span>
                                    <span className="text-xs text-gray-400">{item.time}</span>
                                    {item.type === 'DISCUSSION' && <span className="px-1.5 py-0.5 rounded bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 text-[10px] font-bold">讨论</span>}
                                    {item.type === 'UPDATE' && <span className="px-1.5 py-0.5 rounded bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-[10px] font-bold">公告</span>}
                                </div>
                                <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1">{item.title}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-3">{item.summary}</p>

                                <div className="flex items-center gap-4 text-xs text-gray-400 dark:text-gray-500">
                                    {item.tags.map((tag: string) => (
                                        <span key={tag} className="text-gray-400 hover:text-indigo-500 transition-colors">#{tag}</span>
                                    ))}
                                    <div className="flex items-center gap-4 ml-auto lg:ml-0">
                                        <button className="flex items-center gap-1 hover:text-red-500 transition-colors"><Heart size={14} /> {item.stats.likes}</button>
                                        <button className="flex items-center gap-1 hover:text-blue-500 transition-colors"><MessageSquare size={14} /> {item.stats.comments}</button>
                                        <button className="flex items-center gap-1 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"><Share2 size={14} /> {item.stats.shares}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                <div className="text-center py-6 text-xs text-gray-400 dark:text-gray-600">
                    已加载全部内容
                </div>
            </div>
        </div>
    );
};

export default MainCommunityView;
