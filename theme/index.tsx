import type { ReactNode } from 'react';
import React, { useState } from 'react';

import dark from './dark';
import defaultTheme from './default';

interface Theme {
  colors: {
    brand_primary: string;
    barStyle: string;
    heading_color: string;
    text_color: string;
    text_color_secondary: string;
    app_bar_tint_color: string;
    app_bar_text_color: string;
    app_bar_bg: string;
    tabbar_bg: string;
    tabbar_active_tint: string;
    tabbar_inactive_tint: string;
    page_bg: string;
    view_bg: string;
    btn_bg: string;
    btn_text: string;
    btn_tintColor: string;
  };
}

export const themes: Record<string, Theme> = {
  default: defaultTheme,
  dark,
};

export const addTheme = (key: string, value: Theme) => (themes[key] = value);

export const ThemeContext = React.createContext<{
  theme: Theme;
  themeName: string;
  changeTheme: (theme: string) => void;
} | null>(null);

interface ThemeContextProviderProps {
  children: ReactNode;
}

export const ThemeContextProvider = ({ children }: ThemeContextProviderProps) => {
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
