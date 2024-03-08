import React, { createContext, useContext, useState } from 'react';

type ThemeContextType = {
  toggledLightMode: boolean;
  toggleThemeChange: () => void;
};

const initialThemeContext: ThemeContextType = {
  toggledLightMode: false,
  toggleThemeChange: () => {},
};

const ThemeContext = createContext(initialThemeContext);

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [toggledLightMode, setToggledLightMode] = useState(false);
    const toggleThemeChange = () => {
      setToggledLightMode(!toggledLightMode);
    };
    return (
      <div>  
        <ThemeContext.Provider value={{toggledLightMode, toggleThemeChange}}>
          {children}
        </ThemeContext.Provider>
      </div>
    )
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeProvider;
