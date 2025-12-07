import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, MapPin, Users, Hash, AlertCircle, FileText, Play, Music, FileSpreadsheet, File as FileIcon } from 'lucide-react';
import { MemoryEvent } from '../../../services/memoryService.ts';

interface MemoryActionModalProps {
    isOpen: boolean;
    onClose: () => void;
    mode: 'view' | 'edit';
    memory: MemoryEvent | null;
    onSave: (id: string, updates: Partial<MemoryEvent>) => void;
    onDelete: (id: string) => void;
}

export const MemoryActionModal: React.FC<MemoryActionModalProps> = ({ isOpen, onClose, mode, memory, onSave, onDelete }) => {
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [tags, setTags] = useState('');

    useEffect(() => {
        if (memory) {
            setTitle(memory.title);
            setSummary(memory.summary);
            setTags(memory.tags.join(', '));
        }
    }, [memory]);

    if (!isOpen || !memory) return null;

    const isVideoOrAudio = memory.type === 'video';
    const isEditing = mode === 'edit';

    const handleSave = () => {
        if (!memory) return;
        onSave(memory.id, {
            title,
            summary,
            tags: tags.split(',').map(t => t.trim()).filter(Boolean)

        });
        onClose();
    };

    const renderPreview = () => {
        if (!memory) return null;

        // Video Viewer
        if (memory.type === 'video') {
            return (
                <div className="w-full h-full min-h-[400px] bg-black rounded-xl flex items-center justify-center relative overflow-hidden group mb-4 lg:mb-0 shadow-inner">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                    <Play size={64} className="text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all cursor-pointer z-10" />
                    <div className="absolute bottom-4 left-4 right-4 text-white z-10">
                        <div className="w-full bg-white/20 h-1 rounded-full mb-2 cursor-pointer hover:h-1.5 transition-all">
                            <div className="w-1/3 h-full bg-rose-500 rounded-full"></div>
                        </div>
                        <div className="flex justify-between text-xs font-medium">
                            <span>04:20</span>
                            <span>{memory.metadata.duration || '10:00'}</span>
                        </div>
                    </div>
                </div>
            );
        }

        // Generic File Viewer (PDF, Word, Excel, etc.)
        const isDoc = memory.type === 'doc';
        const fileType = memory.metadata.fileType?.toLowerCase() || '';

        // Treat chat as document for now or separate? Chat usually viewed as text list.
        // If type is 'doc' or has file extension.
        if (isDoc || fileType === 'pdf' || fileType === 'doc' || fileType === 'xls' || fileType === 'xlsx' || fileType === 'docx') {
            const getFileIcon = () => {
                if (fileType.includes('pdf')) return <FileText size={48} className="text-rose-500" />;
                if (fileType.includes('xls') || fileType.includes('sheet')) return <FileSpreadsheet size={48} className="text-emerald-500" />;
                return <FileIcon size={48} className="text-blue-500" />;
            };

            return (
                <div className="w-full h-full min-h-[400px] bg-gray-100 dark:bg-slate-800 rounded-xl flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-slate-700 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        {getFileIcon()}
                    </div>
                    {getFileIcon()}
                    <p className="mt-4 text-sm font-medium text-gray-900 dark:text-white">{memory.title}</p>
                    <p className="text-xs text-gray-500 dark:text-slate-400 mt-1 uppercase">
                        {fileType || 'DOCUMENT'} PREVIEW
                    </p>
                    <div className="mt-8 w-64 space-y-3 opacity-40">
                        <div className="h-2 bg-gray-400 dark:bg-slate-600 rounded w-full"></div>
                        <div className="h-2 bg-gray-400 dark:bg-slate-600 rounded w-5/6"></div>
                        <div className="h-2 bg-gray-400 dark:bg-slate-600 rounded w-full"></div>
                        <div className="h-2 bg-gray-400 dark:bg-slate-600 rounded w-4/5"></div>
                        <div className="h-2 bg-gray-400 dark:bg-slate-600 rounded w-full"></div>
                    </div>
                </div>
            );
        }

        // Audio Viewer (or default/Chat)
        // @ts-ignore
        if (memory.type === 'audio' || memory.type === 'chat') {
            return (
                <div className="w-full h-full min-h-[400px] bg-gradient-to-br from-indigo-50 dark:from-indigo-900/10 to-purple-50 dark:to-purple-900/10 rounded-xl flex flex-col items-center justify-center border border-indigo-100 dark:border-indigo-900/30">
                    <div className="w-20 h-20 rounded-full bg-white dark:bg-indigo-900/30 flex items-center justify-center mb-8 shadow-sm">
                        {memory.type === 'chat' ? <Users size={32} className="text-indigo-500" /> : <Music size={32} className="text-indigo-500" />}
                    </div>
                    <div className="flex items-end justify-center gap-1.5 h-16 mb-4">
                        {[40, 60, 30, 80, 50, 90, 40, 70, 30, 60, 40, 80, 50, 70, 40, 60].map((h, i) => (
                            <div key={i} className="w-1.5 bg-indigo-400/80 rounded-full animate-pulse" style={{ height: `${h}%`, animationDelay: `${i * 0.05}s` }}></div>
                        ))}
                    </div>
                    <p className="text-xs text-indigo-400 font-mono mt-4 tracking-widest uppercase opacity-70">
                        {memory.type === 'chat' ? 'Conversation Thread' : 'Audio Visualization'}
                    </p>
                </div>
            );
        }

        return null;
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className={`bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl w-full max-w-5xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden transition-all`}>
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-slate-800 flex-shrink-0 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm z-10">
                    <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${memory.type === 'video' ? 'bg-rose-100 text-rose-600 dark:bg-rose-900/30' : 'bg-blue-100 text-blue-600 dark:bg-blue-900/30'}`}>
                            {memory.type === 'video' ? <Play size={18} /> : (memory.type === 'chat' ? <Users size={18} /> : <FileText size={18} />)}
                        </div>
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                            {isEditing ? '编辑记忆' : '记忆详情'}
                        </h2>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-400 hover:text-gray-600 dark:hover:text-slate-300 transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {/* Content Body - Split View logic */}
                <div className="flex-1 overflow-hidden">
                    <div className="h-full flex flex-col lg:flex-row">

                        {/* LEFT PANEL (Info) - 35% width */}
                        <div className="w-full lg:w-[35%] border-b lg:border-b-0 lg:border-r border-gray-100 dark:border-slate-800 overflow-y-auto p-6 bg-gray-50/50 dark:bg-slate-950/30">
                            <div className="space-y-6">
                                {/* Read-only Info Banner for Video */}
                                {isEditing && isVideoOrAudio && (
                                    <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3 flex items-start gap-3">
                                        <AlertCircle className="text-amber-500 mt-0.5" size={16} />
                                        <div className="text-xs text-amber-700 dark:text-amber-400">
                                            <p className="font-bold mb-1">无法修改原始记录</p>
                                            <p>全息影音数据为原始采集内容，为保证记忆真实性，不支持修改核心内容。</p>
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-4">
                                    {/* Title */}
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider mb-1.5">标题</label>
                                        {isEditing && !isVideoOrAudio ? (
                                            <input
                                                type="text"
                                                value={title}
                                                onChange={e => setTitle(e.target.value)}
                                                className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                                            />
                                        ) : (
                                            <p className="text-base font-bold text-gray-900 dark:text-white leading-tight">{memory.title}</p>
                                        )}
                                    </div>

                                    {/* Summary */}
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider mb-1.5">摘要</label>
                                        {isEditing && !isVideoOrAudio ? (
                                            <textarea
                                                value={summary}
                                                onChange={e => setSummary(e.target.value)}
                                                rows={4}
                                                className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 resize-none"
                                            />
                                        ) : (
                                            <p className="text-sm text-gray-600 dark:text-slate-400 leading-relaxed bg-white dark:bg-slate-900/50 p-3 rounded-lg border border-gray-100 dark:border-slate-800">
                                                {memory.summary}
                                            </p>
                                        )}
                                    </div>

                                    <div className="h-px bg-gray-200 dark:bg-slate-800 my-2"></div>

                                    {/* Metadata Grid */}
                                    <div className="space-y-3">
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider mb-1.5">时间</label>
                                            <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-slate-300">
                                                <Calendar size={14} className="text-gray-400" />
                                                {new Date(memory.timestamp).toLocaleString('zh-CN')}
                                            </div>
                                        </div>

                                        {memory.metadata.location && (
                                            <div>
                                                <label className="block text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider mb-1.5">地点</label>
                                                <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-slate-300">
                                                    <MapPin size={14} className="text-gray-400" />
                                                    {memory.metadata.location}
                                                </div>
                                            </div>
                                        )}

                                        {memory.metadata.people && (
                                            <div>
                                                <label className="block text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider mb-1.5">相关人物</label>
                                                <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-slate-300 flex-wrap">
                                                    <Users size={14} className="text-gray-400" />
                                                    {memory.metadata.people.map(p => (
                                                        <span key={p.name} className="bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 px-1.5 py-0.5 rounded text-xs">{p.name}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Tags */}
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider mb-1.5">标签</label>
                                        {isEditing && !isVideoOrAudio ? (
                                            <input
                                                type="text"
                                                value={tags}
                                                onChange={e => setTags(e.target.value)}
                                                placeholder="以逗号分隔"
                                                className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                                            />
                                        ) : (
                                            <div className="flex flex-wrap gap-2">
                                                {memory.tags.map(tag => (
                                                    <span key={tag} className="flex items-center px-2 py-1 rounded bg-gray-200 dark:bg-slate-800 text-xs font-medium text-gray-700 dark:text-slate-400 transition-colors hover:bg-gray-300 dark:hover:bg-slate-700">
                                                        <Hash size={10} className="mr-1 opacity-50" />
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT PANEL (Preview) - 65% width */}
                        <div className="w-full lg:w-[65%] p-6 bg-white dark:bg-slate-900 lg:overflow-hidden h-full">
                            {renderPreview()}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 flex justify-end gap-3 flex-shrink-0">
                    {mode === 'edit' ? (
                        <>
                            <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-slate-400 hover:text-gray-800 dark:hover:text-slate-200 transition-colors">取消</button>
                            {!isVideoOrAudio && (
                                <button
                                    onClick={handleSave}
                                    className="px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white text-sm font-medium rounded-lg shadow-sm shadow-rose-500/20 transition-all"
                                >
                                    保存修改
                                </button>
                            )}
                        </>
                    ) : (
                        <button
                            onClick={onClose}
                            className="px-6 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-medium rounded-lg hover:shadow-lg transition-all"
                        >
                            关闭
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
