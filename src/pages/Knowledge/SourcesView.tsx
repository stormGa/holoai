import React, { useState, useRef, useEffect } from 'react';
import { Search, Filter, Plus, Download, Info, X, Clock, User, FileText, Trash2, Zap, Eye, FolderOpen, Grid, Layout, UploadCloud, Check } from 'lucide-react';
import { initialItems, initialSpaces, KnowledgeItem, KnowledgeSpace } from './types.ts';
import { ViewContainer, FileIcon, StatusBadge } from './components/Shared.tsx';

const SourcesView = () => {
    const [items] = useState<KnowledgeItem[]>(initialItems);
    const [spaces, setSpaces] = useState<KnowledgeSpace[]>(initialSpaces);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedSpaceId, setSelectedSpaceId] = useState<string | null>(null);
    const [openPopoverId, setOpenPopoverId] = useState<number | null>(null);

    // Create Space Modal State
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [newSpaceName, setNewSpaceName] = useState('');
    const [newSpaceDesc, setNewSpaceDesc] = useState('');

    // Upload Document Modal State
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

    // Filter State
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    // Derive unique tags
    const allTags = Array.from(new Set(items.flatMap(item => item.tags.map(t => t.name)))).sort();

    const popoverRef = useRef<HTMLDivElement>(null);
    const filterRef = useRef<HTMLDivElement>(null);

    // Close popover and filter when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
                setOpenPopoverId(null);
            }
            if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
                setIsFilterOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const togglePopover = (e: React.MouseEvent, id: number) => {
        e.stopPropagation();
        setOpenPopoverId(openPopoverId === id ? null : id);
    };

    const toggleTag = (tag: string) => {
        setSelectedTags(prev =>
            prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
        );
    };

    const handleAction = (e: React.MouseEvent, action: string, item: KnowledgeItem) => {
        e.stopPropagation();
        console.log(`Action: ${action} on ${item.title}`);
    };

    const handleCreateSpace = () => {
        if (!newSpaceName.trim()) return;

        const newSpace: KnowledgeSpace = {
            id: `space-${Date.now()}`,
            name: newSpaceName,
            description: newSpaceDesc,
            docCount: 0,
            updatedAt: '刚刚'
        };

        setSpaces([...spaces, newSpace]);
        setSelectedSpaceId(newSpace.id);
        setIsCreateModalOpen(false);
        setNewSpaceName('');
        setNewSpaceDesc('');
    };

    const filteredItems = items.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesSpace = selectedSpaceId ? item.spaceId === selectedSpaceId : true;

        // Tag Filter Logic
        const matchesTags = selectedTags.length === 0 || item.tags.some(tag => selectedTags.includes(tag.name));

        return matchesSearch && matchesSpace && matchesTags && (item.ragStage === 'ready' || !item.ragStage);
    });

    return (
        <ViewContainer
            title="我的知识源"
            action={
                <button
                    onClick={() => setIsUploadModalOpen(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-[#4285F4] hover:bg-[#3367D6] text-white rounded-full font-medium shadow-lg shadow-blue-500/20 transition-all hover:scale-105 active:scale-95"
                >
                    <UploadCloud size={20} />
                    <span>上传文档</span>
                </button>
            }
        >
            <div className="flex gap-6 min-h-[600px]">
                {/* Left Sidebar: Knowledge Spaces - Fixed Width */}
                <div className="w-64 flex-shrink-0 flex flex-col gap-4">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 p-4 flex flex-col gap-2 h-full transition-colors duration-300">
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2 px-2 flex items-center justify-between">
                            <span>知识空间</span>
                            <button
                                className="p-1 hover:bg-gray-100 dark:hover:bg-slate-800 rounded text-gray-400 hover:text-[#4285F4] transition-colors"
                                onClick={() => setIsCreateModalOpen(true)}
                                title="新建空间"
                            >
                                <Plus size={16} />
                            </button>
                        </h3>

                        <div className="space-y-1">
                            <button
                                onClick={() => setSelectedSpaceId(null)}
                                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${selectedSpaceId === null
                                    ? 'bg-blue-50 dark:bg-blue-900/20 text-[#4285F4] dark:text-blue-400 font-medium'
                                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-gray-200'
                                    }`}
                            >
                                <Layout size={18} />
                                <span className="flex-1 text-left text-sm">全部空间</span>
                                <span className="text-xs opacity-60 bg-gray-100 dark:bg-slate-800 px-1.5 py-0.5 rounded-full">{items.length}</span>
                            </button>

                            {spaces.map(space => (
                                <button
                                    key={space.id}
                                    onClick={() => setSelectedSpaceId(space.id)}
                                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${selectedSpaceId === space.id
                                        ? 'bg-blue-50 dark:bg-blue-900/20 text-[#4285F4] dark:text-blue-400 font-medium'
                                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-gray-200'
                                        }`}
                                >
                                    <FolderOpen size={18} />
                                    <div className="flex-1 text-left flex flex-col overflow-hidden">
                                        <span className="text-sm truncate">{space.name}</span>
                                    </div>
                                    <span className="text-xs opacity-60 bg-gray-100 dark:bg-slate-800 px-1.5 py-0.5 rounded-full">{items.filter(i => i.spaceId === space.id).length}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Content: Document List - Flexible Width */}
                <div className="flex-1 flex flex-col gap-6 min-w-0">
                    {/* Search Bar Container with Z-Index */}
                    <div className="relative w-full flex items-center gap-3 z-10">
                        <div className="relative group flex-1">
                            <input
                                type="text"
                                placeholder={`在 ${selectedSpaceId ? spaces.find(s => s.id === selectedSpaceId)?.name : '全部空间'} 中搜索...`}
                                className="w-full h-12 pl-12 pr-4 rounded-full bg-white dark:bg-slate-900 shadow-sm border border-transparent dark:border-slate-800 group-hover:shadow-md focus:shadow-md focus:ring-0 outline-none transition-all duration-300 text-gray-700 dark:text-gray-200 placeholder:text-gray-400"
                                value={searchQuery}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                            />
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-[#4285F4] transition-colors" size={20} />
                        </div>

                        {/* Tag Filter */}
                        <div className="relative" ref={filterRef}>
                            <button
                                onClick={() => setIsFilterOpen(!isFilterOpen)}
                                className={`h-12 w-12 flex items-center justify-center rounded-full shadow-sm hover:shadow-md transition-all ${isFilterOpen || selectedTags.length > 0
                                    ? 'bg-[#4285F4] text-white'
                                    : 'bg-white dark:bg-slate-900 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 border border-transparent dark:border-slate-800'
                                    }`}
                                title="按标签筛选"
                            >
                                <Filter size={20} />
                                {selectedTags.length > 0 && (
                                    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-sm ring-2 ring-white z-10">
                                        {selectedTags.length}
                                    </span>
                                )}
                            </button>

                            {isFilterOpen && (
                                <div className="absolute right-0 top-14 z-[100] w-64 bg-white dark:bg-slate-900 rounded-xl shadow-xl ring-1 ring-black/5 dark:ring-white/10 p-2 animate-in fade-in zoom-in-95 duration-200 border border-gray-100 dark:border-slate-800">
                                    <div className="flex items-center justify-between px-3 py-2 border-b border-gray-50 dark:border-slate-800 mb-1">
                                        <span className="text-xs font-semibold text-gray-900 dark:text-gray-200">按标签筛选</span>
                                        {selectedTags.length > 0 && (
                                            <button
                                                onClick={() => setSelectedTags([])}
                                                className="text-xs text-[#4285F4] hover:text-[#3367D6]"
                                            >
                                                清除
                                            </button>
                                        )}
                                    </div>
                                    <div className="max-h-64 overflow-y-auto p-1 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-slate-700">
                                        {allTags.map(tag => (
                                            <button
                                                key={tag}
                                                onClick={() => toggleTag(tag)}
                                                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${selectedTags.includes(tag)
                                                    ? 'bg-blue-50 dark:bg-blue-900/20 text-[#4285F4] dark:text-blue-400 font-medium'
                                                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800'
                                                    }`}
                                            >
                                                <span>{tag}</span>
                                                {selectedTags.includes(tag) && <Check size={14} />}
                                            </button>
                                        ))}
                                        {allTags.length === 0 && (
                                            <div className="text-center py-4 text-xs text-gray-400">无可用标签</div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 min-h-[400px] flex flex-col z-0 transition-colors duration-300">
                        <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-100 dark:border-slate-800 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider bg-gray-50/50 dark:bg-slate-800/50 rounded-t-2xl">
                            <div className="col-span-12 md:col-span-4 flex items-center">名称</div>
                            <div className="col-span-3 hidden md:flex items-center">所有者 & 信息</div>
                            <div className="col-span-5 hidden md:flex items-center justify-end pr-8">操作</div>
                        </div>

                        <div className="divide-y divide-gray-50 dark:divide-slate-800 relative flex-1">
                            {filteredItems.length > 0 ? (
                                filteredItems.map(item => (
                                    <div key={item.id} className="grid grid-cols-12 gap-4 px-6 py-3.5 hover:bg-[#F1F3F4] dark:hover:bg-slate-800/60 transition-colors group cursor-pointer items-center relative">
                                        <div className="col-span-12 md:col-span-4 flex items-center gap-4 overflow-hidden">
                                            <FileIcon type={item.type} />
                                            <div className="min-w-0">
                                                <h4 className="font-medium text-gray-900 dark:text-gray-200 truncate text-[14px]">{item.title}</h4>
                                                <div className="flex items-center gap-2 mt-0.5">
                                                    {item.tags.map(tag => (
                                                        <span key={tag.name} className="inline-flex items-center px-1.5 rounded text-[10px] font-medium bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-slate-700 truncate max-w-[80px]">
                                                            {tag.name}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-span-3 hidden md:flex items-center gap-3 relative">
                                            <div
                                                className="flex items-center gap-2 px-2 py-1 rounded-full hover:bg-white dark:hover:bg-slate-700 hover:shadow-sm hover:ring-1 hover:ring-gray-200 dark:hover:ring-slate-600 transition-all cursor-pointer"
                                                onClick={(e) => togglePopover(e, item.id)}
                                            >
                                                <img src={`https://ui-avatars.com/api/?name=${item.source}&background=random&size=24`} alt="Owner" className="size-6 rounded-full border border-white dark:border-slate-800 shadow-sm" />
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{item.source}</span>
                                                </div>
                                                <Info size={14} className="text-gray-400 ml-1" />
                                            </div>

                                            {/* Detailed Popover */}
                                            {openPopoverId === item.id && (
                                                <div
                                                    ref={popoverRef}
                                                    className="absolute left-0 top-10 z-50 w-64 bg-white dark:bg-slate-800 rounded-xl shadow-xl ring-1 ring-black/5 dark:ring-white/10 p-4 animate-in fade-in zoom-in-95 duration-200"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-50 dark:border-slate-700">
                                                        <span className="font-semibold text-xs text-gray-900 dark:text-white">详细信息</span>
                                                        <button onClick={(e) => { e.stopPropagation(); setOpenPopoverId(null); }} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                                                            <X size={14} />
                                                        </button>
                                                    </div>
                                                    <div className="space-y-3">
                                                        <div className="flex items-start gap-3">
                                                            <User size={14} className="mt-0.5 text-blue-500" />
                                                            <div className="flex flex-col">
                                                                <span className="text-[10px] text-gray-400 uppercase tracking-wide">所有者</span>
                                                                <span className="text-sm text-gray-700 dark:text-gray-200 font-medium">{item.source}</span>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-start gap-3">
                                                            <Clock size={14} className="mt-0.5 text-green-500" />
                                                            <div className="flex flex-col">
                                                                <span className="text-[10px] text-gray-400 uppercase tracking-wide">上传时间</span>
                                                                <span className="text-sm text-gray-700 dark:text-gray-200 font-medium">{item.date}</span>
                                                            </div>
                                                        </div>

                                                        <div className="pt-2">
                                                            <StatusBadge status={item.status} verification={item.verification} />
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <div className="col-span-5 hidden md:flex items-center justify-end gap-3 pr-4">
                                            <button
                                                className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors text-xs font-semibold"
                                                title="基于此文档对话"
                                                onClick={(e) => handleAction(e, 'chat', item)}
                                            >
                                                <Zap size={14} fill="currentColor" />
                                                <span>对话</span>
                                            </button>

                                            <button
                                                className="p-1.5 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700 hover:text-gray-900 dark:hover:text-white rounded-lg transition-colors"
                                                title="快速预览"
                                                onClick={(e) => handleAction(e, 'preview', item)}
                                            >
                                                <Eye size={16} />
                                            </button>

                                            <div className="w-px h-4 bg-gray-200 dark:bg-slate-700 mx-1"></div>

                                            <button
                                                className="p-1.5 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700 hover:text-gray-900 dark:hover:text-white rounded-lg transition-colors"
                                                title="下载源文件"
                                                onClick={(e) => handleAction(e, 'download', item)}
                                            >
                                                <Download size={16} />
                                            </button>
                                            <button
                                                className="p-1.5 text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500 rounded-lg transition-colors"
                                                title="删除"
                                                onClick={(e) => handleAction(e, 'delete', item)}
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="flex flex-col items-center justify-center p-12 text-gray-400 dark:text-slate-600">
                                    <FolderOpen size={48} className="mb-4 opacity-20" />
                                    <p>该知识空间暂无文档</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Create Space Modal */}
            {isCreateModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-md p-6 transform transition-all scale-100 border border-gray-100 dark:border-slate-800">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">新建知识空间</h2>
                            <button
                                onClick={() => setIsCreateModalOpen(false)}
                                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    空间名称 <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:border-[#4285F4] focus:ring-2 focus:ring-blue-50 dark:focus:ring-blue-900/20 outline-none transition-all"
                                    placeholder="例如：市场调研资料"
                                    value={newSpaceName}
                                    onChange={(e) => setNewSpaceName(e.target.value)}
                                    autoFocus
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    简介 (选填)
                                </label>
                                <textarea
                                    className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:border-[#4285F4] focus:ring-2 focus:ring-blue-50 dark:focus:ring-blue-900/20 outline-none transition-all h-24 resize-none"
                                    placeholder="描述该空间的主要用途..."
                                    value={newSpaceDesc}
                                    onChange={(e) => setNewSpaceDesc(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 mt-8">
                            <button
                                onClick={() => setIsCreateModalOpen(false)}
                                className="px-5 py-2.5 rounded-xl text-gray-600 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
                            >
                                取消
                            </button>
                            <button
                                onClick={handleCreateSpace}
                                disabled={!newSpaceName.trim()}
                                className="px-5 py-2.5 rounded-xl bg-[#4285F4] text-white font-medium hover:bg-[#3367D6] transition-colors shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                创建
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Upload Document Modal */}
            {isUploadModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl w-full max-w-3xl p-8 transform transition-all scale-100 relative overflow-hidden border border-gray-100 dark:border-slate-800">
                        {/* Close Button */}
                        <button
                            onClick={() => setIsUploadModalOpen(false)}
                            className="absolute right-6 top-6 p-2 text-gray-400 hover:text-gray-600 text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                        >
                            <X size={24} />
                        </button>

                        <div className="mb-8">
                            <h2 className="text-2xl font-normal text-gray-900 dark:text-white mb-4">添加来源</h2>
                            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed max-w-2xl">
                                添加来源后，HoloAI 能够基于这些对您最重要的信息提供回答。<br />
                                <span className="text-gray-400 dark:text-gray-500 text-xs mt-1 block">(示例：营销方案、课程阅读材料、研究笔记、会议转写内容、销售文档等)</span>
                            </p>
                        </div>

                        {/* Drop Zone */}
                        <div className="border-2 border-dashed border-gray-200 dark:border-slate-700 rounded-2xl h-64 flex flex-col items-center justify-center bg-gray-50/50 dark:bg-slate-800/30 hover:bg-blue-50/30 dark:hover:bg-blue-900/10 hover:border-blue-200 dark:hover:border-blue-900/30 transition-all cursor-pointer group">
                            <div className="h-16 w-16 bg-blue-100/50 dark:bg-blue-900/30 text-[#4285F4] rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <UploadCloud size={32} />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">上传来源</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">拖放或<span className="text-[#4285F4] font-medium mx-1">选择文件</span>，即可上传</p>
                        </div>

                        {/* Footer Info */}
                        <div className="mt-6 text-center">
                            <p className="text-xs text-gray-400 dark:text-gray-500">
                                支持的文件类型: PDF, .txt, Markdown, 音频 (例如 mp3) , .docx, .avif, .bmp, .gif, .ico, .jp2, .png, .webp, .tif, .tiff, .heic, .heif, .jpeg, .jpg, .jpe
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </ViewContainer>
    );
};

export default SourcesView;
