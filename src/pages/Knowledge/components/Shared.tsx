import React from 'react';
import {
    FileText,
    Youtube,
    Image as ImageIcon,
    Link as LinkIcon,
    Folder,
    CheckCircle2,
    Clock,
    Loader2,
    AlertTriangle,
    BrainCircuit,
    ShieldAlert,
    Merge,
    Info,
    MoreVertical
} from 'lucide-react';
import { KnowledgeItem } from '../types';

export const HoloTooltip = ({ text, children }: { text: string; children: React.ReactNode }) => {
    return (
        <div className="group relative flex items-center">
            {children}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-gray-800 text-white text-xs rounded-lg opacity-0 lg:group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50 shadow-md">
                {text}
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
            </div>
        </div>
    );
};

export const StatusBadge = ({ status, verification }: { status: KnowledgeItem['status']; verification?: string }) => {
    const styles = {
        '已分析': 'bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800',
        '待分析': 'bg-gray-100 text-gray-600 border-gray-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700',
        '分析中': 'bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800',
        '待确认': 'bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800'
    };

    const icons = {
        '已分析': <CheckCircle2 size={12} className="mr-1" />,
        '待分析': <Clock size={12} className="mr-1" />,
        '分析中': <Loader2 size={12} className="mr-1 animate-spin" />,
        '待确认': <AlertTriangle size={12} className="mr-1" />
    };

    return (
        <HoloTooltip text={verification || '状态详情'}>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border cursor-help transition-colors ${styles[status]}`}>
                {icons[status]}
                {status}
            </span>
        </HoloTooltip>
    );
};

export const FileIcon = ({ type }: { type: KnowledgeItem['type'] }) => {
    switch (type) {
        case 'article': return <div className="p-2 bg-blue-100/50 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400"><FileText size={20} /></div>;
        case 'video': return <div className="p-2 bg-red-100/50 dark:bg-red-900/30 rounded-lg text-red-600 dark:text-red-400"><Youtube size={20} /></div>;
        case 'image': return <div className="p-2 bg-purple-100/50 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-400"><ImageIcon size={20} /></div>;
        case 'url': return <div className="p-2 bg-emerald-100/50 dark:bg-emerald-900/30 rounded-lg text-emerald-600 dark:text-emerald-400"><LinkIcon size={20} /></div>;
        case 'pdf': return <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded-lg text-red-600 dark:text-red-400"><FileText size={20} /></div>;
        default: return <Folder size={20} className="text-gray-400 dark:text-slate-500" />;
    }
};

export const StagingActionCard = ({ item }: { item: KnowledgeItem }) => {
    if (item.ragStage === 'ingesting') {
        return (
            <div className="mt-3 bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-lg p-3">
                <div className="flex justify-between text-xs text-blue-700 dark:text-blue-300 font-medium mb-1.5">
                    <span>RAG 向量化处理中...</span>
                    <span>{item.ingestProgress}%</span>
                </div>
                <div className="h-1.5 bg-blue-100 dark:bg-blue-900/50 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 dark:bg-blue-400 rounded-full transition-all duration-1000" style={{ width: `${item.ingestProgress}%` }}></div>
                </div>
                <div className="flex justify-between items-center mt-2">
                    <span className="text-[10px] text-blue-400 dark:text-blue-500">正在进行文本分块与嵌入</span>
                    <button className="text-[10px] text-gray-400 hover:text-red-500 transition-colors">取消</button>
                </div>
            </div>
        );
    }

    if (item.ragStage === 'review') {
        let content, actions;

        switch (item.reviewType) {
            case 'tag_confirm':
                content = (
                    <div className="flex items-start gap-2 text-xs text-gray-600 dark:text-slate-300">
                        <BrainCircuit size={14} className="text-purple-500 dark:text-purple-400 mt-0.5 shrink-0" />
                        <p>AI 建议添加标签: <span className="font-semibold text-gray-800 dark:text-white">{item.aiSuggestion?.split(': ')[1]}</span></p>
                    </div>
                );
                actions = (
                    <>
                        <button className="px-3 py-1.5 bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-700 dark:text-slate-300 rounded-lg text-xs font-medium transition-colors">修改</button>
                        <button className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-medium transition-colors shadow-sm">确认添加</button>
                    </>
                );
                break;
            case 'sensitive_check':
                content = (
                    <div className="flex items-start gap-2 text-xs text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/10 p-2 rounded-lg border border-amber-100 dark:border-amber-900/30">
                        <ShieldAlert size={14} className="mt-0.5 shrink-0" />
                        <p>隐私提醒：包含敏感数据。确认要导入 AI 大脑吗？</p>
                    </div>
                );
                actions = (
                    <>
                        <button className="px-3 py-1.5 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-300 rounded-lg text-xs font-medium hover:bg-gray-50 dark:hover:bg-slate-700">仅本地存储</button>
                        <button className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-medium shadow-sm">确认导入</button>
                    </>
                );
                break;
            case 'duplicate_check':
                content = (
                    <div className="flex flex-col gap-2">
                        <div className="flex items-start gap-2 text-xs text-gray-600 dark:text-slate-300">
                            <Merge size={14} className="text-blue-500 dark:text-blue-400 mt-0.5 shrink-0" />
                            <p>发现重复内容: <span className="font-medium text-gray-800 dark:text-white">{item.similarItem}</span></p>
                        </div>
                    </div>
                );
                actions = (
                    <>
                        <button className="px-3 py-1.5 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-300 rounded-lg text-xs font-medium hover:text-red-600 hover:border-red-200 dark:hover:text-red-400">删除副本</button>
                        <button className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-medium shadow-sm">覆盖旧版</button>
                    </>
                );
                break;
        }

        return (
            <div className="mt-3 pt-3 border-t border-gray-100 dark:border-slate-800 flex flex-col gap-3">
                {content}
                <div className="flex justify-end gap-2">
                    {actions}
                </div>
            </div>
        );
    }

    return null;
};

export const ContentCard = ({ item }: { item: KnowledgeItem }) => (
    <div className="group relative bg-white dark:bg-slate-900 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 border border-transparent dark:border-slate-800 hover:border-gray-200 dark:hover:border-slate-700 flex flex-col gap-3">
        {/* Floating Actions (Ghost Buttons) */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
            <button className="p-1.5 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-white transition-colors" title="查看详情">
                <Info size={16} />
            </button>
            <button className="p-1.5 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-white transition-colors" title="更多选项">
                <MoreVertical size={16} />
            </button>
        </div>

        <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
                <FileIcon type={item.type} />
                <div>
                    <h3 className="font-bold text-gray-900 dark:text-white line-clamp-1 text-[15px]">{item.title}</h3>
                    <p className="text-xs text-gray-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                        {item.source}
                        <span className="size-0.5 rounded-full bg-gray-300 dark:bg-slate-600 mx-1"></span>
                        {item.date}
                    </p>
                </div>
            </div>
        </div>

        <div className="bg-gray-50 dark:bg-slate-800/50 rounded-lg p-3">
            <p className="text-xs text-gray-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                {item.summary}
            </p>
        </div>

        <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2">
                {item.tags.map(tag => (
                    <span key={tag.name} className="size-2 rounded-full ring-2 ring-white dark:ring-slate-900" style={{ backgroundColor: tag.color }} title={tag.name}></span>
                ))}
            </div>
            {(item.ragStage === 'ready' || !item.ragStage) && (
                <StatusBadge status={item.status} verification={item.verification} />
            )}
        </div>

        <StagingActionCard item={item} />
    </div>
);

export const ViewContainer = ({ title, children, action }: { title: string; children: React.ReactNode; action?: React.ReactNode }) => (
    <div className="flex flex-col h-full bg-[#F8F9FA] dark:bg-slate-950 transition-colors duration-300">
        <div className="px-8 py-6 flex justify-between items-center sticky top-0 bg-[#F8F9FA]/90 dark:bg-slate-950/90 backdrop-blur-sm z-20">
            <h1 className="text-2xl font-bold text-[#202124] dark:text-white tracking-tight">{title}</h1>
            {action}
        </div>
        <div className="flex-1 overflow-y-auto px-8 pb-8 scrollbar-hide">
            {children}
        </div>
    </div>
);
