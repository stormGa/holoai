import React from 'react';
import { Video, FileText, MessageSquare, MapPin, Users, Clock, Play, MoreHorizontal } from 'lucide-react';
import { MemoryEvent } from '../../../services/memoryService';

interface EventCardProps {
    event: MemoryEvent;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
    const getIcon = () => {
        switch (event.type) {
            case 'video': return <Video size={18} className="text-white" />;
            case 'doc': return <FileText size={18} className="text-white" />;
            case 'chat': return <MessageSquare size={18} className="text-white" />;
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
        <div className="flex gap-6 group">
            {/* Timeline Indicator */}
            <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg z-10 ${getBgColor()}`}>
                    {getIcon()}
                </div>
                <div className="w-0.5 flex-1 bg-gray-200 dark:bg-slate-800 my-2 group-last:hidden"></div>
            </div>

            {/* Card Content */}
            <div className="flex-1 pb-8">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                        {new Date(event.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <button className="text-gray-400 hover:text-gray-600 dark:text-slate-600 dark:hover:text-slate-400">
                        <MoreHorizontal size={16} />
                    </button>
                </div>

                <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 group-hover:text-primary-600 transition-colors">
                                {event.title}
                            </h3>
                            <div className="flex flex-wrap gap-2 text-xs">
                                {event.tags.map(tag => (
                                    <span key={tag} className="px-2 py-0.5 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-slate-700">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                        {event.type === 'video' && (
                            <div className="relative group/thumb cursor-pointer overflow-hidden rounded-lg w-24 h-16 bg-gray-200 dark:bg-slate-800 flex-shrink-0">
                                {/* Placeholder for thumbnail */}
                                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover/thumb:bg-black/40 transition-colors">
                                    <Play size={20} className="text-white fill-white opacity-80" />
                                </div>
                            </div>
                        )}
                    </div>

                    <p className="text-gray-600 dark:text-slate-300 text-sm leading-relaxed mb-4">
                        {event.summary}
                    </p>

                    {/* Metadata Footer */}
                    <div className="flex items-center gap-4 text-xs text-gray-400 dark:text-slate-500 pt-3 border-t border-gray-100 dark:border-slate-800/50">
                        {event.type === 'video' && event.metadata.duration && (
                            <div className="flex items-center gap-1.5">
                                <Clock size={14} />
                                <span>{event.metadata.duration}</span>
                            </div>
                        )}
                        {event.type === 'video' && event.metadata.location && (
                            <div className="flex items-center gap-1.5">
                                <MapPin size={14} />
                                <span>{event.metadata.location}</span>
                            </div>
                        )}
                        {event.type === 'video' && event.metadata.people && event.metadata.people.length > 0 && (
                            <div className="flex items-center gap-1.5">
                                <Users size={14} />
                                <span>{event.metadata.people.join(', ')}</span>
                            </div>
                        )}
                        {event.metadata.description && (
                            <span className="italic opacity-70 ml-auto">{event.metadata.description}</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
