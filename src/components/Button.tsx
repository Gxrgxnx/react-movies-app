import React from 'react';

type ButtonProps = {
  title: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  customStyles?: React.CSSProperties;
};

export const Button = ({
  title,
  onClick,
  customStyles
}: ButtonProps) => {

  return(
    <button
      className="button"
      style={customStyles}
      onClick={onClick}
    >
      {title}
    </button>
  );
};
