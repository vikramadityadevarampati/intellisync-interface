
import React, { useState, useRef } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Send, 
  Save, 
  FileText, 
  Sparkles, 
  Loader2,
  RotateCcw 
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAI } from '@/contexts/AIContext';

export const PromptEditor: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { 
    addMessage, 
    isLoading, 
    setIsLoading, 
    promptTemplates, 
    selectedTemplate,
    setSelectedTemplate 
  } = useAI();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;

    addMessage({ role: 'user', content: prompt });
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      addMessage({
        role: 'assistant',
        content: `This is a simulated response to: "${prompt.substring(0, 50)}..."`
      });
      setIsLoading(false);
    }, 2000);

    setPrompt('');
  };

  const handleTemplateSelect = (template: typeof promptTemplates[0]) => {
    setSelectedTemplate(template);
    setPrompt(template.content);
    textareaRef.current?.focus();
  };

  const handleClear = () => {
    setPrompt('');
    setSelectedTemplate(null);
    textareaRef.current?.focus();
  };

  return (
    <Card className="border-2 border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-neural" />
            Prompt Editor
          </div>
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <FileText className="w-4 h-4" />
                  Templates
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 bg-popover/95 backdrop-blur-xl border-2 border-border/50">
                <DropdownMenuLabel>Prompt Templates</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {promptTemplates.map((template) => (
                  <DropdownMenuItem
                    key={template.id}
                    onClick={() => handleTemplateSelect(template)}
                    className="cursor-pointer p-3 hover:bg-accent/50 rounded transition-colors"
                  >
                    <div>
                      <div className="font-medium text-sm">{template.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {template.category}
                      </div>
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            {prompt && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleClear}
                className="gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Clear
              </Button>
            )}
          </div>
        </CardTitle>
        {selectedTemplate && (
          <div className="text-xs text-muted-foreground bg-ai-purple-50 dark:bg-ai-purple-900/20 px-3 py-2 rounded-lg">
            Using template: <span className="font-medium">{selectedTemplate.name}</span>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            ref={textareaRef}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your prompt here... Try asking about anything!"
            className="min-h-32 text-base leading-relaxed resize-none border-2 border-border/50 focus:border-primary/50 transition-colors focus-ring"
            disabled={isLoading}
          />
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="gap-2"
                disabled={!prompt.trim()}
              >
                <Save className="w-4 h-4" />
                Save Template
              </Button>
            </div>
            <Button
              type="submit"
              disabled={!prompt.trim() || isLoading}
              className="bg-neural hover:bg-neural/90 text-neural-foreground gap-2 px-6 py-2 transition-all duration-200 hover:scale-105 active:scale-95"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Thinking...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Send Prompt
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
