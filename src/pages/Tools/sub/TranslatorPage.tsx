import React from 'react';
import { Languages, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TranslatorPage: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className="h-full bg-gray-50 dark:bg-slate-950 flex flex-col p-6 transition-colors duration-300">
            <div className="flex items-center mb-4">
                <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-slate-800 dark:text-white transition">
                    <ArrowLeft size={20} />
                </button>
                <h2 className="ml-3 text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <Languages className="text-indigo-600 dark:text-indigo-400" size={24} /> 文本翻译助手
                </h2>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-gray-100 dark:border-slate-800 shadow-sm flex-1 transition-all">
                <p className="text-gray-600 dark:text-gray-400 mb-4">输入文本，AI 自动翻译为目标语言。</p>
                <div className="border border-dashed border-gray-300 dark:border-slate-700 rounded-lg p-8 text-center text-gray-400 dark:text-gray-500">
                    这里将展示翻译输入框与结果预览。
                </div>
            </div>
        </div>
    );
};

export default TranslatorPage;
