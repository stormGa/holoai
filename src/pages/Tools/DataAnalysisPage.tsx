import React from 'react';
import { TrendingUp, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';

const DataAnalysisPage: React.FC = () => {
    return (
        <div className="h-full bg-white dark:bg-slate-950 p-6 transition-colors duration-300">
            <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <BarChart3 className="text-teal-600 dark:text-teal-400" /> 数据分析
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">上传数据，快速获取洞察报告</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link to="/tools/analysis/trend-analyzer" className="p-6 rounded-2xl border border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-900 hover:bg-white dark:hover:bg-slate-800 hover:shadow-md dark:hover:shadow-black/20 transition-all cursor-pointer group">
                    <div className="size-12 rounded-xl bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <TrendingUp size={24} />
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">趋势分析器</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">上传数据，AI 自动生成趋势洞察报告。</p>
                </Link>
                <Link to="/tools/analysis/chart-builder" className="p-6 rounded-2xl border border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-900 hover:bg-white dark:hover:bg-slate-800 hover:shadow-md dark:hover:shadow-black/20 transition-all cursor-pointer group">
                    <div className="size-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <BarChart3 size={24} />
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">图表生成器</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">上传数据，AI 自动生成可视化图表。</p>
                </Link>
            </div>
        </div>
    );
};

export default DataAnalysisPage;
