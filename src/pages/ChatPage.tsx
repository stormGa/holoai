import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Sparkles, User, Lightbulb, Code, FileText, BookOpen } from 'lucide-react';

interface Message {
  id: number;
  sender: 'ai' | 'user';
  text: string;
}

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const userName = "Developer";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = (e: React.FormEvent, prompt?: string) => {
    e.preventDefault();
    const messageText = prompt || input;
    if (!messageText.trim()) return;

    setMessages(prev => [...prev, { id: Date.now(), sender: 'user', text: messageText }]);
    if (!prompt) setInput('');

    // Mock AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'ai', text: `这是对 "${messageText}" 的一个模拟AI回复。` }]);
    }, 1000);
  };

  const promptStarters = [
    { icon: Lightbulb, text: "给我一些关于项目重构的建议" },
    { icon: Code, text: "用 Python 写一个快速排序算法" },
    { icon: FileText, text: "帮我总结一下这篇文档的核心内容" },
    { icon: BookOpen, text: "解释一下 React 中的 “Hooks” 是什么" },
  ];

  return (
    <div className="flex flex-col h-full bg-white relative">
      <div className="flex-1 overflow-y-auto p-6 pb-32"> {/* Add padding-bottom to avoid overlap with input */}
        {messages.length === 0 ? (
          // Gemini-style Empty State
          <div className="flex flex-col justify-center items-center h-full text-center">
            <div className="relative size-20 mb-6">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 animate-pulse opacity-20 blur-xl"></div>
              <div className="relative size-20 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg">
                <Sparkles className="size-10 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-700">你好, {userName}</h1>
            <p className="text-xl text-gray-500 mt-2">我能为你做些什么？</p>
            <div className="grid grid-cols-2 gap-4 mt-12 w-full max-w-2xl">
              {promptStarters.map((prompt, index) => {
                const Icon = prompt.icon;
                return (
                  <button key={index} onClick={(e) => handleSendMessage(e, prompt.text)} className="group flex items-start gap-3 p-4 rounded-xl border border-gray-200 hover:bg-gray-50 transition-all text-left">
                    <div className="size-10 rounded-lg bg-gray-100 text-gray-600 flex items-center justify-center">
                      <Icon size={20} />
                    </div>
                    <p className="text-sm font-medium text-gray-800">{prompt.text}</p>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          // Messages List
          <div className="space-y-8">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex gap-4 items-start`}>
                <div className={`size-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.sender === 'ai' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}>
                  {msg.sender === 'ai' ? <Sparkles size={16} /> : <User size={16} />}
                </div>
                <div className="flex flex-col">
                  <p className="font-semibold text-gray-800">{msg.sender === 'ai' ? 'AI 助手' : '你'}</p>
                  <div className="mt-1 text-gray-700 leading-relaxed">
                    {msg.text}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Gemini-style Floating Input */}
      <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-white via-white to-transparent">
        <div className="relative max-w-4xl mx-auto">
          <form onSubmit={handleSendMessage}>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendMessage(e); } }}
              placeholder="在这里输入您的问题..."
              className="w-full min-h-[56px] p-4 pl-14 pr-16 text-base rounded-2xl border-2 border-gray-200 bg-white shadow-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-50 resize-none transition-all"
              rows={1}
            />
            <div className="absolute top-1/2 -translate-y-1/2 left-4">
              <button type="button" className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
                <Paperclip size={20} />
              </button>
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 right-4">
              <button type="submit" className="size-10 rounded-xl bg-blue-600 text-white flex items-center justify-center transition-all duration-200 shadow-md hover:bg-blue-700 disabled:bg-gray-300 disabled:shadow-none" disabled={!input.trim()}>
                <Send size={20} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
