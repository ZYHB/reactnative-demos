import React, {useState} from 'react';

import defaultTheme from './default';
import dark from './dark';

export const themes = {
  default: defaultTheme,
  dark,
};

export const addTheme = (key, value) => (themes[key] = value);

export const ThemeContext = React.createContext();

export const ThemeContextProvider = ({children}) => {
  const [theme, changeTheme] = useState('default');
  return (
    <ThemeContext.Provider
      value={{
        theme: themes[theme],
        themeName: theme,
        changeTheme,
      }}>
      {children}
    </ThemeContext.Provider>
  );
};
