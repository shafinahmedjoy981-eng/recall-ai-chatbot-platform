import React from 'react';
import { Contact } from '../types/recall';
import { Search, User } from 'lucide-react';

interface SidebarProps {
  contacts: Contact[];
  selectedContactId: string;
  onSelectContact: (id: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  contacts,
  selectedContactId,
  onSelectContact,
  searchQuery,
  onSearchChange,
}) => {
  const filteredContacts = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <aside className="w-80 border-r border-[#0145F2]/15 bg-[#EDF1F5] flex flex-col h-full shrink-0">
      {/* Brand & System Status */}
      <div className="p-4 border-b border-[#0145F2]/15 flex items-center justify-between">
        <div>
          <h1 className="text-sm font-bold tracking-tight text-[#000000] leading-none">
            Recall
          </h1>
          <p className="text-[11px] text-black/60 font-medium mt-1">
            Memory Support Bot
          </p>
        </div>
        <div className="px-2 py-0.5 rounded border border-[#0145F2] bg-[#EDF1F5] text-[10px] font-semibold text-[#0145F2] tracking-wide uppercase">
          Continuous
        </div>
      </div>

      {/* Search Input */}
      <div className="p-3 border-b border-[#0145F2]/10">
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-black/40" />
          <input
            type="text"
            placeholder="Search customer memories..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-[#e2e8ef] border border-[#0145F2]/20 rounded-lg pl-8 pr-3 py-1.5 text-xs text-[#000000] placeholder-black/45 focus:outline-none focus:border-[#0145F2] transition-colors"
          />
        </div>
      </div>

      {/* Section Header */}
      <div className="px-4 py-2 flex items-center justify-between text-[11px] font-semibold text-black/50 border-b border-[#0145F2]/5">
        <span>ACTIVE SESSIONS</span>
        <span className="tabular-nums text-black/70">{filteredContacts.length} users</span>
      </div>

      {/* Contact List */}
      <div className="flex-1 overflow-y-auto divide-y divide-[#0145F2]/5">
        {filteredContacts.map((contact) => {
          const isSelected = contact.id === selectedContactId;
          const memoryCount = contact.memories.length;

          return (
            <button
              key={contact.id}
              onClick={() => onSelectContact(contact.id)}
              className={`w-full text-left p-3.5 transition-colors relative flex items-start gap-3 ${
                isSelected
                  ? 'bg-[#dce4ee] border-l-4 border-l-[#0145F2]'
                  : 'hover:bg-[#e7edf3]'
              }`}
            >
              {/* Avatar */}
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 transition-transform ${
                  isSelected
                    ? 'bg-[#0145F2] text-[#EDF1F5] shadow-sm'
                    : 'bg-[#d8e2ed] text-[#000000] border border-[#0145F2]/15'
                }`}
              >
                {contact.avatarInitials}
              </div>

              {/* Contact Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1 mb-0.5">
                  <span className="text-xs font-semibold text-[#000000] truncate">
                    {contact.name}
                  </span>
                  <span className="text-[10px] text-black/50 shrink-0 tabular-nums">
                    {contact.timeAgo}
                  </span>
                </div>

                <div className="text-[11px] text-black/70 truncate mb-1">
                  {contact.company} · {contact.channel}
                </div>

                <p className="text-[11px] text-black/60 truncate leading-relaxed">
                  {contact.lastMessage}
                </p>

                {/* Quiet memory chip count */}
                <div className="mt-2 flex items-center gap-1.5 text-[10px] text-black/70">
                  <span
                    className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold border ${
                      isSelected
                        ? 'border-[#0145F2] bg-[#EDF1F5] text-[#0145F2]'
                        : 'border-[#0145F2]/20 bg-[#EDF1F5] text-black/70'
                    }`}
                  >
                    {memoryCount} facts retained
                  </span>
                  <span className="text-black/30">·</span>
                  <span className="text-black/50 truncate text-[10px]">
                    {contact.plan}
                  </span>
                </div>
              </div>
            </button>
          );
        })}

        {filteredContacts.length === 0 && (
          <div className="p-6 text-center text-xs text-black/50">
            No contacts matching &ldquo;{searchQuery}&rdquo;
          </div>
        )}
      </div>

      {/* Footer Profile */}
      <div className="p-3 border-t border-[#0145F2]/15 bg-[#e2e9f0] flex items-center justify-between">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-7 h-7 rounded-full bg-[#0145F2] text-[#EDF1F5] flex items-center justify-center text-[10px] font-semibold">
            <User className="w-3.5 h-3.5 text-[#EDF1F5]" />
          </div>
          <div className="truncate">
            <div className="text-xs font-semibold text-[#000000] truncate leading-tight">
              Support Ops Console
            </div>
            <div className="text-[10px] text-black/60 truncate">
              Recall Engine v2.4
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
