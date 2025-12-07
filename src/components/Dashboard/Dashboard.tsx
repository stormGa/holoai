import React, { useState, useRef, useEffect } from 'react';
import { User, Cloud, Mic, FileText, Presentation, Sparkles, TrendingUp, CirclePlay, ThumbsUp, Database, Check, Video, Library, Bot, Paperclip, Send, BarChart3, LoaderCircle, CircleCheck, Clock, Sun, Lightbulb, Code, Square, Link, Aperture, ChevronRight, Plus, MessageSquare, Languages, BrainCircuit, Hash, Zap, Compass } from 'lucide-react';
import { getMemories, MemoryEvent } from '../../services/memoryService.ts';
import { moodStats, topTopics } from '../../services/memoryStatsService.ts';

// A more versatile Card component
interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: string;
  variant?: 'default' | 'glass';
}
const Card: React.FC<CardProps> = ({ children, className = '', padding = 'p-6', variant = 'default' }) => {
  const baseStyle = "rounded-2xl shadow-lg transition-colors duration-300";
  const variantStyle = {
    default: "bg-white dark:bg-slate-900 border border-gray-200/50 dark:border-slate-800/50",
    glass: "bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-gray-200/50 dark:border-slate-800/50"
  };
  return <div className={`${baseStyle} ${variantStyle[variant]} ${padding} ${className}`}>{children}</div>;
};

interface Message {
  id: number;
  sender: 'ai' | 'user';
  text: string;
}

