import React from 'react';
import { X } from 'lucide-react';

interface MemoryToastProps {
  label: string;
  value: string;
  category: string;
  onClose: () => void;
}

export const MemoryToast: React.FC<MemoryToastProps> = ({ label, value, category, onClose }) => {
  return (
    <div
      role="status"
      aria-live="polite"
      className="bg-[#EDF1F5] border-2 border-[#0145F2] rounded-xl px-4 py-3 shadow-md flex items-start justify-between gap-3 max-w-md w-full transition-all animate-in fade-in slide-in-from-top-2 duration-200"
    >
      <div className="flex items-start gap-2.5">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#000000]">
            <span className="uppercase tracking-wider text-[10px] text-[#0145F2] font-bold">Memory Synced</span>
            <span className="text-black/40">·</span>
            <span className="text-black/70 capitalize">{category}</span>
          </div>
          <p className="text-xs font-medium text-[#000000] mt-0.5">
            Logged <strong className="font-semibold">{label}</strong>: &ldquo;{value}&rdquo;
          </p>
          <p className="text-[11px] text-black/60 mt-0.5">
            Stored in permanent profile. Never asked again across channels.
          </p>
        </div>
      </div>
      <button
        onClick={onClose}
        className="text-black/50 hover:text-[#0145F2] p-1 rounded-md transition-colors"
        aria-label="Dismiss notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
