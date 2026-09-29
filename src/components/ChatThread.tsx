import React, { useState, useRef, useEffect } from 'react';
import { Contact, ChatMessage } from '../types/recall';
import { Send, History, BookmarkCheck, ArrowRight } from 'lucide-react';
import { MemoryToast } from './MemoryToast';

interface ChatThreadProps {
  contact: Contact;
  onSendMessage: (text: string) => void;
  onSelectMemoryId?: (memoryId: string) => void;
  activeToast: {
    label: string;
    value: string;
    category: string;
  } | null;
  onDismissToast: () => void;
  onSimulateNewMemory: () => void;
}

export const ChatThread: React.FC<ChatThreadProps> = ({
  contact,
  onSendMessage,
  onSelectMemoryId,
  activeToast,
  onDismissToast,
  onSimulateNewMemory,
}) => {
  const [inputText, setInputText] = useState('');
  const chatScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [contact.messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(inputText);
    setInputText('');
  };

  const handleQuickPrompt = (promptText: string) => {
    onSendMessage(promptText);
  };

  return (
    <main className="flex-1 flex flex-col h-full bg-[#EDF1F5] relative min-w-0">
      {/* Center Panel Header */}
      <header className="px-6 py-4 border-b border-[#0145F2]/15 bg-[#EDF1F5] flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#dce5ef] border border-[#0145F2]/20 flex items-center justify-center font-bold text-xs text-[#000000]">
            {contact.avatarInitials}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-[#000000]">
                {contact.name}
              </h2>
              <span className="text-[11px] text-black/50">·</span>
              <span className="text-xs text-black/70 font-medium">
                {contact.company}
              </span>
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#0145F2]"></span>
              <span className="text-[11px] text-black/60 font-medium">
                {contact.activeSession}
              </span>
              <span className="text-black/30">|</span>
              <span className="text-[11px] text-[#0145F2] font-semibold">
                Permanent Memory Active
              </span>
            </div>
          </div>
        </div>

        {/* Quick simulation controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={onSimulateNewMemory}
            className="px-3 py-1.5 rounded-lg border border-[#0145F2] bg-[#EDF1F5] hover:bg-[#d9e3ee] text-[11px] font-semibold text-[#000000] flex items-center transition-colors shadow-xs"
            title="Demonstrate dynamic memory extraction and toast notification"
          >
            <span>Simulate Memory Update</span>
          </button>
        </div>
      </header>

      {/* Floating Memory Updated Notification Toast */}
      {activeToast && (
        <div className="absolute top-18 right-6 z-20">
          <MemoryToast
            label={activeToast.label}
            value={activeToast.value}
            category={activeToast.category}
            onClose={onDismissToast}
          />
        </div>
      )}

      {/* Chat Thread Messages */}
      <div
        ref={chatScrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth"
      >
        {/* Session Transition Divider */}
        <div className="flex items-center justify-center my-2">
          <div className="h-px bg-[#0145F2]/15 flex-1 max-w-xs"></div>
          <div className="mx-4 px-3 py-1 rounded-full border border-[#0145F2]/20 bg-[#e0e8f0] text-[11px] font-medium text-black/70 flex items-center gap-1.5">
            <History className="w-3.5 h-3.5 text-[#0145F2]" />
            <span>Connected Across Past 4 Sessions · Zero Context Lost</span>
          </div>
          <div className="h-px bg-[#0145F2]/15 flex-1 max-w-xs"></div>
        </div>

        {contact.messages.map((msg: ChatMessage) => {
          const isBot = msg.sender === 'bot';

          return (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-3xl ${
                isBot ? 'mr-auto' : 'ml-auto flex-row-reverse'
              }`}
            >
              {/* Message Avatar */}
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${
                  isBot
                    ? 'bg-[#0145F2] text-[#EDF1F5] shadow-xs'
                    : 'bg-[#dce5ef] text-[#000000] border border-[#0145F2]/20'
                }`}
              >
                {isBot ? 'R' : contact.avatarInitials}
              </div>

              {/* Message Body */}
              <div className={`space-y-2 max-w-2xl ${isBot ? 'text-left' : 'text-right'}`}>
                <div className="flex items-center gap-2 text-[11px] text-black/50">
                  <span className="font-semibold text-[#000000]">
                    {isBot ? 'Recall' : contact.name}
                  </span>
                  <span>·</span>
                  <span className="tabular-nums">{msg.timestamp}</span>
                </div>

                {/* Bubble Container */}
                <div
                  className={`p-4 rounded-2xl text-xs leading-relaxed text-[#000000] ${
                    isBot
                      ? 'bg-[#EDF1F5] border border-[#0145F2]/25 shadow-xs'
                      : 'bg-[#e0e8f0] border-2 border-[#0145F2] shadow-xs'
                  }`}
                >
                  <p className="whitespace-pre-line text-[#000000] font-normal">
                    {msg.text}
                  </p>

                  {/* VISUAL DEMONSTRATION OF CROSS-SESSION MEMORY RECALL */}
                  {msg.recalledFacts && msg.recalledFacts.length > 0 && (
                    <div className="mt-3.5 pt-3 border-t border-[#0145F2]/20 bg-[#dce6f2] rounded-xl p-3 border border-[#0145F2]/20">
                      <div className="flex items-center gap-2 mb-2 text-[11px] font-bold text-[#000000]">
                        <BookmarkCheck className="w-3.5 h-3.5 text-[#0145F2]" />
                        <span className="uppercase tracking-wider text-[10px] text-[#0145F2]">
                          Recalled From Past Context (No Repetition Required)
                        </span>
                      </div>

                      <div className="space-y-1.5">
                        {msg.recalledFacts.map((fact, idx) => (
                          <div
                            key={idx}
                            onClick={() => onSelectMemoryId && onSelectMemoryId(fact.memoryId)}
                            className="bg-[#EDF1F5] border border-[#0145F2]/40 rounded-lg p-2 hover:border-[#0145F2] transition-colors cursor-pointer text-left flex items-start justify-between gap-2"
                          >
                            <div>
                              <div className="text-[10px] font-semibold text-black/70">
                                {fact.label}: <span className="text-[#000000] font-bold">{fact.value}</span>
                              </div>
                              <div className="text-[10px] text-[#0145F2] font-medium mt-0.5">
                                Origin: {fact.origin}
                              </div>
                            </div>
                            <span className="text-[10px] text-[#0145F2] font-semibold flex items-center gap-0.5 shrink-0 mt-0.5">
                              Inspect <ArrowRight className="w-3 h-3 text-[#0145F2]" />
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* VISUAL BADGE: MEMORY RECORDED ON THIS TURN */}
                  {msg.triggeredMemoryUpdate && (
                    <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#d8e3f0] border border-[#0145F2] text-[10px] text-[#000000] font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0145F2]"></span>
                      <strong className="text-[#0145F2]">Memory updated:</strong>
                      <span>{msg.triggeredMemoryUpdate.label} → {msg.triggeredMemoryUpdate.value}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Prompts Bar */}
      <div className="px-6 py-2 border-t border-[#0145F2]/10 bg-[#e2eaf2] flex items-center gap-2 overflow-x-auto text-xs">
        <span className="text-[10px] uppercase font-bold text-black/50 tracking-wider shrink-0">
          Try Prompt:
        </span>
        <button
          onClick={() =>
            handleQuickPrompt(
              'What cluster environment was I using, and what was our approved timeout?'
            )
          }
          className="px-2.5 py-1 rounded-lg border border-[#0145F2]/25 bg-[#EDF1F5] hover:border-[#0145F2] text-[11px] text-[#000000] font-medium shrink-0 transition-colors"
        >
          &ldquo;What cluster did I configure?&rdquo;
        </button>
        <button
          onClick={() =>
            handleQuickPrompt(
              'Please change our ticket priority email to urgent-ops@acme.com'
            )
          }
          className="px-2.5 py-1 rounded-lg border border-[#0145F2]/25 bg-[#EDF1F5] hover:border-[#0145F2] text-[11px] text-[#000000] font-medium shrink-0 transition-colors"
        >
          &ldquo;Update alert email preference&rdquo;
        </button>
        <button
          onClick={() =>
            handleQuickPrompt(
              'Can you summarize our past resolved ticket from September?'
            )
          }
          className="px-2.5 py-1 rounded-lg border border-[#0145F2]/25 bg-[#EDF1F5] hover:border-[#0145F2] text-[11px] text-[#000000] font-medium shrink-0 transition-colors"
        >
          &ldquo;Recall September ticket&rdquo;
        </button>
      </div>

      {/* Message Input Form */}
      <div className="p-4 border-t border-[#0145F2]/15 bg-[#EDF1F5] shrink-0">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Type a message or state a preference (Recall remembers automatically)..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 bg-[#e0e8f0] border border-[#0145F2]/20 rounded-xl px-4 py-2.5 text-xs text-[#000000] placeholder-black/45 focus:outline-none focus:border-[#0145F2] transition-colors"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="w-10 h-10 rounded-xl bg-[#0145F2] hover:bg-[#0038c7] disabled:opacity-40 text-[#EDF1F5] flex items-center justify-center transition-colors shadow-xs shrink-0 cursor-pointer"
            aria-label="Send message"
          >
            <Send className="w-4 h-4 text-[#EDF1F5]" />
          </button>
        </form>
        <div className="mt-2 flex items-center justify-between text-[10px] text-black/50">
          <span>Enterprise Memory Guarantee: Zero repetition across sessions or channels</span>
          <span className="font-semibold text-[#0145F2]">State Retention: 100%</span>
        </div>
      </div>
    </main>
  );
};
