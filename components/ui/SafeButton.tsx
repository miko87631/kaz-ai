
import React, { useState } from 'react';

interface SafeButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onPressedAsync: () => Promise<void>;
  children: React.ReactNode;
}

const SafeButton: React.FC<SafeButtonProps> = ({ onPressedAsync, children, className, ...props }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    if (props.onClick) {
        props.onClick(event);
    }
    
    if (isLoading) return;

    setIsLoading(true);
    try {
      await onPressedAsync();
    } catch (error) {
      console.error("Async operation in SafeButton failed:", error);
      // Optionally show a toast or notification here
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      {...props}
      onClick={handleClick}
      disabled={isLoading || props.disabled}
      className={className}
    >
      {children}
    </button>
  );
};

export default SafeButton;
