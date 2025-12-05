import React, { useState } from 'react';
import { Search, Filter, MoreVertical, Plus } from 'lucide-react';
import { initialItems, KnowledgeItem } from './types.ts';
import { ViewContainer, FileIcon, StatusBadge } from './components/Shared.tsx';

const SourcesView = () => {
    const [items] = useState<KnowledgeItem[]>(initialItems);
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <ViewContainer
            title="我的知识源"
            action={
                <button className="flex items-center gap-2 px-6 py-3 bg-[#4285F4] hover:bg-[#3367D6] text-white rounded-full font-medium shadow-lg shadow-blue-500/20 transition-all hover:scale-105 active:scale-95">
                    <Plus size={20} />
                    <span>新建</span>
                </button>
            }
        >
            <div className="flex flex-col gap-6">
                <div className="relative max-w-2xl mx-auto w-full mb-4">
                    <div className="relative group">
                        <input
                            type="text"
                            placeholder="在知识库中搜索..."
                            className="w-full h-12 pl-12 pr-4 rounded-full bg-white shadow-sm border border-transparent group-hover:shadow-md focus:shadow-md focus:ring-0 outline-none transition-all duration-300 text-gray-700 placeholder:text-gray-400"
                            value={searchQuery}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-[#4285F4] transition-colors" size={20} />
                        <button className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors">
                            <Filter size={18} />
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-50/50">
                        <div className="col-span-12 md:col-span-5 flex items-center">名称</div>
                        <div className="col-span-3 hidden md:flex items-center">所有者 & 状态</div>
                        <div className="col-span-3 hidden md:flex items-center">最后修改时间</div>
                        <div className="col-span-1 hidden md:flex items-center justify-end"></div>
                    </div>

                    <div className="divide-y divide-gray-50">
                        {items.filter(i => i.ragStage === 'ready' || !i.ragStage).map(item => (
                            <div key={item.id} className="grid grid-cols-12 gap-4 px-6 py-3.5 hover:bg-[#F1F3F4] transition-colors group cursor-pointer items-center">
                                <div className="col-span-12 md:col-span-5 flex items-center gap-4 overflow-hidden">
                                    <FileIcon type={item.type} />
                                    <div className="min-w-0">
                                        <h4 className="font-medium text-gray-900 truncate text-[14px]">{item.title}</h4>
                                        <div className="flex items-center gap-2 mt-0.5">
                                            {item.tags.map(tag => (
                                                <span key={tag.name} className="inline-flex items-center px-1.5 rounded text-[10px] font-medium bg-gray-100 text-gray-600 border border-gray-200 truncate max-w-[80px]">
                                                    {tag.name}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="col-span-3 hidden md:flex items-center gap-3">
                                    <img src={`https://ui-avatars.com/api/?name=${item.source}&background=random&size=24`} alt="Owner" className="size-6 rounded-full border border-white shadow-sm" />
                                    <StatusBadge status={item.status} verification={item.verification} />
                                </div>

                                <div className="col-span-3 hidden md:flex items-center text-sm text-gray-500 font-mono">
                                    {item.date}
                                </div>

                                <div className="col-span-1 hidden md:flex items-center justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="p-2 hover:bg-gray-200 rounded-full text-gray-500 transition-colors">
                                        <MoreVertical size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </ViewContainer>
    );
};

export default SourcesView;
