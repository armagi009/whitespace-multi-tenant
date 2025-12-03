import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { createChatSession } from '../services/geminiService';
import { Send, Sparkles, User, Bot, Loader2 } from 'lucide-react';

interface CoPilotPanelProps {
    context: string;
    placeholder?: string;
    initialMessage?: string;
}

export const CoPilotPanel: React.FC<CoPilotPanelProps> = ({ context, placeholder = "Ask anything...", initialMessage }) => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatSessionRef = useRef<any>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Initialize Chat
    useEffect(() => {
        chatSessionRef.current = createChatSession(context);
        if (initialMessage) {
            setMessages([{
                id: 'init',
                role: 'model',
                text: initialMessage,
                timestamp: Date.now()
            }]);
        }
    }, [context, initialMessage]);

    // Auto-scroll
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || !chatSessionRef.current) return;

        const userMsg: ChatMessage = {
            id: `user_${Date.now()}`,
            role: 'user',
            text: input,
            timestamp: Date.now()
        };

        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsLoading(true);

        try {
            const result = await chatSessionRef.current.sendMessage({ message: userMsg.text });
            const modelMsg: ChatMessage = {
                id: `model_${Date.now()}`,
                role: 'model',
                text: result.text,
                timestamp: Date.now()
            };
            setMessages(prev => [...prev, modelMsg]);
        } catch (e) {
            console.error(e);
            setMessages(prev => [...prev, {
                id: `err_${Date.now()}`,
                role: 'model',
                text: "I'm having trouble connecting to the strategy engine. Please try again.",
                timestamp: Date.now()
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="flex flex-col h-full bg-slate-50 rounded-xl overflow-hidden border border-slate-200">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full text-slate-400 opacity-60">
                        <Sparkles size={32} className="mb-2" />
                        <p className="text-sm">Ready to brainstorm strategies.</p>
                    </div>
                )}
                
                {messages.map((msg) => (
                    <div 
                        key={msg.id} 
                        className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                    >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                            msg.role === 'user' ? 'bg-slate-200 text-slate-600' : 'bg-purple-100 text-purple-600'
                        }`}>
                            {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                        </div>
                        <div className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${
                            msg.role === 'user' 
                            ? 'bg-slate-800 text-white rounded-tr-none' 
                            : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none shadow-sm'
                        }`}>
                            <div dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br/>') }} />
                        </div>
                    </div>
                ))}
                
                {isLoading && (
                    <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
                            <Bot size={16} />
                        </div>
                        <div className="bg-white border border-slate-200 p-4 rounded-2xl rounded-tl-none shadow-sm flex items-center">
                             <div className="flex space-x-1">
                                <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-slate-200">
                <div className="relative">
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={placeholder}
                        className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none text-sm text-slate-800 h-12 min-h-[48px] max-h-32"
                        rows={1}
                    />
                    <button
                        onClick={handleSend}
                        disabled={!input.trim() || isLoading}
                        className="absolute right-2 top-2 p-2 bg-slate-900 text-white rounded-lg hover:bg-slate-700 disabled:opacity-50 disabled:bg-slate-300 transition-colors"
                    >
                        {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                    </button>
                </div>
                <div className="text-center mt-2">
                    <p className="text-[10px] text-slate-400">AI can make mistakes. Verify important information.</p>
                </div>
            </div>
        </div>
    );
};