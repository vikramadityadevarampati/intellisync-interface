
import React from 'react';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Thermometer, Hash, Target, Waves } from 'lucide-react';
import { useAI } from '@/contexts/AIContext';

export const ParametersPanel: React.FC = () => {
  const { parameters, setParameters } = useAI();

  const parameterConfig = [
    {
      key: 'temperature' as const,
      label: 'Temperature',
      icon: <Thermometer className="w-4 h-4" />,
      min: 0,
      max: 2,
      step: 0.1,
      description: 'Controls randomness in responses'
    },
    {
      key: 'maxTokens' as const,
      label: 'Max Tokens',
      icon: <Hash className="w-4 h-4" />,
      min: 100,
      max: 4096,
      step: 100,
      description: 'Maximum response length'
    },
    {
      key: 'topP' as const,
      label: 'Top P',
      icon: <Target className="w-4 h-4" />,
      min: 0,
      max: 1,
      step: 0.05,
      description: 'Controls diversity of responses'
    },
    {
      key: 'frequencyPenalty' as const,
      label: 'Frequency Penalty',
      icon: <Waves className="w-4 h-4" />,
      min: 0,
      max: 2,
      step: 0.1,
      description: 'Reduces repetitive content'
    },
  ];

  return (
    <Card className="border-2 border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <div className="w-2 h-2 bg-neural rounded-full animate-pulse-soft"></div>
          Parameters
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {parameterConfig.map((config) => (
          <div key={config.key} className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium flex items-center gap-2">
                {config.icon}
                {config.label}
              </Label>
              <span className="text-sm font-mono text-muted-foreground bg-muted/50 px-2 py-1 rounded">
                {parameters[config.key]}
              </span>
            </div>
            <Slider
              value={[parameters[config.key]]}
              onValueChange={(value) => setParameters({ [config.key]: value[0] })}
              min={config.min}
              max={config.max}
              step={config.step}
              className="w-full"
              aria-label={`${config.label} slider`}
            />
            <p className="text-xs text-muted-foreground">
              {config.description}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
