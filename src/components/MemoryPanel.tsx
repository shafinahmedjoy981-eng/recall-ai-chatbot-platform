import React, { useState } from 'react';
import { MemoryItem, Contact } from '../types/recall';
import { Database, Plus, Trash2, Edit2, Check, X, ShieldCheck } from 'lucide-react';

interface MemoryPanelProps {
  contact: Contact;
  onUpdateMemory: (updatedMemories: MemoryItem[]) => void;
  onAddMemory: (newItem: Omit<MemoryItem, 'id'>) => void;
  highlightedMemoryId?: string | null;
}

export const MemoryPanel: React.FC<MemoryPanelProps> = ({
  contact,
  onUpdateMemory,
  onAddMemory,
  highlightedMemoryId,
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const [isAddingNew, setIsAddingNew] = useState(false);

  // New item form state
  const [newCategory, setNewCategory] = useState<MemoryItem['category']>('preference');
  const [newLabel, setNewLabel] = useState('');
  const [newValue, setNewValue] = useState('');

  const handleDelete = (id: string) => {
    const updated = contact.memories.filter((m) => m.id !== id);
    onUpdateMemory(updated);
  };

  const handleStartEdit = (item: MemoryItem) => {
    setEditingId(item.id);
    setEditValue(item.value);
  };

  const handleSaveEdit = (id: string) => {
    const updated = contact.memories.map((m) =>
      m.id === id ? { ...m, value: editValue } : m
    );
    onUpdateMemory(updated);
    setEditingId(null);
  };

  const handleAddNewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLabel.trim() || !newValue.trim()) return;

    onAddMemory({
      category: newCategory,
      label: newLabel.trim(),
      value: newValue.trim(),
      sourceSession: 'Session #4',
      sourceDate: 'Just now',
      highlighted: true,
    });

    setNewLabel('');
    setNewValue('');
    setIsAddingNew(false);
  };

  const categories: { key: MemoryItem['category']; label: string }[] = [
    { key: 'account', label: 'Account & Plan' },
    { key: 'environment', label: 'Environment & Setup' },
    { key: 'history', label: 'Ticket & Incident History' },
    { key: 'preference', label: 'Stated Preferences' },
    { key: 'constraint', label: 'Compliance & Locale' },
  ];

  return (
    <aside className="w-88 border-l border-[#0145F2]/15 bg-[#EDF1F5] flex flex-col h-full shrink-0">
      {/* Header */}
      <div className="p-4 border-b border-[#0145F2]/15 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-[#0145F2] flex items-center justify-center">
            <Database className="w-3.5 h-3.5 text-[#EDF1F5]" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-[#000000] tracking-tight">
              Customer Memory Bank
            </h3>
            <p className="text-[10px] text-black/60 font-medium">
              Permanent Knowledge Graph
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsAddingNew(true)}
          className="px-2.5 py-1 rounded-lg border border-[#0145F2] bg-[#EDF1F5] hover:bg-[#e2e8ef] text-[10px] font-bold text-[#0145F2] flex items-center gap-1 transition-colors cursor-pointer"
        >
          <Plus className="w-3 h-3 text-[#0145F2]" />
          <span>Add Fact</span>
        </button>
      </div>

      {/* Memory Stats Bar */}
      <div className="px-4 py-2 bg-[#e2e8ef] border-b border-[#0145F2]/10 flex items-center justify-between text-[11px] text-black/70">
        <span className="font-semibold text-[#000000]">
          {contact.memories.length} Retained Attributes
        </span>
        <span className="flex items-center gap-1 text-[10px] text-[#0145F2] font-semibold">
          <ShieldCheck className="w-3 h-3 text-[#0145F2]" /> Verified
        </span>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        {/* Modal / Inline form for adding new memory */}
        {isAddingNew && (
          <form
            onSubmit={handleAddNewSubmit}
            className="p-3 bg-[#e2eaf2] border-2 border-[#0145F2] rounded-xl space-y-2.5 animate-in fade-in duration-150"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-[#0145F2] tracking-wider">
                Log New Fact
              </span>
              <button
                type="button"
                onClick={() => setIsAddingNew(false)}
                className="text-black/50 hover:text-[#0145F2] cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div>
              <label className="text-[10px] font-semibold text-black/70 block mb-1">
                Category
              </label>
              <select
                value={newCategory}
                onChange={(e) =>
                  setNewCategory(e.target.value as MemoryItem['category'])
                }
                className="w-full bg-[#EDF1F5] border border-[#0145F2]/30 rounded-md px-2 py-1 text-xs text-[#000000] focus:outline-none focus:border-[#0145F2]"
              >
                <option value="account">Account & Plan</option>
                <option value="environment">Environment & Setup</option>
                <option value="history">Ticket & Incident History</option>
                <option value="preference">Stated Preferences</option>
                <option value="constraint">Compliance & Locale</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] font-semibold text-black/70 block mb-1">
                Label / Key
              </label>
              <input
                type="text"
                placeholder="e.g. Preferred Deployment Window"
                value={newLabel}
                onChange={(e) => setNewLabel(e.target.value)}
                className="w-full bg-[#EDF1F5] border border-[#0145F2]/30 rounded-md px-2 py-1 text-xs text-[#000000] placeholder-black/40 focus:outline-none focus:border-[#0145F2]"
              />
            </div>

            <div>
              <label className="text-[10px] font-semibold text-black/70 block mb-1">
                Value / Rule
              </label>
              <input
                type="text"
                placeholder="e.g. Saturdays 02:00 UTC only"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                className="w-full bg-[#EDF1F5] border border-[#0145F2]/30 rounded-md px-2 py-1 text-xs text-[#000000] placeholder-black/40 focus:outline-none focus:border-[#0145F2]"
              />
            </div>

            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setIsAddingNew(false)}
                className="px-2.5 py-1 text-[11px] font-semibold text-black/70 hover:text-[#000000] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-1 bg-[#0145F2] hover:bg-[#0038c7] text-[#EDF1F5] text-[11px] font-semibold rounded-md shadow-xs cursor-pointer"
              >
                Save to Memory
              </button>
            </div>
          </form>
        )}

        {/* Grouped Memory Categories */}
        {categories.map((cat) => {
          const items = contact.memories.filter((m) => m.category === cat.key);
          if (items.length === 0) return null;

          return (
            <div key={cat.key} className="space-y-2">
              <div className="flex items-center justify-between text-[11px] font-bold text-[#000000] border-b border-[#0145F2]/15 pb-1">
                <span>{cat.label}</span>
                <span className="text-[10px] text-black/50 tabular-nums">
                  {items.length}
                </span>
              </div>

              <div className="space-y-2">
                {items.map((item) => {
                  const isHighlighted =
                    item.id === highlightedMemoryId || item.highlighted;
                  const isEditing = editingId === item.id;

                  return (
                    <div
                      key={item.id}
                      className={`p-2.5 rounded-xl border transition-all ${
                        isHighlighted
                          ? 'border-[#0145F2] bg-[#dce6f2] shadow-xs'
                          : 'border-[#0145F2]/20 bg-[#EDF1F5] hover:border-[#0145F2]/50'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-1 mb-1">
                        <span className="text-[10px] font-bold text-[#0145F2] uppercase tracking-wider">
                          {item.label}
                        </span>
                        <div className="flex items-center gap-1 shrink-0">
                          {isEditing ? (
                            <>
                              <button
                                onClick={() => handleSaveEdit(item.id)}
                                className="p-1 rounded text-[#0145F2] hover:bg-[#d8e2ed] cursor-pointer"
                                title="Save change"
                              >
                                <Check className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => setEditingId(null)}
                                className="p-1 rounded text-black/60 hover:bg-[#d8e2ed] cursor-pointer"
                                title="Cancel"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => handleStartEdit(item)}
                                className="p-1 rounded text-black/40 hover:text-[#0145F2] hover:bg-[#d8e2ed] transition-colors cursor-pointer"
                                title="Edit this memory"
                              >
                                <Edit2 className="w-3 h-3" />
                              </button>
                              <button
                                onClick={() => handleDelete(item.id)}
                                className="p-1 rounded text-black/40 hover:text-[#0145F2] hover:bg-[#d8e2ed] transition-colors cursor-pointer"
                                title="Forget this memory"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </>
                          )}
                        </div>
                      </div>

                      {isEditing ? (
                        <input
                          type="text"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          className="w-full bg-[#EDF1F5] border border-[#0145F2] rounded px-2 py-1 text-xs text-[#000000] focus:outline-none"
                          autoFocus
                        />
                      ) : (
                        <p className="text-xs font-semibold text-[#000000] leading-snug">
                          {item.value}
                        </p>
                      )}

                      <div className="mt-1.5 flex items-center justify-between text-[10px] text-black/50">
                        <span>
                          {item.sourceSession} · {item.sourceDate}
                        </span>
                        {isHighlighted && (
                          <span className="text-[#0145F2] font-bold">
                            Active in Chat
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Info */}
      <div className="p-3 border-t border-[#0145F2]/15 bg-[#e2e9f0] text-[10px] text-black/60 flex items-center justify-between">
        <span>Cross-Session Sync: Active</span>
        <span className="font-semibold text-[#000000]">Zero User Friction</span>
      </div>
    </aside>
  );
};
