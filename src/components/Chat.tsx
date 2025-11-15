import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Trash2 } from 'lucide-react';
import { sendChatMessage } from '../services/api';

interface Message {
  type: 'user' | 'bot';
  content: string;
}

function Chat() {
  const [messages, setMessages] = useState<Message[]>(() => {
    const savedMessages = localStorage.getItem('chatMessages');
    return savedMessages ? JSON.parse(savedMessages) : [{
      type: 'bot',
      content: '# Namaste! 🙏\n\nI\'m Roxone AI, your digital marketing assistant developed by Mr. Prabal Jaat. Ask me anything about digital marketing or Meta Ads optimization!'
    }];
  });
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleClearChat = () => {
    const initialMessage = {
      type: 'bot' as const,
      content: '# Namaste! 🙏\n\nI\'m Roxone AI, your digital marketing assistant developed by Mr. Prabal Jaat. Ask me anything about digital marketing or Meta Ads optimization!'
    };
    setMessages([initialMessage]);
    localStorage.setItem('chatMessages', JSON.stringify([initialMessage]));
  };

  const formatMessage = (content: string) => {
    return content
      .split('\n')
      .map((line) => {
        // Bold text
        line = line.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-primary">$1</strong>');
        
        // Headlines
        if (line.startsWith('# ')) {
          return `<h1 class="text-xl sm:text-2xl font-bold mb-3 text-primary">${line.slice(2)}</h1>`;
        }
        if (line.startsWith('## ')) {
          return `<h2 class="text-lg sm:text-xl font-bold mb-2 text-primary">${line.slice(3)}</h2>`;
        }
        
        // Lists
        if (line.startsWith('- ')) {
          return `<li class="ml-4 mb-1 text-sm sm:text-base flex items-start">
            <span class="mr-2 mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"></span>
            <span>${line.slice(2)}</span>
          </li>`;
        }
        
        // Regular paragraphs
        if (line.trim()) {
          return `<p class="mb-2 text-sm sm:text-base leading-relaxed">${line}</p>`;
        }
        
        return line;
      })
      .join('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = {
      type: 'user' as const,
      content: input
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const apiMessages = [
        ...messages.map(msg => ({
          role: msg.type === 'user' ? 'user' as const : 'assistant' as const,
          content: msg.content
        })),
        {
          role: 'user' as const,
          content: userMessage.content
        }
      ];

      const response = await sendChatMessage(apiMessages);
      
      setMessages(prev => [...prev, {
        type: 'bot',
        content: response.message
      }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, {
        type: 'bot',
        content: '## Error\n\nI apologize, but I encountered an error. Please try again.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const isFirstMessage = messages.length <= 1;

  return (
    <div className="max-w-5xl mx-auto px-2 sm:px-4 py-2 sm:py-4 flex flex-col h-[calc(100vh-4rem)]">
      {isFirstMessage ? (
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="text-center space-y-4 sm:space-y-6 max-w-lg">
            <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-6">Welcome to Roxone AI 🙏</h1>
            <p className="text-base sm:text-lg text-text-secondary">
              Your AI assistant for digital marketing and Meta Ads expertise. Ask anything about marketing strategies, campaign optimization, or advertising best practices.
            </p>
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto space-y-3 sm:space-y-4 mb-4 px-1">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex gap-2 sm:gap-4 ${
                message.type === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`chat-bubble ${
                  message.type === 'user' ? 'chat-bubble-user' : 'chat-bubble-bot'
                }`}
                dangerouslySetInnerHTML={{
                  __html: formatMessage(message.content)
                }}
              />
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="chat-bubble chat-bubble-bot">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      )}
      
      <div className="sticky bottom-0 bg-bg-primary pt-2">
        <form onSubmit={handleSubmit} className="flex gap-2 bg-bg-secondary p-2 rounded-2xl shadow-lg">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about digital marketing..."
            className="flex-1 bg-bg-primary rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary text-text-primary placeholder-text-secondary text-sm"
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={handleClearChat}
            className="btn-material btn-material-secondary hover:text-red-500"
            title="Clear chat"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <button
            type="submit"
            className="btn-material btn-material-primary disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading || !input.trim()}
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chat;