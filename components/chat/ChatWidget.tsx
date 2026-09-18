"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Compass,
  ExternalLink,
  ShieldCheck,
  Phone,
  Check,
} from "lucide-react";
import { useSiteConfig } from "@/components/customizer/SiteConfigContext";

interface SourceReference {
  title: string;
  page: string;
  section: string;
}

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: SourceReference[];
  timestamp: string;
}

const SUGGESTED_QUESTIONS = [
  "What packages do you offer to Nepal?",
  "How does the 10% deposit work?",
  "What is included in the Everest Base Camp trek?",
  "Can I trek Upper Mustang in summer?",
  "What are your emergency contact numbers?",
];

// Helper to securely parse basic Markdown into safe React elements
function renderSafeMarkdown(content: string) {
  // Split into lines for list processing
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let listItems: string[] = [];
  let inList = false;

  function flushList(keyPrefix: string) {
    if (listItems.length > 0) {
      elements.push(
        <ul key={`${keyPrefix}-list`} className="my-2 space-y-1 pl-4 list-disc text-inherit">
          {listItems.map((item, idx) => (
            <li key={idx} className="text-inherit leading-relaxed">
              {formatInlineTokens(item)}
            </li>
          ))}
        </ul>
      );
      listItems = [];
      inList = false;
    }
  }

  function formatInlineTokens(text: string): React.ReactNode[] {
    // Escape HTML brackets
    const escaped = text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    // Tokenize bold **text** and links [text](url)
    const regex = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;
    const parts = escaped.split(regex);

    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={i} className="font-extrabold text-[#2D4A34]">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith("[") && part.includes("](")) {
        const match = part.match(/\[([^\]]+)\]\(([^)]+)\)/);
        if (match) {
          const [, linkText, href] = match;
          return (
            <Link
              key={i}
              href={href}
              className="text-[#7FA05C] hover:underline font-bold inline-flex items-center gap-0.5"
            >
              <span>{linkText}</span>
              <ExternalLink className="size-2.5 inline" />
            </Link>
          );
        }
      }
      return part;
    });
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line.startsWith("- ") || line.startsWith("* ")) {
      inList = true;
      listItems.push(line.slice(2));
    } else if (/^\d+\.\s/.test(line)) {
      inList = true;
      listItems.push(line.replace(/^\d+\.\s/, ""));
    } else {
      if (inList) {
        flushList(`line-${i}`);
      }
      if (line.length > 0) {
        elements.push(
          <p key={`p-${i}`} className="my-1.5 leading-relaxed text-inherit">
            {formatInlineTokens(line)}
          </p>
        );
      }
    }
  }

  if (inList) {
    flushList("final");
  }

  return elements;
}

