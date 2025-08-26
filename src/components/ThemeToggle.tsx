
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className="w-10 h-10 rounded-full border-2 border-border/50 hover:border-primary/50 transition-all duration-200 hover:scale-110 active:scale-95"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
      <div className="relative w-4 h-4">
        <Sun className={cn(
          "absolute inset-0 transition-all duration-300 rotate-0 scale-100",
          theme === 'dark' && "rotate-90 scale-0"
        )} />
        <Moon className={cn(
          "absolute inset-0 transition-all duration-300 rotate-90 scale-0",
          theme === 'dark' && "rotate-0 scale-100"
        )} />
      </div>
    </Button>
  );
};
