
import React from 'react';

interface InteractiveChoiceButtonProps {
  choiceText: string;
  onClick: () => void;
  disabled?: boolean;
  index: number;
}

const InteractiveChoiceButton: React.FC<InteractiveChoiceButtonProps> = ({ choiceText, onClick, disabled, index }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full text-left p-4 my-2 rounded-lg transition-all duration-200 ease-in-out transform 
        bg-tertiary-dark hover:bg-accent-yellow text-text-light hover:text-gray-900 
        focus:outline-none focus:ring-4 focus:ring-accent-orange focus:ring-opacity-75
        disabled:bg-gray-600 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-gray-600
        shadow-[4px_4px_0px_rgba(0,0,0,0.7)] hover:shadow-[6px_6px_0px_var(--color-accent-orange)] active:shadow-[2px_2px_0px_var(--color-accent-orange)]
        hover:-translate-y-1 active:translate-y-0.5
        font-luckiestguy tracking-wider text-lg border-2 border-gray-500 hover:border-accent-orange
      `}
      aria-label={`Choice ${index + 1}: ${choiceText}`}
    >
      <span className="font-bangers text-2xl mr-3 text-accent-yellow group-hover:text-gray-900">{index + 1}.</span>
      {choiceText}
    </button>
  );
};

export default InteractiveChoiceButton;