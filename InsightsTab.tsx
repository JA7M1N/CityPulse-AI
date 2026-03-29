import { Lightbulb, TrendingUp, TrendingDown, Brain, Zap, Clock, BarChart2, Target } from "lucide-react";
import {
  City,
  generateTrafficData,
  generateAQIData,
  generateWasteData,
  getTrafficColor,
  getAQIColor,
  getTrafficBadge,
  getAQIBadge,
} from "../data/cityData";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

interface InsightsTabProps {
  city: City;
}

function seededRng(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (Math.imul(31, h) + seed.charCodeAt(i)) | 0;
  return function () {
    h = (Math.imul(1664525, h) + 1013904223) | 0;
    return (h >>> 0) / 0xffffffff;
  };
}

export default function InsightsTab({ city }: InsightsTabProps) {
  const trafficData = generateTrafficData(city);
  const aqiData = generateAQIData(city);
  const wasteData = generateWasteData(city);

  const worstTraffic = [...trafficData].sort((a, b) => b.congestionPct - a.congestionPct)[0];
  const bestTraffic = [...trafficData].sort((a, b) => a.congestionPct - b.congestionPct)[0];
  const worstAQI = [...aqiData].sort((a, b) => b.aqi - a.aqi)[0];
  const worstWaste = [...wasteData].sort((a, b) => b.wasteLevel - a.wasteLevel)[0];

  const avgCongestion = Math.round(trafficData.reduce((s, t) => s + t.congestionPct, 0) / trafficData.length);
  const avgAQI = Math.round(aqiData.reduce((s, a) => s + a.aqi, 0) / aqiData.length);

  // 7-day trend data
  const rng = seededRng(city.name + "7day");
  const weekData = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => ({
    day,
    Traffic: Math.floor(rng() * 40 + avgCongestion - 20),
    AQI: Math.floor(rng() * 60 + avgAQI - 30),
    Waste: Math.floor(rng() * 30 + 45),
  }));

  // Hourly prediction
  const hourlyRng = seededRng(city.name + "hourly");
  const hourlyData = Array.from({ length: 24 }, (_, i) => {
    const isRush = (i >= 7 && i <= 10) || (i >= 17 && i <= 20);
    const base = isRush ? 75 : 35;
    return {
      hour: `${i}:00`,
      Congestion: Math.max(10, Math.min(100, base + Math.floor(hourlyRng() * 30) - 15)),
    };
  });

  const aiInsights = [
    {
      icon: "🚦",
      title: "Traffic Surge Predicted",
      message: `${worstTraffic.area} will see ${Math.min(100, worstTraffic.congestionPct + 15)}% congestion during ${worstTraffic.peakTime}. AI suggests departing 30 min earlier.`,
      severity: "warning",
      confidence: 87,
      category: "Traffic",
    },
    {
      icon: "😷",
      title: "AQI Deterioration Alert",
      message: `${worstAQI.area} AQI (${worstAQI.aqi}) may rise by 15–20 points tonight as wind speeds drop below 5 km/h. Health risk for sensitive groups.`,
      severity: "critical",
      confidence: 91,
      category: "Air Quality",
    },
    {
      icon: "🗑️",
      title: "Waste Collection Urgency",
      message: `${worstWaste.area} bins are ${worstWaste.wasteLevel}% full. AI recommends emergency pickup before ${worstWaste.nextCollection} to prevent overflow.`,
      severity: worstWaste.wasteLevel > 70 ? "critical" : "warning",
      confidence: 94,
      category: "Waste",
    },
    {
      icon: "✅",
      title: "Best Time to Travel",
      message: `${bestTraffic.area} has only ${bestTraffic.congestionPct}% congestion. Ideal for cross-city transit between 10 AM–12 PM and 2–4 PM.`,
      severity: "success",
      confidence: 89,
      category: "Traffic",
    },
    {
      icon: "🌬️",
      title: "Wind Pattern Analysis",
      message: `${city.name} northeast winds will disperse pollutants from industrial zones toward ${aqiData[1]?.area}. Residents advised to keep windows closed.`,
      severity: "info",
      confidence: 76,
      category: "Air Quality",
    },
    {
      icon: "📊",
      title: "Weekly Waste Prediction",
      message: `Total city waste expected to increase by 12% this weekend in ${city.name}. Additional 3 collection vehicles recommended for Saturday morning.`,
      severity: "info",
      confidence: 82,
      category: "Waste",
    },
    {
      icon: "🏃",
      title: "Morning Commute Advisory",
      message: `AI models predict ${city.name} rush hour starts 15 min earlier on Fridays. Avg travel time increases by 22 min citywide from 7:45 AM.`,
      severity: "info",
      confidence: 85,
      category: "Traffic",
    },
    {
      icon: "🌱",
      title: "Green Zone Opportunity",
      message: `${bestTraffic.area} shows lowest pollution + traffic. AI recommends it as a green corridor candidate for a city cycle track.`,
      severity: "success",
      confidence: 78,
      category: "Environment",
    },
  ];

  const severityStyle: Record<string, string> = {
    critical: "bg-red-500/10 border-red-500/30 text-red-300",
    warning: "bg-yellow-500/10 border-yellow-500/30 text-yellow-300",
    info: "bg-blue-500/10 border-blue-500/30 text-blue-300",
    success: "bg-green-500/10 border-green-500/30 text-green-300",
  };

  const categoryColors: Record<string, string> = {
    Traffic: "bg-orange-500/20 text-orange-400",
    "Air Quality": "bg-green-500/20 text-green-400",
    Waste: "bg-yellow-500/20 text-yellow-400",
    Environment: "bg-teal-500/20 text-teal-400",
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Lightbulb size={20} className="text-purple-400" />
          AI Insights — {city.name}
        </h2>
        <p className="text-gray-400 text-sm mt-0.5">
          Machine learning predictions & intelligent city analysis
        </p>
      </div>

      {/* Model Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "ML Model Accuracy", value: "91.4%", icon: <Brain size={16} />, color: "purple" },
          { label: "Predictions Made", value: "2,847", icon: <Target size={16} />, color: "blue" },
          { label: "Alerts Prevented", value: "142", icon: <Zap size={16} />, color: "yellow" },
          { label: "Data Points", value: "50K+", icon: <BarChart2 size={16} />, color: "cyan" },
        ].map((s) => (
          <div key={s.label} className={`bg-${s.color}-500/10 border border-${s.color}-500/20 rounded-xl p-4 text-center`}>
            <div className={`text-${s.color}-400 flex justify-center mb-2`}>{s.icon}</div>
            <div className={`text-xl font-black text-${s.color}-400`}>{s.value}</div>
            <div className="text-xs text-gray-400 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* 7-Day Trend */}
        <div className="bg-gray-800/60 border border-gray-700/50 rounded-2xl p-5">
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <TrendingUp size={16} className="text-purple-400" />
            7-Day City Trend
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={weekData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="day" tick={{ fill: "#9ca3af", fontSize: 11 }} />
              <YAxis tick={{ fill: "#9ca3af", fontSize: 11 }} />
              <Tooltip contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151", borderRadius: "8px" }} />
              <Line type="monotone" dataKey="Traffic" stroke="#f97316" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="AQI" stroke="#06b6d4" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="Waste" stroke="#eab308" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
          <div className="flex gap-4 justify-center mt-2">
            {[["Traffic", "#f97316"], ["AQI (scaled)", "#06b6d4"], ["Waste %", "#eab308"]].map(([l, c]) => (
              <div key={l} className="flex items-center gap-1 text-xs text-gray-400">
                <span className="w-3 h-0.5 rounded" style={{ backgroundColor: c }} />
                {l}
              </div>
            ))}
          </div>
        </div>

        {/* Hourly Traffic Prediction */}
        <div className="bg-gray-800/60 border border-gray-700/50 rounded-2xl p-5">
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <Clock size={16} className="text-orange-400" />
            Today's Traffic Forecast (24h)
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={hourlyData.filter((_, i) => i % 2 === 0)}>
              <defs>
                <linearGradient id="congGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="hour" tick={{ fill: "#9ca3af", fontSize: 10 }} />
              <YAxis tick={{ fill: "#9ca3af", fontSize: 10 }} domain={[0, 100]} />
              <Tooltip contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151", borderRadius: "8px" }} />
              <Area type="monotone" dataKey="Congestion" stroke="#f97316" fill="url(#congGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Area Quick Insights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-gray-800/60 border border-gray-700/50 rounded-2xl p-4">
          <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
            <TrendingUp size={14} className="text-orange-400" /> Traffic Hotspots
          </h3>
          <div className="space-y-2">
            {[...trafficData].sort((a, b) => b.congestionPct - a.congestionPct).map((t) => (
              <div key={t.area} className="flex items-center gap-2 text-xs">
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: getTrafficColor(t.level) }} />
                <span className="flex-1 text-gray-300 truncate">{t.area}</span>
                <span className="font-semibold" style={{ color: getTrafficColor(t.level) }}>{t.congestionPct}%</span>
                <span className="text-gray-500">→ {getTrafficBadge(t.predictedNext1h)}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-gray-800/60 border border-gray-700/50 rounded-2xl p-4">
          <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
            <TrendingDown size={14} className="text-green-400" /> AQI Rankings
          </h3>
          <div className="space-y-2">
            {[...aqiData].sort((a, b) => b.aqi - a.aqi).map((a) => (
              <div key={a.area} className="flex items-center gap-2 text-xs">
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: getAQIColor(a.level) }} />
                <span className="flex-1 text-gray-300 truncate">{a.area}</span>
                <span className="font-semibold" style={{ color: getAQIColor(a.level) }}>{a.aqi}</span>
                <span className="text-gray-500">{getAQIBadge(a.level)}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-gray-800/60 border border-gray-700/50 rounded-2xl p-4">
          <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
            <Brain size={14} className="text-purple-400" /> AI Predictions (1h)
          </h3>
          <div className="space-y-2">
            {trafficData.map((t) => (
              <div key={t.area} className="flex items-center gap-2 text-xs">
                <span className="text-gray-500 w-3">{trafficData.indexOf(t) + 1}</span>
                <span className="flex-1 text-gray-300 truncate">{t.area}</span>
                <span className="font-semibold" style={{ color: getTrafficColor(t.predictedNext1h) }}>
                  {getTrafficBadge(t.predictedNext1h)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Insight Cards */}
      <div>
        <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
          <Lightbulb size={16} className="text-yellow-400" />
          AI-Generated Insights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {aiInsights.map((insight, i) => (
            <div key={i} className={`border rounded-xl p-4 ${severityStyle[insight.severity]}`}>
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">{insight.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-sm font-semibold text-white">{insight.title}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${categoryColors[insight.category] || "bg-gray-500/20 text-gray-400"}`}>
                      {insight.category}
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed opacity-90">{insight.message}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex-1 h-1 bg-gray-700/50 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-current rounded-full opacity-60"
                        style={{ width: `${insight.confidence}%` }}
                      />
                    </div>
                    <span className="text-[10px] opacity-70 flex-shrink-0">
                      {insight.confidence}% confidence
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
