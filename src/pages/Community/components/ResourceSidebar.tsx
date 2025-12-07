import React, { useState } from 'react';
import { FileText, CheckCircle, Clock } from 'lucide-react';
import { useUser } from '../../../context/UserContext.tsx';

// Shared Types
export interface Draft {
    id: string;
    userId: string;
    title: string;
    date: string;
    content: string;
}

export interface PublishedPost {
    id: string;
    userId: string;
    title: string;
    date: string;
    views: number;
    content: string;
}

interface ResourceSidebarProps {
    drafts: Draft[];
    onLoadContent: (item: { title: string, content: string }) => void;
}

// Mock Published Data (Keep this here for now as it's read-only)
const initialPublished: PublishedPost[] = [
    { id: 'p1', userId: 'user_a', title: 'Getting Started with Holo', date: '2 days ago', views: 1240, content: '# Getting Started\n\nWelcome to Holo! Here is how you can...' },
    { id: 'p2', userId: 'user_a', title: 'React Performance Tips', date: '1 week ago', views: 856, content: '# React Performance\n\nUse useMemo and useCallback effectively...' },
    { id: 'p3', userId: 'user_b', title: 'My First Post', date: '3 days ago', views: 45, content: '# Hello World\n\nThis is my first post on Holo.' },
];

const ResourceSidebar: React.FC<ResourceSidebarProps> = ({ drafts, onLoadContent }) => {
    const { currentUser } = useUser();
    const [activeTab, setActiveTab] = useState<'DRAFTS' | 'PUBLISHED'>('DRAFTS');

    // Filter Published by Current User (Drafts are already filtered by parent)
    const userPublished = initialPublished.filter(p => p.userId === currentUser.id);

    return (
        <div className="w-80 border-r border-gray-200 dark:border-slate-800 flex flex-col bg-gray-50/50 dark:bg-slate-900/50 h-full">
            {/* Tabs */}
            <div className="flex border-b border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <button
                    onClick={() => setActiveTab('DRAFTS')}
                    className={`flex-1 py-3 text-sm font-medium flex items-center justify-center gap-2 border-b-2 transition-colors ${activeTab === 'DRAFTS' ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400'}`}
                >
                    <FileText size={16} /> 草稿箱
                </button>
                <button
                    onClick={() => setActiveTab('PUBLISHED')}
                    className={`flex-1 py-3 text-sm font-medium flex items-center justify-center gap-2 border-b-2 transition-colors ${activeTab === 'PUBLISHED' ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400'}`}
                >
                    <CheckCircle size={16} /> 已发布
                </button>
            </div>

            {/* List Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {activeTab === 'DRAFTS' ? (
                    <>
                        {drafts.length === 0 ? (
                            <div className="text-center py-8 text-gray-400 text-sm">暂无草稿</div>
                        ) : (
                            drafts.map(draft => (
                                <div
                                    key={draft.id}
                                    onClick={() => onLoadContent(draft)}
                                    className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700 cursor-pointer group transition-all shadow-sm hover:shadow-md"
                                >
                                    <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-1 group-hover:text-indigo-600 transition-colors line-clamp-1">{draft.title || '未命名草稿'}</h4>
                                    <div className="flex items-center gap-1.5 text-xs text-gray-400">
                                        <Clock size={12} /> {draft.date}
                                    </div>
                                </div>
                            ))
                        )}
                    </>
                ) : (
                    <>
                        {userPublished.length === 0 ? (
                            <div className="text-center py-8 text-gray-400 text-sm">暂无已发布内容</div>
                        ) : (
                            userPublished.map(post => (
                                <div
                                    key={post.id}
                                    onClick={() => onLoadContent(post)}
                                    className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700 cursor-pointer group transition-all shadow-sm hover:shadow-md"
                                >
                                    <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-1 group-hover:text-indigo-600 transition-colors line-clamp-1">{post.title}</h4>
                                    <div className="flex items-center justify-between text-xs text-gray-400">
                                        <span>{post.date}</span>
                                        <span className="flex items-center gap-1"><CheckCircle size={10} className="text-green-500" /> {post.views} 阅读</span>
                                    </div>
                                </div>
                            ))
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default ResourceSidebar;
