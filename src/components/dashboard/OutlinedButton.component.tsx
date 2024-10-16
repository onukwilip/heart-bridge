import React from "react";

interface OutlinedButtonProps {
  text: string;
  className?: string;
}

const OutlinedButton: React.FC<OutlinedButtonProps> = ({ text, className }) => {
  return (
    <button
      className={`py-2 px-4 rounded-md hover:bg-white/10 duration-300 border border-white ${className}`}
    >
      {text}
    </button>
  );
};

export default OutlinedButton;
