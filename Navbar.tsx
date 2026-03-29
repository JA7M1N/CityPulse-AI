import React, { useState } from "react";
import {
  Activity,
  Wind,
  Trash2,
  Bell,
  BarChart2,
  Lightbulb,
  Building2,
  Menu,
  X,
  MapPin,
} from "lucide-react";

export type TabKey =
  | "dashboard"
  | "traffic"
  | "pollution"
  | "waste"
  | "alerts"
  | "insights"
  | "improvements";

interface NavbarProps {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
  alertCount: number;
  cityName: string;
}

const tabs: { key: TabKey; label: string; icon: React.ReactNode; color: string }[] = [
  { key: "dashboard", label: "Dashboard", icon: <BarChart2 size={16} />, color: "blue" },
  { key: "traffic", label: "Traffic", icon: <Activity size={16} />, color: "orange" },
  { key: "pollution", label: "Air Quality", icon: <Wind size={16} />, color: "green" },
  { key: "waste", label: "Waste", icon: <Trash2 size={16} />, color: "yellow" },
  { key: "alerts", label: "Alerts", icon: <Bell size={16} />, color: "red" },
  { key: "insights", label: "AI Insights", icon: <Lightbulb size={16} />, color: "purple" },
  { key: "improvements", label: "City Improvements", icon: <Building2 size={16} />, color: "teal" },
];

const colorMap: Record<string, { active: string; hover: string; indicator: string }> = {
  blue: { active: "text-blue-400 border-blue-400", hover: "hover:text-blue-300", indicator: "bg-blue-400" },
  orange: { active: "text-orange-400 border-orange-400", hover: "hover:text-orange-300", indicator: "bg-orange-400" },
  green: { active: "text-green-400 border-green-400", hover: "hover:text-green-300", indicator: "bg-green-400" },
  yellow: { active: "text-yellow-400 border-yellow-400", hover: "hover:text-yellow-300", indicator: "bg-yellow-400" },
  red: { active: "text-red-400 border-red-400", hover: "hover:text-red-300", indicator: "bg-red-400" },
  purple: { active: "text-purple-400 border-purple-400", hover: "hover:text-purple-300", indicator: "bg-purple-400" },
  teal: { active: "text-teal-400 border-teal-400", hover: "hover:text-teal-300", indicator: "bg-teal-400" },
};

export default function Navbar({ activeTab, onTabChange, alertCount, cityName }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-md border-b border-gray-700/60 shadow-2xl">
      <div className="max-w-screen-2xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <div className="flex items-center gap-2.5 flex-shrink-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/30">
              <span className="text-white text-sm font-bold">SC</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-white font-bold text-base tracking-tight">SmartCity</span>
              <span className="text-cyan-400 font-bold text-base"> AI</span>
            </div>
          </div>

          {/* City Badge */}
          <div className="hidden md:flex items-center gap-1.5 bg-gray-800 border border-gray-600 rounded-full px-3 py-1">
            <MapPin size={12} className="text-cyan-400" />
            <span className="text-gray-300 text-xs font-medium">{cityName}</span>
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
          </div>

          {/* Desktop Tabs */}
          <div className="hidden lg:flex items-center gap-0.5">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.key;
              const colors = colorMap[tab.color];
              return (
                <button
                  key={tab.key}
                  onClick={() => onTabChange(tab.key)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 relative ${
                    isActive
                      ? `${colors.active} bg-gray-800`
                      : `text-gray-400 ${colors.hover} hover:bg-gray-800/60`
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                  {tab.key === "alerts" && alertCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                      {alertCount > 9 ? "9+" : alertCount}
                    </span>
                  )}
                  {isActive && (
                    <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-3/4 ${colors.indicator} rounded-full`} />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2">
            {/* Alert Bell (mobile) */}
            <button
              onClick={() => onTabChange("alerts")}
              className="lg:hidden relative p-2 text-gray-400 hover:text-white"
            >
              <Bell size={18} />
              {alertCount > 0 && (
                <span className="absolute top-1 right-1 bg-red-500 text-white text-[9px] font-bold rounded-full w-3.5 h-3.5 flex items-center justify-center">
                  {alertCount}
                </span>
              )}
            </button>
            {/* Hamburger */}
            <button
              className="lg:hidden p-2 text-gray-400 hover:text-white"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            {/* Live Indicator */}
            <div className="hidden lg:flex items-center gap-1.5 text-xs text-gray-400">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Live
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-gray-700/60 py-2 grid grid-cols-2 gap-1">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.key;
              const colors = colorMap[tab.color];
              return (
                <button
                  key={tab.key}
                  onClick={() => {
                    onTabChange(tab.key);
                    setMobileOpen(false);
                  }}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs font-medium transition-all relative ${
                    isActive ? `${colors.active} bg-gray-800` : `text-gray-400 hover:bg-gray-800/60 hover:text-gray-200`
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                  {tab.key === "alerts" && alertCount > 0 && (
                    <span className="ml-auto bg-red-500 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                      {alertCount}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
}
