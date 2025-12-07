import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, MessageSquare, Star, Info, CheckCircle } from 'lucide-react';

interface Notification {
    id: string;
    type: 'reply' | 'star' | 'system' | 'success';
    content: string;
    time: string;
    isRead: boolean;
}

const mockNotifications: Notification[] = [
    { id: '1', type: 'reply', content: 'Alice 回复了你的文章 "Web3 思考"', time: '5分钟前', isRead: false },
    { id: '2', type: 'star', content: 'Bob 收藏了你的 "React 技巧" 指南', time: '1小时前', isRead: false },
    { id: '3', type: 'system', content: '系统计划于今晚进行维护', time: '3小时前', isRead: true },
    { id: '4', type: 'success', content: '你的数据导出已准备就绪', time: '1天前', isRead: true },
];

const NotificationDropdown: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="absolute right-0 top-10 w-60 bg-white dark:bg-gray-900 rounded-lg shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden z-50 animate-in fade-in slide-in-from-top-1">
            <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50/50 dark:bg-gray-900/50">
                <h3 className="font-semibold text-sm text-gray-900 dark:text-white">消息通知</h3>
            </div>
            <div className="max-h-[160px] overflow-y-auto">
                {mockNotifications.map(notification => (
                    <div key={notification.id} className={`px-2.5 py-1.5 flex gap-2 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors border-b border-gray-50 dark:border-gray-800/50 last:border-0 ${!notification.isRead ? 'bg-blue-50/30 dark:bg-blue-900/10' : ''}`}>
                        <div className={`mt-0.5 size-5 rounded-full flex items-center justify-center shrink-0 ${notification.type === 'reply' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' :
                            notification.type === 'star' ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400' :
                                notification.type === 'success' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' :
                                    'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400'
                            }`}>
                            {notification.type === 'reply' && <MessageSquare size={10} />}
                            {notification.type === 'star' && <Star size={10} />}
                            {notification.type === 'success' && <CheckCircle size={10} />}
                            {notification.type === 'system' && <Info size={10} />}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-[11px] text-gray-700 dark:text-gray-200 leading-tight line-clamp-2">{notification.content}</p>
                            <span className="text-[9px] text-gray-400 mt-0.5 block">{notification.time}</span>
                        </div>
                        {!notification.isRead && (
                            <div className="mt-1 text-blue-500"><div className="size-1 rounded-full bg-current"></div></div>
                        )}
                    </div>
                ))}
            </div>
            <div className="p-1 border-t border-gray-100 dark:border-gray-800 text-center">
                <button
                    onClick={() => navigate('/platform/settings/notifications')}
                    className="w-full py-1.5 text-[10px] font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-800 rounded transition-colors"
                >
                    查看全部
                </button>
            </div>
        </div>
    );
};

export default NotificationDropdown;
