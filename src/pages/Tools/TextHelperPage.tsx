import React from 'react';
import { Languages, PenTool, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const TextHelperPage: React.FC = () => {
    return (
        <div className="h-full bg-white dark:bg-slate-950 p-6 transition-colors duration-300">
            <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <Languages className="text-indigo-600 dark:text-indigo-400" /> 文本助手
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">多语言翻译、润色与写作辅助</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl border border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-900 hover:bg-white dark:hover:bg-slate-800 hover:shadow-md dark:hover:shadow-black/20 transition-all cursor-pointer group">
                    <div className="size-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <PenTool size={24} />
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">深度润色</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">优化文章的语气、逻辑和词汇，使其更具专业性和感染力。</p>
                </div>
                <div className="p-6 rounded-2xl border border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-900 hover:bg-white dark:hover:bg-slate-800 hover:shadow-md dark:hover:shadow-black/20 transition-all cursor-pointer group">
                    <div className="size-12 rounded-xl bg-pink-100 dark:bg-pink-900/40 text-pink-600 dark:text-pink-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Sparkles size={24} />
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">创意写作伴侣</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">提供灵感启发、大纲生成和段落扩写功能。</p>
                </div>
                <Link to="/tools/text/translator" className="p-6 rounded-2xl border border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-900 hover:bg-white dark:hover:bg-slate-800 hover:shadow-md dark:hover:shadow-black/20 transition-all cursor-pointer group">
                    <div className="size-12 rounded-xl bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Languages size={24} />
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">文本翻译助手</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">快速将文本翻译为目标语言。</p>
                </Link>
            </div>
        </div>
    );
};

export default TextHelperPage;
