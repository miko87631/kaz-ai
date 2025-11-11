
import React from 'react';
import { User, Bot, Loader } from 'lucide-react';
import { ChatMessage } from '../../types';
import { useAppContext } from '../../contexts/AppContext';

interface ChatMessageBubbleProps {
  message: ChatMessage;
}

const ChatMessageBubble: React.FC<ChatMessageBubbleProps> = ({ message }) => {
  const { language, strings } = useAppContext();
  const isUser = message.role === 'user';

  if (message.isThinking) {
    return (
        <div className={`flex items-end gap-2`}>
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-orange flex items-center justify-center text-white">
                <Bot size={20} />
            </div>
            <div className="bg-light-card dark:bg-dark-card rounded-2xl p-3 max-w-xs md:max-w-md lg:max-w-lg">
               <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
                  <Loader className="animate-spin" size={16}/>
                  <span>{strings.thinkingMessage[language]}</span>
               </div>
            </div>
        </div>
    );
  }

  return (
    <div className={`flex items-end gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-orange flex items-center justify-center text-white">
          <Bot size={20} />
        </div>
      )}
      <div
        className={`rounded-2xl p-3 max-w-xs md:max-w-md lg:max-w-lg ${
          isUser
            ? 'bg-brand-orange text-white rounded-br-none'
            : 'bg-light-card dark:bg-dark-card text-gray-800 dark:text-gray-200 rounded-bl-none'
        }`}
      >
        <p className="whitespace-pre-wrap">{message.text}</p>
      </div>
      {isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-gray-800 dark:text-gray-200">
          <User size={20} />
        </div>
      )}
    </div>
  );
};

export default ChatMessageBubble;