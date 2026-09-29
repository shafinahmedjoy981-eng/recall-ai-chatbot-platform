import React, { useState } from 'react';
import { initialContacts } from './data/mockData';
import { Contact, MemoryItem, ChatMessage } from './types/recall';
import { Sidebar } from './components/Sidebar';
import { ChatThread } from './components/ChatThread';
import { MemoryPanel } from './components/MemoryPanel';
import { ArtifactViewer } from './components/ArtifactViewer';
import { LayoutDashboard, Image as ImageIcon, RotateCcw } from 'lucide-react';

export default function App() {
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);
  const [selectedContactId, setSelectedContactId] = useState<string>('contact-clara');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'mockup'>('dashboard');
  const [highlightedMemoryId, setHighlightedMemoryId] = useState<string | null>(null);

  const [activeToast, setActiveToast] = useState<{
    label: string;
    value: string;
    category: string;
  } | null>(null);

  const activeContact = contacts.find((c) => c.id === selectedContactId) || contacts[0];

  const handleSelectContact = (id: string) => {
    setSelectedContactId(id);
    setHighlightedMemoryId(null);
  };

  const handleUpdateMemories = (updatedMemories: MemoryItem[]) => {
    setContacts((prev) =>
      prev.map((c) =>
        c.id === selectedContactId ? { ...c, memories: updatedMemories } : c
      )
    );
  };

  const handleAddMemory = (newItem: Omit<MemoryItem, 'id'>) => {
    const id = `mem-custom-${Date.now()}`;
    const fullItem: MemoryItem = { ...newItem, id };

    setContacts((prev) =>
      prev.map((c) =>
        c.id === selectedContactId
          ? { ...c, memories: [fullItem, ...c.memories] }
          : c
      )
    );

    // Show toast for transparency
    setActiveToast({
      label: newItem.label,
      value: newItem.value,
      category: newItem.category,
    });
  };

  const handleSendMessage = (text: string) => {
    const userMessage: ChatMessage = {
      id: `msg-u-${Date.now()}`,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text,
    };

    // Analyze text for memory triggers
    let botResponseText = '';
    let recalledFacts: ChatMessage['recalledFacts'] = undefined;
    let triggeredMemoryUpdate: ChatMessage['triggeredMemoryUpdate'] = undefined;

    const lower = text.toLowerCase();

    if (lower.includes('cluster') || lower.includes('timeout')) {
      botResponseText = `Referencing your permanent environment profile: workspace us-east-cluster-9 is operating on release v4.18.2 with your approved 450ms thread timeout rule. No credentials or re-confirmation required from you.`;
      recalledFacts = [
        {
          memoryId: 'mem-2',
          label: 'Cluster Identifier',
          value: 'us-east-cluster-9',
          origin: 'Session #2 · Sep 02',
        },
        {
          memoryId: 'mem-4',
          label: 'Custom Timeout Rule',
          value: '450ms thread timeout',
          origin: 'Session #3 · Oct 14',
        },
      ];
    } else if (lower.includes('email') || lower.includes('slack') || lower.includes('route') || lower.includes('priority')) {
      const matchEmail = text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/);
      const matchChannel = text.match(/(#[a-zA-Z0-9-_]+)/);
      const targetVal = matchEmail ? matchEmail[0] : matchChannel ? matchChannel[0] : 'Urgent Alert Priority Dispatch';

      botResponseText = `Confirmed. I have logged this routing update into your permanent account memory. All subsequent incident dispatches across channels will strictly honor ${targetVal}.`;
      triggeredMemoryUpdate = {
        category: 'preference',
        label: 'Incident Escalation Target',
        value: targetVal,
      };

      // Add to permanent memory bank
      handleAddMemory({
        category: 'preference',
        label: 'Incident Escalation Target',
        value: targetVal,
        sourceSession: 'Session #4',
        sourceDate: 'Today',
        highlighted: true,
      });
    } else if (lower.includes('ticket') || lower.includes('past') || lower.includes('september')) {
      botResponseText = `Checking your ticket history: On September 2nd in Session #2, we resolved ticket #REC-7811 regarding batch webhook latency spikes by tuning your retry backoff algorithm.`;
      recalledFacts = [
        {
          memoryId: 'mem-3',
          label: 'Previous Issue',
          value: 'Ticket #REC-7811: Batch webhook latency spike',
          origin: 'Session #2 · Sep 02',
        },
      ];
    } else {
      botResponseText = `Understood Clara. I have processed this against your Enterprise profile at ${activeContact.company}. Everything you share is preserved across sessions so you will never have to re-explain this context.`;
    }

    const botMessage: ChatMessage = {
      id: `msg-b-${Date.now()}`,
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: botResponseText,
      recalledFacts,
      triggeredMemoryUpdate,
    };

    setContacts((prev) =>
      prev.map((c) => {
        if (c.id === selectedContactId) {
          return {
            ...c,
            lastMessage: text,
            messages: [...c.messages, userMessage, botMessage],
          };
        }
        return c;
      })
    );
  };

  const handleSimulateNewMemory = () => {
    const memoryFacts = [
      {
        category: 'preference' as const,
        label: 'API Deployment Policy',
        value: 'Canary deployment with 5% traffic weight for 30 minutes',
      },
      {
        category: 'environment' as const,
        label: 'Monitoring Telemetry Provider',
        value: 'Datadog Agent v7.54 + OpenTelemetry gRPC exporter',
      },
      {
        category: 'constraint' as const,
        label: 'Maintenance Window Restriction',
        value: 'Zero downtime during Asian market open (00:00–04:00 UTC)',
      },
    ];

    const randomFact = memoryFacts[Math.floor(Math.random() * memoryFacts.length)];
    handleAddMemory({
      ...randomFact,
      sourceSession: 'Session #4',
      sourceDate: 'Just now',
      highlighted: true,
    });
  };

  const handleReset = () => {
    setContacts(initialContacts);
    setSelectedContactId('contact-clara');
    setActiveToast(null);
    setHighlightedMemoryId(null);
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-[#EDF1F5] text-[#000000] overflow-hidden select-text">
      {/* Top Bar following Top Bar Contract (3 zones) */}
      <header className="h-14 px-6 border-b border-[#0145F2]/20 bg-[#EDF1F5] flex items-center justify-between shrink-0 z-10">
        {/* Zone 1: Single Wordmark */}
        <div className="flex items-center gap-2.5">
          <span className="text-base font-extrabold tracking-tight text-[#000000]">
            Recall
          </span>
          <span className="text-[11px] font-semibold text-[#0145F2] border border-[#0145F2] px-1.5 py-0.2 rounded">
            Memory Bot
          </span>
        </div>

        {/* Zone 2: Navigation Links / Segmented View Toggle */}
        <nav className="flex items-center gap-1 p-1 bg-[#d9e3ee] border border-[#0145F2]/20 rounded-xl">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'dashboard'
                ? 'bg-[#0145F2] text-[#EDF1F5] shadow-xs'
                : 'text-black/70 hover:text-[#000000]'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Interactive 3-Panel Dashboard</span>
          </button>
          <button
            onClick={() => setActiveTab('mockup')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'mockup'
                ? 'bg-[#0145F2] text-[#EDF1F5] shadow-xs'
                : 'text-black/70 hover:text-[#000000]'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Mockup Image &amp; Design Specs</span>
          </button>
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleSimulateNewMemory}
            className="hidden sm:flex items-center px-3 py-1.5 rounded-lg border border-[#0145F2] bg-[#EDF1F5] hover:bg-[#d9e3ee] text-xs font-bold text-[#000000] transition-colors cursor-pointer"
          >
            <span>Test Memory Log</span>
          </button>
          <button
            onClick={handleReset}
            className="p-1.5 text-black/60 hover:text-[#0145F2] rounded-lg transition-colors cursor-pointer"
            title="Reset to default mock state"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {activeTab === 'dashboard' ? (
          <div className="flex-1 flex w-full h-full overflow-hidden">
            {/* Panel 1: Slim Left Conversation List */}
            <Sidebar
              contacts={contacts}
              selectedContactId={selectedContactId}
              onSelectContact={handleSelectContact}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />

            {/* Panel 2: Center Main Chat Thread */}
            <ChatThread
              contact={activeContact}
              onSendMessage={handleSendMessage}
              onSelectMemoryId={(id) => setHighlightedMemoryId(id)}
              activeToast={activeToast}
              onDismissToast={() => setActiveToast(null)}
              onSimulateNewMemory={handleSimulateNewMemory}
            />

            {/* Panel 3: Right Memory Card Panel */}
            <MemoryPanel
              contact={activeContact}
              onUpdateMemory={handleUpdateMemories}
              onAddMemory={handleAddMemory}
              highlightedMemoryId={highlightedMemoryId}
            />
          </div>
        ) : (
          <ArtifactViewer onSwitchToInteractive={() => setActiveTab('dashboard')} />
        )}
      </div>
    </div>
  );
}
