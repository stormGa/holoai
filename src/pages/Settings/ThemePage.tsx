import React from 'react';
import { Palette, Moon, Sun, Monitor, Type } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext.tsx';

const ThemePage: React.FC = () => {
    const { themeMode, setThemeMode, accentColor, setAccentColor, fontSize, setFontSize } = useTheme();

    const themes = [
        { id: 'light', name: '浅色模式', icon: Sun },
        { id: 'dark', name: '深色模式', icon: Moon },
        { id: 'system', name: '跟随系统', icon: Monitor }
    ] as const;

    const colors = [
        { id: 'blue', class: 'bg-blue-600', ring: 'ring-blue-600', name: '科技蓝' },
        { id: 'purple', class: 'bg-purple-600', ring: 'ring-purple-600', name: '极客紫' },
        { id: 'emerald', class: 'bg-emerald-600', ring: 'ring-emerald-600', name: '自然绿' },
        { id: 'rose', class: 'bg-rose-600', ring: 'ring-rose-600', name: '活力红' },
        { id: 'amber', class: 'bg-amber-500', ring: 'ring-amber-500', name: '温暖橙' },
    ];

    return (
        <div className="p-8 bg-gray-50 dark:bg-slate-950 h-full overflow-y-auto transition-colors duration-300">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                        <Palette className="text-primary-600 dark:text-primary-400" /> 界面主题
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">自定义 HoloAI 的外观和感觉</p>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-800 mb-6 transition-colors duration-300">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">外观模式</h3>
                    <div className="grid grid-cols-3 gap-4">
                        {themes.map(theme => {
                            const isActive = themeMode === theme.id;
                            return (
                                <div
                                    key={theme.id}
                                    onClick={() => setThemeMode(theme.id)}
                                    className={`cursor-pointer border-2 rounded-xl p-4 flex flex-col items-center gap-3 transition-all ${isActive ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 dark:border-primary-500' : 'border-gray-100 dark:border-slate-800 hover:border-gray-200 dark:hover:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800'
                                        }`}
                                >
                                    <div className={`p-3 rounded-full ${isActive ? 'bg-primary-200 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300' : 'bg-gray-200 dark:bg-slate-800 text-gray-500 dark:text-slate-400'}`}>
                                        <theme.icon size={24} />
                                    </div>
                                    <span className={`font-medium ${isActive ? 'text-primary-700 dark:text-primary-300' : 'text-gray-600 dark:text-slate-400'}`}>{theme.name}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-800 mb-6 transition-colors duration-300">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">主题色</h3>
                    <div className="flex gap-6">
                        {colors.map((color) => {
                            const isActive = accentColor === color.id;
                            return (
                                <div
                                    key={color.id}
                                    onClick={() => setAccentColor(color.id as any)}
                                    className="flex flex-col items-center gap-2 cursor-pointer group"
                                >
                                    <div className={`size-12 rounded-full ${color.class} shadow-sm ring-offset-2 dark:ring-offset-slate-900 transition-all ${isActive ? `ring-2 ${color.ring} scale-110` : 'ring-0 hover:scale-105'}`} />
                                    <span className={`text-xs ${isActive ? 'font-bold text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>{color.name}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-800 transition-colors duration-300">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <Type size={20} className="text-gray-400" /> 字体设置
                    </h3>
                    <div className="space-y-6">
                        <div>
                            <div className="flex justify-between mb-4">
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">界面字体大小</span>
                                <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">{fontSize}px</span>
                            </div>
                            <input
                                type="range"
                                min="12"
                                max="20"
                                step="1"
                                value={fontSize}
                                onChange={(e) => setFontSize(parseInt(e.target.value))}
                                className="w-full h-2 bg-gray-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary-600"
                            />
                            <div className="flex justify-between mt-2 text-xs text-gray-400 font-medium">
                                <span>小 (12px)</span>
                                <span>标准 (16px)</span>
                                <span>大 (20px)</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ThemePage;
