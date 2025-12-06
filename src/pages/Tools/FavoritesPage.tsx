import React, { useState, useEffect } from 'react';
import { Search, Star, Zap, Puzzle, Briefcase, Languages, BarChart3, Code, LayoutGrid, Mail, TrendingUp } from 'lucide-react';

interface Tool {
    id: string;
    name: string;
    description: string;
    icon: React.ElementType; // Use ElementType for component reference
    category: 'PRODUCTIVITY' | 'AI' | 'DEV' | 'DATA';
}

const allTools: Tool[] = [
    { id: 'tools-productivity-meeting', name: '会议纪要生成器', description: '上传录音或粘贴文本，自动生成结构化会议纪要与待办事项。', icon: ZapIcon, category: 'PRODUCTIVITY' },
    { id: 'tools-productivity-okr', name: 'OKR 生成器', description: '辅助制定清晰、可衡量的团队 OKR 目标与关键结果。', icon: BriefcaseIcon, category: 'PRODUCTIVITY' },
    { id: 'tools-productivity-email', name: '邮件润色器', description: '一键优化邮件语气，提供更加专业得体的表达建议。', icon: MailIcon, category: 'PRODUCTIVITY' },
    { id: 'tools-text-translator', name: '文本翻译助手', description: '快速将文本翻译为目标语言，支持多语种互译。', icon: MicIcon, category: 'AI' },
    { id: 'tools-analysis-trend', name: '趋势分析器', description: '上传数据，AI 自动生成趋势洞察报告。', icon: TrendingIcon, category: 'DATA' },
    { id: 'tools-analysis-chart', name: '图表生成器', description: '上传数据，AI 自动生成可视化图表。', icon: DatabaseIcon, category: 'DATA' },
];

function PaletteIcon(props: any) { return <LayoutGrid {...props} />; }
function FileTextIcon(props: any) { return <Briefcase {...props} />; }
function DatabaseIcon(props: any) { return <Code {...props} />; }
function TrendingIcon(props: any) { return <TrendingUp {...props} />; }
function SearchIcon(props: any) { return <Search {...props} />; }
function MicIcon(props: any) { return <Languages {...props} />; }
function ZapIcon(props: any) { return <Zap {...props} />; }
function BriefcaseIcon(props: any) { return <Briefcase {...props} />; }
function MailIcon(props: any) { return <Mail {...props} />; }


const FavoritesPage: React.FC = () => {
    const [favorites, setFavorites] = useState<string[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem('tool_favorites');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                setFavorites(parsed.map((p: any) => p.id));
            } catch (e) {
                console.error(e);
            }
        }
    }, []);

    const toggleFavorite = (tool: Tool) => {
        const isFav = favorites.includes(tool.id);
        let newFavorites;
        let storageData;

        if (isFav) {
            newFavorites = favorites.filter(id => id !== tool.id);
            // Read current storage to filter out object
            const currentStorage = JSON.parse(localStorage.getItem('tool_favorites') || '[]');
            storageData = currentStorage.filter((item: any) => item.id !== tool.id);
        } else {
            newFavorites = [...favorites, tool.id];
            const currentStorage = JSON.parse(localStorage.getItem('tool_favorites') || '[]');
            storageData = [...currentStorage, { id: tool.id, name: tool.name }];
        }

        setFavorites(newFavorites);
        localStorage.setItem('tool_favorites', JSON.stringify(storageData));

        // Dispatch custom event for Sidebar
        window.dispatchEvent(new Event('favoritesUpdated'));
    };

    return (
        <div className="h-full bg-gray-50 dark:bg-slate-950 flex flex-col transition-colors duration-300">
            <div className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 px-8 py-6 transition-colors">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            <Star className="text-amber-400 fill-amber-400" /> 工具市场 & 我的收藏
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 mt-2">发现并收藏您喜欢的 AI 工具，它们将直接显示在左侧菜单栏中。</p>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-8">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Puzzle size={20} className="text-indigo-600 dark:text-indigo-400" /> 全部工具 ({allTools.length})
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {allTools.map(tool => {
                        const isFav = favorites.includes(tool.id);
                        return (
                            <div key={tool.id} className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-md dark:hover:shadow-black/20 transition-all group relative">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="size-12 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                                        <tool.icon size={24} />
                                    </div>
                                    <button
                                        onClick={() => toggleFavorite(tool)}
                                        className={`p-2 rounded-full transition-all ${isFav ? 'bg-amber-50 dark:bg-amber-900/30 text-amber-500 hover:bg-amber-100 dark:hover:bg-amber-900/50' : 'bg-gray-50 dark:bg-slate-800 text-gray-300 dark:text-gray-600 hover:text-gray-400 dark:hover:text-gray-400'}`}
                                    >
                                        <Star size={20} fill={isFav ? "currentColor" : "none"} />
                                    </button>
                                </div>

                                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{tool.name}</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400 min-h-[40px]">{tool.description}</p>

                                <div className="mt-4 pt-4 border-t border-gray-50 dark:border-slate-800 flex items-center justify-between text-xs">
                                    <span className="bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 px-2 py-1 rounded">{tool.category}</span>
                                    {isFav && <span className="text-amber-500 font-medium">✨ 已添加到菜单</span>}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default FavoritesPage;
