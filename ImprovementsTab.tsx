import { Building2, CheckCircle, Clock, TrendingUp, Zap, Leaf, Users, DollarSign, ArrowRight, Star } from "lucide-react";
import {
  City,
  generateTrafficData,
  generateAQIData,
  generateWasteData,
  getTrafficColor,
  getAQIColor,
} from "../data/cityData";

interface ImprovementsTabProps {
  city: City;
}

export default function ImprovementsTab({ city }: ImprovementsTabProps) {
  const trafficData = generateTrafficData(city);
  const aqiData = generateAQIData(city);
  const wasteData = generateWasteData(city);

  const worstTraffic = [...trafficData].sort((a, b) => b.congestionPct - a.congestionPct)[0];
  const worstAQI = [...aqiData].sort((a, b) => b.aqi - a.aqi)[0];
  const worstWaste = [...wasteData].sort((a, b) => b.wasteLevel - a.wasteLevel)[0];

  const improvements = [
    {
      id: 1,
      icon: "🚦",
      category: "Traffic",
      priority: "High",
      title: `AI-Adaptive Traffic Signals in ${worstTraffic?.area}`,
      problem: `${worstTraffic?.area} has ${worstTraffic?.congestionPct}% congestion with average speed of only ${worstTraffic?.avgSpeed} km/h during peak hours.`,
      solution:
        "Deploy AI-driven adaptive traffic light systems that analyze real-time vehicle flow and automatically optimize signal timing to reduce wait times by up to 40%.",
      impact: ["Reduce congestion by 35–40%", "Save 15 min/commute daily", "Cut fuel waste by 20%", "Faster emergency response"],
      timeline: "6–8 months",
      cost: "₹2.5–4 Cr",
      benefit: "₹12 Cr/year savings",
      color: "orange",
    },
    {
      id: 2,
      icon: "😷",
      category: "Air Quality",
      priority: "Critical",
      title: `Industrial Emission Control — ${worstAQI?.area}`,
      problem: `${worstAQI?.area} records AQI of ${worstAQI?.aqi}, dangerously impacting ${Math.round((worstAQI?.aqi || 0) / 100 * 40 + 20)}% of residents with respiratory issues.`,
      solution:
        "Install real-time pollution monitoring sensors + enforce emission caps on industrial units. Deploy green buffer zones with native trees between industrial and residential areas.",
      impact: ["Reduce AQI by 50–60 points", "Protect 2L+ residents", "15% fewer hospital visits", "₹8 Cr saved in healthcare"],
      timeline: "12–18 months",
      cost: "₹6–9 Cr",
      benefit: "₹18 Cr/year health savings",
      color: "green",
    },
    {
      id: 3,
      icon: "♻️",
      category: "Waste Management",
      priority: "High",
      title: `Smart Bins & IoT Collection — ${worstWaste?.area}`,
      problem: `${worstWaste?.area} bins reach ${worstWaste?.wasteLevel}% capacity frequently, causing overflow and sanitation risks. Current collection is time-based, not demand-based.`,
      solution:
        "Install IoT-enabled smart bins with fill-level sensors. AI dispatches collection vehicles only when bins reach 80% capacity, optimizing 60% of fuel and route costs.",
      impact: ["40% fewer unnecessary pickups", "Save ₹1.2 Cr/year in fuel", "90% reduction in overflow", "Cleaner city streets"],
      timeline: "4–6 months",
      cost: "₹1.8–2.5 Cr",
      benefit: "₹4 Cr/year savings",
      color: "yellow",
    },
    {
      id: 4,
      icon: "🚌",
      category: "Public Transport",
      priority: "Medium",
      title: `Rapid Bus Corridor Network — ${city.name}`,
      problem: `Private vehicle usage is the primary cause of ${city.name}'s traffic congestion (${Math.round(trafficData.reduce((s, t) => s + t.congestionPct, 0) / trafficData.length)}% avg). Public transit share is critically low.`,
      solution:
        "Establish dedicated BRT (Bus Rapid Transit) corridors connecting all major zones. Integrate with city app for real-time tracking and AI-predicted arrival times.",
      impact: ["Reduce private vehicles by 25%", "15% less AQI in city center", "Save 45 min commute time", "₹500/month savings per commuter"],
      timeline: "18–24 months",
      cost: "₹45–80 Cr",
      benefit: "₹200 Cr/year economic gain",
      color: "blue",
    },
    {
      id: 5,
      icon: "🌳",
      category: "Environment",
      priority: "Medium",
      title: `Urban Forest & Green Corridor Plan`,
      problem: `${city.name}'s urban heat island effect is intensifying AQI and temperatures. Green cover is below 15% of city area (recommended minimum: 33%).`,
      solution:
        "Plant 50,000 native trees along major roads and create 5 pocket forests in high-density areas. Introduce green rooftops mandate for commercial buildings above 5 floors.",
      impact: ["Reduce city temp by 2–4°C", "Improve AQI by 30 points", "Increase biodiversity", "Reduce AC usage by 18%"],
      timeline: "24–36 months",
      cost: "₹8–12 Cr",
      benefit: "₹25 Cr/year environmental value",
      color: "teal",
    },
    {
      id: 6,
      icon: "💧",
      category: "Water & Drainage",
      priority: "Medium",
      title: `Smart Stormwater & Drainage AI`,
      problem: `Flooding during monsoon season creates secondary traffic jams and pollution spikes in ${city.name}'s low-lying areas, wasting 40% of rainwater potential.`,
      solution:
        "Deploy AI-controlled drainage gates and rainwater harvesting systems. Real-time sensors predict flood zones and divert water to recharge wells.",
      impact: ["85% reduction in urban flooding", "Save 200 ML water annually", "Prevent ₹30 Cr damage/year", "Recharge groundwater"],
      timeline: "12–18 months",
      cost: "₹15–20 Cr",
      benefit: "₹35 Cr/year savings",
      color: "cyan",
    },
    {
      id: 7,
      icon: "☀️",
      category: "Energy",
      priority: "Low",
      title: `Solar-Powered Smart Streetlights`,
      problem: `${city.name} spends ₹12+ Cr annually on street lighting electricity. 30% of lights remain on during daylight hours due to faulty sensors.`,
      solution:
        "Replace all street lights with solar-powered LED lights equipped with motion sensors and centralized IoT management. Sell excess energy back to grid.",
      impact: ["Save ₹8 Cr/year electricity", "60% carbon reduction", "Self-sustaining energy", "Smart dimming saves 25% more"],
      timeline: "8–12 months",
      cost: "₹18–25 Cr",
      benefit: "₹10 Cr/year savings",
      color: "yellow",
    },
    {
      id: 8,
      icon: "📱",
      category: "Digital",
      priority: "Low",
      title: `Citizen Smart City App`,
      problem: `Citizens have no unified platform to report issues, track city services, or receive AI alerts. Data collection for ML models is fragmented.`,
      solution:
        "Build a unified SmartCity mobile app where citizens can report potholes, pollution, waste, and receive personalized AI alerts based on their neighborhood and daily commute.",
      impact: ["10x faster issue resolution", "Crowdsourced real-time data", "Higher civic engagement", "Better ML model training"],
      timeline: "3–5 months",
      cost: "₹80L–1.2 Cr",
      benefit: "₹5 Cr/year efficiency gain",
      color: "purple",
    },
  ];

  const priorityColor: Record<string, string> = {
    Critical: "bg-red-500/20 text-red-400 border-red-500/30",
    High: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    Medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    Low: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  };

  const cardBorder: Record<string, string> = {
    orange: "border-orange-500/20 hover:border-orange-500/40",
    green: "border-green-500/20 hover:border-green-500/40",
    yellow: "border-yellow-500/20 hover:border-yellow-500/40",
    blue: "border-blue-500/20 hover:border-blue-500/40",
    teal: "border-teal-500/20 hover:border-teal-500/40",
    cyan: "border-cyan-500/20 hover:border-cyan-500/40",
    purple: "border-purple-500/20 hover:border-purple-500/40",
  };

  const categoryIcons: Record<string, React.ReactNode> = {
    Traffic: <TrendingUp size={12} className="text-orange-400" />,
    "Air Quality": <Leaf size={12} className="text-green-400" />,
    "Waste Management": <Zap size={12} className="text-yellow-400" />,
    "Public Transport": <Users size={12} className="text-blue-400" />,
    Environment: <Leaf size={12} className="text-teal-400" />,
    "Water & Drainage": <CheckCircle size={12} className="text-cyan-400" />,
    Energy: <Star size={12} className="text-yellow-400" />,
    Digital: <Building2 size={12} className="text-purple-400" />,
  };

  const totalCost = "₹97–153 Cr";
  const totalBenefit = "₹312 Cr/year";

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Building2 size={20} className="text-teal-400" />
          City Improvements — {city.name}
        </h2>
        <p className="text-gray-400 text-sm mt-0.5">
          AI-generated recommendations to make {city.name} smarter, cleaner & more efficient
        </p>
      </div>

      {/* Summary */}
      <div className="bg-gradient-to-r from-teal-500/10 to-blue-500/10 border border-teal-500/20 rounded-2xl p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-white font-bold text-lg mb-1">
              🏙️ {city.name} Smart City Roadmap
            </h3>
            <p className="text-gray-400 text-sm">
              {improvements.length} AI-identified improvements across 8 city domains
            </p>
          </div>
          <div className="flex gap-4">
            <div className="text-center">
              <div className="text-xl font-black text-teal-400">{totalCost}</div>
              <div className="text-xs text-gray-400">Total Investment</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-black text-green-400">{totalBenefit}</div>
              <div className="text-xs text-gray-400">Annual Benefit</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-black text-yellow-400">~6 mo</div>
              <div className="text-xs text-gray-400">Avg ROI Period</div>
            </div>
          </div>
        </div>
        {/* Priority breakdown */}
        <div className="flex flex-wrap gap-2 mt-4">
          {["Critical", "High", "Medium", "Low"].map((p) => {
            const count = improvements.filter((i) => i.priority === p).length;
            return (
              <span key={p} className={`px-3 py-1 rounded-full text-xs font-medium border ${priorityColor[p]}`}>
                {count} {p} Priority
              </span>
            );
          })}
        </div>
      </div>

      {/* Improvement Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {improvements.map((imp) => (
          <div
            key={imp.id}
            className={`bg-gray-800/60 border rounded-2xl p-5 transition-all ${cardBorder[imp.color]}`}
          >
            {/* Card Header */}
            <div className="flex items-start gap-3 mb-3">
              <span className="text-2xl flex-shrink-0">{imp.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${priorityColor[imp.priority]}`}>
                    {imp.priority}
                  </span>
                  <span className="flex items-center gap-1 text-[10px] text-gray-400">
                    {categoryIcons[imp.category]}
                    {imp.category}
                  </span>
                </div>
                <h4 className="text-white font-semibold text-sm leading-tight">{imp.title}</h4>
              </div>
            </div>

            {/* Problem */}
            <div className="bg-red-500/8 border border-red-500/15 rounded-lg p-3 mb-3">
              <div className="text-[10px] font-bold text-red-400 mb-1">⚠️ PROBLEM</div>
              <p className="text-xs text-gray-400">{imp.problem}</p>
            </div>

            {/* Solution */}
            <div className="bg-gray-700/30 rounded-lg p-3 mb-3">
              <div className="text-[10px] font-bold text-cyan-400 mb-1">💡 AI SOLUTION</div>
              <p className="text-xs text-gray-300">{imp.solution}</p>
            </div>

            {/* Impact */}
            <div className="mb-3">
              <div className="text-[10px] font-bold text-green-400 mb-1.5">✅ EXPECTED IMPACT</div>
              <div className="grid grid-cols-2 gap-1">
                {imp.impact.map((item, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-xs text-gray-300">
                    <ArrowRight size={10} className="text-green-400 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-gray-700/50">
              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                <Clock size={11} className="text-gray-500" />
                {imp.timeline}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                <DollarSign size={11} className="text-red-400" />
                {imp.cost}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-green-400 ml-auto font-medium">
                <TrendingUp size={11} />
                {imp.benefit}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Implementation Timeline */}
      <div className="bg-gray-800/60 border border-gray-700/50 rounded-2xl p-5">
        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
          <Clock size={16} className="text-blue-400" />
          Implementation Timeline — {city.name}
        </h3>
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-700" />
          <div className="space-y-4">
            {[
              { phase: "Phase 1", time: "0–6 months", items: ["Citizen Smart City App", "Smart Bins IoT", "AI Traffic Signals (pilot)"], color: "blue" },
              { phase: "Phase 2", time: "6–12 months", items: ["Solar Smart Streetlights", "Emission Monitoring Sensors", "Full Traffic Signal AI rollout"], color: "cyan" },
              { phase: "Phase 3", time: "12–24 months", items: ["Rapid Bus Corridor", "Industrial Emission Controls", "Smart Drainage System"], color: "teal" },
              { phase: "Phase 4", time: "24–36 months", items: ["Urban Forest Program", "Full city-wide integration", "AI model refinement"], color: "green" },
            ].map((phase) => (
              <div key={phase.phase} className="flex gap-4">
                <div className={`w-8 h-8 rounded-full bg-${phase.color}-500/20 border-2 border-${phase.color}-500/60 flex items-center justify-center flex-shrink-0 relative z-10`}>
                  <span className="text-xs font-bold text-white">{phase.phase.slice(-1)}</span>
                </div>
                <div className="flex-1 pb-2">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-white">{phase.phase}</span>
                    <span className="text-xs text-gray-400">({phase.time})</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {phase.items.map((item) => (
                      <span key={item} className="text-xs bg-gray-700/50 text-gray-300 px-2 py-1 rounded-lg">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
