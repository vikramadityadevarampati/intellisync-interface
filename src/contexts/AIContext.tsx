
import React, { createContext, useContext, useState, useCallback } from 'react';

export interface AIModel {
  id: string;
  name: string;
  provider: string;
  description: string;
}

export interface AIParameters {
  temperature: number;
  maxTokens: number;
  topP: number;
  frequencyPenalty: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface PromptTemplate {
  id: string;
  name: string;
  content: string;
  category: string;
}

interface AIContextType {
  selectedModel: AIModel | null;
  setSelectedModel: (model: AIModel) => void;
  parameters: AIParameters;
  setParameters: (params: Partial<AIParameters>) => void;
  messages: ChatMessage[];
  addMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  clearMessages: () => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  promptTemplates: PromptTemplate[];
  selectedTemplate: PromptTemplate | null;
  setSelectedTemplate: (template: PromptTemplate | null) => void;
}

const AIContext = createContext<AIContextType | undefined>(undefined);

export const useAI = () => {
  const context = useContext(AIContext);
  if (!context) {
    throw new Error('useAI must be used within an AIProvider');
  }
  return context;
};

interface AIProviderProps {
  children: React.ReactNode;
}

export const AIProvider: React.FC<AIProviderProps> = ({ children }) => {
  const [selectedModel, setSelectedModel] = useState<AIModel | null>(null);
  const [parameters, setParametersState] = useState<AIParameters>({
    temperature: 0.7,
    maxTokens: 2048,
    topP: 0.9,
    frequencyPenalty: 0,
  });
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [promptTemplates] = useState<PromptTemplate[]>([
    {
      id: '1',
      name: 'Creative Writing',
      content: 'Write a creative story about...',
      category: 'Creative'
    },
    {
      id: '2',
      name: 'Code Review',
      content: 'Please review this code and suggest improvements...',
      category: 'Development'
    },
    {
      id: '3',
      name: 'Data Analysis',
      content: 'Analyze the following dataset and provide insights...',
      category: 'Analytics'
    }
  ]);
  const [selectedTemplate, setSelectedTemplate] = useState<PromptTemplate | null>(null);

  const setParameters = useCallback((params: Partial<AIParameters>) => {
    setParametersState(prev => ({ ...prev, ...params }));
  }, []);

  const addMessage = useCallback((message: Omit<ChatMessage, 'id' | 'timestamp'>) => {
    const newMessage: ChatMessage = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return (
    <AIContext.Provider value={{
      selectedModel,
      setSelectedModel,
      parameters,
      setParameters,
      messages,
      addMessage,
      clearMessages,
      isLoading,
      setIsLoading,
      promptTemplates,
      selectedTemplate,
      setSelectedTemplate,
    }}>
      {children}
    </AIContext.Provider>
  );
};
