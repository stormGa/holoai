import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, Shield, Zap, Globe, Lock, Mail, User, Brain, MessageSquare, Users } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext.tsx';
import { useUser } from '../../context/UserContext.tsx';

const WelcomePage = () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const { login, register, isLoading: isAuthLoading, currentUser } = useUser();
    // Local loading state just for button animation trigger from context, or use context's loading?
    // Using local wrapper to handle start/end callbacks
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { themeMode } = useTheme();

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        const start = () => setIsSubmitting(true);
        const end = () => setIsSubmitting(false);

        // Simple Email Validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("请输入有效的电子邮箱地址 (example@domain.com)");
            return;
        }

        try {
            if (isLogin) {
                await login(start, end, { email, password });
            } else {
                await register(start, end, { username, email, password });
            }
        } catch (err: any) {
            console.error("Auth error", err);
            const errorMsg = err.response?.data?.error || "操作失败，请重试";
            setError(errorMsg);
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 text-gray-900 dark:text-white transition-colors duration-300 overflow-hidden relative">

            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-500/20 rounded-full blur-[120px] animate-pulse-slow"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-purple-500/20 rounded-full blur-[120px] animate-pulse-slow delay-1000"></div>
            </div>

            {/* Navbar */}
            <nav className="relative z-10 flex items-center justify-between px-6 md:px-12 py-6 max-w-7xl mx-auto">
                <div className="flex items-center gap-3">
                    <div className="size-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                        <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300">HoloAI</span>
                </div>
                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600 dark:text-gray-400">
                    <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">功能特性</a>
                    <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">解决方案</a>
                    <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">价格</a>
                    <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">关于我们</a>
                </div>
                <button
                    onClick={() => navigate('/platform')} // Shortcut for existing users
                    className="hidden md:flex px-5 py-2.5 rounded-lg border border-gray-200 dark:border-slate-800 text-sm font-medium hover:bg-gray-50 dark:hover:bg-slate-800 transition-all"
                >
                    进入演示
                </button>
            </nav>

            {/* Main Content */}
            <main className="relative z-10 container mx-auto px-6 pt-12 md:pt-20 pb-12 flex flex-col lg:flex-row items-center gap-12 lg:gap-24 max-w-7xl">

                {/* Left: Text Content */}
                <div className="flex-1 text-center lg:text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-semibold mb-6 border border-blue-100 dark:border-blue-800/50">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                        </span>
                        HoloAI 企业版 2.0 正式发布
                    </div>
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white">
                            唤醒全息记忆
                        </span>
                        <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                            连接无限智慧
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                        HoloAI 不仅仅是工具，它是你思维的延伸。全息记忆捕捉瞬间，AI 对话激发灵感，社区连接智慧。
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 text-left">
                        <div className="p-4 rounded-2xl bg-white/50 dark:bg-slate-900/50 border border-gray-100 dark:border-slate-800 backdrop-blur-sm group hover:border-blue-500/30 transition-colors">
                            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg w-fit mb-3 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform"><Brain size={20} /></div>
                            <h3 className="font-semibold mb-1">全息记忆</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400">瞬间捕捉，永久留存。构建你的个人知识宇宙。</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-white/50 dark:bg-slate-900/50 border border-gray-100 dark:border-slate-800 backdrop-blur-sm group hover:border-purple-500/30 transition-colors">
                            <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg w-fit mb-3 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform"><MessageSquare size={20} /></div>
                            <h3 className="font-semibold mb-1">AI 对话</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400">深度交互，智能共鸣。让灵感在对话中迸发。</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-white/50 dark:bg-slate-900/50 border border-gray-100 dark:border-slate-800 backdrop-blur-sm group hover:border-emerald-500/30 transition-colors">
                            <div className="p-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg w-fit mb-3 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform"><Users size={20} /></div>
                            <h3 className="font-semibold mb-1">智识社区</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400">思想碰撞，智慧共享。连接每一个孤独的创新者。</p>
                        </div>
                    </div>
                </div>

                {/* Right: Auth Card */}
                <div className="flex-1 w-full max-w-md mx-auto lg:max-w-none lg:w-auto flex justify-center lg:justify-end">
                    <div className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-2xl shadow-blue-900/10 dark:shadow-black/50 border border-gray-100 dark:border-slate-800 relative overflow-hidden">

                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

                        {currentUser ? (
                            <div className="text-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="size-20 mx-auto rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-blue-500/20">
                                    {currentUser.avatar}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                                        欢迎回来, {currentUser.name}
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        系统已准备就绪
                                    </p>
                                </div>

                                <button
                                    onClick={() => navigate('/platform')}
                                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                                >
                                    进入全息工作台 <ArrowRight size={18} />
                                </button>

                                <button
                                    onClick={() => navigate('/platform/settings/account')}
                                    className="text-sm text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                >
                                    管理账户
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="mb-8 text-center">
                                    <h2 className="text-2xl font-bold mb-2">{isLogin ? '欢迎回来' : '创建账号'}</h2>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {isLogin ? '输入您的凭证以访问工作区。' : '开始您的免费企业试用。'}
                                    </p>
                                </div>

                                <form onSubmit={handleAuth} className="space-y-5">
                                    {error && (
                                        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 text-red-500 text-sm animate-in fade-in slide-in-from-top-2">
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            {error}
                                        </div>
                                    )}
                                    {!isLogin && (
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 ml-1">姓名</label>
                                            <div className="relative">
                                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                                <input
                                                    type="text"
                                                    value={username}
                                                    onChange={(e) => setUsername(e.target.value)}
                                                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm"
                                                    placeholder="张三"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    )}
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 ml-1">电子邮箱</label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm"
                                                placeholder="name@company.com"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 ml-1">密码</label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                            <input
                                                type="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm"
                                                placeholder="••••••••"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="size-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>
                                                <span className="opacity-80">处理中...</span>
                                            </>
                                        ) : (
                                            <>
                                                {isLogin ? '登录' : '立即开始'} <ArrowRight size={18} />
                                            </>
                                        )}
                                    </button>
                                </form>

                                <div className="mt-6 text-center">
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {isLogin ? "还没有账号？" : "已有账号？"} {' '}
                                        <button
                                            onClick={() => setIsLogin(!isLogin)}
                                            className="font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                                        >
                                            {isLogin ? '免费注册' : '登录'}
                                        </button>
                                    </p>
                                </div>
                            </>
                        )}

                        <div className="mt-8 pt-6 border-t border-gray-100 dark:border-slate-800 flex justify-center gap-4 text-gray-400">
                            <div className="flex items-center gap-1.5 text-xs">
                                <Shield size={14} /> TLS 安全加密
                            </div>
                            <div className="flex items-center gap-1.5 text-xs">
                                <Globe size={14} /> 全球 CDN 加速
                            </div>
                        </div>

                    </div>
                </div>

            </main>

        </div>
    );
};

export default WelcomePage;
