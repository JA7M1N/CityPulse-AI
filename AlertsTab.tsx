import { useState } from "react";
import { Bell, AlertTriangle, Info, CheckCircle, Filter, Activity, Wind, Trash2 } from "lucide-react";
import { City, generateAlerts, Alert } from "../data/cityData";

interface AlertsTabProps {
  city: City;
}

type FilterType = "all" | "traffic" | "pollution" | "waste";
type SeverityFilter = "all" | "critical" | "warning" | "info";

export default function AlertsTab({ city }: AlertsTabProps) {
  const alerts = generateAlerts(city);
  const [typeFilter, setTypeFilter] = useState<FilterType>("all");
  const [severityFilter, setSeverityFilter] = useState<SeverityFilter>("all");
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());

  const filtered = alerts.filter((a) => {
    if (dismissed.has(a.id)) return false;
    if (typeFilter !== "all" && a.type !== typeFilter) return false;
    if (severityFilter !== "all" && a.severity !== severityFilter) return false;
    return true;
  });

  const criticalCount = alerts.filter((a) => a.severity === "critical" && !dismissed.has(a.id)).length;
  const warningCount = alerts.filter((a) => a.severity === "warning" && !dismissed.has(a.id)).length;

  const dismiss = (id: string) => setDismissed((prev) => new Set([...prev, id]));
  const dismissAll = () => setDismissed(new Set(alerts.map((a) => a.id)));

  const getSeverityStyle = (severity: string) => {
    const map: Record<string, { bg: string; border: string; badge: string; icon: React.ReactNode }> = {
      critical: {
        bg: "bg-red-500/8",
        border: "border-red-500/40",
        badge: "bg-red-500/20 text-red-400",
        icon: <AlertTriangle size={16} className="text-red-400 flex-shrink-0" />,
      },
      warning: {
        bg: "bg-yellow-500/8",
        border: "border-yellow-500/30",
        badge: "bg-yellow-500/20 text-yellow-400",
        icon: <Info size={16} className="text-yellow-400 flex-shrink-0" />,
      },
      info: {
        bg: "bg-blue-500/8",
        border: "border-blue-500/30",
        badge: "bg-blue-500/20 text-blue-400",
        icon: <Info size={16} className="text-blue-400 flex-shrink-0" />,
      },
    };
    return map[severity] || map.info;
  };

  const getTypeIcon = (type: string) => {
    const map: Record<string, React.ReactNode> = {
      traffic: <Activity size={12} className="text-orange-400" />,
      pollution: <Wind size={12} className="text-green-400" />,
      waste: <Trash2 size={12} className="text-yellow-400" />,
      weather: <Info size={12} className="text-blue-400" />,
    };
    return map[type];
  };

  // Sample citywide alerts
  const cityAlerts: Alert[] = [
    {
      id: "city-1",
      type: "traffic",
      severity: "info",
      area: "City-wide",
      message: `AI predicts 25% increase in traffic across ${city.name} between 5–8 PM today. Plan your commute accordingly.`,
      time: "30 min ago",
      icon: "📊",
    },
    {
      id: "city-2",
      type: "pollution",
      severity: "info",
      area: "City-wide",
      message: `Wind speed dropping in ${city.name} tonight. AQI may worsen by 15–20 points after 9 PM.`,
      time: "1 hour ago",
      icon: "🌬️",
    },
    {
      id: "city-3",
      type: "waste",
      severity: "info",
      area: "City-wide",
      message: `Weekly waste data: ${city.name} generates avg ${Math.round(Math.random() * 200 + 300)} tonnes/day. Recycling rate improving.`,
      time: "2 hours ago",
      icon: "♻️",
    },
  ];

  const allAlerts = [
    ...alerts.filter((a) => a.severity === "critical"),
    ...cityAlerts,
    ...alerts.filter((a) => a.severity !== "critical"),
  ];

  const displayAlerts = allAlerts.filter((a) => {
    if (dismissed.has(a.id)) return false;
    if (typeFilter !== "all" && a.type !== typeFilter) return false;
    if (severityFilter !== "all" && a.severity !== severityFilter) return false;
    return true;
  });

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Bell size={20} className="text-red-400" />
            Smart Alerts System — {city.name}
          </h2>
          <p className="text-gray-400 text-sm mt-0.5">AI-triggered real-time city alerts & notifications</p>
        </div>
        {displayAlerts.length > 0 && (
          <button
            onClick={dismissAll}
            className="text-xs text-gray-400 hover:text-white border border-gray-600 hover:border-gray-400 rounded-lg px-3 py-1.5 transition-all"
          >
            Dismiss All
          </button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-center">
          <div className="text-2xl font-black text-red-400">{criticalCount}</div>
          <div className="text-xs text-gray-400 mt-0.5">Critical</div>
        </div>
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-3 text-center">
          <div className="text-2xl font-black text-yellow-400">{warningCount}</div>
          <div className="text-xs text-gray-400 mt-0.5">Warnings</div>
        </div>
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-3 text-center">
          <div className="text-2xl font-black text-blue-400">{allAlerts.length - dismissed.size}</div>
          <div className="text-xs text-gray-400 mt-0.5">Total Active</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <div className="flex items-center gap-1 text-xs text-gray-400 mr-1">
          <Filter size={12} />
          <span>Filter:</span>
        </div>
        {(["all", "traffic", "pollution", "waste"] as FilterType[]).map((f) => (
          <button
            key={f}
            onClick={() => setTypeFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize ${
              typeFilter === f
                ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/40"
                : "bg-gray-700/50 text-gray-400 border border-gray-600 hover:text-gray-200"
            }`}
          >
            {f === "all" ? "All Types" : f}
          </button>
        ))}
        <div className="w-px bg-gray-700 mx-1" />
        {(["all", "critical", "warning", "info"] as SeverityFilter[]).map((s) => (
          <button
            key={s}
            onClick={() => setSeverityFilter(s)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize ${
              severityFilter === s
                ? "bg-purple-500/20 text-purple-400 border border-purple-500/40"
                : "bg-gray-700/50 text-gray-400 border border-gray-600 hover:text-gray-200"
            }`}
          >
            {s === "all" ? "All Severity" : s}
          </button>
        ))}
      </div>

      {/* Alerts List */}
      {displayAlerts.length === 0 ? (
        <div className="bg-gray-800/60 border border-gray-700/50 rounded-2xl p-12 text-center">
          <CheckCircle size={40} className="text-green-400 mx-auto mb-3" />
          <h3 className="text-white font-semibold text-lg mb-1">All Clear!</h3>
          <p className="text-gray-400 text-sm">
            {dismissed.size > 0
              ? "All alerts have been dismissed."
              : `No ${typeFilter !== "all" ? typeFilter : ""} alerts for ${city.name} right now.`}
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {displayAlerts.map((alert) => {
            const style = getSeverityStyle(alert.severity);
            return (
              <div
                key={alert.id}
                className={`${style.bg} border ${style.border} rounded-xl p-4 flex items-start gap-3 group hover:brightness-110 transition-all`}
              >
                <span className="text-xl flex-shrink-0 mt-0.5">{alert.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${style.badge}`}>
                      {alert.severity}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                      {getTypeIcon(alert.type)}
                      <span className="capitalize">{alert.type}</span>
                    </span>
                    <span className="text-xs text-gray-500">•</span>
                    <span className="text-xs text-gray-400">{alert.area}</span>
                    <span className="text-xs text-gray-500 ml-auto">{alert.time}</span>
                  </div>
                  <p className="text-sm text-gray-300">{alert.message}</p>
                </div>
                <button
                  onClick={() => dismiss(alert.id)}
                  className="text-gray-600 hover:text-gray-300 transition-colors text-xs flex-shrink-0 opacity-0 group-hover:opacity-100"
                >
                  ✕
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Emergency Contacts */}
      <div className="bg-gray-800/60 border border-gray-700/50 rounded-2xl p-5">
        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
          <AlertTriangle size={16} className="text-red-400" />
          Emergency Contacts — {city.name}
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { icon: "🚑", label: "Ambulance", number: "108" },
            { icon: "🚒", label: "Fire Station", number: "101" },
            { icon: "👮", label: "Police", number: "100" },
            { icon: "🏙️", label: "City Control", number: "1916" },
          ].map((c) => (
            <div key={c.label} className="bg-gray-700/30 rounded-xl p-3 text-center">
              <div className="text-2xl mb-1">{c.icon}</div>
              <div className="text-xs text-gray-400">{c.label}</div>
              <div className="text-lg font-bold text-white">{c.number}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
