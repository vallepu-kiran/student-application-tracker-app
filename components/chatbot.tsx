"use client";

import { useChat } from "ai/react";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, Send } from "lucide-react";
import { getApplicationStatus, getUserData } from "@/lib/api";

export function Chatbot() {
  const [initialMessage, setInitialMessage] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: "/api/chat",
      initialMessages: [
        {
          id: "welcome-message",
          role: "assistant",
          content:
            "Hi there! I'm your application assistant. How can I help you with your LIT School application today?",
        },
      ],
    });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const sendInitialContext = async () => {
      if (!initialMessage) {
        try {
          const userData = await getUserData();
          const applicationStatus = await getApplicationStatus();

          if (userData && applicationStatus) {
            setInitialMessage(true);
          }
        } catch (error) {
          console.error("Error fetching context for chatbot:", error);
        }
      }
    };

    sendInitialContext();
  }, [initialMessage]);

  return (
    <div className="flex flex-col h-112">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {message.role === "assistant" && (
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage
                    src="/placeholder.svg?height=32&width=32"
                    alt="AI"
                  />
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>
              )}
              <div
                className={`rounded-lg px-3 py-2 max-w-[80%] ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                {message.content}
              </div>
              {message.role === "user" && (
                <Avatar className="h-8 w-8 ml-2">
                  <AvatarImage
                    src="/placeholder.svg?height=32&width=32"
                    alt="User"
                  />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage
                  src="/placeholder.svg?height=32&width=32"
                  alt="AI"
                />
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>
              <div className="rounded-lg px-3 py-2 max-w-[80%] bg-muted">
                <Loader2 className="h-4 w-4 animate-spin" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      <div className="p-6 border-t">
        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask a question..."
            className="flex-1"
          />
          <Button
            type="submit"
            size="icon"
            disabled={isLoading || !input.trim()}
          >
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </div>
    </div>
  );
}
