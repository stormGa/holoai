import React, { useState } from 'react';
import { User, Check } from 'lucide-react';

const AccountPage: React.FC = () => {
    // subscribedPlan represents the user's actual subscription
    const [subscribedPlan] = useState<'free' | 'pro' | 'enterprise'>('free');
    // selectedPlan represents the plan currently highlighted/viewed in the UI
    const [selectedPlan, setSelectedPlan] = useState<'free' | 'pro' | 'enterprise'>('free');

    const plans = [
        {
            id: 'free',
            name: '免费版',
            price: '¥0',
            period: '/月',
            features: ['基础 AI 对话', '每日 10 次搜索', '基础工具访问'],
            color: 'gray',
            btnText: '当前计划',
            recommend: false
        },
        {
            id: 'pro',
            name: '专业版',
            price: '¥29',
            period: '/月',
            features: ['无限次 AI 对话', '高级搜索功能', '全套生产力工具', '优先技术支持'],
            color: 'blue',
            btnText: '立即升级',
            recommend: true
        },
        {
            id: 'enterprise',
            name: '企业版',
            price: '定制',
            period: '/年',
            features: ['团队协作空间', '专属 API 接口', '私有化部署', '专属客户经理'],
            color: 'gray',
            btnText: '联系销售',
            recommend: false
        }
    ] as const;

    return (
        <div className="p-8 bg-gray-50 dark:bg-slate-950 h-full overflow-y-auto transition-colors duration-300">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                        <User className="text-blue-600 dark:text-blue-500" /> 账户与订阅
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">管理您的个人资料和会员订阅状态</p>
                </div>

                {/* Profile Section */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-800 mb-6 transition-colors duration-300">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">个人资料</h3>
                    <div className="flex items-start gap-6">
                        <div className="size-20 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold shadow-md">
                            H
                        </div>
                        <div className="flex-1 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">用户名</label>
                                    <input
                                        type="text"
                                        defaultValue="HoloAI User"
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-black dark:text-white focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/30 outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">电子邮箱</label>
                                    <input
                                        type="email"
                                        defaultValue="user@holoai.com"
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-black dark:text-white focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/30 outline-none transition-all"
                                    />
                                </div>
                            </div>
                            <button className="px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-black rounded-lg text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
                                保存更改
                            </button>
                        </div>
                    </div>
                </div>

                {/* Subscription Section */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-800 transition-colors duration-300">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">订阅计划</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${subscribedPlan === 'free' ? 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300' :
                            subscribedPlan === 'pro' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' :
                                'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300'
                            }`}>
                            当前计划：{plans.find(p => p.id === subscribedPlan)?.name}
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {plans.map((plan) => {
                            const isSubscribed = subscribedPlan === plan.id;
                            const isSelected = selectedPlan === plan.id;
                            const isPro = plan.id === 'pro';

                            // Define base, active, and inactive styles
                            let cardStyle = "relative rounded-xl p-6 transition-all duration-300 border ";

                            // Highlighting logic based on SELECTION, not subscription
                            if (isSelected) {
                                cardStyle += "border-green-500 bg-green-50/10 dark:bg-green-900/10 ring-2 ring-green-500 shadow-md cursor-default";
                            } else if (isPro) {
                                cardStyle += "border-blue-500 bg-white dark:bg-slate-800 shadow-xl ring-4 ring-blue-50 dark:ring-blue-900/20 cursor-pointer hover:scale-[1.02]";
                            } else {
                                cardStyle += "border-gray-200 dark:border-slate-700 bg-gray-50/50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 hover:shadow-lg cursor-pointer hover:scale-[1.02]";
                            }

                            return (
                                <div
                                    key={plan.id}
                                    className={cardStyle}
                                    onClick={() => setSelectedPlan(plan.id)}
                                >
                                    {isSubscribed ? (
                                        <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-lg shadow-sm z-10">
                                            当前计划
                                        </div>
                                    ) : isSelected ? (
                                        <div className="absolute top-0 right-0 bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-lg shadow-sm z-10">
                                            已选择
                                        </div>
                                    ) : plan.recommend && (
                                        <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-lg shadow-sm z-10">
                                            推荐
                                        </div>
                                    )}

                                    <h4 className="font-bold text-gray-900 dark:text-white mb-2">{plan.name}</h4>
                                    <p className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                                        {plan.price}<span className="text-sm font-normal text-gray-500 dark:text-gray-400">{plan.period}</span>
                                    </p>

                                    <ul className="space-y-3">
                                        {plan.features.map((feature, i) => (
                                            <li key={i} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                                <Check size={16} className={isSelected ? "text-green-600 dark:text-green-500" : (isPro ? "text-blue-500 dark:text-blue-400" : "text-green-500 dark:text-green-400")} />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountPage;
