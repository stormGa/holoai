import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Sparkles, User, Lightbulb, Code, FileText, BookOpen, Clock, MessageSquare, Plus } from 'lucide-react';

interface Message {
    id: number;
    sender: 'ai' | 'user';
    text: string;
}

interface ChatSession {
    id: string;
    title: string;
    date: string;
    messages: Message[];
}

const ChatPage: React.FC = () => {
    const [sessions, setSessions] = useState<ChatSession[]>([
        {
            id: '1',
            title: '项目重构建议',
            date: '今天',
            messages: [
                { id: 1, sender: 'user', text: '给我一些关于项目重构的建议' },
                { id: 2, sender: 'ai', text: '项目重构是一个复杂的过程，建议先从代码规范和模块化入手...' }
            ]
        }
    ]);
    const [currentSessionId, setCurrentSessionId] = useState<string>('1');
    const [input, setInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const userName = "Developer";

    const currentSession = sessions.find(s => s.id === currentSessionId);
    const messages = currentSession?.messages || [];

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const createNewChat = () => {
        const newId = Date.now().toString();
        const newSession: ChatSession = {
            id: newId,
            title: '新对话',
            date: '刚刚',
            messages: []
        };
        setSessions(prev => [newSession, ...prev]);
        setCurrentSessionId(newId);
        setInput('');
    };

    const selectChat = (id: string) => {
        setCurrentSessionId(id);
    };

    const handleSendMessage = (e: React.FormEvent, prompt?: string) => {
        e.preventDefault();
        const messageText = prompt || input;
        if (!messageText.trim()) return;

        const newMessage: Message = { id: Date.now(), sender: 'user', text: messageText };

        setSessions(prev => prev.map(session => {
            if (session.id === currentSessionId) {
                const updatedMessages = [...session.messages, newMessage];
                // Update title if it's the first message and title is default
                const updatedTitle = session.messages.length === 0 ? messageText.slice(0, 10) + (messageText.length > 10 ? '...' : '') : session.title;
                return { ...session, messages: updatedMessages, title: updatedTitle };
            }
            return session;
        }));

        if (!prompt) setInput('');

        setTimeout(() => {
            const aiMessage: Message = { id: Date.now() + 1, sender: 'ai', text: `这是对 "${messageText}" 的模拟回复。` };
            setSessions(prev => prev.map(session => {
                if (session.id === currentSessionId) {
                    return { ...session, messages: [...session.messages, aiMessage] };
                }
                return session;
            }));
        }, 1000);
    };

    const promptStarters = [
        { icon: Lightbulb, text: "给我一些关于项目重构的建议" },
        { icon: Code, text: "用 Python 写一个快速排序算法" },
        { icon: FileText, text: "帮我总结一下这篇文档的核心内容" },
        { icon: BookOpen, text: "解释一下 React 中的 “Hooks” 是什么" },
    ];

    return (
        <div className="flex h-full bg-white dark:bg-gray-900 transition-colors duration-300">

            {/* History Sidebar */}
            <div className="w-64 border-r border-gray-200 dark:border-gray-800 flex flex-col bg-gray-50/50 dark:bg-gray-900/50 transition-colors duration-300">
                <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
                    <h2 className="font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-2"><Clock size={18} /> 历史记录</h2>
                    <button
                        onClick={createNewChat}
                        className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg text-gray-600 dark:text-gray-400 transition-colors"
                        title="新对话"
                    >
                        <Plus size={18} />
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto p-2 space-y-1">
                    {sessions.map((session) => (
                        <button
                            key={session.id}
                            onClick={() => selectChat(session.id)}
                            className={`w-full text-left p-3 rounded-lg transition-all group ${currentSessionId === session.id ? 'bg-white dark:bg-gray-800 shadow-sm ring-1 ring-gray-200 dark:ring-gray-700' : 'hover:bg-white dark:hover:bg-gray-800 hover:shadow-sm'}`}
                        >
                            <div className="flex items-center gap-3 mb-1">
                                <MessageSquare size={14} className={`transition-colors ${currentSessionId === session.id ? 'text-blue-500 dark:text-blue-400' : 'text-gray-400 dark:text-gray-500 group-hover:text-blue-500 dark:group-hover:text-blue-400'}`} />
                                <span className={`text-sm font-medium truncate ${currentSessionId === session.id ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>{session.title}</span>
                            </div>
                            <p className="text-xs text-gray-400 dark:text-gray-500 pl-6.5">{session.date}</p>
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col h-full min-w-0">

                {/* Header (Fixed Height) */}
                <header className="p-4 border-b border-gray-200 dark:border-gray-800 flex-shrink-0 transition-colors duration-300">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-white">AI 对话</h2>
                </header>

                {/* Message Area (Flexible Height with Internal Scrolling) */}
                <div className="flex-1 overflow-y-auto p-6 min-h-0">
                    {messages.length === 0 ? (
                        <div className="flex flex-col justify-center items-center h-full text-center">
                            <div className="relative size-20 mb-6"><div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 animate-pulse opacity-20 blur-xl"></div><div className="relative size-20 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg"><Sparkles className="size-10 text-white" /></div></div>
                            <h1 className="text-4xl font-bold text-gray-700 dark:text-white">你好, {userName}</h1>
                            <p className="text-xl text-gray-500 dark:text-gray-400 mt-2">我能为你做些什么？</p>
                            <div className="grid grid-cols-2 gap-4 mt-12 w-full max-w-2xl">
                                {promptStarters.map((prompt, index) => (
                                    <button key={index} onClick={(e) => handleSendMessage(e, prompt.text)} className="group flex items-start gap-3 p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all text-left"><div className="size-10 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 flex items-center justify-center"><prompt.icon size={20} /></div><p className="text-sm font-medium text-gray-800 dark:text-gray-200">{prompt.text}</p></button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-8">
                            {messages.map((msg) => (
                                <div key={msg.id} className={`flex w-full ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`flex gap-4 items-start max-w-2xl ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                                        <div className={`size-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.sender === 'ai' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}>{msg.sender === 'ai' ? <Sparkles size={16} /> : <User size={16} />}</div>
                                        <div className={`p-3 rounded-lg ${msg.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-800 dark:text-gray-200'}`}>
                                            <p className="text-sm leading-relaxed">{msg.text}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>
                    )}
                </div>

                {/* Input Area (Fixed Height, Sticky at the bottom) */}
                <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 flex-shrink-0 transition-colors duration-300">
                    <div className="relative max-w-4xl mx-auto">
                        <form onSubmit={handleSendMessage}>
                            <textarea value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendMessage(e); } }} placeholder="在这里输入您的问题..." className="w-full min-h-[56px] p-4 pl-14 pr-16 text-base rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 dark:text-white shadow-sm focus:border-blue-500 dark:focus:border-blue-500 focus:ring-4 focus:ring-blue-50 dark:focus:ring-blue-900/20 resize-none transition-all dark:placeholder-gray-500" rows={1} />
                            <div className="absolute top-1/2 -translate-y-1/2 left-4"><button type="button" className="p-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"><Paperclip size={20} /></button></div>
                            <div className="absolute top-1/2 -translate-y-1/2 right-4"><button type="submit" className="size-10 rounded-xl bg-blue-600 text-white flex items-center justify-center transition-all duration-200 shadow-md hover:bg-blue-700 disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:shadow-none" disabled={!input.trim()}><Send size={20} /></button></div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatPage;