export function ChatWidget() {
  const { config } = useSiteConfig();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [expandedSources, setExpandedSources] = useState<Record<string, boolean>>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load from sessionStorage
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem("zenith_chat_history");
      if (saved) {
        setMessages(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to load chat history from sessionStorage:", e);
    }
  }, []);

  // Save to sessionStorage
  useEffect(() => {
    if (messages.length > 0) {
      try {
        sessionStorage.setItem("zenith_chat_history", JSON.stringify(messages));
      } catch (e) {
        console.error("Failed to save chat history to sessionStorage:", e);
      }
    }
  }, [messages]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isStreaming]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const toggleSources = (msgId: string) => {
    setExpandedSources((prev) => ({ ...prev, [msgId]: !prev[msgId] }));
  };

  const handleClearChat = () => {
    setMessages([]);
    try {
      sessionStorage.removeItem("zenith_chat_history");
    } catch {}
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputMessage).trim();
    if (!query || isStreaming) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const assistantMsgId = `assistant-${Date.now()}`;
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputMessage("");
    setIsStreaming(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: query,
          conversationHistory: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server returned ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No response stream body");

      const decoder = new TextDecoder();
      let accumulatedContent = "";
      let retrievedSources: SourceReference[] = [];
      let buffer = "";

      // Initialize placeholder assistant message
      setMessages((prev) => [
        ...prev,
        {
          id: assistantMsgId,
          role: "assistant",
          content: "",
          sources: [],
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          const trimmed = line.trim();
          if (trimmed.startsWith("data: ")) {
            const dataStr = trimmed.slice(6);
            if (dataStr === "[DONE]") continue;

            try {
              const data = JSON.parse(dataStr);
              if (data.type === "sources") {
                retrievedSources = data.sources || [];
              } else if (data.type === "chunk") {
                accumulatedContent += data.text;
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === assistantMsgId
                      ? { ...m, content: accumulatedContent, sources: retrievedSources }
                      : m
                  )
                );
              }
            } catch {}
          }
        }
      }

      // Final update
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantMsgId
            ? { ...m, content: accumulatedContent, sources: retrievedSources }
            : m
        )
      );
    } catch (err: any) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev.filter((m) => m.id !== assistantMsgId),
        {
          id: assistantMsgId,
          role: "assistant",
          content: `Sorry, an error occurred while retrieving expedition information: ${err.message || "Network timeout"}. You can connect directly with our Sherpa desk at contact@zenithhimalaya.com or call +977 1-4701234.`,
          sources: [],
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setIsStreaming(false);
    }
  };

  return (
    <>
      {/* Floating Launcher Button (Stacked 16px above theme customizer at bottom-6) */}
      <div className="fixed bottom-24 right-6 z-40">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close Expedition AI Chat" : `Open ${config.agencyName} AI Expedition Concierge`}
          aria-expanded={isOpen}
          className="relative size-14 rounded-full bg-[#2D4A34] hover:bg-[#1F2E23] text-white shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 border-2 border-white/20 cursor-pointer group"
          style={{ backgroundColor: "var(--color-primary, #2D4A34)" }}
        >
          {/* Animated gentle ring pulse */}
          {!isOpen && (
            <span className="absolute -top-1 -right-1 flex size-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7FA05C] opacity-75" />
              <span className="relative inline-flex rounded-full size-4 bg-[#7FA05C] border-2 border-white" />
            </span>
          )}

          {isOpen ? (
            <X className="size-6 transition-transform group-hover:rotate-90 duration-300" />
          ) : (
            <MessageSquare className="size-6 text-[#7FA05C] group-hover:text-white transition-colors" />
          )}
        </button>
      </div>

      {/* Floating Chat Modal Panel */}
      {isOpen && (
        <div
          id="zenith-chat-panel"
          role="dialog"
          aria-modal="true"
          data-lenis-prevent="true"
          onWheel={(e) => e.stopPropagation()}
          aria-label={`${config.agencyName} Expedition Chat`}
          className="fixed inset-2 sm:inset-auto sm:bottom-24 sm:right-6 sm:w-[420px] max-h-[calc(100dvh-20px)] sm:max-h-[calc(100vh-112px)] sm:h-[540px] z-50 bg-[#F5F3EF] rounded-2xl sm:rounded-3xl border border-[#7C8A96]/30 shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200"
        >
          {/* Panel Header */}
          <div
            className="p-3.5 sm:p-4 bg-[#2D4A34] text-white flex items-center justify-between shadow-md relative shrink-0"
            style={{ backgroundColor: "var(--color-primary, #2D4A34)" }}
          >
            <div className="flex items-center gap-2.5">
              <div className="size-8 sm:size-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-[#7FA05C] shrink-0">
                <Compass className="size-4.5 sm:size-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-heading font-extrabold text-xs sm:text-sm text-white tracking-tight">
                    {config.agencyName} Assistant
                  </h2>
                  <span className="size-2 rounded-full bg-[#7FA05C] inline-block animate-pulse" />
                </div>
                <p className="text-[10px] sm:text-[11px] text-white/75 flex items-center gap-1">
                  <ShieldCheck className="size-3 text-[#7FA05C]" />
                  <span>Strictly Grounded in Site Content</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {messages.length > 0 && (
                <button
                  type="button"
                  onClick={handleClearChat}
                  title="Clear conversation"
                  aria-label="Clear chat history"
                  className="p-1.5 rounded-lg text-white/75 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <RotateCcw className="size-4" />
                </button>
              )}
              {/* Prominent Cut / Close Dialogue Button */}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                title="Close chat dialogue (Esc)"
                aria-label="Close chat window"
                className="px-2 py-1 rounded-xl bg-white/20 hover:bg-red-500 hover:text-white text-white font-bold text-xs transition-all cursor-pointer flex items-center gap-1 border border-white/30 shadow-xs active:scale-95"
              >
                <span className="text-[11px] font-bold">Close</span>
                <X className="size-4 stroke-[2.5]" />
              </button>
            </div>
          </div>

          {/* Messages Stream Container */}
          <div
            data-lenis-prevent="true"
            onWheel={(e) => e.stopPropagation()}
            className="flex-1 overflow-y-auto overscroll-contain p-4 space-y-4 text-xs sm:text-sm font-sans"
            aria-live="polite"
            aria-relevant="additions text"
          >
            {/* Blank State Welcome Card */}
            {messages.length === 0 ? (
              <div className="space-y-4 py-2">
                <div className="bg-white p-4.5 rounded-2xl border border-[#7C8A96]/20 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 font-heading font-extrabold text-xs text-[#2D4A34]">
                    <Sparkles className="size-3.5 text-[#7FA05C]" />
                    <span>Namaste! Welcome to {config.agencyName}</span>
                  </div>
                  <p className="text-xs text-[#7C8A96] leading-relaxed">
                    I am your Sherpa expedition concierge. Ask me anything about our 2026 departure dates, 10% deposit rules, day-by-day itineraries, prices, or altitude safety.
                  </p>
                </div>

                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#7C8A96] block mb-2 px-1">
                    Suggested Questions:
                  </span>
                  <div className="flex flex-col gap-1.5">
                    {SUGGESTED_QUESTIONS.map((q, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSendMessage(q)}
                        className="w-full text-left text-xs font-semibold p-2.5 sm:p-3 rounded-xl bg-white hover:bg-[#2D4A34] border border-[#7C8A96]/20 transition-all shadow-xs flex items-center justify-between group cursor-pointer"
                      >
                        <span className="text-[#33322E] group-hover:text-white font-medium transition-colors">
                          {q}
                        </span>
                        <ChevronDown className="size-3.5 -rotate-90 text-[#7FA05C] group-hover:text-white group-hover:translate-x-0.5 transition-transform shrink-0 ml-2" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex flex-col ${m.role === "user" ? "items-end" : "items-start"}`}
                >
                  {/* Message Bubble */}
                  <div
                    className={`p-3.5 sm:p-4 rounded-2xl max-w-[88%] text-xs sm:text-[13px] leading-relaxed shadow-xs ${
                      m.role === "user"
                        ? "bg-[#2D4A34] text-white rounded-tr-xs"
                        : "bg-white text-[#33322E] border border-[#7C8A96]/20 rounded-tl-xs"
                    }`}
                    style={
                      m.role === "user"
                        ? { backgroundColor: "var(--color-primary, #2D4A34)" }
                        : {}
                    }
                  >
                    {m.role === "assistant" ? (
                      m.content ? (
                        <div className="space-y-1">{renderSafeMarkdown(m.content)}</div>
                      ) : (
                        <div className="flex items-center gap-1.5 py-1 px-2 text-[#7C8A96]">
                          <span className="size-1.5 rounded-full bg-[#7FA05C] animate-bounce [animation-delay:-0.3s]" />
                          <span className="size-1.5 rounded-full bg-[#7FA05C] animate-bounce [animation-delay:-0.15s]" />
                          <span className="size-1.5 rounded-full bg-[#7FA05C] animate-bounce" />
                        </div>
                      )
                    ) : (
                      <p className="whitespace-pre-wrap">{m.content}</p>
                    )}
                  </div>

                  {/* Sources Disclosure Under Assistant Answer */}
                  {m.role === "assistant" && m.sources && m.sources.length > 0 && (
                    <div className="mt-1.5 max-w-[88%]">
                      <button
                        type="button"
                        onClick={() => toggleSources(m.id)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#2D4A34]/5 hover:bg-[#2D4A34]/10 text-[10px] font-bold text-[#2D4A34] border border-[#2D4A34]/15 transition-colors cursor-pointer"
                      >
                        <ShieldCheck className="size-3 text-[#7FA05C]" />
                        <span>Sources ({m.sources.length})</span>
                        {expandedSources[m.id] ? (
                          <ChevronUp className="size-2.5" />
                        ) : (
                          <ChevronDown className="size-2.5" />
                        )}
                      </button>

                      {expandedSources[m.id] && (
                        <div className="mt-1.5 p-2.5 rounded-xl bg-white border border-[#7C8A96]/20 shadow-xs space-y-1.5 text-[11px] animate-in fade-in duration-150">
                          {m.sources.map((s, sIdx) => (
                            <div key={sIdx} className="flex items-start gap-1.5">
                              <Check className="size-3 text-[#7FA05C] shrink-0 mt-0.5" />
                              <Link
                                href={s.page}
                                className="font-bold text-[#2D4A34] hover:text-[#7FA05C] hover:underline"
                              >
                                {s.title} · <span className="font-normal text-[#7C8A96]">{s.section}</span>
                              </Link>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  <span className="text-[9px] text-[#7C8A96] mt-1 px-1">
                    {m.timestamp}
                  </span>
                </div>
              ))
            )}

            {/* Active Streaming Typing Pulse Indicator */}
            {isStreaming && messages[messages.length - 1]?.role === "user" && (
              <div className="flex flex-col items-start">
                <div className="p-3 rounded-2xl bg-white border border-[#7C8A96]/20 shadow-xs flex items-center gap-1.5 text-[#7C8A96]">
                  <span className="size-1.5 rounded-full bg-[#7FA05C] animate-bounce [animation-delay:-0.3s]" />
                  <span className="size-1.5 rounded-full bg-[#7FA05C] animate-bounce [animation-delay:-0.15s]" />
                  <span className="size-1.5 rounded-full bg-[#7FA05C] animate-bounce" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input & Footer Controls */}
          <div className="p-3 sm:p-4 bg-white border-t border-[#7C8A96]/20">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <div className="relative flex-1">
                <input
                  ref={inputRef}
                  type="text"
                  maxLength={500}
                  placeholder="Ask about treks, pricing, permits..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  disabled={isStreaming}
                  className="w-full h-11 pl-3.5 pr-14 bg-[#F5F3EF] border border-[#7C8A96]/30 rounded-xl text-xs sm:text-sm font-medium focus:outline-none focus:border-[#2D4A34] disabled:opacity-50 transition-colors"
                />
                <span className="absolute right-2.5 top-3.5 text-[10px] text-[#7C8A96] pointer-events-none">
                  {inputMessage.length}/500
                </span>
              </div>

              <button
                type="submit"
                disabled={isStreaming || !inputMessage.trim()}
                aria-label="Send query"
                className="size-11 rounded-xl bg-[#2D4A34] hover:bg-[#1F2E23] text-white disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-all shadow-md active:scale-95 cursor-pointer shrink-0"
                style={{ backgroundColor: "var(--color-primary, #2D4A34)" }}
              >
                <Send className="size-4 text-white" />
              </button>
            </form>

            <div className="flex items-center justify-between text-[10px] text-[#7C8A96] mt-2 px-1">
              <span>Grounded in Zenith Himalaya 2026 Archives</span>
              <a
                href="tel:+97714701234"
                className="hover:text-[#2D4A34] flex items-center gap-1 font-semibold"
              >
                <Phone className="size-2.5 text-[#7FA05C]" />
                <span>+977 1-4701234</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
