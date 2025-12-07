import React, { useState } from 'react';
import { Bell, Mail, MessageSquare, Megaphone, Clock, AlertTriangle, CheckCircle2, ChevronRight, Info } from 'lucide-react';

import client from '../../api/client.ts';
import { useUser } from '../../context/UserContext.tsx';

interface Notification {
    id: number;
    title: string;
    content: string;
    time: string; // or createdAt
    type: string;
    isRead: boolean;
}

const NotificationsPage: React.FC = () => {
    const { currentUser } = useUser();
    // Mock state for settings

    const [pushSettings, setPushSettings] = useState([true, true, false]);
    const [dndEnabled, setDndEnabled] = useState(false);

    const togglePushSetting = (index: number) => {
        const newSettings = [...pushSettings];
        newSettings[index] = !newSettings[index];
        setPushSettings(newSettings);
    };


    // Real data state
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchNotifications = async () => {
        try {
            const res = await client.get('/notifications');
            // Transform data if needed, backend returns createdAt
            const data = res.data.map((n: any) => ({
                ...n,
                time: new Date(n.createdAt).toLocaleString() // Simple formatting
            }));
            setNotifications(data);
        } catch (error) {
            console.error("Failed to fetch notifications", error);
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    const handleMarkAllRead = async () => {
        try {
            await client.post('/notifications/clear');
            setNotifications([]);
        } catch (error) {
            console.error("Failed to clear notifications", error);
        }
    };

    const handleSimulate = async () => {
        try {
            setIsLoading(true);
            await client.post('/notifications/test-add', {
                title: "测试通知",
                content: "这是一条来自后端的测试通知。",
                type: "info"
            });
            await fetchNotifications();
        } catch (error) {
            console.error("Failed to simulate", error);
        } finally {
            setIsLoading(false);
        }
    };



    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'success': return <CheckCircle2 size={18} className="text-green-500" />;
            case 'warning': return <AlertTriangle size={18} className="text-amber-500" />;
            case 'error': return <AlertTriangle size={18} className="text-red-500" />;
            default: return <Info size={18} className="text-blue-500" />;
        }
    };

    return (
        <div className="p-8 bg-gray-50 dark:bg-slate-950 h-full overflow-y-auto transition-colors duration-300">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                        <Bell className="text-amber-500" /> 通知管理
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">选择您希望接收的消息类型和方式，查看历史消息</p>
                </div>

                <div className="space-y-6">
                    {/* Push Settings */}
                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-800 transition-colors">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">消息推送设置</h3>
                        <div className="space-y-6">
                            {[
                                { title: '系统公告', desc: '新功能发布、系统维护等重要通知', icon: Megaphone, color: 'text-blue-500 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/30' },
                                { title: '社区互动', desc: '收到点赞、评论或被提及时的通知', icon: MessageSquare, color: 'text-green-500 dark:text-green-400', bg: 'bg-green-50 dark:bg-green-900/30' },
                                { title: '邮件订阅', desc: '每周精选内容汇总与个性化推荐', icon: Mail, color: 'text-purple-500 dark:text-purple-400', bg: 'bg-purple-50 dark:bg-purple-900/30' }
                            ].map((item, i) => (
                                <div key={i} className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className={`p-3 rounded-xl ${item.bg} ${item.color}`}>
                                            <item.icon size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 dark:text-white">{item.title}</h4>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
                                        </div>
                                    </div>
                                    <div
                                        onClick={() => togglePushSetting(i)}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full cursor-pointer transition-colors duration-300 ${pushSettings[i] ? 'bg-amber-500' : 'bg-gray-200 dark:bg-slate-700'}`}
                                    >
                                        <span className={`${pushSettings[i] ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition duration-300`} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* DND Settings */}
                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-800 transition-colors">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">免打扰设置</h3>
                        <div className="flex items-center justify-between py-4 border-b border-gray-50 dark:border-slate-800">
                            <div>
                                <h4 className="font-medium text-gray-900 dark:text-white">勿扰模式</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400">在特定时间段内暂停所有非紧急通知</p>
                            </div>
                            <div
                                onClick={() => setDndEnabled(!dndEnabled)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full cursor-pointer transition-colors duration-300 ${dndEnabled ? 'bg-amber-500' : 'bg-gray-200 dark:bg-slate-700'}`}
                            >
                                <span className={`${dndEnabled ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition duration-300`} />
                            </div>
                        </div>
                    </div>

                    {/* Historical Notifications */}
                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-800 transition-colors">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                <Clock size={20} className="text-gray-400" /> 历史通知消息
                            </h3>
                            <button
                                onClick={handleMarkAllRead}
                                className="text-sm text-blue-600 dark:text-blue-400 hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={notifications.every(n => n.isRead)}
                            >
                                全部标为已读
                            </button>
                        </div>
                        <div className="space-y-4">
                            {notifications.map(notification => (
                                <div key={notification.id} className={`flex gap-4 p-4 rounded-xl transition-colors cursor-pointer group border ${notification.isRead ? 'bg-white dark:bg-slate-900 border-transparent' : 'bg-blue-50/50 dark:bg-blue-900/10 border-blue-100 dark:border-blue-900/30'}`}>
                                    <div className="mt-1 flex-shrink-0">
                                        {getTypeIcon(notification.type)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between mb-1">
                                            <h4 className={`text-sm ${notification.isRead ? 'font-medium text-gray-900 dark:text-white' : 'font-bold text-blue-900 dark:text-blue-100'}`}>{notification.title}</h4>
                                            <span className="text-xs text-gray-400">{notification.time}</span>
                                        </div>
                                        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{notification.content}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {!notification.isRead && <div className="size-2 rounded-full bg-blue-500"></div>}
                                        <div className="text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300">
                                            <ChevronRight size={16} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6 text-center">
                            <button className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 font-medium px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors">
                                加载更多历史消息
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotificationsPage;
