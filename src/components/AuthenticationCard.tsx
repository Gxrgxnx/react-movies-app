import React, { PropsWithChildren } from "react";
import { useTheme } from '../context/ThemeContext';
import { appTheme } from '../styles/theme';
import { Button } from '.';

type AuthenticationCardProps = {
  header: string;
  buttonTitle: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const AuthenticationCard = ({
  header,
  buttonTitle,
  onClick,
  children
}: PropsWithChildren<AuthenticationCardProps>) => {
  const { toggledLightMode } = useTheme();
  const theme = toggledLightMode ? appTheme.light : appTheme.dark;

  return (
      <div 
        className='card'
        style={{ 
          backgroundColor: theme.accent1,
          borderColor: theme.primary
        }}
      >
        <header 
          className='header'
          style={{
            color: theme.primary
          }}
        >
          {header}
        </header>
        <div className='input-form-conatiner'>
          {children}
          <Button 
            title={buttonTitle} 
            onClick={onClick}
            customStyles={{
              padding: "15px",
              marginTop: "20px",
              boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
              color: theme.background,
              backgroundColor: theme.interactive,
              border: 0
            }}
          />
        </div>
      </div>
  );
};
