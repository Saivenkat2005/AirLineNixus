import React from "react";
import { 
  Bell, 
  X, 
  Check, 
  Clock, 
  Plane, 
  AlertTriangle, 
  ShieldCheck 
} from "lucide-react";

export default function NotificationCenter({
  isOpen,
  onClose,
  notifications = [],
  onClearAll,
  onMarkRead
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end p-4 sm:p-6 bg-navy-950/60 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-3xl glass-panel border border-white/20 shadow-2xl p-5 space-y-4 animate-fadeIn">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-white font-display">
              Operational Notifications
            </h3>
          </div>
          <div className="flex items-center gap-2">
            {notifications.length > 0 && (
              <button
                type="button"
                onClick={onClearAll}
                className="text-[10px] text-slate-400 hover:text-white font-mono"
              >
                Clear all
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-400">
              <Check className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
              <p>You're all caught up!</p>
              <p className="text-[10px] text-slate-500 mt-1">No pending gate or schedule alerts.</p>
            </div>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                onClick={() => onMarkRead && onMarkRead(n.id)}
                className={`p-3 rounded-2xl border text-xs font-mono transition-all cursor-pointer ${
                  n.read
                    ? "bg-white/[0.02] border-white/5 text-slate-400 opacity-60"
                    : "bg-white/[0.05] border-white/10 text-white shadow-sm"
                }`}
              >
                <div className="flex items-center justify-between text-[10px]">
                  <span className={`font-bold flex items-center gap-1 ${
                    n.type === "alert" ? "text-amber-400" : "text-cyan-400"
                  }`}>
                    {n.type === "alert" ? <AlertTriangle className="w-3 h-3" /> : <Plane className="w-3 h-3" />}
                    {n.title}
                  </span>
                  <span className="text-slate-500">{n.time}</span>
                </div>
                <p className="text-slate-300 mt-1 text-[11px] font-sans leading-relaxed">
                  {n.message}
                </p>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
