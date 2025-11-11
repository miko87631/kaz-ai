
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Send, Cpu, Zap, Loader } from 'lucide-react';
import { generateChatResponse } from '../../services/geminiService';
import { ChatMessage } from '../../types';
import ChatMessageBubble from '../ui/ChatMessageBubble';
import SafeButton from '../ui/SafeButton';
import { useAppContext } from '../../contexts/AppContext';

const AiMentorPage: React.FC = () => {
  const { language, strings } = useAppContext();
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: strings.mentorGreeting[language] },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isThinkingMode, setIsThinkingMode] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  // Update initial greeting if language changes
  useEffect(() => {
    setMessages(currentMessages => {
        if(currentMessages.length === 1 && currentMessages[0].role === 'model') {
            return [{ role: 'model', text: strings.mentorGreeting[language] }];
        }
        return currentMessages;
    })
  }, [language, strings.mentorGreeting]);

  const handleSend = useCallback(async () => {
    if (input.trim() === '' || isLoading) return;

    const newUserMessage: ChatMessage = { role: 'user', text: input.trim() };
    setMessages(prev => [...prev, newUserMessage]);
    setInput('');
    setIsLoading(true);
    setMessages(prev => [...prev, { role: 'model', text: '', isThinking: true }]);
    
    try {
      const history = messages.filter(m => !m.isThinking);
      const response = await generateChatResponse(history, newUserMessage.text, isThinkingMode);
      const modelResponse: ChatMessage = { role: 'model', text: response.text };
      
      setMessages(prev => {
        const newMessages = [...prev];
        const thinkingMessageIndex = newMessages.findIndex(m => m.isThinking);
        if (thinkingMessageIndex !== -1) {
          newMessages[thinkingMessageIndex] = modelResponse;
        }
        return newMessages;
      });

    } catch (error) {
      console.error(error);
      const errorMessage: ChatMessage = { role: 'model', text: strings.mentorError[language] };
       setMessages(prev => {
        const newMessages = [...prev];
        const thinkingMessageIndex = newMessages.findIndex(m => m.isThinking);
        if (thinkingMessageIndex !== -1) {
          newMessages[thinkingMessageIndex] = errorMessage;
        }
        return newMessages;
      });
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, messages, isThinkingMode, language, strings]);
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full max-h-[calc(100vh-150px)] md:max-h-[calc(100vh-100px)] bg-light-bg dark:bg-dark-bg">
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <ChatMessageBubble key={index} message={msg} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 bg-light-card dark:bg-dark-card border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300">{strings.aiMode[language]}</h3>
            <div className="flex items-center p-1 bg-gray-200 dark:bg-gray-900 rounded-full">
                <button 
                    onClick={() => setIsThinkingMode(false)}
                    className={`px-3 py-1 text-sm rounded-full transition-colors ${!isThinkingMode ? 'bg-brand-orange text-white shadow' : 'text-gray-500'}`}
                >
                    <div className="flex items-center"><Zap size={14} className="mr-1"/> {strings.modeFast[language]}</div>
                </button>
                <button 
                    onClick={() => setIsThinkingMode(true)}
                    className={`px-3 py-1 text-sm rounded-full transition-colors ${isThinkingMode ? 'bg-brand-orange text-white shadow' : 'text-gray-500'}`}
                >
                    <div className="flex items-center"><Cpu size={14} className="mr-1"/> {strings.modeThinking[language]}</div>
                </button>
            </div>
        </div>
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={isThinkingMode ? strings.placeholderComplex[language] : strings.placeholderSimple[language]}
            className="w-full p-3 pr-20 rounded-full bg-gray-200 dark:bg-gray-800 border-transparent focus:ring-2 focus:ring-brand-orange focus:border-transparent transition"
            disabled={isLoading}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-2">
             <SafeButton
                onPressedAsync={handleSend}
                className="bg-brand-orange text-white rounded-full p-2.5 hover:bg-orange-600 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                disabled={isLoading}
             >
                 {isLoading ? <Loader className="animate-spin" size={20} /> : <Send size={20} />}
             </SafeButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiMentorPage;