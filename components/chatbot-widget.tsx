"use client";

import { useState, type FormEvent } from "react";

type Message = {
  from: "bot" | "user";
  text: string;
};

const QUICK_PROMPTS = ["How do I buy units?", "My token has not arrived", "I want to become an agent"];

function getReply(message: string) {
  const normalized = message.toLowerCase();

  if (normalized.includes("agent")) {
    return "You can apply from our agent page. Agents earn up to 3% per sale and settle into their Suez wallet.";
  }

  if (normalized.includes("token") || normalized.includes("arriv") || normalized.includes("failed")) {
    return "Check your SMS, email and purchase history first. If it is still missing, contact support with your meter number and payment reference.";
  }

  if (normalized.includes("buy") || normalized.includes("unit") || normalized.includes("meter")) {
    return "Enter your meter number, confirm the registered name, choose an amount and pay by card, transfer, USSD or wallet.";
  }

  return "I can help with buying units, missing tokens, app questions or becoming an agent. Try one of the quick questions below.";
}

export function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { from: "bot", text: "Hi, I’m the Suez power desk. What can I help you find?" },
  ]);

  function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;
    setMessages((current) => [
      ...current,
      { from: "user", text: trimmed },
      { from: "bot", text: getReply(trimmed) },
    ]);
    setInput("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    sendMessage(input);
  }

  return (
    <div className="chatbot-widget fixed bottom-5 right-4 z-[55] sm:bottom-7 sm:right-7">
      {open && (
        <section id="chatbot-panel" className="chatbot-panel mb-3 w-[calc(100vw-2rem)] max-w-[23rem] overflow-hidden rounded-3xl border border-ink-line bg-ink-2 shadow-[0_24px_80px_-28px_rgb(0_0_0/0.9)]" aria-label="Suez power desk chatbot">
          <div className="border-b border-ink-line px-5 py-4">
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="font-label text-[0.6875rem] uppercase tracking-[0.1em] text-voltage">Suez power desk</p>
                <h2 className="mt-2 font-display text-2xl">How can we help?</h2>
              </div>
              <span className="mt-1 flex items-center gap-2 font-label text-[0.625rem] uppercase tracking-[0.08em] text-fg-ink-muted">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-voltage" />
                Online
              </span>
            </div>
          </div>

          <div className="chatbot-messages max-h-72 space-y-3 overflow-y-auto px-5 py-4" aria-live="polite">
            {messages.map((message, index) => (
              <div key={`${message.from}-${index}`} className={`flex ${message.from === "user" ? "justify-end" : "justify-start"}`}>
                <p className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${message.from === "user" ? "rounded-br-sm bg-voltage text-ink" : "rounded-bl-sm bg-ink-3 text-fg-ink-muted"}`}>
                  {message.text}
                </p>
              </div>
            ))}
          </div>

          <div className="border-t border-ink-line px-5 py-4">
            <div className="flex flex-wrap gap-2">
              {QUICK_PROMPTS.map((prompt) => (
                <button key={prompt} type="button" onClick={() => sendMessage(prompt)} className="rounded-full border border-ink-line px-3 py-2 text-left font-label text-[0.625rem] uppercase tracking-[0.04em] text-fg-ink-muted transition-colors hover:border-voltage hover:text-fg-ink">
                  {prompt}
                </button>
              ))}
            </div>
            <form onSubmit={handleSubmit} className="mt-4 flex items-center gap-2">
              <label htmlFor="chatbot-message" className="sr-only">Ask the power desk</label>
              <input id="chatbot-message" value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask a question" className="min-w-0 flex-1 border-b border-ink-line bg-transparent px-0 py-2 text-sm text-fg-ink outline-none placeholder:text-fg-ink-muted/60 focus:border-voltage" />
              <button type="submit" className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-voltage text-ink transition-colors hover:bg-[#f79e58]" aria-label="Send message">
                ↗
              </button>
            </form>
          </div>
        </section>
      )}

      <button type="button" onClick={() => setOpen((current) => !current)} className="ml-auto flex min-h-12 items-center gap-3 rounded-full border border-voltage bg-voltage px-4 font-label text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-ink shadow-[0_16px_40px_-18px_rgb(241_136_53/0.9)] transition-colors hover:bg-[#f79e58]" aria-expanded={open} aria-controls="chatbot-panel">
        <span className="grid h-6 w-6 place-items-center rounded-full border border-ink/25" aria-hidden="true">
          <span className="flex gap-0.5"><span className="h-1 w-1 rounded-full bg-ink" /><span className="h-1 w-1 rounded-full bg-ink" /><span className="h-1 w-1 rounded-full bg-ink" /></span>
        </span>
        {open ? "Close desk" : "Ask Suez"}
      </button>
    </div>
  );
}
