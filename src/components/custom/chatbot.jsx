"use client";

import React, { useState } from "react";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { text: "Hi! Ask me anything about philatelic material.", sender: "bot" },
  ]);
  const [loading, setLoading] = useState(false);

  const toggleChatbox = () => {
    setIsOpen(!isOpen);
  };

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      // Call backend API
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch chatbot response");
      }

      const data = await response.json();
      const botMessage = {
        text: data.response || "Sorry, I couldn't understand that.",
        sender: "bot",
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = {
        text: "There was an error connecting to the chatbot. Please try again later.",
        sender: "bot",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <Button
        className="fixed bottom-5 right-5 bg-black text-white shadow-lg z-50"
        onClick={toggleChatbox}
      >
        {isOpen ? "Close Chat" : "Chat"}
      </Button>

      {/* Chatbox */}
      {isOpen && (
        <div className="fixed bottom-20 right-5 bg-white w-80 h-96 shadow-lg rounded-lg z-50 flex flex-col">
          <div className="flex items-center justify-between bg-gray-800 text-white p-3 rounded-t-lg">
            <h2 className="text-lg font-semibold">Philatelic Chatbot</h2>
            <Button
              variant="ghost"
              className="text-red-400 hover:text-red-600"
              onClick={toggleChatbox}
            >
              ✕
            </Button>
          </div>
          <div className="flex-grow p-3 overflow-y-auto space-y-3">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`${
                  msg.sender === "bot"
                    ? "bg-gray-100 text-left"
                    : "bg-blue-500 text-white text-right"
                } p-2 rounded-md`}
              >
                {msg.text}
              </div>
            ))}
            {loading && (
              <div className="text-gray-500 text-center">Loading...</div>
            )}
          </div>
          <div className="p-3 border-t border-gray-200 flex items-center">
            <Input
              type="text"
              className="flex-grow mr-2"
              value={input}
              onChange={handleInput}
              placeholder="Type your message..."
              disabled={loading}
            />
            <Button
              onClick={sendMessage}
              className="bg-black text-white"
              disabled={loading}
            >
              Send
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
