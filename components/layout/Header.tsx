import React from 'react';
import { Sun, Moon, Globe } from 'lucide-react';
import { useAppContext } from '../../contexts/AppContext';

const Header: React.FC = () => {
  const { theme, toggleTheme, language, toggleLanguage } = useAppContext();

  return (
    <header className="bg-light-bg dark:bg-dark-bg sticky top-0 z-10 shadow-md dark:shadow-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100">
            KazAI
          </h1>
          <div className="flex items-center space-x-2">
            <button
                onClick={toggleLanguage}
                className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-card transition-colors"
                aria-label="Toggle language"
            >
                <div className="flex items-center">
                    <Globe size={20} />
                    <span className="ml-2 text-xs font-bold uppercase">{language}</span>
                </div>
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-card transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;