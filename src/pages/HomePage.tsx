import React from 'react'
import { useTheme } from '../context/ThemeContext';
import { appTheme } from '../styles/theme';

export const Home = () => {
  const { toggledLightMode } = useTheme();
  const theme = toggledLightMode ? appTheme.light : appTheme.dark;

  return (
    <div 
      className='page-container' 
      style={{ backgroundColor: theme.background }}
      >
      <header 
        className="header"
        style={{ color: theme.primary }}
      >
        <p>
          Movies & Series home page
        </p>
      </header>
    </div>
  );
};
