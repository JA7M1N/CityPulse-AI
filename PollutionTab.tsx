import { useEffect, useRef, useState } from "react";
import { Wind, AlertTriangle, Heart, Leaf } from "lucide-react";
import {
  City,
  generateAQIData,
  AQIData,
  getAQIColor,
  getAQIBadge,
  AQILevel,
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

interface PollutionTabProps {
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

export default function PollutionTab({ city }: PollutionTabProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMap = useRef<any>(null);
  const heatLayer = useRef<any>(null);
  const [aqiData] = useState<AQIData[]>(() => generateAQIData(city));
  const [selectedArea, setSelectedArea] = useState<AQIData | null>(null);
  const [showHeat, setShowHeat] = useState(true);

  useEffect(() => {
    if (!mapRef.current) return;

    const initMap = async () => {
      const L = (await import("leaflet")).default;
      await import("leaflet.heat");

      if (leafletMap.current) {
        leafletMap.current.remove();
        leafletMap.current = null;
      }

      const map = L.map(mapRef.current!, {
        center: [city.lat, city.lng],
        zoom: city.zoom,
        zoomControl: true,
        attributionControl: false,
      });

      L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
        maxZoom: 19,
      }).addTo(map);

      leafletMap.current = map;

      const heatPoints = generateAQIData(city).map((a) => [
        a.lat,
        a.lng,
        Math.min(1, a.aqi / 400),
      ]);
      const heat = (L as any).heatLayer(heatPoints, {
        radius: 45,
        blur: 30,
        maxZoom: 17,
        max: 1.0,
        gradient: { 0.2: "#22c55e", 0.4: "#84cc16", 0.6: "#eab308", 0.8: "#f97316", 1.0: "#7c3aed" },
      });
      if (showHeat) heat.addTo(map);
      heatLayer.current = heat;

      generateAQIData(city).forEach((a) => {
        const color = getAQIColor(a.level);
        const icon = L.divIcon({
          html: `<div style="
            width:44px;height:44px;border-radius:50%;
            background:${color}22;border:2.5px solid ${color};
            display:flex;flex-direction:column;align-items:center;justify-content:center;
            font-size:11px;font-weight:700;color:${color};
            box-shadow:0 0 14px ${color}55;
            cursor:pointer;line-height:1.1;
          "><span style="font-size:13px;">${a.aqi}</span><span style="font-size:8px;">AQI</span></div>`,
          className: "",
          iconSize: [44, 44],
          iconAnchor: [22, 22],
        });

        const marker = L.marker([a.lat, a.lng], { icon }).addTo(map);
        marker.bindTooltip(
          `<div style="background:#1f2937;border:1px solid #374151;border-radius:8px;padding:8px 12px;color:white;font-size:12px;">
            <b style="color:${color}">${a.area}</b><br/>
            AQI: <b style="color:${color}">${a.aqi}</b> — ${getAQIBadge(a.level)}<br/>
            PM2.5: ${a.pm25} μg/m³ | PM10: ${a.pm10} μg/m³
          </div>`,
          { direction: "top", offset: [0, -22], opacity: 1 }
        );
        marker.on("click", () => setSelectedArea(a));
      });
    };

    initMap();
    return () => {
      if (leafletMap.current) {
        leafletMap.current.remove();
        leafletMap.current = null;
      }
    };
  }, [city]);

  useEffect(() => {
    if (!leafletMap.current || !heatLayer.current) return;
    if (showHeat) heatLayer.current.addTo(leafletMap.current);
    else leafletMap.current.removeLayer(heatLayer.current);
  }, [showHeat]);

  // Generate 24h trend for selected area
  const trendData = selectedArea
    ? Array.from({ length: 24 }, (_, i) => {
        const rng = seededRng(selectedArea.area + i);
        return {
          hour: `${i}:00`,
          AQI: Math.max(20, Math.round(selectedArea.aqi + (rng() - 0.5) * 80)),
          PM25: Math.max(5, Math.round(selectedArea.pm25 + (rng() - 0.5) * 40)),
        };
      })
    : [];

  const worstArea = [...aqiData].sort((a, b) => b.aqi - a.aqi)[0];
  const bestArea = [...aqiData].sort((a, b) => a.aqi - b.aqi)[0];
  const avgAQI = Math.round(aqiData.reduce((s, a) => s + a.aqi, 0) / aqiData.length);

  const getHealthReco = (level: AQILevel): string[] => {
    const map: Record<AQILevel, string[]> = {
      good: ["✅ Safe for all outdoor activities", "🌿 Great for morning walks", "😊 No precautions needed"],
      satisfactory: ["🚶 Outdoor activities are fine", "⚠️ Sensitive people take care", "😷 Mask optional"],
      moderate: ["😷 Wear a mask outdoors", "🏃 Limit prolonged exertion", "🌬️ Keep windows closed"],
      poor: ["🚫 Avoid outdoor activities", "😷 N95 mask mandatory", "🏥 Asthma patients stay indoors"],
      very_poor: ["🚨 Health alert issued", "😷 Double-layer mask required", "🏠 Stay indoors completely"],
      severe: ["☣️ Emergency health alert!", "🏠 Seal windows and doors", "🚑 Medical help if symptoms arise"],
    };
    return map[level] || [];
  };

  const aqiLevelColor = (level: AQILevel) => {
    const map: Record<AQILevel, string> = {
      good: "from-green-500/20 border-green-500/30 text-green-400",
      satisfactory: "from-lime-500/20 border-lime-500/30 text-lime-400",
      moderate: "from-yellow-500/20 border-yellow-500/30 text-yellow-400",
      poor: "from-orange-500/20 border-orange-500/30 text-orange-400",
      very_poor: "from-red-500/20 border-red-500/30 text-red-400",
      severe: "from-purple-500/20 border-purple-500/30 text-purple-400",
    };
    return map[level];
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Wind size={20} className="text-green-400" />
            Air Quality Intelligence — {city.name}
          </h2>
          <p className="text-gray-400 text-sm mt-0.5">Real-time AQI monitoring & health alerts</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-sm">
            <span className="text-gray-400 text-xs">City Avg AQI: </span>
            <span className="font-bold" style={{ color: getAQIColor(aqiData[0]?.level) }}>{avgAQI}</span>
          </div>
          <button
            onClick={() => setShowHeat(!showHeat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              showHeat ? "bg-green-500/20 text-green-400 border border-green-500/40" : "bg-gray-700 text-gray-400 border border-gray-600"
            }`}
          >
            🌡️ Heatmap {showHeat ? "ON" : "OFF"}
          </button>
        </div>
      </div>

      {/* Alert Banner */}
      {worstArea && worstArea.aqi > 150 && (
        <div className={`bg-gradient-to-r ${aqiLevelColor(worstArea.level)} border rounded-xl p-3 flex items-center gap-3`}>
          <AlertTriangle size={18} className="flex-shrink-0" />
          <div className="text-sm">
            <span className="font-semibold">Health Alert: </span>
            <span>{worstArea.area} has AQI {worstArea.aqi} ({getAQIBadge(worstArea.level)}). {worstArea.healthAlert}</span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* MAP */}
        <div className="xl:col-span-2 bg-gray-800/60 border border-gray-700/50 rounded-2xl overflow-hidden">
          <div className="p-3 border-b border-gray-700/50 flex items-center justify-between flex-wrap gap-2">
            <span className="text-white font-medium text-sm flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              AQI Pollution Map
            </span>
            <div className="flex gap-2 flex-wrap">
              {([["Good", "#22c55e"], ["Moderate", "#eab308"], ["Poor", "#f97316"], ["Severe", "#7c3aed"]] as [string, string][]).map(([l, c]) => (
                <div key={l} className="flex items-center gap-1 text-xs text-gray-400">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c }} />
                  {l}
                </div>
              ))}
            </div>
          </div>
          <div ref={mapRef} style={{ height: "400px" }} className="w-full" />
        </div>

        {/* Side Panel */}
        <div className="space-y-4">
          {/* AQI Cards */}
          <div className="bg-gray-800/60 border border-gray-700/50 rounded-2xl p-4">
            <h3 className="text-white font-semibold text-sm mb-3 flex items-center gap-2">
              <Wind size={14} className="text-green-400" />
              Area AQI Status
            </h3>
            <div className="space-y-2">
              {aqiData.map((a) => (
                <button
                  key={a.area}
                  onClick={() => setSelectedArea(a)}
                  className={`w-full flex items-center justify-between p-2.5 rounded-lg transition-all hover:bg-gray-700/50 ${
                    selectedArea?.area === a.area ? "bg-gray-700/70 ring-1 ring-cyan-500/40" : "bg-gray-700/20"
                  }`}
                >
                  <span className="text-xs text-gray-300 font-medium">{a.area}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${Math.min(100, (a.aqi / 400) * 100)}%`, backgroundColor: getAQIColor(a.level) }}
                      />
                    </div>
                    <span className="text-xs font-bold w-8 text-right" style={{ color: getAQIColor(a.level) }}>{a.aqi}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Health Recommendations */}
          <div className="bg-gray-800/60 border border-gray-700/50 rounded-2xl p-4">
            <h3 className="text-white font-semibold text-sm mb-3 flex items-center gap-2">
              <Heart size={14} className="text-red-400" />
              Health Recommendations
            </h3>
            <div className="space-y-1.5">
              {getHealthReco((selectedArea || worstArea)?.level || "good").map((r, i) => (
                <div key={i} className="text-xs text-gray-300 bg-gray-700/30 rounded-lg px-3 py-2">{r}</div>
              ))}
            </div>
            {(selectedArea || worstArea) && (
              <div className="mt-3 p-2.5 rounded-lg text-xs" style={{ backgroundColor: getAQIColor((selectedArea || worstArea)!.level) + "22", color: getAQIColor((selectedArea || worstArea)!.level) }}>
                <span className="font-bold">{(selectedArea || worstArea)?.area}: </span>
                AQI {(selectedArea || worstArea)?.aqi} — {getAQIBadge((selectedArea || worstArea)!.level)}
              </div>
            )}
          </div>

          {/* Eco Tips */}
          <div className="bg-gray-800/60 border border-gray-700/50 rounded-2xl p-4">
            <h3 className="text-white font-semibold text-sm mb-3 flex items-center gap-2">
              <Leaf size={14} className="text-green-400" />
              Eco Suggestions
            </h3>
            <div className="space-y-1.5 text-xs text-gray-400">
              <div className="flex gap-2"><span>🌳</span><span>Plant trees in high-AQI zones</span></div>
              <div className="flex gap-2"><span>🚴</span><span>Use cycling routes in low AQI areas</span></div>
              <div className="flex gap-2"><span>🚗</span><span>Avoid idling vehicles near {worstArea?.area}</span></div>
              <div className="flex gap-2"><span>🏭</span><span>Report industrial emissions to authorities</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* Selected Area Detail */}
      {selectedArea && (
        <div className="bg-gray-800/60 border border-gray-700/50 rounded-2xl p-5">
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <Wind size={16} style={{ color: getAQIColor(selectedArea.level) }} />
            {selectedArea.area} — Detailed Air Quality
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
            {[
              ["PM2.5", `${selectedArea.pm25} μg/m³`, "#f97316"],
              ["PM10", `${selectedArea.pm10} μg/m³`, "#eab308"],
              ["NO₂", `${selectedArea.no2} μg/m³`, "#a78bfa"],
              ["O₃", `${selectedArea.o3} μg/m³`, "#06b6d4"],
            ].map(([label, val, color]) => (
              <div key={label} className="bg-gray-700/30 rounded-xl p-3 text-center">
                <div className="text-lg font-bold" style={{ color }}>{val}</div>
                <div className="text-xs text-gray-400 mt-0.5">{label}</div>
              </div>
            ))}
          </div>
          <h4 className="text-gray-300 text-sm font-medium mb-2">24-Hour AQI Trend</h4>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={trendData.filter((_, i) => i % 2 === 0)}>
              <defs>
                <linearGradient id="aqiGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={getAQIColor(selectedArea.level)} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={getAQIColor(selectedArea.level)} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="hour" tick={{ fill: "#9ca3af", fontSize: 10 }} />
              <YAxis tick={{ fill: "#9ca3af", fontSize: 10 }} />
              <Tooltip contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151", borderRadius: "8px" }} />
              <Area type="monotone" dataKey="AQI" stroke={getAQIColor(selectedArea.level)} fill="url(#aqiGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* All Areas Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
        {aqiData.map((a) => (
          <button
            key={a.area}
            onClick={() => setSelectedArea(a)}
            className={`bg-gray-800/60 border rounded-xl p-4 text-left hover:scale-[1.02] transition-all ${
              selectedArea?.area === a.area ? "border-cyan-500/50" : "border-gray-700/50"
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-semibold text-white">{a.area}</span>
              <span className="text-xs px-1.5 py-0.5 rounded-full font-medium" style={{ backgroundColor: getAQIColor(a.level) + "33", color: getAQIColor(a.level) }}>
                {getAQIBadge(a.level)}
              </span>
            </div>
            <div className="text-2xl font-black mb-1" style={{ color: getAQIColor(a.level) }}>{a.aqi}</div>
            <div className="text-xs text-gray-400 mb-2">AQI Index</div>
            <div className="space-y-1 text-xs text-gray-500">
              <div className="flex justify-between"><span>PM2.5</span><span>{a.pm25} μg/m³</span></div>
              <div className="flex justify-between"><span>PM10</span><span>{a.pm10} μg/m³</span></div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
