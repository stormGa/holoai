import React, { useState } from 'react';
import { Shield, Eye, Lock, Smartphone, Laptop } from 'lucide-react';

const PrivacyPage: React.FC = () => {
    const [twoFactor, setTwoFactor] = useState(false);
    const [privacySettings, setPrivacySettings] = useState({
        aiLearning: true,
        publicProfile: false,
        personalizedAds: false
    });

    // Password Modal State
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [passwordForm, setPasswordForm] = useState({ current: '', new: '', confirm: '' });
    const [passwordStatus, setPasswordStatus] = useState<'idle' | 'saving' | 'success'>('idle');

    // Sessions State
    const [sessions, setSessions] = useState([
        { id: 1, device: 'Windows PC - Chrome', location: '北京, 中国', current: true, type: 'laptop', lastActive: '当前在线' },
        { id: 2, device: 'iPhone 13 Pro', location: '上海, 中国', current: false, type: 'phone', lastActive: '上次活跃: 2小时前' }
    ]);

    const togglePrivacy = (key: keyof typeof privacySettings) => {
        setPrivacySettings(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handlePasswordChange = (e: React.FormEvent) => {
        e.preventDefault();
        setPasswordStatus('saving');
        setTimeout(() => {
            setPasswordStatus('success');
            setTimeout(() => {
                setIsPasswordModalOpen(false);
                setPasswordStatus('idle');
                setPasswordForm({ current: '', new: '', confirm: '' });
            }, 1000);
        }, 1500);
    };

    const handleRemoveSession = (id: number) => {
        setSessions(prev => prev.filter(s => s.id !== id));
    };

    return (
        <div className="p-8 bg-gray-50 dark:bg-slate-950 h-full overflow-y-auto relative transition-colors duration-300">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                        <Shield className="text-emerald-600 dark:text-emerald-500" /> 隐私与安全
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">控制您的数据可见性与账户安全设置</p>
                </div>

                <div className="space-y-6">
                    {/* Security Settings */}
                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-800 transition-colors duration-300">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <Lock size={20} className="text-gray-400 dark:text-gray-500" /> 账户安全
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-800/50 rounded-xl">
                                <div>
                                    <h4 className="font-semibold text-gray-900 dark:text-white">修改密码</h4>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">定期更新密码以保护账户安全</p>
                                </div>
                                <button
                                    onClick={() => setIsPasswordModalOpen(true)}
                                    className="px-4 py-2 text-sm bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 font-medium text-gray-700 dark:text-gray-300 transition-colors"
                                >
                                    修改
                                </button>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-800/50 rounded-xl">
                                <div>
                                    <h4 className="font-semibold text-gray-900 dark:text-white">双重验证 (2FA)</h4>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">为您的账户添加额外的安全保护层</p>
                                </div>
                                <div
                                    onClick={() => setTwoFactor(!twoFactor)}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full cursor-pointer transition-colors duration-300 ${twoFactor ? 'bg-emerald-500' : 'bg-gray-200 dark:bg-slate-700'}`}
                                >
                                    <span className={`${twoFactor ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition duration-300 shadow-sm`} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Privacy Settings */}
                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-800 transition-colors duration-300">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <Eye size={20} className="text-gray-400 dark:text-gray-500" /> 数据隐私
                        </h3>
                        <div className="divide-y divide-gray-100 dark:divide-slate-800">
                            <div className="flex items-center justify-between py-4">
                                <div>
                                    <h4 className="font-medium text-gray-900 dark:text-white">允许 AI 学习我的对话习惯</h4>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">用于提升个性化体验，数据将匿名处理</p>
                                </div>
                                <div
                                    onClick={() => togglePrivacy('aiLearning')}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full cursor-pointer transition-colors duration-300 ${privacySettings.aiLearning ? 'bg-emerald-500' : 'bg-gray-200 dark:bg-slate-700'}`}
                                >
                                    <span className={`${privacySettings.aiLearning ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition duration-300 shadow-sm`} />
                                </div>
                            </div>
                            <div className="flex items-center justify-between py-4">
                                <div>
                                    <h4 className="font-medium text-gray-900 dark:text-white">公开我的社区主页</h4>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">允许其他用户查看您的关注和公开收藏</p>
                                </div>
                                <div
                                    onClick={() => togglePrivacy('publicProfile')}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full cursor-pointer transition-colors duration-300 ${privacySettings.publicProfile ? 'bg-emerald-500' : 'bg-gray-200 dark:bg-slate-700'}`}
                                >
                                    <span className={`${privacySettings.publicProfile ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition duration-300 shadow-sm`} />
                                </div>
                            </div>
                            <div className="flex items-center justify-between py-4">
                                <div>
                                    <h4 className="font-medium text-gray-900 dark:text-white">个性化广告推荐</h4>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">根据您的兴趣展示相关服务（当前版本无广告）</p>
                                </div>
                                <div
                                    onClick={() => togglePrivacy('personalizedAds')}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full cursor-pointer transition-colors duration-300 ${privacySettings.personalizedAds ? 'bg-emerald-500' : 'bg-gray-200 dark:bg-slate-700'}`}
                                >
                                    <span className={`${privacySettings.personalizedAds ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition duration-300 shadow-sm`} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Active Sessions */}
                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-800 transition-colors duration-300">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <Smartphone size={20} className="text-gray-400 dark:text-gray-500" /> 活动会话
                        </h3>
                        <div className="space-y-4">
                            {sessions.map(session => (
                                <div key={session.id} className={`flex items-center justify-between ${!session.current ? 'opacity-60 hover:opacity-100 transition-opacity' : ''}`}>
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-gray-100 dark:bg-slate-800 rounded-lg">
                                            {session.type === 'laptop' ? <Laptop size={24} className="text-gray-600 dark:text-gray-400" /> : <Smartphone size={24} className="text-gray-600 dark:text-gray-400" />}
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-gray-900 dark:text-white">{session.device}</h4>
                                            {session.current ? (
                                                <p className="text-xs text-green-600 dark:text-green-500 font-medium">当前设备 • {session.location}</p>
                                            ) : (
                                                <p className="text-xs text-gray-500 dark:text-gray-400">{session.lastActive} • {session.location}</p>
                                            )}
                                        </div>
                                    </div>
                                    {!session.current && (
                                        <button
                                            onClick={() => handleRemoveSession(session.id)}
                                            className="text-red-500 text-sm font-medium hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 px-3 py-1 rounded-lg transition-colors"
                                        >
                                            退出
                                        </button>
                                    )}
                                </div>
                            ))}
                            {sessions.length === 0 && <p className="text-gray-500 text-sm">暂无活动会话</p>}
                        </div>
                    </div>
                </div>
            </div>

            {/* Password Modal Overlay */}
            {isPasswordModalOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-md p-6 shadow-xl animate-scale-in border border-transparent dark:border-slate-700">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">修改密码</h3>
                        <form onSubmit={handlePasswordChange} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">当前密码</label>
                                <input
                                    type="password"
                                    required
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-black dark:text-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                                    value={passwordForm.current}
                                    onChange={e => setPasswordForm({ ...passwordForm, current: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">新密码</label>
                                <input
                                    type="password"
                                    required
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-black dark:text-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                                    value={passwordForm.new}
                                    onChange={e => setPasswordForm({ ...passwordForm, new: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">确认新密码</label>
                                <input
                                    type="password"
                                    required
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-black dark:text-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                                    value={passwordForm.confirm}
                                    onChange={e => setPasswordForm({ ...passwordForm, confirm: e.target.value })}
                                />
                            </div>

                            <div className="flex items-center justify-end gap-3 mt-8">
                                <button
                                    type="button"
                                    onClick={() => setIsPasswordModalOpen(false)}
                                    className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg font-medium transition-colors"
                                >
                                    取消
                                </button>
                                <button
                                    type="submit"
                                    disabled={passwordStatus !== 'idle'}
                                    className={`px-4 py-2 rounded-lg font-medium text-white transition-all w-24 flex justify-center ${passwordStatus === 'success' ? 'bg-green-500' : 'bg-gray-900 dark:bg-white dark:text-black dark:hover:bg-gray-200 hover:bg-gray-800'}`}
                                >
                                    {passwordStatus === 'idle' ? '保存' : (passwordStatus === 'saving' ? '保存中...' : '已完成')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PrivacyPage;
