"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { fetchFromAPI } from "@/lib/api";
import { useRouter } from "next/navigation";

const ChatMessage = ({ message, isBot }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className={`flex ${isBot ? "justify-start" : "justify-end"} mb-4`}
  >
    <div
      className={`px-4 py-2 rounded-xl max-w-[70%] ${
        isBot
          ? "bg-[#ffe8e8] text-gray-800"
          : "bg-[#8B4513] text-white"
      }`}
    >
      {message}
    </div>
  </motion.div>
);

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! I'm your Philatelic Assistant. How can I help you today?", isBot: true },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const router = useRouter();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    // Add user message
    setMessages(prev => [...prev, { text: inputMessage, isBot: false }]);
    const userMessage = inputMessage; // Store message before clearing input
    setInputMessage("");
    setIsLoading(true);

    try {
        const res = await fetchFromAPI(`philatelist/chatBotResponse/?query=${encodeURIComponent(userMessage)}`);
        alert(res)
        if (res.success) {
            if (res.data.model === "genai") {
                setMessages(prev => [...prev, { text: res.data.response, isBot: true }]);
            } else if (res.data.model === "intent") {
                // Handle intent-based navigation while keeping chatbot open
                router.push(res.data.route);
                setMessages(prev => [...prev, { 
                    text: "I'll redirect you to the relevant page.", 
                    isBot: true 
                }]);
            }
        } else {
            setMessages(prev => [...prev, { 
                text: "I'm sorry, I encountered an error. Please try again.", 
                isBot: true 
            }]);
        }
    } catch (error) {
        console.error("Chatbot error:", error);
        setMessages(prev => [...prev, { 
            text: "I'm sorry, something went wrong. Please try again.", 
            isBot: true 
        }]);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-5 right-5 w-16 h-16 bg-[#ffe8e8] rounded-full shadow-lg z-50 flex items-center justify-center text-[#8B4513] hover:bg-[#ffe8e8]/90 transition-colors"
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9.06 9.06 0 0 0 8 15z"/>
          </svg>
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-5 w-[1200px] h-[85vh] bg-white rounded-2xl shadow-2xl z-40 flex flex-col overflow-hidden border border-gray-200"
          >
            {/* Header */}
            <div className="bg-[#ffe8e8] p-8 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-5 h-5 rounded-full bg-green-400 animate-pulse" />
                <h2 className="text-[#8B4513] text-2xl font-semibold">Philatelic Assistant</h2>
              </div>
              <Button
                variant="ghost"
                onClick={() => setIsOpen(false)}
                className="text-[#8B4513] hover:bg-[#ffe8e8]/50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                </svg>
              </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-8 bg-white">
              {messages.map((message, index) => (
                <ChatMessage key={index} message={message.text} isBot={message.isBot} />
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-[#ffe8e8] rounded-xl px-6 py-3 text-gray-600 text-lg">
                    Typing...
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-8 bg-white border-t border-gray-100">
              <div className="flex gap-4 bg-gray-50 p-3 rounded-xl">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  // onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 border-0 focus:ring-0 bg-transparent text-lg"
                  disabled={isLoading}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={isLoading}
                  className="bg-[#8B4513] hover:bg-[#8B4513]/90 text-white px-8 py-6 text-lg"
                >
                  {isLoading ? (
                    <div className="w-7 h-7 border-3 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    "Send"
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
