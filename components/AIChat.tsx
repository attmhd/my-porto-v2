import React, { useState, useRef, useEffect } from "react";
import { FaRobot, FaTimes, FaPaperPlane } from "react-icons/fa";
import { GenerateContentResponse } from "@google/genai";
import ReactMarkdown from "react-markdown";
import { sendMessageToGemini } from "../services/geminiService";
import { ChatMessage } from "../types";

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "model",
      text: "Hi! I am Attan's AI Assistant. Ask me anything about his skills, projects, or experience.",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      role: "user",
      text: input,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const modelMsgPlaceholder: ChatMessage = {
        role: "model",
        text: "",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, modelMsgPlaceholder]);

      const stream = await sendMessageToGemini(userMsg.text);

      let fullText = "";

      for await (const chunk of stream) {
        const c = chunk as GenerateContentResponse;
        if (c.text) {
          fullText += c.text;
          setMessages((prev) => {
            const newArr = [...prev];
            newArr[newArr.length - 1] = {
              ...newArr[newArr.length - 1],
              text: fullText,
            };
            return newArr;
          });
        }
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text: "I'm sorry, I'm currently disconnected from the brain. Please check the API config.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-105 ${
          isOpen
            ? "bg-gray-900 dark:bg-white rotate-90"
            : "bg-gray-900 dark:bg-white"
        }`}
        aria-label="Toggle AI Chat"
      >
        {isOpen ? (
          <FaTimes className="text-white dark:text-gray-900 text-lg" />
        ) : (
          <FaRobot className="text-white dark:text-gray-900 text-lg" />
        )}
      </button>

      {/* Chat Interface */}
      <div
        className={`fixed bottom-24 right-6 w-80 md:w-96 h-[500px] bg-white dark:bg-surface-dark border border-gray-200/80 dark:border-white/[0.08] rounded-2xl shadow-xl shadow-gray-200/40 dark:shadow-none z-40 flex flex-col transition-all duration-300 transform origin-bottom-right ${
          isOpen
            ? "scale-100 opacity-100"
            : "scale-0 opacity-0 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-gray-100 dark:border-white/[0.06] flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-green-500" />
          <div className="flex-1">
            <h3 className="text-sm font-display font-semibold text-gray-900 dark:text-white leading-none">
              AI Assistant
            </h3>
            <span className="text-[11px] font-mono text-gray-400 dark:text-gray-600">
              powered by gemini
            </span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 dark:text-gray-600 hover:text-gray-900 dark:hover:text-white transition-colors text-sm"
          >
            <FaTimes />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] px-4 py-2.5 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-2xl rounded-br-md"
                    : "bg-gray-50 dark:bg-white/[0.04] border border-gray-100 dark:border-white/[0.06] text-gray-700 dark:text-gray-300 rounded-2xl rounded-bl-md"
                }`}
              >
                {msg.role === "model" ? (
                  <ReactMarkdown
                    components={{
                      p: ({ node, ...props }) => (
                        <p className="mb-2 last:mb-0" {...props} />
                      ),
                      ul: ({ node, ...props }) => (
                        <ul
                          className="list-disc ml-4 mb-2 space-y-1"
                          {...props}
                        />
                      ),
                      ol: ({ node, ...props }) => (
                        <ol
                          className="list-decimal ml-4 mb-2 space-y-1"
                          {...props}
                        />
                      ),
                      li: ({ node, ...props }) => (
                        <li className="" {...props} />
                      ),
                      strong: ({ node, ...props }) => (
                        <span
                          className="font-bold text-gray-900 dark:text-white"
                          {...props}
                        />
                      ),
                      a: ({ node, ...props }) => (
                        <a
                          className="text-primary hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                          {...props}
                        />
                      ),
                      code: ({ node, ...props }) => (
                        <code
                          className="bg-gray-100 dark:bg-white/[0.06] border border-gray-200/60 dark:border-white/[0.06] px-1 py-0.5 rounded text-xs font-mono text-gray-700 dark:text-gray-300"
                          {...props}
                        />
                      ),
                      blockquote: ({ node, ...props }) => (
                        <blockquote
                          className="border-l-2 border-gray-200 dark:border-white/10 pl-3 italic text-gray-500 dark:text-gray-500"
                          {...props}
                        />
                      ),
                    }}
                  >
                    {msg.text}
                  </ReactMarkdown>
                ) : (
                  msg.text
                )}
              </div>
            </div>
          ))}
          {isLoading && messages[messages.length - 1]?.text === "" && (
            <div className="flex justify-start">
              <div className="bg-gray-50 dark:bg-white/[0.04] border border-gray-100 dark:border-white/[0.06] px-4 py-3 rounded-2xl rounded-bl-md">
                <div className="flex gap-1.5">
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600 animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  />
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600 animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  />
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600 animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 border-t border-gray-100 dark:border-white/[0.06]">
          <div className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about my projects..."
              className="w-full bg-gray-50 dark:bg-white/[0.03] border border-gray-200/80 dark:border-white/[0.08] text-gray-900 dark:text-white rounded-xl py-2.5 pl-4 pr-11 focus:outline-none focus:border-gray-400 dark:focus:border-white/20 text-sm transition-colors placeholder:text-gray-400 dark:placeholder:text-gray-600"
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="absolute right-1.5 p-2 rounded-lg text-gray-400 dark:text-gray-600 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/[0.06] transition-colors disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-gray-400"
            >
              <FaPaperPlane className="text-xs" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AIChat;
