"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { text: "Hi! Ask me anything about philatelic material.", sender: "bot" },
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null); // Reference for scrolling to bottom
  const messagesContainerRef = useRef(null); // Reference for scrollable container

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

  // Scroll to the bottom every time the messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

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
          {/* Header */}
          <div className="flex items-center justify-between bg-brown text-beige p-3 rounded-t-lg">
            <h2 className="text-lg font-semibold">Philatelic Chatbot</h2>
            <Button
              variant="ghost"
              className="text-red-400 hover:text-red-600"
              onClick={toggleChatbox}
            >
              ✕
            </Button>
          </div>

          {/* Messages */}
          <div
            ref={messagesContainerRef}
            className="flex-grow p-3 overflow-y-auto space-y-3 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200"
            style={{ maxHeight: "calc(100% - 80px)" }}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`${
                  msg.sender === "bot"
                    ? "bg-beige text-brown"
                    : "bg-brown text-beige"
                } px-3 py-2 rounded-md`}
                style={{
                  maxWidth: "calc(100% - 60px)", // Limit message width
                  alignSelf: msg.sender === "bot" ? "flex-start" : "flex-end",
                  whiteSpace: "pre-wrap", // Preserve formatting and wrap text
                  wordWrap: "break-word", // Handle word breaks
                  overflowWrap: "break-word",
                }}
              >
                {msg.text}
              </div>
            ))}
            {loading && (
              <div className="text-brown text-center">Loading...</div>
            )}
            {/* Ref for scrolling */}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-gray-200 flex items-center bg-beige">
            <Input
              type="text"
              className="flex-grow mr-2 bg-white text-brown border border-brown rounded-md"
              value={input}
              onChange={handleInput}
              placeholder="Type your message..."
              disabled={loading}
            />
            <Button
              onClick={sendMessage}
              className="bg-brown text-beige"
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
