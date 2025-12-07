import React, { useState } from 'react';
import { User, Users, Store, UserPlus, Check } from 'lucide-react';

const FollowingPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'COMMUNITIES' | 'MEDIA' | 'PEOPLE'>('COMMUNITIES');

    return (
        <div className="h-full bg-white dark:bg-slate-950 p-6 transition-colors duration-300">
            <div className="mb-6 flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <UserPlus className="text-purple-600 dark:text-purple-400" /> 我的关注
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">您关注的社区与创作者动态</p>
                </div>

                <div className="flex bg-gray-100 dark:bg-slate-900 p-1 rounded-lg transition-colors">
                    <button
                        onClick={() => setActiveTab('COMMUNITIES')}
                        className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === 'COMMUNITIES' ? 'bg-white dark:bg-slate-800 text-purple-600 dark:text-purple-400 shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}
                    >
                        <span className="flex items-center gap-1"><Users size={14} /> 兴趣社区</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('MEDIA')}
                        className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === 'MEDIA' ? 'bg-white dark:bg-slate-800 text-purple-600 dark:text-purple-400 shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}
                    >
                        <span className="flex items-center gap-1"><Store size={14} /> 媒体机构</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('PEOPLE')}
                        className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === 'PEOPLE' ? 'bg-white dark:bg-slate-800 text-purple-600 dark:text-purple-400 shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}
                    >
                        <span className="flex items-center gap-1"><User size={14} /> 全息人物</span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeTab === 'COMMUNITIES' && (
                    <>
                        <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-purple-100 dark:border-purple-900/30 shadow-sm hover:shadow-md dark:hover:shadow-black/20 transition-all">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="size-10 rounded-full bg-purple-50 dark:bg-purple-900/40 flex items-center justify-center text-xl">💰</div>
                                <div>
                                    <h3 className="font-bold text-gray-900 dark:text-white">未来财经 DAO</h3>
                                    <div className="flex gap-2 text-xs text-gray-500 dark:text-gray-400">
                                        <span>今日+12 篇内容</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between mt-4">
                                <span className="text-xs bg-purple-50 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 px-2 py-1 rounded">已加入 12 天</span>
                                <button className="text-xs font-bold text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 flex items-center gap-1"><Check size={12} /> 已关注</button>
                            </div>
                        </div>
                    </>
                )}

                {activeTab === 'MEDIA' && (
                    <>
                        <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-blue-100 dark:border-blue-900/30 shadow-sm hover:shadow-md dark:hover:shadow-black/20 transition-all">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="size-10 rounded-full bg-blue-50 dark:bg-blue-900/40 flex items-center justify-center text-xl">TC</div>
                                <div>
                                    <h3 className="font-bold text-gray-900 dark:text-white">极客前沿</h3>
                                    <div className="flex gap-2 text-xs text-gray-500 dark:text-gray-400">
                                        <span>知名科技媒体</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between mt-4">
                                <span className="text-xs bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-2 py-1 rounded">更新于 2小时前</span>
                                <button className="text-xs font-bold text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 flex items-center gap-1"><Check size={12} /> 已关注</button>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-blue-100 dark:border-blue-900/30 shadow-sm hover:shadow-md dark:hover:shadow-black/20 transition-all">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="size-10 rounded-full bg-blue-50 dark:bg-blue-900/40 flex items-center justify-center text-xl">🚀</div>
                                <div>
                                    <h3 className="font-bold text-gray-900 dark:text-white">硅谷快讯</h3>
                                    <div className="flex gap-2 text-xs text-gray-500 dark:text-gray-400">
                                        <span>创投圈第一手资讯</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between mt-4">
                                <span className="text-xs bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-2 py-1 rounded">更新于 30分钟前</span>
                                <button className="text-xs font-bold text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 flex items-center gap-1"><Check size={12} /> 已关注</button>
                            </div>
                        </div>
                    </>
                )}

                {activeTab === 'PEOPLE' && (
                    <>
                        <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-indigo-100 dark:border-indigo-900/30 shadow-sm hover:shadow-md dark:hover:shadow-black/20 transition-all">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="size-10 rounded-full bg-indigo-50 dark:bg-indigo-900/40 flex items-center justify-center text-xl">👩‍💼</div>
                                <div>
                                    <h3 className="font-bold text-gray-900 dark:text-white">陈艾丽</h3>
                                    <div className="flex gap-2 text-xs text-gray-500 dark:text-gray-400">
                                        <span>宏观分析师 • 准确率 92%</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between mt-4">
                                <span className="text-xs bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 px-2 py-1 rounded">活跃于 10分钟前</span>
                                <button className="text-xs font-bold text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 flex items-center gap-1"><Check size={12} /> 已关注</button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default FollowingPage;
