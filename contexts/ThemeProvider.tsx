'use client';
import { PropsWithChildren, createContext, useContext, useEffect } from 'react';

export const ThemeContext = createContext({
  color: appConfig.DEFAULT_THEME_COLOR || THEME_COLORS[0],
  mode: appConfig.DEFAULT_THEME_MODE || THEME_MODES[0],
  setColor: (color: (typeof THEME_COLORS)[number]) => {
    color;
  },
  setMode: (mode: (typeof THEME_MODES)[number]) => {
    mode;
  },
} as const);

export const ThemeContextProvider = ThemeContext.Provider;
export const useThemeContext = () => useContext(ThemeContext);

import { FC, memo } from 'react';
import dynamic from 'next/dynamic';
import { appConfig } from 'config/appConfig';
import { THEME_COLORS, THEME_MODES } from 'constants/vars';
import { useStickyState } from 'hooks';

type ThemeContextProps = unknown;

const ThemeProviderComponent: FC<PropsWithChildren<ThemeContextProps>> = memo(({ children }) => {
  const [color, setColor] = useStickyState(
    appConfig.DEFAULT_THEME_COLOR || THEME_COLORS[0],
    'theme-color'
  );
  const [mode, setMode] = useStickyState(
    appConfig.DEFAULT_THEME_MODE || THEME_MODES[1],
    'theme-mode'
  );

  useEffect(() => {
    document.documentElement.classList.remove(...document.documentElement.classList);

    document.documentElement.classList.add(`theme-${color}`);
    document.documentElement.classList.add(`theme-${mode}`);
    document.documentElement.classList.add(`${mode}`);

    if (
      mode === 'dark' ||
      (!('theme-mode' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('theme-dark');
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('theme-dark');
      document.documentElement.classList.remove('dark');
    }
  }, [color, mode]);

  return (
    <ThemeContextProvider
      value={
        {
          color: color as (typeof THEME_COLORS)[number],
          setColor,
          mode: mode as (typeof THEME_MODES)[number],
          setMode,
        } as const
      }
    >
      {children}
    </ThemeContextProvider>
  );
});

export const ThemeProvider = dynamic(() => Promise.resolve(ThemeProviderComponent), {
  ssr: false,
});
