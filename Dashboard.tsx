import {
  BarChart2,
  Wind,
  Activity,
  Trash2,
  Bell,
  TrendingUp,
  TrendingDown,
  Minus,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import {
  City,
  generateTrafficData,
  generateAQIData,
  generateWasteData,
  generateAlerts,
  getAQIColor,
  getTrafficColor,
  getAQIBadge,
  getTrafficBadge,
} from "../data/cityData";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Cell,
} from "recharts";

interface DashboardProps {
  city: City;
  onTabChange: (tab: any) => void;
}

export default function Dashboard({ city, onTabChange }: DashboardProps) {
  const trafficData = generateTrafficData(city);
  const aqiData = generateAQIData(city);
  const wasteData = generateWasteData(city);
  const alerts = generateAlerts(city);

  const avgCongestion = Math.round(trafficData.reduce((a, b) => a + b.congestionPct, 0) / trafficData.length);
  const avgAQI = Math.round(aqiData.reduce((a, b) => a + b.aqi, 0) / aqiData.length);
  const avgWaste = Math.round(wasteData.reduce((a, b) => a + b.wasteLevel, 0) / wasteData.length);
  const criticalAlerts = alerts.filter((a) => a.severity === "critical").length;

  const radarData = city.areas.map((a, i) => ({
    area: a.name,
    Traffic: trafficData[i]?.congestionPct || 0,
    AQI: Math.min(100, Math.round((aqiData[i]?.aqi || 0) / 4)),
    Waste: wasteData[i]?.wasteLevel || 0,
  }));

  const barData = city.areas.map((a, i) => ({
    name: a.name.split(" ")[0],
    Traffic: trafficData[i]?.congestionPct || 0,
    AQI: Math.min(100, Math.round((aqiData[i]?.aqi || 0) / 4)),
    Waste: wasteData[i]?.wasteLevel || 0,
  }));

  const overallHealth = Math.round(
    100 - (avgCongestion * 0.4 + Math.min(100, avgAQI / 4) * 0.35 + avgWaste * 0.25)
  );

  const getCityScoreColor = (score: number) =>
    score >= 70 ? "text-green-400" : score >= 45 ? "text-yellow-400" : "text-red-400";

  const getStatTrend = (val: number, good: "low" | "high") => {
    if (good === "low") {
      return val < 40 ? <TrendingDown size={14} className="text-green-400" /> :
             val < 65 ? <Minus size={14} className="text-yellow-400" /> :
             <TrendingUp size={14} className="text-red-400" />;
    }
    return val > 60 ? <TrendingUp size={14} className="text-green-400" /> :
           val > 35 ? <Minus size={14} className="text-yellow-400" /> :
           <TrendingDown size={14} className="text-red-400" />;
  };

  return (
    <div className="space-y-5">
      {/* City Header */}
      <div className="bg-gradient-to-r from-gray-800/80 to-gray-800/40 border border-gray-700/50 rounded-2xl p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">🏙️</span>
              <h1 className="text-2xl font-bold text-white">{city.name}</h1>
              <span className="text-gray-400 text-sm font-medium">, {city.state}</span>
            </div>
            <p className="text-gray-400 text-sm">
              Real-time AI-powered city intelligence • {city.areas.length} monitored zones
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-center bg-gray-900/60 rounded-xl px-4 py-2 border border-gray-700/50">
              <div className={`text-3xl font-black ${getCityScoreColor(overallHealth)}`}>
                {overallHealth}
              </div>
              <div className="text-xs text-gray-400 mt-0.5">City Health Score</div>
            </div>
            <div className="text-center bg-gray-900/60 rounded-xl px-4 py-2 border border-gray-700/50">
              <div className={`text-3xl font-black ${criticalAlerts > 0 ? "text-red-400" : "text-green-400"}`}>
                {alerts.length}
              </div>
              <div className="text-xs text-gray-400 mt-0.5">Active Alerts</div>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Avg Traffic"
          value={`${avgCongestion}%`}
          sub="Congestion Level"
          icon={<Activity size={20} />}
          color="orange"
          trend={getStatTrend(avgCongestion, "low")}
          onClick={() => onTabChange("traffic")}
          badge={avgCongestion > 65 ? "High" : avgCongestion > 40 ? "Moderate" : "Low"}
          badgeColor={avgCongestion > 65 ? "red" : avgCongestion > 40 ? "yellow" : "green"}
        />
        <KPICard
          title="Avg AQI"
          value={avgAQI.toString()}
          sub="Air Quality Index"
          icon={<Wind size={20} />}
          color="cyan"
          trend={getStatTrend(Math.min(100, avgAQI / 4), "low")}
          onClick={() => onTabChange("pollution")}
          badge={avgAQI > 200 ? "Poor" : avgAQI > 100 ? "Moderate" : "Good"}
          badgeColor={avgAQI > 200 ? "red" : avgAQI > 100 ? "yellow" : "green"}
        />
        <KPICard
          title="Waste Level"
          value={`${avgWaste}%`}
          sub="Bin Fill Level"
          icon={<Trash2 size={20} />}
          color="yellow"
          trend={getStatTrend(avgWaste, "low")}
          onClick={() => onTabChange("waste")}
          badge={avgWaste > 70 ? "Critical" : avgWaste > 45 ? "Moderate" : "Managed"}
          badgeColor={avgWaste > 70 ? "red" : avgWaste > 45 ? "yellow" : "green"}
        />
        <KPICard
          title="Alerts"
          value={alerts.length.toString()}
          sub={`${criticalAlerts} Critical`}
          icon={<Bell size={20} />}
          color="red"
          trend={criticalAlerts > 0 ? <AlertTriangle size={14} className="text-red-400" /> : <CheckCircle size={14} className="text-green-400" />}
          onClick={() => onTabChange("alerts")}
          badge={criticalAlerts > 0 ? "Action Needed" : "All Clear"}
          badgeColor={criticalAlerts > 0 ? "red" : "green"}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Bar Chart */}
        <div className="bg-gray-800/60 border border-gray-700/50 rounded-2xl p-5">
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <BarChart2 size={16} className="text-blue-400" />
            Area-wise Performance Overview
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={barData} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" tick={{ fill: "#9ca3af", fontSize: 11 }} />
              <YAxis tick={{ fill: "#9ca3af", fontSize: 11 }} domain={[0, 100]} />
              <Tooltip
                contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151", borderRadius: "8px" }}
                labelStyle={{ color: "#f3f4f6" }}
                itemStyle={{ color: "#d1d5db" }}
              />
              <Bar dataKey="Traffic" fill="#f97316" radius={[3, 3, 0, 0]} />
              <Bar dataKey="AQI" fill="#06b6d4" radius={[3, 3, 0, 0]} />
              <Bar dataKey="Waste" fill="#eab308" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex gap-4 justify-center mt-2">
            {[["Traffic", "#f97316"], ["AQI (scaled)", "#06b6d4"], ["Waste", "#eab308"]].map(([label, color]) => (
              <div key={label} className="flex items-center gap-1.5 text-xs text-gray-400">
                <span className="w-3 h-2 rounded-sm" style={{ backgroundColor: color }} />
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* Radar Chart */}
        <div className="bg-gray-800/60 border border-gray-700/50 rounded-2xl p-5">
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <BarChart2 size={16} className="text-purple-400" />
            City Zone Radar Analysis
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#374151" />
              <PolarAngleAxis dataKey="area" tick={{ fill: "#9ca3af", fontSize: 10 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: "#6b7280", fontSize: 9 }} />
              <Radar name="Traffic" dataKey="Traffic" stroke="#f97316" fill="#f97316" fillOpacity={0.15} />
              <Radar name="AQI" dataKey="AQI" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.15} />
              <Radar name="Waste" dataKey="Waste" stroke="#eab308" fill="#eab308" fillOpacity={0.15} />
              <Tooltip
                contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151", borderRadius: "8px" }}
                labelStyle={{ color: "#f3f4f6" }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Area Status Table */}
      <div className="bg-gray-800/60 border border-gray-700/50 rounded-2xl p-5">
        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
          <BarChart2 size={16} className="text-cyan-400" />
          Live Area Status — {city.name}
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left text-gray-400 font-medium pb-2 pr-4">Area</th>
                <th className="text-left text-gray-400 font-medium pb-2 pr-4">Traffic</th>
                <th className="text-left text-gray-400 font-medium pb-2 pr-4">AQI</th>
                <th className="text-left text-gray-400 font-medium pb-2 pr-4">Waste</th>
                <th className="text-left text-gray-400 font-medium pb-2">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/50">
              {city.areas.map((area, i) => {
                const t = trafficData[i];
                const a = aqiData[i];
                const w = wasteData[i];
                const issues = [
                  t?.level === "critical" || t?.level === "high",
                  a?.aqi > 200,
                  w?.wasteLevel > 70,
                ].filter(Boolean).length;
                return (
                  <tr key={area.name} className="hover:bg-gray-700/30 transition-colors">
                    <td className="py-2.5 pr-4 font-medium text-white">{area.name}</td>
                    <td className="py-2.5 pr-4">
                      <span
                        className="px-2 py-0.5 rounded-full text-xs font-medium text-white"
                        style={{ backgroundColor: getTrafficColor(t?.level) + "33", color: getTrafficColor(t?.level) }}
                      >
                        {getTrafficBadge(t?.level)} ({t?.congestionPct}%)
                      </span>
                    </td>
                    <td className="py-2.5 pr-4">
                      <span
                        className="px-2 py-0.5 rounded-full text-xs font-medium"
                        style={{ backgroundColor: getAQIColor(a?.level) + "33", color: getAQIColor(a?.level) }}
                      >
                        {a?.aqi} — {getAQIBadge(a?.level)}
                      </span>
                    </td>
                    <td className="py-2.5 pr-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${w?.wasteLevel}%`,
                              backgroundColor: w?.wasteLevel > 70 ? "#ef4444" : w?.wasteLevel > 45 ? "#eab308" : "#22c55e",
                            }}
                          />
                        </div>
                        <span className="text-gray-300 text-xs">{w?.wasteLevel}%</span>
                      </div>
                    </td>
                    <td className="py-2.5">
                      {issues === 0 ? (
                        <span className="flex items-center gap-1 text-green-400 text-xs"><CheckCircle size={12} /> Good</span>
                      ) : issues === 1 ? (
                        <span className="flex items-center gap-1 text-yellow-400 text-xs"><Minus size={12} /> Watch</span>
                      ) : (
                        <span className="flex items-center gap-1 text-red-400 text-xs"><AlertTriangle size={12} /> Action</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Alerts Preview */}
      {alerts.length > 0 && (
        <div className="bg-gray-800/60 border border-gray-700/50 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold flex items-center gap-2">
              <Bell size={16} className="text-red-400" />
              Recent Alerts
            </h3>
            <button
              onClick={() => onTabChange("alerts")}
              className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              View all →
            </button>
          </div>
          <div className="space-y-2">
            {alerts.slice(0, 3).map((alert) => (
              <div
                key={alert.id}
                className={`flex items-start gap-3 p-3 rounded-xl border ${
                  alert.severity === "critical"
                    ? "bg-red-500/10 border-red-500/30"
                    : "bg-yellow-500/10 border-yellow-500/30"
                }`}
              >
                <span className="text-lg">{alert.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className={`text-xs font-bold uppercase ${alert.severity === "critical" ? "text-red-400" : "text-yellow-400"}`}>
                      {alert.severity}
                    </span>
                    <span className="text-xs text-gray-500">• {alert.area}</span>
                  </div>
                  <p className="text-sm text-gray-300 truncate">{alert.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function KPICard({
  title, value, sub, icon, color, trend, onClick, badge, badgeColor,
}: {
  title: string; value: string; sub: string; icon: React.ReactNode; color: string;
  trend: React.ReactNode; onClick: () => void; badge: string; badgeColor: string;
}) {
  const colorMap: Record<string, string> = {
    orange: "from-orange-500/20 to-orange-500/5 border-orange-500/20 text-orange-400",
    cyan: "from-cyan-500/20 to-cyan-500/5 border-cyan-500/20 text-cyan-400",
    yellow: "from-yellow-500/20 to-yellow-500/5 border-yellow-500/20 text-yellow-400",
    red: "from-red-500/20 to-red-500/5 border-red-500/20 text-red-400",
  };
  const badgeColorMap: Record<string, string> = {
    green: "bg-green-500/20 text-green-400",
    yellow: "bg-yellow-500/20 text-yellow-400",
    red: "bg-red-500/20 text-red-400",
  };

  return (
    <button
      onClick={onClick}
      className={`bg-gradient-to-br ${colorMap[color]} border rounded-2xl p-4 text-left hover:scale-[1.02] transition-all duration-200 w-full`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className={colorMap[color].split(" ").pop()}>{icon}</div>
        {trend}
      </div>
      <div className="text-2xl font-black text-white mb-0.5">{value}</div>
      <div className="text-xs text-gray-400 mb-2">{sub}</div>
      <div className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${badgeColorMap[badgeColor]}`}>
        {badge}
      </div>
    </button>
  );
}
