
import React from 'react';
import { ChevronDown, Cpu, Zap, Brain, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAI, AIModel } from '@/contexts/AIContext';

const models: AIModel[] = [
  {
    id: 'gpt-4-turbo',
    name: 'GPT-4 Turbo',
    provider: 'OpenAI',
    description: 'Most capable model for complex tasks'
  },
  {
    id: 'gpt-3.5-turbo',
    name: 'GPT-3.5 Turbo',
    provider: 'OpenAI',
    description: 'Fast and efficient for most tasks'
  },
  {
    id: 'claude-3-opus',
    name: 'Claude 3 Opus',
    provider: 'Anthropic',
    description: 'Excellent for analysis and reasoning'
  },
  {
    id: 'gemini-pro',
    name: 'Gemini Pro',
    provider: 'Google',
    description: 'Multimodal capabilities'
  },
];

const getModelIcon = (modelId: string) => {
  if (modelId.includes('gpt-4')) return <Brain className="w-4 h-4 text-ai-purple-600" />;
  if (modelId.includes('gpt-3.5')) return <Zap className="w-4 h-4 text-ai-blue-600" />;
  if (modelId.includes('claude')) return <Sparkles className="w-4 h-4 text-ai-purple-500" />;
  if (modelId.includes('gemini')) return <Cpu className="w-4 h-4 text-ai-blue-500" />;
  return <Brain className="w-4 h-4 text-muted-foreground" />;
};

export const ModelSelector: React.FC = () => {
  const { selectedModel, setSelectedModel } = useAI();

  React.useEffect(() => {
    if (!selectedModel) {
      setSelectedModel(models[0]);
    }
  }, [selectedModel, setSelectedModel]);

  return (
    <div className="w-full">
      <label className="text-sm font-medium text-foreground mb-2 block">
        AI Model
      </label>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-between h-12 px-4 border-2 border-border/50 hover:border-primary/50 transition-colors focus-ring"
            aria-label="Select AI Model"
          >
            <div className="flex items-center gap-3">
              {selectedModel && getModelIcon(selectedModel.id)}
              <div className="text-left">
                <div className="font-medium">
                  {selectedModel?.name || 'Select Model'}
                </div>
                <div className="text-xs text-muted-foreground">
                  {selectedModel?.provider}
                </div>
              </div>
            </div>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          className="w-80 p-2 bg-popover/95 backdrop-blur-xl border-2 border-border/50" 
          align="start"
        >
          <DropdownMenuLabel className="text-xs uppercase tracking-wide text-muted-foreground px-3">
            Available Models
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {models.map((model) => (
            <DropdownMenuItem
              key={model.id}
              onClick={() => setSelectedModel(model)}
              className="p-3 cursor-pointer hover:bg-accent/50 rounded-lg transition-colors focus:bg-accent/50"
            >
              <div className="flex items-start gap-3 w-full">
                {getModelIcon(model.id)}
                <div className="flex-1">
                  <div className="font-medium text-sm">{model.name}</div>
                  <div className="text-xs text-muted-foreground mb-1">
                    {model.provider}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {model.description}
                  </div>
                </div>
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
