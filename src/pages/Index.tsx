
import React from 'react';
import { Header } from '@/components/Header';
import { ModelSelector } from '@/components/ModelSelector';
import { ParametersPanel } from '@/components/ParametersPanel';
import { PromptEditor } from '@/components/PromptEditor';
import { ChatInterface } from '@/components/ChatInterface';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { AIProvider } from '@/contexts/AIContext';

const Index = () => {
  return (
    <ThemeProvider>
      <AIProvider>
        <div className="min-h-screen bg-background">
          {/* Background gradient */}
          <div className="fixed inset-0 bg-gradient-radial opacity-30 pointer-events-none" />
          
          <Header />
          
          <main className="container mx-auto px-4 py-8 relative">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-8rem)]">
              {/* Left Sidebar - Controls */}
              <div className="lg:col-span-1 space-y-6">
                <ModelSelector />
                <div className="hidden lg:block">
                  <ParametersPanel />
                </div>
              </div>
              
              {/* Main Content Area */}
              <div className="lg:col-span-2 flex flex-col gap-6">
                <PromptEditor />
                
                {/* Mobile Parameters Panel */}
                <div className="lg:hidden">
                  <ParametersPanel />
                </div>
                
                <div className="flex-1">
                  <ChatInterface />
                </div>
              </div>
              
              {/* Right Sidebar - Future extensions */}
              <div className="lg:col-span-1 hidden lg:block">
                <div className="h-full bg-gradient-to-b from-card/50 to-card/20 rounded-xl border-2 border-border/50 backdrop-blur-sm p-6 flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mb-4">
                    <span className="text-2xl">🚀</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Coming Soon</h3>
                  <p className="text-sm text-muted-foreground">
                    Advanced features like file uploads, conversation history, and model comparison will be available here.
                  </p>
                </div>
              </div>
            </div>
          </main>
        </div>
      </AIProvider>
    </ThemeProvider>
  );
};

export default Index;
