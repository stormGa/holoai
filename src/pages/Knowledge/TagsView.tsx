import React from 'react';
import { MessageSquare, FileText, Zap } from 'lucide-react';
import { ViewContainer } from './components/Shared.tsx';

const TagsView = () => {
    // Mock Topics Data (High Density)
    const topics = [
        { id: '1', label: 'React', count: 128, conversationCount: 45, documentCount: 83, streamCount: 12, color: '#61DAFB' },
        { id: '2', label: 'TypeScript', count: 86, conversationCount: 30, documentCount: 56, streamCount: 5, color: '#3178C6' },
        { id: '3', label: 'Rust', count: 64, conversationCount: 20, documentCount: 44, streamCount: 8, color: '#DEA584' },
        { id: '4', label: 'WebAssembly', count: 42, conversationCount: 12, documentCount: 30, streamCount: 3, color: '#654FF0' },
        { id: '5', label: 'Docker', count: 95, conversationCount: 35, documentCount: 60, streamCount: 15, color: '#2496ED' },
        { id: '6', label: 'Kubernetes', count: 72, conversationCount: 25, documentCount: 47, streamCount: 10, color: '#326CE5' },
        { id: '7', label: '机器学习', count: 110, conversationCount: 40, documentCount: 70, streamCount: 20, color: '#FF6F00' },
        { id: '8', label: '深度学习', count: 88, conversationCount: 32, documentCount: 56, streamCount: 18, color: '#D81B60' },
        { id: '9', label: '自然语言处理', count: 65, conversationCount: 22, documentCount: 43, streamCount: 12, color: '#4CAF50' },
        { id: '10', label: '计算机视觉', count: 54, conversationCount: 18, documentCount: 36, streamCount: 8, color: '#9C27B0' },
        { id: '11', label: '微服务架构', count: 78, conversationCount: 28, documentCount: 50, streamCount: 14, color: '#FF9800' },
        { id: '12', label: '分布式系统', count: 92, conversationCount: 34, documentCount: 58, streamCount: 16, color: '#795548' },
        { id: '13', label: '数据库设计', count: 68, conversationCount: 24, documentCount: 44, streamCount: 10, color: '#607D8B' },
        { id: '14', label: '网络安全', count: 55, conversationCount: 19, documentCount: 36, streamCount: 9, color: '#F44336' },
        { id: '15', label: '云计算', count: 105, conversationCount: 38, documentCount: 67, streamCount: 22, color: '#03A9F4' },
        { id: '16', label: '边缘计算', count: 32, conversationCount: 10, documentCount: 22, streamCount: 4, color: '#009688' },
        { id: '17', label: '全球经济', count: 45, conversationCount: 15, documentCount: 30, streamCount: 8, color: '#8BC34A' },
        { id: '18', label: '古代历史', count: 38, conversationCount: 12, documentCount: 26, streamCount: 6, color: '#CDDC39' },
        { id: '19', label: '量子物理', count: 28, conversationCount: 8, documentCount: 20, streamCount: 2, color: '#673AB7' },
        { id: '20', label: '科幻小说', count: 50, conversationCount: 18, documentCount: 32, streamCount: 10, color: '#E91E63' },
    ];

    return (
        <ViewContainer title="智能分类">
            <div className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm p-6 rounded-3xl border border-white/60 dark:border-slate-800/60 shadow-sm transition-colors duration-300">
                {/* Header Summary for Insight */}
                <div className="flex items-center justify-between mb-8 px-2">
                    <div className="flex items-center gap-3">
                        <h2 className="text-xl font-bold text-gray-800 dark:text-white">全域话题概览</h2>
                        <span className="px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-semibold">20 个主要领域</span>
                    </div>
                    <div className="flex gap-2">
                        <button className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors">按热度排序</button>
                        <span className="text-gray-300 dark:text-gray-600">|</span>
                        <button className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors">按时间排序</button>
                    </div>
                </div>



                <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-5 space-y-5">
                    {topics.map(topic => (
                        <div key={topic.id} className="break-inside-avoid relative group cursor-pointer transition-all duration-300 hover:-translate-y-1">
                            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100 dark:border-slate-800 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] dark:hover:shadow-black/20 hover:border-blue-100 dark:hover:border-blue-900/30 transition-all h-full">

                                <div className="flex items-start justify-between mb-4">
                                    <div className="size-10 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-md rotate-3 group-hover:rotate-0 transition-transform duration-300" style={{ backgroundColor: topic.color }}>
                                        {topic.label.substring(0, 1).toUpperCase()}
                                    </div>
                                    <div className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${topic.count > 80 ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border-red-100 dark:border-red-900/30' : 'bg-gray-50 dark:bg-slate-800 text-gray-500 dark:text-gray-400 border-gray-100 dark:border-slate-700'}`}>
                                        {topic.count > 80 ? 'HOT' : 'TOPIC'}
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <h3 className="font-bold text-gray-800 dark:text-white text-[15px]">{topic.label}</h3>
                                    <div className="text-[10px] font-medium px-1.5 py-0.5 rounded-md bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-gray-400 inline-block mt-1">
                                        {topic.count} 个知识点
                                    </div>
                                </div>

                                <div className="space-y-2 mt-4 pt-4 border-t border-gray-100/50 dark:border-slate-800/50">
                                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                                        <span className="flex items-center gap-1.5"><MessageSquare size={12} className="text-blue-400" /> 对话</span>
                                        <span className="font-semibold text-gray-700 dark:text-gray-300">{topic.conversationCount}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                                        <span className="flex items-center gap-1.5"><FileText size={12} className="text-purple-400" /> 文档</span>
                                        <span className="font-semibold text-gray-700 dark:text-gray-300">{topic.documentCount}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                                        <span className="flex items-center gap-1.5"><Zap size={12} className="text-amber-400" /> 信息流</span>
                                        <span className="font-semibold text-gray-700 dark:text-gray-300">{topic.streamCount}</span>
                                    </div>
                                </div>

                                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-0 group-hover:opacity-30 transition-opacity" style={{ color: topic.color }}></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </ViewContainer>
    );
};

export default TagsView;
