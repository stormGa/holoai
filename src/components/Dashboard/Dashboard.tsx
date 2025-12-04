import React, { useState, useRef, useEffect } from 'react';
import { User, Cloud, Mic, FileText, Presentation, Sparkles, TrendingUp, CirclePlay, ThumbsUp, Database, Check, Video, Library, Bot, Paperclip, Send, BarChart3, LoaderCircle, CircleCheck, Clock, Sun, Lightbulb, Code } from 'lucide-react';

// Interfaces and Card component remain the same
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

    setMessages(prev => [...prev, { id: Date.now(), sender: 'user', text: messageText }]);
    if (!prompt) setInput('');

    setTimeout(() => {
      setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'ai', text: `这是对 "${messageText}" 的一个模拟AI回复。` }]);
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
      <Card variant="glass" padding="p-3 md:p-4" className="mb-6">{/* ... Top Welcome Section ... */}</Card>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6" style={{height: 'calc(100% - 116px)'}}>
        <div className="xl:col-span-2">
          <Card variant="glass" className="flex flex-col h-full" padding="p-0">
            <div ref={chatContentRef} className="flex-1 overflow-y-auto p-6">
              {messages.length === 0 ? (
                <div className="flex flex-col justify-center items-center h-full text-center">{/* ... Empty State ... */}</div>
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
            <div className="shrink-0 p-4 bg-gradient-to-t from-white/90 via-white/90 to-transparent">{/* ... Floating Input Area ... */}</div>
          </Card>
        </div>
        <div className="flex flex-col gap-4 md:gap-6">{/* ... Right Column ... */}</div>
      </div>
    </div>
  );
};

export default Dashboard;
