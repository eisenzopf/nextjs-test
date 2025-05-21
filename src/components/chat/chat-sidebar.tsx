"use client";

import { PlusCircle } from "lucide-react";
import { Button } from "../ui/button";
import { useChat } from "./chat-context";

export function ChatSidebar() {
  const { 
    chatHistory, 
    currentChatId, 
    createNewChat, 
    selectChat,
    isLoading
  } = useChat();
  
  return (
    <div className="w-80 bg-gray-900 h-full flex flex-col">
      <div className="p-4 border-b border-gray-800">
        <h1 className="text-xl font-semibold text-white mb-4">Chat History</h1>
        <Button 
          onClick={createNewChat} 
          className="w-full bg-blue-600 hover:bg-blue-700 text-base text-white" 
          disabled={isLoading}
        >
          <PlusCircle className="mr-2 h-5 w-5" />
          New Chat
        </Button>
      </div>
      
      <div className="flex-1 overflow-auto p-3">
        <div className="space-y-2">
          {chatHistory.length === 0 ? (
            <div className="text-gray-400 text-center p-4">
              No chat history yet. Start a new chat!
            </div>
          ) : (
            chatHistory.map((chat) => (
              <Button
                key={chat.id}
                variant={currentChatId === chat.id ? "secondary" : "ghost"}
                className={`w-full justify-start text-left truncate text-base py-3 ${
                  currentChatId === chat.id 
                    ? "bg-gray-800 text-white border-l-4 border-blue-500" 
                    : "text-gray-300 hover:text-white hover:bg-gray-800"
                }`}
                onClick={() => selectChat(chat.id)}
                disabled={isLoading}
              >
                <span className="truncate">
                  {chat.title || "New Conversation"}
                </span>
              </Button>
            ))
          )}
        </div>
      </div>
      
      <div className="p-4 border-t border-gray-800 text-gray-400">
        <div className="text-center">
          Powered by Gemini Flash
        </div>
      </div>
    </div>
  );
} 