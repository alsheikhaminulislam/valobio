import { createContext,useState, ReactNode, FC, useEffect } from 'react';
import { useGlobalContext } from './ContextProvider';

// Define the type for the theme context value
interface ThemeContextType {
  theme: string;
  setTheme: (theme: string) => void;
}

// Create the context with default values
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// ThemeProvider component to provide the theme context to children
export const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      // Code is running in the browser
      return localStorage.getItem('theme') || 'light';
    }
    // Default theme for SSR or non-browser environments
    return 'light';
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Save theme to localStorage whenever it changes
      localStorage.setItem('theme', theme);
    }
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme context
export const useTheme = () => {
  const context = useGlobalContext();
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
