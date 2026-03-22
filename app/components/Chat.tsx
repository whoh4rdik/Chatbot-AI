'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import axios from 'axios';
import { SendIcon, LoadingIcon, BotIcon, UserIcon } from './Icons';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! 👋 I'm your Fitness Coach AI. I'm here to help you with workout routines, nutrition advice, fitness tips, and answer any fitness-related questions you have. What would you like to know today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Smart auto-scroll - only scroll if already at bottom
  const isAtBottom = useCallback(() => {
    if (!messagesContainerRef.current) return true;
    const container = messagesContainerRef.current;
    return (
      container.scrollHeight - container.clientHeight <= container.scrollTop + 50
    );
  }, []);

  const scrollToBottom = useCallback(() => {
    if (isAtBottom()) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isAtBottom]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const generateBotResponse = async (userMessage: string): Promise<string> => {
    try {
      const response = await axios.post('/api/chat', {
        message: userMessage,
        conversationHistory: messages,
      });

      if (response.data.success) {
        return response.data.message;
      } else {
        return response.data.error || 'Unable to generate response. Please try again.';
      }
    } catch (error: any) {
      console.error('API Error:', error);
      const errorMessage = error.response?.data?.error || 'Connection error. Please check your internet and API key configuration.';
      return errorMessage;
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Get bot response from API
      const botResponseText = await generateBotResponse(input);
      
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponseText,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      console.error('Error generating response:', error);
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, I encountered an error processing your request. Please try again.',
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-t-3xl shadow-2xl">
      {/* Chat Messages Container */}
      <div 
        ref={messagesContainerRef}
        className="flex-1 min-h-0 overflow-y-auto px-4 py-6 sm:px-6 space-y-4"
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}
          >
            {/* Avatar */}
            <div
              className={`flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-white text-sm font-semibold ${
                message.sender === 'user'
                  ? 'bg-gradient-to-br from-primary to-primary-dark'
                  : 'bg-gradient-to-br from-secondary to-pink-600'
              }`}
            >
              {message.sender === 'user' ? <UserIcon /> : <BotIcon />}
            </div>

            {/* Message Bubble */}
            <div
              className={`max-w-xs sm:max-w-sm lg:max-w-lg xl:max-w-2xl px-4 py-3 rounded-2xl ${
                message.sender === 'user'
                  ? 'bg-gradient-to-r from-primary to-primary-dark text-white rounded-br-none'
                  : 'bg-gray-100 text-gray-800 rounded-bl-none'
              }`}
            >
              <p className="text-sm sm:text-base leading-relaxed whitespace-pre-wrap break-words">{message.text}</p>
              <p
                className={`text-xs mt-2 opacity-70 ${
                  message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                }`}
              >
                {message.timestamp.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center bg-gradient-to-br from-secondary to-pink-600 text-white">
              <BotIcon />
            </div>
            <div className="bg-gray-100 px-4 py-3 rounded-2xl rounded-bl-none flex items-center gap-2">
              <LoadingIcon />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 px-4 py-4 sm:px-6 bg-white rounded-b-3xl">
        <div className="flex gap-2 sm:gap-3">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about workouts, diet, fitness tips..."
            disabled={isLoading}
            className="input-field flex-1 text-sm sm:text-base"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="btn-primary flex-shrink-0 p-3 sm:p-2.5 rounded-lg flex items-center justify-center"
            title="Send message"
          >
            <SendIcon />
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          💡 Tip: Ask me about workouts, nutrition, weight loss, strength training, or recovery!
        </p>
      </div>
    </div>
  );
}
