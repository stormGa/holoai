import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Briefcase, Search, Mail, Target, Star, Zap, Clock } from 'lucide-react';

interface Tool {
    id: string;
    name: string;
    description: string;
    icon: React.ReactNode;
    category: 'OFFICE' | 'PLANNING' | 'DEV';
    usageCount: number;
    rating: number;
    isPro: boolean;
}

const tools: Tool[] = [
    {
        id: 't1', name: '会议纪要生成器', description: '上传录音或粘贴文本，自动生成结构化会议纪要与待办事项。',
        icon: <FileText size={24} />, category: 'OFFICE', usageCount: 12400, rating: 4.8, isPro: false
    },
    {
        id: 't3', name: '职场邮件润色', description: '一键优化邮件语气，提供更加专业得体的表达建议。',
        icon: <Mail size={24} />, category: 'OFFICE', usageCount: 32000, rating: 4.9, isPro: false
    },
    {
        id: 't4', name: 'OKR 目标设定', description: '辅助制定清晰、可衡量的团队 OKR 目标与关键结果。',
        icon: <Target size={24} />, category: 'PLANNING', usageCount: 5600, rating: 4.7, isPro: true
    },
];

const ProductivityPage: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<'ALL' | 'OFFICE' | 'PLANNING' | 'DEV'>('ALL');

    const filteredTools = tools.filter(tool => {
        const matchQuery = tool.name.includes(searchQuery) || tool.description.includes(searchQuery);
        const matchCategory = selectedCategory === 'ALL' || tool.category === selectedCategory;
        return matchQuery && matchCategory;
    });

    return (
        <div className="h-full bg-gray-50 dark:bg-slate-950 flex flex-col transition-colors duration-300">
            {/* Header Area */}
            <div className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 px-8 py-6 transition-colors">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            <Briefcase className="text-blue-600 dark:text-blue-400 fill-blue-50 dark:fill-blue-900/30" /> 生产力套件
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-xl">HoloAI 为您精心打造的智能工作流工具，覆盖办公、规划与开发场景。让 AI 帮您处理繁琐事务，释放创造力。</p>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                    {/* Category Filter */}
                    <div className="flex bg-gray-100 dark:bg-slate-800 p-1 rounded-lg transition-colors">
                        {(['ALL', 'OFFICE', 'PLANNING', 'DEV'] as const).map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${selectedCategory === cat ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}
                            >
                                {cat === 'ALL' ? '全部' : cat === 'OFFICE' ? '办公' : cat === 'PLANNING' ? '规划' : '开发'}
                            </button>
                        ))}
                    </div>

                    {/* Search */}
                    <div className="relative w-full md:w-64">
                        <input
                            type="text"
                            placeholder="搜索工具..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/30 outline-none text-sm bg-gray-50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors"
                        />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={16} />
                    </div>
                </div>
            </div>

            {/* Tools Grid Area */}
            <div className="flex-1 overflow-y-auto p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredTools.map(tool => (
                        <Link
                            key={tool.id}
                            to={
                                tool.id === 't1' ? '/tools/productivity/meeting-notes' :
                                    tool.id === 't4' ? '/tools/productivity/okr' :
                                        tool.id === 't3' ? '/tools/productivity/email-polisher' :
                                            '#'
                            }
                            className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-gray-100 dark:border-slate-800 hover:shadow-lg dark:hover:shadow-black/20 hover:border-blue-100 dark:hover:border-blue-900/30 hover:-translate-y-1 transition-all cursor-pointer group relative overflow-hidden h-full flex flex-col"
                        >

                            <div className="flex justify-between items-start mb-4">
                                <div className={`size-12 rounded-2xl flex items-center justify-center text-white shadow-md ${tool.category === 'OFFICE' ? 'bg-gradient-to-br from-blue-400 to-blue-600' :
                                    tool.category === 'PLANNING' ? 'bg-gradient-to-br from-purple-400 to-purple-600' :
                                        'bg-gradient-to-br from-emerald-400 to-emerald-600'
                                    }`}>
                                    {tool.icon}
                                </div>
                                {tool.isPro && (
                                    <span className="bg-amber-50 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                                        <Zap size={10} fill="currentColor" /> PRO
                                    </span>
                                )}
                            </div>

                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{tool.name}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 leading-relaxed flex-1">{tool.description}</p>

                            <div className="flex items-center justify-between pt-4 border-t border-gray-50 dark:border-slate-800 text-xs text-gray-400 dark:text-gray-500">
                                <div className="flex items-center gap-1">
                                    <Clock size={12} /> 使用 {tool.usageCount > 10000 ? (tool.usageCount / 10000).toFixed(1) + 'w' : tool.usageCount}
                                </div>
                                <div className="flex items-center gap-1 text-amber-500 font-medium">
                                    <Star size={12} fill="currentColor" /> {tool.rating}
                                </div>
                            </div>

                            {/* Hover Action Layer */}
                            <div className="absolute inset-0 bg-blue-600/90 dark:bg-blue-600/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <button className="px-6 py-2 bg-white text-blue-600 font-bold rounded-xl shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                                    立即使用
                                </button>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductivityPage;
