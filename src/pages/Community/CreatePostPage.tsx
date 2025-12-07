import React, { useState, useRef } from 'react';
import { PenTool, Save, Send, PanelLeftClose, PanelLeftOpen, Plus } from 'lucide-react';
import EditorToolbar from './components/EditorToolbar.tsx';
import ResourceSidebar, { Draft } from './components/ResourceSidebar.tsx';
import { UserProvider, useUser } from '../../context/UserContext.tsx';

// Mock Initial Drafts
const initialDrafts: Draft[] = [
    { id: 'd1', userId: 'user_a', title: 'User A: Web3 Thoughts', date: '10 mins ago', content: '# Web3\n\nMy thoughts on Web3 social networks...' },
    { id: 'd2', userId: 'user_a', title: 'User A: Q2 Plans', date: '2 hours ago', content: '# Q2 Targets\n\n1. Increase user base\n2. Launch feature X' },
    { id: 'd3', userId: 'user_b', title: 'User B: Project X', date: 'Yesterday', content: '# Project X\n\nThis is confidential content.' },
];

const CreatePostContent: React.FC = () => {
    const { currentUser } = useUser();

    // State
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState<string[]>([]);
    const [activeTab, setActiveTab] = useState<'EDIT' | 'PREVIEW'>('EDIT');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    // Drafts State
    const [allDrafts, setAllDrafts] = useState<Draft[]>(initialDrafts);

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Derived State
    const userDrafts = allDrafts.filter(d => d.userId === currentUser.id);

    const handleTagClick = (tag: string) => {
        if (tags.includes(tag)) {
            setTags(tags.filter(t => t !== tag));
        } else {
            setTags([...tags, tag]);
        }
    };

    const insertText = (prefix: string, suffix: string = '') => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const text = textarea.value;
        const selectedText = text.substring(start, end);

        const newText = text.substring(0, start) + prefix + selectedText + suffix + text.substring(end);
        setContent(newText);

        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(start + prefix.length, end + prefix.length);
        }, 0);
    };

    const handleLoadContent = (item: { title: string, content: string }) => {
        if (content.length > 10) {
            if (!confirm('加载文档将覆盖当前内容，确定吗？')) {
                return;
            }
        }
        setTitle(item.title);
        setContent(item.content);
    };

    const handleSaveDraft = () => {
        if (!title.trim()) {
            alert('标题不能为空');
            return;
        }

        const newDraft: Draft = {
            id: Date.now().toString(),
            userId: currentUser.id,
            title: title || '未命名草稿',
            date: '刚刚',
            content: content
        };

        setAllDrafts([newDraft, ...allDrafts]);
    };

    const handleNewPost = () => {
        if ((title || content) && !confirm('新建文档将清空当前内容，确定吗？')) {
            return;
        }
        setTitle('');
        setContent('');
        setTags([]);
    };

    return (
        <div className="h-full bg-white dark:bg-slate-950 flex flex-col transition-colors duration-300">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-500 transition-colors hidden md:block"
                        title={isSidebarOpen ? "收起侧边栏" : "展开侧边栏"}
                    >
                        {isSidebarOpen ? <PanelLeftClose size={20} /> : <PanelLeftOpen size={20} />}
                    </button>
                    <div>
                        <h1 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            <PenTool className="text-indigo-600 dark:text-indigo-400" /> 全息创作
                        </h1>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Markdown 编辑器 • 个人工作台</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={handleNewPost}
                        className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-2"
                    >
                        <Plus size={16} /> 新建
                    </button>
                    <button
                        onClick={handleSaveDraft}
                        className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-2"
                    >
                        <Save size={16} /> 存草稿
                    </button>
                    <button onClick={() => alert('发布成功！')} className="px-4 py-2 rounded-lg text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors flex items-center gap-2 shadow-sm">
                        <Send size={16} /> 发布
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex overflow-hidden">

                {/* Left Resource Sidebar */}
                {isSidebarOpen && (
                    <div className="hidden md:block transition-all duration-300 animate-in slide-in-from-left-4">
                        <ResourceSidebar
                            drafts={userDrafts}
                            onLoadContent={handleLoadContent}
                        />
                    </div>
                )}

                {/* Editor & Preview Area */}
                <div className="flex-1 flex flex-col lg:flex-row overflow-hidden min-w-0">

                    {/* Editor Side */}
                    <div className={`flex-1 flex flex-col border-r border-gray-200 dark:border-slate-800 ${activeTab === 'PREVIEW' ? 'hidden lg:flex' : 'flex'}`}>
                        <EditorToolbar onInsert={insertText} />

                        <div className="p-6 flex-1 overflow-y-auto">
                            <input
                                type="text"
                                className="w-full text-2xl font-bold bg-transparent border-none focus:outline-none placeholder-gray-300 dark:placeholder-slate-700 text-gray-900 dark:text-white mb-6"
                                placeholder="输入文章标题..."
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <textarea
                                ref={textareaRef}
                                className="w-full h-[calc(100%-80px)] resize-none bg-transparent border-none focus:outline-none text-base leading-relaxed text-gray-700 dark:text-gray-300 font-mono"
                                placeholder="# 开始你的创作..."
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Preview Side */}
                    <div className={`flex-1 bg-gray-50 dark:bg-slate-900/50 flex flex-col ${activeTab === 'EDIT' ? 'hidden lg:flex' : 'flex'}`}>
                        <div className="p-3 border-b border-gray-100 dark:border-slate-800 flex justify-end lg:hidden">
                            <button onClick={() => setActiveTab('EDIT')} className="text-sm text-indigo-600 font-medium">返回编辑</button>
                        </div>
                        <div className="p-8 flex-1 overflow-y-auto prose dark:prose-invert max-w-none">
                            {title && <h1>{title}</h1>}
                            {content ? (
                                <div className="whitespace-pre-wrap">{content}</div>
                            ) : (
                                <div className="text-gray-400 dark:text-gray-600 italic">预览区域</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Tags */}
            <div className="px-6 py-4 border-t border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-950 z-10">
                <div className="flex gap-2 flex-wrap">
                    {['#深度思考', '#产品观察', '#技术分享', '#生活感悟', '#投资笔记'].map(tag => (
                        <button
                            key={tag}
                            onClick={() => handleTagClick(tag)}
                            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors border ${tags.includes(tag) ? 'bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800' : 'bg-gray-50 dark:bg-slate-900 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-slate-800 hover:border-gray-300 dark:hover:border-slate-700'}`}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

const CreatePostPage: React.FC = () => {
    return (
        <UserProvider>
            <CreatePostContent />
        </UserProvider>
    );
};

export default CreatePostPage;
