import React, { useState } from 'react';
import { Search, Shield, Database, FileText, Filter, ChevronRight } from 'lucide-react';

interface SearchResult {
    id: number;
    title: string;
    source: string;
    type: 'community' | 'knowledge';
    summary: string;
    date: string;
}

const TrustedSearchPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'all' | 'community' | 'knowledge'>('all');
    const [searchQuery, setSearchQuery] = useState('');

    const mockResults: SearchResult[] = [
        { id: 1, title: "2024年人工智能发展趋势报告", source: "TechCrunch", type: 'community', summary: "深入分析了生成式AI在企业级应用中的落地挑战与机遇...", date: "2024-03-15" },
        { id: 2, title: "内部架构设计文档 v2.0", source: "我的知识库", type: 'knowledge', summary: "详细描述了新一代微服务架构的组件交互与数据流向...", date: "2024-02-28" },
        { id: 3, title: "React 19 新特性前瞻", source: "React Blog", type: 'community', summary: "探讨了即将到来的 React Compiler 和新的 Hooks API...", date: "2024-03-10" },
        { id: 4, title: "产品需求规格说明书 - 智能客服", source: "我的知识库", type: 'knowledge', summary: "定义了智能客服系统的核心功能模块与非功能性需求...", date: "2024-01-15" },
    ];

    const filteredResults = activeTab === 'all'
        ? mockResults
        : mockResults.filter(r => r.type === activeTab);

    return (
        <div className="flex flex-col h-full bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 px-8 py-6">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3 mb-2">
                        <Shield className="text-emerald-500" /> 可信数据搜
                    </h1>
                    <p className="text-gray-500 mb-6">在经过验证的社区内容和您的个人知识库中进行精准搜索</p>

                    <div className="relative">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="搜索关键词..."
                            className="w-full h-14 pl-14 pr-4 rounded-2xl border border-gray-200 shadow-sm focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 outline-none text-lg transition-all"
                        />
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
                    </div>
                </div>
            </header>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-8">
                <div className="max-w-4xl mx-auto">
                    {/* Tabs */}
                    <div className="flex items-center gap-2 mb-6">
                        <button
                            onClick={() => setActiveTab('all')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'all' ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
                        >
                            全部结果
                        </button>
                        <button
                            onClick={() => setActiveTab('community')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${activeTab === 'community' ? 'bg-emerald-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
                        >
                            <Database size={16} /> 社区内容
                        </button>
                        <button
                            onClick={() => setActiveTab('knowledge')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${activeTab === 'knowledge' ? 'bg-purple-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
                        >
                            <FileText size={16} /> 个人知识库
                        </button>
                    </div>

                    {/* Results List */}
                    <div className="space-y-4">
                        {filteredResults.map(result => (
                            <div key={result.id} className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow cursor-pointer group">
                                <div className="flex items-start justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${result.type === 'community' ? 'bg-emerald-50 text-emerald-700' : 'bg-purple-50 text-purple-700'}`}>
                                            {result.type === 'community' ? '社区' : '知识库'}
                                        </span>
                                        <span className="text-sm text-gray-500 flex items-center gap-1">
                                            {result.source} <span className="w-1 h-1 rounded-full bg-gray-300"></span> {result.date}
                                        </span>
                                    </div>
                                    <ChevronRight className="text-gray-300 group-hover:text-gray-600 transition-colors" size={20} />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{result.title}</h3>
                                <p className="text-gray-600 leading-relaxed line-clamp-2">{result.summary}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrustedSearchPage;