const Dashboard: React.FC = () => {
  const userName = "Developer";
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const chatContentRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (chatContentRef.current) {
      chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent, prompt?: string) => {
    e.preventDefault();
    const messageText = prompt || input;
    if (!messageText.trim()) return;

    const userMessage: Message = { id: Date.now(), sender: 'user', text: messageText };
    setMessages(prev => [...prev, userMessage]);
    if (!prompt) setInput('');
    setIsGenerating(true);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      const aiMessage: Message = { id: Date.now() + 1, sender: 'ai', text: `这是对 "${messageText}" 的一个模拟AI回复。这是一个非常长的回复，用来测试当内容超出卡片高度时，是否会出现内部滚动条，而不是将整个卡片撑开。我们需要确保这个行为是正确的，以提供良好的用户体验。重复这段文字来增加长度。这是一个非常长的回复，用来测试当内容超出卡片高度时，是否会出现内部滚动条，而不是将整个卡片撑开。我们需要确保这个行为是正确的，以提供良好的用户体验。` };
      setMessages(prev => [...prev, aiMessage]);
      setIsGenerating(false);
      timeoutRef.current = null;
    }, 2000); // Increased delay to 2 seconds to make it easier to test stop button
  };

  const handleStopGeneration = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsGenerating(false);
  };

  const promptStarters = [
    { icon: Lightbulb, text: "给我一些关于项目重构的建议" },
    { icon: Code, text: "用 Python 写一个快速排序算法" },
    { icon: FileText, text: "帮我总结一下这篇文档的核心内容" },
    { icon: Library, text: "解释一下 React 中的 “Hooks” 是什么" },
  ];

  // Memory Integration
  const [recentMemories, setRecentMemories] = useState<MemoryEvent[]>([]);

  useEffect(() => {
    getMemories().then(data => {
      // Sort by date desc just in case, and take top 3
      const sorted = data.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      setRecentMemories(sorted.slice(0, 3));
    });
  }, []);

  const getRelativeTime = (isoString: string) => {
    const diff = Date.now() - new Date(isoString).getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours < 1) return '刚刚';
    if (hours < 24) return `${hours} 小时前`;
    return `${Math.floor(hours / 24)} 天前`;
  };

  const getMemoryIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video size={16} className="text-blue-500" />;
      case 'doc': return <FileText size={16} className="text-orange-500" />;
      case 'chat': return <MessageSquare size={16} className="text-green-500" />;
      default: return <Sparkles size={16} className="text-gray-400" />;
    }
  };

  return (
    // 【修改点 1】最外层：使用 h-screen 强制占满一屏，overflow-hidden 禁止出现页面级滚动条
    <div className="h-full w-full overflow-hidden bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/20 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-4 md:p-6 lg:p-8 flex flex-col gap-6 transition-colors duration-300">

      {/* 顶部 Header (高度固定) */}
      <Card variant="glass" padding="p-3 md:p-4" className="flex-shrink-0">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 md:gap-6">
          <div className="flex items-center gap-4">
            <div>
              <div className="flex items-center gap-3"><h1 className="text-lg md:text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">早上好，欢迎回来</h1><div className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 dark:bg-amber-900/30 rounded-full border border-amber-200/50 dark:border-amber-800/30"><Sun className="size-3.5 text-amber-500" /><span className="text-xs font-medium text-amber-700 dark:text-amber-400">晴朗 22°C</span></div></div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">今天也是充满活力的一天</p>
            </div>
          </div>
          <div className="flex items-center gap-4 md:gap-8 w-full sm:w-auto justify-between sm:justify-start">
            <div className="flex items-center gap-3"><div className="size-9 rounded-xl bg-gray-50 dark:bg-slate-800 flex items-center justify-center border border-gray-200 dark:border-slate-700"><User size={16} className="text-gray-600 dark:text-gray-300" /></div><div><p className="text-xs text-gray-500 dark:text-gray-400">账户等级</p><p className="text-sm font-semibold text-gray-900 dark:text-white">普通用户</p></div></div>
            <div className="w-px h-8 bg-gray-200 dark:bg-slate-700 hidden sm:block"></div>
            <div className="flex items-center gap-3"><div className="size-9 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center border border-blue-200 dark:border-blue-800/30"><Database size={16} className="text-blue-600 dark:text-blue-400" /></div><div><p className="text-xs text-gray-500 dark:text-gray-400">知识库</p><p className="text-sm font-semibold text-gray-900 dark:text-white">128 篇文档</p></div></div>
            <div className="w-px h-8 bg-gray-200 dark:bg-slate-700 hidden sm:block"></div>
            <div className="flex items-center gap-3"><div className="size-9 rounded-xl bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center border border-purple-200 dark:border-purple-800/30"><Cloud size={16} className="text-purple-600 dark:text-purple-400" /></div><div><p className="text-xs text-gray-500 dark:text-gray-400">云存储空间</p><div className="flex items-center gap-2"><p className="text-sm font-semibold text-gray-900 dark:text-white">12/50 GB</p><div className="w-16 h-1.5 bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden"><div className="h-full bg-purple-600" style={{ width: '24%' }}></div></div></div></div></div>
          </div>
        </div>
      </Card>

      <div className="flex-1 flex gap-6 min-h-0 overflow-hidden">
        <div className="flex-1 flex flex-col min-w-0 h-full">
          <Card variant="glass" className="flex flex-col h-full" padding="p-0">
            <div ref={chatContentRef} className="flex-1 overflow-y-auto p-6 min-h-0 scroll-smooth">
              {messages.length === 0 ? (
                <div className="flex flex-col justify-center items-center h-full text-center">
                  <div className="relative size-20 mb-6"><div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 animate-pulse opacity-20 blur-xl"></div><div className="relative size-20 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg"><Sparkles className="size-10 text-white" /></div></div>
                  <h1 className="text-4xl font-bold text-gray-700 dark:text-gray-200">你好, {userName}</h1>
                  <p className="text-xl text-gray-500 dark:text-gray-400 mt-2">我能为你做些什么？</p>
                  <div className="grid grid-cols-2 gap-4 mt-12 w-full max-w-2xl">
                    {promptStarters.map((prompt, index) => (
                      <button key={index} onClick={(e) => handleSendMessage(e, prompt.text)} className="group flex items-start gap-3 p-4 rounded-xl border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800 transition-all text-left"><div className="size-10 rounded-lg bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-400 flex items-center justify-center"><prompt.icon size={20} /></div><p className="text-sm font-medium text-gray-800 dark:text-gray-200">{prompt.text}</p></button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-8">
                  {messages.map((msg) => (
                    <div key={msg.id} className={`flex w-full ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`flex gap-3 items-start max-w-xl ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                        <div className={`size-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.sender === 'ai' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-300'}`}>{msg.sender === 'ai' ? <Sparkles size={16} /> : <User size={16} />}</div>
                        <div className={`p-3 rounded-lg ${msg.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-slate-800 dark:text-gray-200'}`}>
                          <p className="text-sm leading-relaxed">{msg.text}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 底部输入框：flex-shrink-0 防止被压缩，始终固定在卡片底部 */}
            <div className="shrink-0 p-4 bg-gradient-to-t from-white/90 via-white/90 to-transparent dark:from-slate-900/90 dark:via-slate-900/90 border-t border-gray-100 dark:border-slate-800 transition-colors">
              <div className="relative max-w-3xl mx-auto">
                <form onSubmit={handleSendMessage}>
                  <textarea value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendMessage(e); } }} placeholder={isGenerating ? "AI正在思考中..." : "在这里输入您的问题..."} disabled={isGenerating} className={`w-full min-h-[56px] p-4 pl-14 pr-16 text-base rounded-2xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white dark:placeholder-gray-500 shadow-sm focus:border-blue-400 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/30 outline-none resize-none transition-all duration-300 ease-in-out ${isGenerating ? 'bg-gray-50 dark:bg-slate-800 cursor-not-allowed text-gray-400 dark:text-gray-500' : 'hover:shadow-md'}`} rows={1} />
                  <div className="absolute top-1/2 -translate-y-1/2 left-4"><button type="button" className="p-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700"><Paperclip size={20} /></button></div>
                  <div className="absolute top-1/2 -translate-y-1/2 right-4">
                    {isGenerating ? (
                      <button
                        type="button"
                        onClick={handleStopGeneration}
                        className="size-10 rounded-xl bg-red-500 text-white flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-red-500/30 hover:scale-105 active:scale-95"
                      >
                        <Square size={20} fill="currentColor" />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="size-10 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-blue-500/30 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                        disabled={!input.trim()}
                      >
                        <Send size={20} />
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </Card>
        </div>

        <div className="w-[350px] flex-shrink-0 flex flex-col gap-6 h-full overflow-y-auto">

          {/* New HoloMemory Widget (Top Priority) */}
          <Card variant="glass" padding="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2"><Aperture size={20} className="text-rose-500" /> 全息片刻</h3>
              <a href="/platform/memory" className="text-xs text-slate-500 hover:text-rose-500 dark:text-slate-400 transition-colors flex items-center gap-1">全部 <ChevronRight size={12} /></a>
            </div>

            <div className="space-y-3">
              {recentMemories.map(memory => (
                <div key={memory.id} className="flex gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl hover:bg-white dark:hover:bg-slate-800 hover:shadow-sm transition-all cursor-pointer border border-transparent hover:border-slate-100 dark:hover:border-slate-700">
                  <div className="mt-1 flex-shrink-0">
                    <div className="w-8 h-8 rounded-lg bg-white dark:bg-slate-900 flex items-center justify-center shadow-sm border border-slate-100 dark:border-slate-800">
                      {getMemoryIcon(memory.type)}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-0.5">
                      <h4 className="text-sm font-semibold text-gray-800 dark:text-slate-200 truncate pr-2">{memory.title}</h4>
                      <span className="text-[10px] text-slate-400 flex-shrink-0 whitespace-nowrap">{getRelativeTime(memory.timestamp)}</span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mb-1.5">{memory.summary}</p>

                    {/* Social Graph Elements (Face Pile) */}
                    {memory.metadata.people && memory.metadata.people.length > 0 && (
                      <div className="flex items-center gap-2">
                        <div className="flex items-center -space-x-1.5">
                          {memory.metadata.people.slice(0, 3).map((p, i) => (
                            <img
                              key={i}
                              src={p.avatar}
                              alt={p.name}
                              title={p.name}
                              className="w-4 h-4 rounded-full border border-white dark:border-slate-800 ring-1 ring-slate-50 dark:ring-slate-700 object-cover"
                            />
                          ))}
                        </div>
                        <span className="text-[10px] text-slate-400 dark:text-slate-500">
                          {memory.metadata.people.length > 3 ? `+${memory.metadata.people.length - 3} 人参与` : '参与'}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              <button className="w-full py-2 flex items-center justify-center gap-2 text-xs font-medium text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg transition-colors border border-dashed border-slate-200 dark:border-slate-700 hover:border-rose-200">
                <Plus size={14} /> 记录新瞬间
              </button>
            </div>
          </Card>

          {/* Quick Actions (Middle) */}
          <Card variant="glass" padding="p-5">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2"><Sparkles size={20} className="text-blue-600 dark:text-blue-400" /> 快捷指令</h3>
            <div className="grid grid-cols-2 gap-3">
              <a href="/platform/tools/text/translator" className="group bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 rounded-xl p-4 border-2 border-transparent hover:border-current hover:shadow-md transition-all">
                <div className="size-12 rounded-xl bg-purple-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-md"><Languages size={24} className="text-white" /></div>
                <h4 className="font-semibold text-gray-900 dark:text-white text-sm">AI 翻译</h4>
              </a>
              <a href="/platform/tools/analysis/chart-builder" className="group bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-xl p-4 border-2 border-transparent hover:border-current hover:shadow-md transition-all">
                <div className="size-12 rounded-xl bg-blue-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-md"><BarChart3 size={24} className="text-white" /></div>
                <h4 className="font-semibold text-gray-900 dark:text-white text-sm">图表生成</h4>
              </a>
              <a href="/platform/knowledge/pending" className="col-span-2 group bg-emerald-50 dark:bg-emerald-900/20 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 rounded-xl p-4 border-2 border-transparent hover:border-current hover:shadow-md transition-all flex items-center gap-4">
                <div className="size-10 rounded-xl bg-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-md"><Database size={20} className="text-white" /></div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white text-sm">导入新知识</h4>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400">支持 PDF, URL, 视频等</p>
                </div>
              </a>
            </div>
          </Card>

          {/* Trending Communities (Bottom) */}
          <Card className="bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 dark:from-indigo-900/20 dark:via-blue-900/10 dark:to-purple-900/20 border border-indigo-200/50 dark:border-indigo-900/30" padding="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2"><Compass size={20} className="text-indigo-600 dark:text-indigo-400" /> 发现社区</h3>
              <a href="/platform/community/explore" className="text-xs text-slate-500 hover:text-indigo-500 dark:text-slate-400 transition-colors flex items-center gap-1">更多 <ChevronRight size={12} /></a>
            </div>

            <div className="space-y-3">
              {/* Community Item 1 */}
              <div className="flex items-center gap-3 bg-white/70 dark:bg-slate-800/70 p-3 rounded-xl border border-white/50 dark:border-slate-700/50 hover:bg-white dark:hover:bg-slate-800 transition-all cursor-pointer group">
                <div className="size-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-lg shadow-sm">
                  💰
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-0.5">
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white truncate">未来财经 DAO</h4>
                    <span className="text-[10px] bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-1.5 py-0.5 rounded-full font-medium">1.2k 成员</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">去中心化金融与宏观经济深度分析。</p>
                </div>
              </div>

              {/* Community Item 2 */}
              <div className="flex items-center gap-3 bg-white/70 dark:bg-slate-800/70 p-3 rounded-xl border border-white/50 dark:border-slate-700/50 hover:bg-white dark:hover:bg-slate-800 transition-all cursor-pointer group">
                <div className="size-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-lg shadow-sm">
                  🎮
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-0.5">
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white truncate">元宇宙公会</h4>
                    <span className="text-[10px] bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 px-1.5 py-0.5 rounded-full font-medium">5k 成员</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">链游打金策略与元宇宙生态研究。</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div >
    </div >
  );
};

export default Dashboard;
