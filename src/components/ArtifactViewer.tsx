import React, { useState } from 'react';
import { ZoomIn, ZoomOut, Check, Palette, Eye } from 'lucide-react';

interface ArtifactViewerProps {
  onSwitchToInteractive: () => void;
}

export const ArtifactViewer: React.FC<ArtifactViewerProps> = ({ onSwitchToInteractive }) => {
  const [zoomLevel, setZoomLevel] = useState<number>(100);

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-[#EDF1F5] space-y-6">
      {/* Header Banner */}
      <div className="bg-[#e0e8f0] border-2 border-[#0145F2] rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-[#0145F2] text-[#EDF1F5] text-[10px] font-bold uppercase tracking-wider">
              High-Fidelity UI Mockup
            </span>
            <span className="text-xs text-black/50">·</span>
            <span className="text-xs font-semibold text-[#000000]">
              Recall — Never-Repeat-Yourself Memory Bot
            </span>
          </div>
          <h2 className="text-base font-bold text-[#000000] mt-1">
            Enterprise Chatbot Dashboard Mockup Artifact
          </h2>
          <p className="text-xs text-black/70 mt-0.5 max-w-2xl">
            Clean 3-panel architecture adhering strictly to the two brand colors (<strong>#EDF1F5</strong> light cool off-white and <strong>#0145F2</strong> electric blue) with 100% black typography.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setZoomLevel((prev) => Math.max(75, prev - 15))}
            className="p-2 rounded-lg border border-[#0145F2]/30 bg-[#EDF1F5] hover:bg-[#d8e2ed] text-[#000000] transition-colors cursor-pointer"
            title="Zoom out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-xs font-bold text-[#000000] tabular-nums px-1">
            {zoomLevel}%
          </span>
          <button
            onClick={() => setZoomLevel((prev) => Math.min(150, prev + 15))}
            className="p-2 rounded-lg border border-[#0145F2]/30 bg-[#EDF1F5] hover:bg-[#d8e2ed] text-[#000000] transition-colors cursor-pointer"
            title="Zoom in"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={onSwitchToInteractive}
            className="ml-2 px-3.5 py-2 rounded-xl bg-[#0145F2] hover:bg-[#0038c7] text-[#EDF1F5] text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-[#EDF1F5]" />
            <span>Launch Live Interactive App</span>
          </button>
        </div>
      </div>

      {/* Primary Image Mockup Frame */}
      <div className="bg-[#d9e3ee] border border-[#0145F2]/25 rounded-2xl p-4 shadow-sm overflow-hidden flex flex-col items-center">
        <div className="w-full flex items-center justify-between text-xs text-black/60 mb-3 px-1">
          <span className="font-semibold text-[#000000]">Desktop 16:9 Dashboard Canvas</span>
          <span>Rendered Product Architecture</span>
        </div>

        <div
          className="w-full overflow-auto rounded-xl border-2 border-[#0145F2] bg-[#EDF1F5] transition-all"
          style={{ maxHeight: '72vh' }}
        >
          <img
            src="/src/assets/images/recall_dashboard_blue_1790410097853.jpg"
            alt="Recall - Never-Repeat-Yourself Memory Bot 3-Panel Enterprise Dashboard Mockup"
            referrerPolicy="no-referrer"
            className="w-full h-auto object-contain transition-transform duration-200"
            style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
          />
        </div>
      </div>

      {/* UX Architecture & Strict Color Compliance Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Panel 1 Card */}
        <div className="bg-[#e2eaf2] border border-[#0145F2]/20 rounded-xl p-4 space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-[#0145F2] text-[#EDF1F5] flex items-center justify-center text-[10px] font-bold">
              1
            </div>
            <h3 className="text-xs font-bold text-[#000000]">Left Panel: Slim Contact List</h3>
          </div>
          <p className="text-xs text-black/70 leading-relaxed">
            Quiet, minimal customer roster with channel origins (Slack, Web, Email), message snippet previews, and active session badges. Active selection uses electric blue accenting.
          </p>
          <div className="flex items-center gap-1 text-[11px] text-[#0145F2] font-semibold pt-1">
            <Check className="w-3.5 h-3.5 text-[#0145F2]" /> Low visual friction
          </div>
        </div>

        {/* Panel 2 Card */}
        <div className="bg-[#e2eaf2] border border-[#0145F2]/20 rounded-xl p-4 space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-[#0145F2] text-[#EDF1F5] flex items-center justify-center text-[10px] font-bold">
              2
            </div>
            <h3 className="text-xs font-bold text-[#000000]">Center Panel: Memory Recall</h3>
          </div>
          <p className="text-xs text-black/70 leading-relaxed">
            Directly highlights recalled past context (e.g. cluster ID and 450ms timeout) without the user repeating themselves. Features the visible &ldquo;Memory updated&rdquo; badge the moment new facts are stated.
          </p>
          <div className="flex items-center gap-1 text-[11px] text-[#0145F2] font-semibold pt-1">
            <Check className="w-3.5 h-3.5 text-[#0145F2]" /> Cross-session continuity
          </div>
        </div>

        {/* Panel 3 Card */}
        <div className="bg-[#e2eaf2] border border-[#0145F2]/20 rounded-xl p-4 space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-[#0145F2] text-[#EDF1F5] flex items-center justify-center text-[10px] font-bold">
              3
            </div>
            <h3 className="text-xs font-bold text-[#000000]">Right Panel: Memory Engine</h3>
          </div>
          <p className="text-xs text-black/70 leading-relaxed">
            Structured customer memory bank. Displays editable and removable chips for account details, past tickets, stated preferences, and environment parameters with verified origins.
          </p>
          <div className="flex items-center gap-1 text-[11px] text-[#0145F2] font-semibold pt-1">
            <Check className="w-3.5 h-3.5 text-[#0145F2]" /> Full transparency &amp; control
          </div>
        </div>
      </div>

      {/* Color System Rigor Card */}
      <div className="bg-[#e2e8ef] border-2 border-[#0145F2] rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#0145F2] flex items-center justify-center text-[#EDF1F5]">
            <Palette className="w-4 h-4 text-[#EDF1F5]" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-[#000000]">Strict Two-Color Palette Verification</h4>
            <p className="text-xs text-black/70">
              Only <strong>#EDF1F5</strong> (light cool off-white) &amp; <strong>#0145F2</strong> (electric blue) with 100% black text. Zero foreign colors, reds, greens, or gradients.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#0145F2]/40 bg-[#EDF1F5] text-xs font-bold text-[#000000]">
            <span className="w-3.5 h-3.5 rounded-full bg-[#EDF1F5] border border-[#0145F2]/40"></span>
            <span>#EDF1F5</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#0145F2] bg-[#0145F2] text-xs font-bold text-[#EDF1F5]">
            <span className="w-3.5 h-3.5 rounded-full bg-[#0145F2] border border-[#EDF1F5]"></span>
            <span>#0145F2</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-black/20 bg-black text-xs font-bold text-[#EDF1F5]">
            <span className="w-3.5 h-3.5 rounded-full bg-black"></span>
            <span>#000000 Text</span>
          </div>
        </div>
      </div>
    </div>
  );
};
