import React, { useState } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  btnType: 'primary' | 'secondary';
  onClick: () => Promise<void> | void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ btnType, onClick, children, disabled, ...props }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    if (disabled || isLoading) return;
    
    setIsLoading(true);
    try {
      await onClick();
    } catch (error) {
      console.error('Error in button click action:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const buttonStyles = btnType === 'primary'
    ? 'bg-[#1E874B] text-white'
    : 'bg-white text-black border border-gray-300';

  return (
    <button
      onClick={handleClick}
      disabled={isLoading || disabled}
      className={`rounded-[12px] pl-[14px] pr-[16px] py-[6px] ${buttonStyles} disabled:opacity-50 disabled:cursor-not-allowed flex`}
      style={{ alignItems: "center" }}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;