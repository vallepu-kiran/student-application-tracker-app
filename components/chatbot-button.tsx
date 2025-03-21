"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, X } from 'lucide-react';
import { Chatbot } from "./chatbot";

export function ChatbotButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        className="fixed bottom-4 right-4 rounded-full h-12 w-12 p-0 shadow-lg"
        onClick={() => setIsOpen(true)}
      >
        <MessageCircle className="h-6 w-6" />
        <span className="sr-only">Open chat assistant</span>
      </Button>

      {isOpen && (
        <div className="fixed bottom-4 right-4 w-80 md:w-96 h-[500px] bg-white border rounded-lg shadow-xl flex flex-col z-50">
          <div className="flex items-center justify-between border-b p-4">
            <h3 className="font-semibold">Application Assistant</h3>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
          <Chatbot />
        </div>
      )}
    </>
  );
}