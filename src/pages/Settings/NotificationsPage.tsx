import React from 'react';
import { Bell, Mail, MessageSquare, Megaphone } from 'lucide-react';

const NotificationsPage: React.FC = () => {
    return (
        <div className="p-8 bg-gray-50 dark:bg-slate-950 h-full overflow-y-auto transition-colors duration-300">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                        <Bell className="text-amber-500" /> 通知管理
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">选择您希望接收的消息类型和方式</p>
                </div>

                <div className="space-y-6">
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
                                    <div className={`relative inline-flex h-6 w-11 items-center rounded-full cursor-pointer ${i !== 2 ? 'bg-amber-500' : 'bg-gray-200 dark:bg-slate-700'}`}>
                                        <span className={`${i !== 2 ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition`} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-800 transition-colors">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">免打扰设置</h3>
                        <div className="flex items-center justify-between py-4 border-b border-gray-50 dark:border-slate-800">
                            <div>
                                <h4 className="font-medium text-gray-900 dark:text-white">勿扰模式</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400">在特定时间段内暂停所有非紧急通知</p>
                            </div>
                            <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 dark:bg-slate-700 cursor-pointer">
                                <span className="translate-x-1 inline-block h-4 w-4 transform rounded-full bg-white transition" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotificationsPage;
