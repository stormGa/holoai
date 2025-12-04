import React, { useState, useRef, useEffect } from 'react';
import { User, Cloud, Mic, FileText, Presentation, Sparkles, TrendingUp, CirclePlay, ThumbsUp, Database, Check, Video, Library, Bot, Paperclip, Send, BarChart3, LoaderCircle, CircleCheck, Clock, Sun, Lightbulb, Code } from 'lucide-react';

// A more versatile Card component
interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: string;
  variant?: 'default' | 'glass';
}
const Card: React.FC<CardProps> = ({ children, className = '', padding = 'p-6', variant = 'default' }) => {
  const baseStyle = "rounded-2xl shadow-lg";
  const variantStyle = { default: "bg-white border border-gray-200/50", glass: "bg-white/80 backdrop-blur-sm border border-gray-200/50" };
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
  const chatContentRef = useRef<HTMLDivElement>(null);

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

    setTimeout(() => {
      const aiMessage: Message = { id: Date.now() + 1, sender: 'ai', text: `这是对 "${messageText}" 的一个模拟AI回复。这是一个非常长的回复，用来测试当内容超出卡片高度时，是否会出现内部滚动条，而不是将整个卡片撑开。我们需要确保这个行为是正确的，以提供良好的用户体验。` };
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  const promptStarters = [
    { icon: Lightbulb, text: "给我一些关于项目重构的建议" },
    { icon: Code, text: "用 Python 写一个快速排序算法" },
    { icon: FileText, text: "帮我总结一下这篇文档的核心内容" },
    { icon: Library, text: "解释一下 React 中的 “Hooks” 是什么" },
  ];

  return (
    <div className="h-full w-full bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/20 p-4 md:p-6 lg:p-8 overflow-y-auto">
      {/* Top Welcome Section */}
      <Card variant="glass" padding="p-3 md:p-4" className="mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 md:gap-6">
          <div className="flex items-center gap-4">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-lg md:text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">早上好，欢迎回来</h1>
                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 rounded-full border border-amber-200/50">
                  <Sun className="size-3.5 text-amber-500" />
                  <span className="text-xs font-medium text-amber-700">晴朗 22°C</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-1">今天也是充满活力的一天</p>
            </div>
          </div>
          <div className="flex items-center gap-4 md:gap-8 w-full sm:w-auto justify-between sm:justify-start">
            <div className="flex items-center gap-3"><div className="size-9 rounded-xl bg-gray-50 flex items-center justify-center border border-gray-200"><User size={16} className="text-gray-600" /></div><div><p className="text-xs text-gray-500">账户等级</p><p className="text-sm font-semibold text-gray-900">普通用户</p></div></div>
            <div className="w-px h-8 bg-gray-200 hidden sm:block"></div>
            <div className="flex items-center gap-3"><div className="size-9 rounded-xl bg-blue-50 flex items-center justify-center border border-blue-200"><Database size={16} className="text-blue-600" /></div><div><p className="text-xs text-gray-500">知识库</p><p className="text-sm font-semibold text-gray-900">128 篇文档</p></div></div>
            <div className="w-px h-8 bg-gray-200 hidden sm:block"></div>
            <div className="flex items-center gap-3"><div className="size-9 rounded-xl bg-purple-50 flex items-center justify-center border border-purple-200"><Cloud size={16} className="text-purple-600" /></div><div><p className="text-xs text-gray-500">云存储空间</p><div className="flex items-center gap-2"><p className="text-sm font-semibold text-gray-900">12/50 GB</p><div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden"><div className="h-full bg-purple-600" style={{width: '24%'}}></div></div></div></div></div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6" style={{height: 'calc(100% - 116px)'}}>
        <div className="xl:col-span-2 flex flex-col">
          <Card variant="glass" className="flex flex-col flex-1" padding="p-0">
            <div ref={chatContentRef} className="flex-1 overflow-y-auto p-6 min-h-0">
              {messages.length === 0 ? (
                <div className="flex flex-col justify-center items-center h-full text-center">
                  <div className="relative size-20 mb-6"><div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 animate-pulse opacity-20 blur-xl"></div><div className="relative size-20 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg"><Sparkles className="size-10 text-white" /></div></div>
                  <h1 className="text-4xl font-bold text-gray-700">你好, {userName}</h1>
                  <p className="text-xl text-gray-500 mt-2">我能为你做些什么？</p>
                  <div className="grid grid-cols-2 gap-4 mt-12 w-full max-w-2xl">
                    {promptStarters.map((prompt, index) => (
                      <button key={index} onClick={(e) => handleSendMessage(e, prompt.text)} className="group flex items-start gap-3 p-4 rounded-xl border border-gray-200 hover:bg-gray-50 transition-all text-left"><div className="size-10 rounded-lg bg-gray-100 text-gray-600 flex items-center justify-center"><prompt.icon size={20} /></div><p className="text-sm font-medium text-gray-800">{prompt.text}</p></button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-8">
                  {messages.map((msg) => (
                    <div key={msg.id} className={`flex w-full ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`flex gap-3 items-start max-w-xl ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                        <div className={`size-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.sender === 'ai' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}>{msg.sender === 'ai' ? <Sparkles size={16} /> : <User size={16} />}</div>
                        <div className={`p-3 rounded-lg ${msg.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-white'}`}>
                          <p className="text-sm leading-relaxed">{msg.text}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="shrink-0 p-4 bg-gradient-to-t from-white/90 via-white/90 to-transparent">
              <div className="relative max-w-3xl mx-auto">
                <form onSubmit={handleSendMessage}>
                  <textarea value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendMessage(e); } }} placeholder="在这里输入您的问题..." className="w-full min-h-[56px] p-4 pl-14 pr-16 text-base rounded-2xl border-2 border-gray-200 bg-white shadow-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-50 resize-none transition-all" rows={1} />
                  <div className="absolute top-1/2 -translate-y-1/2 left-4"><button type="button" className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"><Paperclip size={20} /></button></div>
                  <div className="absolute top-1/2 -translate-y-1/2 right-4"><button type="submit" className="size-10 rounded-xl bg-blue-600 text-white flex items-center justify-center transition-all duration-200 shadow-md hover:bg-blue-700 disabled:bg-gray-300 disabled:shadow-none" disabled={!input.trim()}><Send size={20} /></button></div>
                </form>
              </div>
            </div>
          </Card>
        </div>
        <div className="flex flex-col gap-4 md:gap-6">
          <Card className="bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 border border-indigo-200/50" padding="p-5"><div className="flex items-center justify-between mb-4"><h3 className="text-lg font-bold text-gray-900 flex items-center gap-2"><TrendingUp size={20} className="text-indigo-600" /> 工作流看板</h3></div><div className="space-y-3"><div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 hover:bg-white transition-all cursor-pointer group"><div className="flex items-center justify-between mb-2"><h4 className="font-semibold text-gray-900 text-sm group-hover:text-indigo-600 transition-colors">会议纪要生成</h4><span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700 flex items-center gap-1.5"><LoaderCircle size={12} className="animate-spin" />运行中</span></div><div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500" style={{width: '60%'}}></div></div></div><div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 hover:bg-white transition-all cursor-pointer group"><div className="flex items-center justify-between mb-2"><h4 className="font-semibold text-gray-900 text-sm group-hover:text-indigo-600 transition-colors">季度报告生成</h4><span className="px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 flex items-center gap-1.5"><CircleCheck size={12} />已完成</span></div></div></div></Card>
          <Card variant="glass" padding="p-5"><h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2"><Sparkles size={20} className="text-blue-600" /> AI 创作启动器</h3><div className="grid grid-cols-2 gap-3"><a href="#" className="group bg-purple-50 hover:bg-purple-100 rounded-xl p-4 border-2 border-transparent hover:border-current hover:shadow-md transition-all"><div className="size-12 rounded-xl bg-purple-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-md"><FileText size={24} className="text-white" /></div><h4 className="font-semibold text-gray-900 text-sm">AI 智能报告</h4></a><a href="#" className="group bg-blue-50 hover:bg-blue-100 rounded-xl p-4 border-2 border-transparent hover:border-current hover:shadow-md transition-all"><div className="size-12 rounded-xl bg-blue-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-md"><Presentation size={24} className="text-white" /></div><h4 className="font-semibold text-gray-900 text-sm">AI PPT 生成</h4></a></div></Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
