// ... (imports)
import React, { useState, useRef, useEffect } from 'react';
import { Video, FileText, MessageSquare, MapPin, Users, Clock, Play, MoreHorizontal, Eye, Edit2, Trash2 } from 'lucide-react';
import { MemoryEvent } from '../../../services/memoryService.ts';

interface EventCardProps {
    event: MemoryEvent;
    onAction: (action: 'view' | 'edit' | 'delete', event: MemoryEvent) => void;
}

export const CompactEventCard: React.FC<EventCardProps> = ({ event, onAction }) => {
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setShowMenu(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const getIcon = () => {
        switch (event.type) {
            case 'video': return <Video size={14} className="text-white" />;
            case 'doc': return <FileText size={14} className="text-white" />;
            case 'chat': return <MessageSquare size={14} className="text-white" />;
        }
    };

    const getBgColor = () => {
        switch (event.type) {
            case 'video': return 'bg-rose-500';
            case 'doc': return 'bg-blue-500';
            case 'chat': return 'bg-emerald-500';
        }
    };

    return (
        <div className="flex gap-4 group mb-3 relative">
            {/* Timeline Indicator (Smaller) */}
            <div className="flex flex-col items-center pt-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md z-10 ${getBgColor()}`}>
                    {getIcon()}
                </div>
                <div className="w-0.5 flex-1 bg-gray-200 dark:bg-slate-800 my-1 group-last:hidden"></div>
            </div>

            {/* Compact Card Content */}
            <div className="flex-1 min-w-0">
                <div
                    onClick={() => onAction('view', event)}
                    className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow flex gap-4 relative group/card cursor-pointer"
                >
                    {/* Visual Thumbnail for Video (Left Side) - Mock */}
                    {event.type === 'video' && (
                        <div className="relative group/thumb overflow-hidden rounded-lg w-20 h-20 bg-gray-200 dark:bg-slate-800 flex-shrink-0 self-center">
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover/thumb:bg-black/40 transition-colors">
                                <Play size={16} className="text-white fill-white opacity-80" />
                            </div>
                        </div>
                    )}

                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                            <div className="flex flex-wrap gap-2 text-[10px]">
                                {event.tags.map(tag => (
                                    <span key={tag} className="px-1.5 py-0.5 rounded text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-800">
                                        #{tag}
                                    </span>
                                ))}
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-400 font-medium">
                                    {new Date(event.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>

                                {/* More Options Button - Hide for Video/Audio as they are immutable */}
                                {event.type !== 'video' && (
                                    <div className="relative" ref={menuRef} onClick={e => e.stopPropagation()}>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); setShowMenu(!showMenu); }}
                                            className={`p-1 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800 transition-all ${showMenu ? 'opacity-100' : 'opacity-0 group-hover/card:opacity-100'}`}
                                        >
                                            <MoreHorizontal size={16} />
                                        </button>

                                        {/* Dropdown Menu */}
                                        {showMenu && (
                                            <div className="absolute right-0 top-full mt-1 w-32 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg shadow-xl z-20 py-1 animate-in fade-in zoom-in-95 duration-100">
                                                <button
                                                    onClick={() => { onAction('edit', event); setShowMenu(false); }}
                                                    className="w-full text-left px-3 py-2 text-xs text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700 flex items-center gap-2"
                                                >
                                                    <Edit2 size={12} /> 编辑记忆
                                                </button>

                                                <div className="h-px bg-gray-100 dark:bg-slate-700 my-1"></div>
                                                <button
                                                    onClick={() => { onAction('delete', event); setShowMenu(false); }}
                                                    className="w-full text-left px-3 py-2 text-xs text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 flex items-center gap-2"
                                                >
                                                    <Trash2 size={12} /> 删除
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        <h3 className="text-base font-bold text-gray-900 dark:text-white truncate mb-1 pr-8">
                            {event.title}
                        </h3>

                        <p className="text-xs text-gray-500 dark:text-slate-400 line-clamp-2 leading-relaxed mb-2">
                            {event.summary}
                        </p>

                        {/* Metadata Row */}
                        <div className="flex items-center gap-3 text-[10px] text-gray-400 dark:text-slate-500">
                            {event.type === 'video' && event.metadata.duration && (
                                <span className="flex items-center gap-1"><Clock size={10} /> {event.metadata.duration}</span>
                            )}
                            {event.type === 'video' && event.metadata.people && event.metadata.people.length > 0 && (
                                <div className="flex items-center -space-x-1.5 ml-1">
                                    {event.metadata.people.slice(0, 3).map((p, i) => (
                                        <img
                                            key={i}
                                            src={p.avatar}
                                            alt={p.name}
                                            title={p.name}
                                            className="w-4 h-4 rounded-full border border-white dark:border-slate-900 ring-1 ring-gray-100 dark:ring-slate-800 object-cover"
                                        />
                                    ))}
                                    {event.metadata.people.length > 3 && (
                                        <div className="w-4 h-4 rounded-full bg-gray-100 dark:bg-slate-800 border border-white dark:border-slate-900 flex items-center justify-center text-[8px] font-medium text-gray-500">
                                            +{event.metadata.people.length - 3}
                                        </div>
                                    )}
                                </div>
                            )}
                            {event.metadata.description && (
                                <span className="ml-auto opacity-70 truncate max-w-[120px]">{event.metadata.description}</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
