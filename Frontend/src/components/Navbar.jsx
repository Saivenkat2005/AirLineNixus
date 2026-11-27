import React, { useState } from "react";
import { 
  Plane, 
  Compass, 
  Radar, 
  Bot, 
  CreditCard, 
  User, 
  ShieldCheck, 
  Bell, 
  Moon, 
  Sun, 
  Sparkles,
  Layers,
  MapPin
} from "lucide-react";

export default function Navbar({
  activeTab,
  setActiveTab,
  theme,
  setTheme,
  notificationCount = 0,
  onOpenNotifications,
  currentPassengerName = "Raakesh B.",
  systemStatus = "UP",
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "search", label: "Search Flights", icon: Plane },
    { id: "cabin", label: "3D Cabin", icon: Layers },
    { id: "radar", label: "Flight Radar", icon: Radar },
    { id: "map", label: "World Route Map", icon: Compass },
    { id: "ai", label: "AI Copilot", icon: Bot, badge: "3.0" },
    { id: "wallet", label: "Boarding Pass", icon: CreditCard },
    { id: "dashboard", label: "Dashboard", icon: User },
    { id: "admin", label: "Operations", icon: ShieldCheck },
  ];

  const cycleTheme = () => {
    if (theme === "dark") setTheme("amoled");
    else if (theme === "amoled") setTheme("light");
    else setTheme("dark");
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-navy-950/80 border-b border-white/10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Mark */}
          <div 
            className="flex items-center gap-3.5 cursor-pointer group"
            onClick={() => setActiveTab("search")}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 via-primary-500 to-blue-700 flex items-center justify-center shadow-lg shadow-cyan-500/25 group-hover:scale-105 transition-transform duration-300">
              <Plane className="w-5 h-5 text-white transform -rotate-45" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-wider text-white group-hover:text-cyan-300 transition-colors font-display">
                  AIRLINE NEXUS
                </span>
                <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  2.0 PRO
                </span>
              </div>
              <p className="text-[10px] tracking-widest text-slate-400 uppercase font-mono">
                Ultra-Fast Intelligent Aviation
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/[0.04] p-1.5 rounded-2xl border border-white/10 backdrop-blur-md">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition-all duration-200 ${
                    isActive
                      ? "text-white bg-gradient-to-r from-primary-600/80 to-cyan-500/80 shadow-md shadow-cyan-500/20 border border-cyan-400/30"
                      : "text-slate-300 hover:text-white hover:bg-white/[0.06]"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? "text-cyan-200" : "text-slate-400"}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[9px] px-1 py-0.2 rounded-full bg-cyan-400 text-navy-950 font-bold">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center gap-3">
            
            {/* Live Gateway / Backend Pulse */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>LIVE CORE</span>
            </div>

            {/* Notification Bell */}
            <button
              onClick={onOpenNotifications}
              className="relative p-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-slate-300 hover:text-white transition-all duration-200"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-cyan-400 text-navy-950 font-bold text-[10px] flex items-center justify-center animate-pulse">
                  {notificationCount}
                </span>
              )}
            </button>

            {/* Theme Toggle Button */}
            <button
              onClick={cycleTheme}
              className="p-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-slate-300 hover:text-cyan-300 transition-all duration-200"
              title={`Current Theme: ${theme.toUpperCase()} (Click to toggle)`}
            >
              {theme === "light" ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : theme === "amoled" ? (
                <Sparkles className="w-4 h-4 text-cyan-400" />
              ) : (
                <Moon className="w-4 h-4 text-cyan-300" />
              )}
            </button>

            {/* User Profile Pill */}
            <div 
              onClick={() => setActiveTab("dashboard")}
              className="hidden md:flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.09] border border-white/10 cursor-pointer transition-all"
            >
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-cyan-400 to-blue-600 flex items-center justify-center text-xs font-bold text-white">
                {currentPassengerName.charAt(0)}
              </div>
              <div className="text-left">
                <p className="text-xs font-semibold text-white leading-tight">{currentPassengerName}</p>
                <p className="text-[10px] text-cyan-400 font-mono">PRIORITY TIER</p>
              </div>
            </div>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-slate-300"
            >
              <Layers className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-white/10 grid grid-cols-2 gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 p-3 rounded-xl text-xs font-medium ${
                    isActive
                      ? "bg-primary-600 text-white font-bold"
                      : "bg-white/[0.03] text-slate-300 hover:bg-white/[0.08]"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
}
