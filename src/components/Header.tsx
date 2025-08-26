
import React from 'react';
import { Brain, Github, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from './ThemeToggle';

export const Header: React.FC = () => {
  return (
    <header className="border-b border-border/50 bg-background/80 backdrop-blur-xl sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-neural rounded-xl flex items-center justify-center shadow-lg">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gradient">IntelliSync</h1>
            <p className="text-xs text-muted-foreground">AI Interface Platform</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            className="gap-2 text-muted-foreground hover:text-foreground"
            asChild
          >
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View on GitHub"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="gap-2 border-2 border-border/50 hover:border-primary/50"
            asChild
          >
            <a
              href="https://docs.example.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="w-4 h-4" />
              Docs
            </a>
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};
