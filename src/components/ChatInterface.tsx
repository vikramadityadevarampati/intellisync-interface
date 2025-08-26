
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Copy, 
  Download, 
  Share, 
  User, 
  Bot, 
  Trash2, 
  MessageCircle,
  Loader2 
} from 'lucide-react';
import { useAI } from '@/contexts/AIContext';
import { cn } from '@/lib/utils';

export const ChatInterface: React.FC = () => {
  const { messages, clearMessages, isLoading } = useAI();

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const downloadChat = () => {
    const chatData = {
      timestamp: new Date().toISOString(),
      messages: messages,
    };
    const blob = new Blob([JSON.stringify(chatData, null, 2)], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `intellisync-chat-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const shareChat = () => {
    const shareText = messages.map(m => `${m.role}: ${m.content}`).join('\n\n');
    navigator.share?.({
      title: 'IntelliSync Chat',
      text: shareText,
    }).catch(() => {
      // Fallback to clipboard
      copyToClipboard(shareText);
    });
  };

  return (
    <Card className="border-2 border-border/50 bg-card/50 backdrop-blur-sm h-full flex flex-col">
      <CardHeader className="pb-4 border-b border-border/50">
        <CardTitle className="text-lg font-semibold flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-neural" />
            Conversation
            {messages.length > 0 && (
              <span className="bg-neural/10 text-neural px-2 py-1 rounded-full text-xs font-medium">
                {messages.length}
              </span>
            )}
          </div>
          {messages.length > 0 && (
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={downloadChat}
                className="gap-2"
              >
                <Download className="w-4 h-4" />
                Export
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={shareChat}
                className="gap-2"
              >
                <Share className="w-4 h-4" />
                Share
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearMessages}
                className="gap-2 text-destructive hover:text-destructive"
              >
                <Trash2 className="w-4 h-4" />
                Clear
              </Button>
            </div>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 p-0">
        <ScrollArea className="h-full p-6">
          {messages.length === 0 && !isLoading ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-neural rounded-full flex items-center justify-center">
                <Bot className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Start a conversation
                </h3>
                <p className="text-muted-foreground max-w-md">
                  Send a prompt to begin chatting with your selected AI model. 
                  Try asking questions, requesting analysis, or creative tasks.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {messages.map((message, index) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex gap-4 animate-fade-in",
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  {message.role === 'assistant' && (
                    <div className="w-8 h-8 bg-gradient-neural rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <div
                    className={cn(
                      "max-w-[70%] rounded-2xl p-4 relative group",
                      message.role === 'user'
                        ? 'bg-neural text-neural-foreground ml-auto'
                        : 'bg-muted/50 border border-border/50'
                    )}
                  >
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                      <p className="whitespace-pre-wrap m-0 leading-relaxed">
                        {message.content}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-border/30">
                      <span className="text-xs text-muted-foreground">
                        {message.timestamp.toLocaleTimeString()}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(message.content)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity gap-1 h-7 px-2"
                      >
                        <Copy className="w-3 h-3" />
                        Copy
                      </Button>
                    </div>
                  </div>
                  {message.role === 'user' && (
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-primary-foreground" />
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-4 animate-fade-in">
                  <div className="w-8 h-8 bg-gradient-neural rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="max-w-[70%] rounded-2xl p-4 bg-muted/50 border border-border/50">
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span className="text-sm text-muted-foreground">
                        AI is thinking...
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
