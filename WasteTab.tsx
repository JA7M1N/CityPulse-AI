import { useEffect, useRef, useState } from "react";
import { Trash2, MapPin, CheckCircle, Clock, AlertTriangle, TrendingUp } from "lucide-react";
import {
  City,
  generateWasteData,
  WasteData,
} from "../data/cityData";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface WasteTabProps {
  city: City;
}

export default function WasteTab({ city }: WasteTabProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMap = useRef<any>(null);
  const [wasteData] = useState<WasteData[]>(() => generateWasteData(city));
  const [selectedArea, setSelectedArea] = useState<WasteData | null>(null);
  const [areaInput, setAreaInput] = useState("");
  const [areaResult, setAreaResult] = useState<WasteData | null>(null);
  const [showResult, setShowResult] = useState(false);

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

      // Heatmap for waste density
      const heatPoints = generateWasteData(city).map((w) => [w.lat, w.lng, w.wasteLevel / 100]);
      (L as any).heatLayer(heatPoints, {
        radius: 45,
        blur: 30,
        maxZoom: 17,
        max: 1.0,
        gradient: { 0.2: "#22c55e", 0.5: "#eab308", 0.8: "#f97316", 1.0: "#ef4444" },
      }).addTo(map);

      // Markers with collection route (dashed polyline)
      const sortedByPriority = [...generateWasteData(city)].sort((a, b) => b.wasteLevel - a.wasteLevel);
      const routePoints = sortedByPriority.map((w) => [w.lat, w.lng]);

      L.polyline(routePoints as [number, number][], {
        color: "#06b6d4",
        weight: 2.5,
        dashArray: "8 5",
        opacity: 0.7,
      }).addTo(map);

      generateWasteData(city).forEach((w) => {
        const color = w.wasteLevel > 70 ? "#ef4444" : w.wasteLevel > 45 ? "#eab308" : "#22c55e";
        const statusIcon =
          w.collectionStatus === "completed" ? "✅" : w.collectionStatus === "scheduled" ? "📅" : "⚠️";

        const icon = L.divIcon({
          html: `<div style="
            width:40px;height:40px;border-radius:8px;
            background:${color}22;border:2px solid ${color};
            display:flex;flex-direction:column;align-items:center;justify-content:center;
            font-size:10px;font-weight:700;color:${color};
            box-shadow:0 0 12px ${color}44;cursor:pointer;line-height:1.1;
          "><span style="font-size:14px;">${statusIcon}</span><span>${w.wasteLevel}%</span></div>`,
          className: "",
          iconSize: [40, 40],
          iconAnchor: [20, 20],
        });

        const marker = L.marker([w.lat, w.lng], { icon }).addTo(map);
        marker.bindTooltip(
          `<div style="background:#1f2937;border:1px solid #374151;border-radius:8px;padding:8px 12px;color:white;font-size:12px;">
            <b style="color:${color}">${w.area}</b><br/>
            Waste Level: <b>${w.wasteLevel}%</b><br/>
            Status: ${w.collectionStatus}<br/>
            Next: ${w.nextCollection}
          </div>`,
          { direction: "top", offset: [0, -20], opacity: 1 }
        );
        marker.on("click", () => setSelectedArea(w));
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

  const handleAreaCheck = () => {
    if (!areaInput.trim()) return;
    const found = wasteData.find(
      (w) => w.area.toLowerCase().includes(areaInput.toLowerCase())
    );
    setAreaResult(found || null);
    setShowResult(true);
  };

  const chartData = [...wasteData]
    .sort((a, b) => b.wasteLevel - a.wasteLevel)
    .map((w) => ({ name: w.area.split(" ")[0], Level: w.wasteLevel, Tonnes: w.tonnesPerDay }));

  const criticalAreas = wasteData.filter((w) => w.wasteLevel > 70 && w.collectionStatus === "pending");
  const completedAreas = wasteData.filter((w) => w.collectionStatus === "completed");
  const scheduledAreas = wasteData.filter((w) => w.collectionStatus === "scheduled");

  const getStatusColor = (status: WasteData["collectionStatus"]) => {
    const map = { completed: "text-green-400", scheduled: "text-blue-400", pending: "text-red-400" };
    return map[status];
  };
  const getStatusIcon = (status: WasteData["collectionStatus"]) => {
    if (status === "completed") return <CheckCircle size={14} className="text-green-400" />;
    if (status === "scheduled") return <Clock size={14} className="text-blue-400" />;
    return <AlertTriangle size={14} className="text-red-400" />;
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Trash2 size={20} className="text-yellow-400" />
            Smart Waste Management — {city.name}
          </h2>
          <p className="text-gray-400 text-sm mt-0.5">AI-optimized collection routing & waste prediction</p>
        </div>
        <div className="flex gap-2 text-xs">
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-1.5 text-red-400">
            {criticalAreas.length} Critical
          </div>
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg px-3 py-1.5 text-blue-400">
            {scheduledAreas.length} Scheduled
          </div>
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg px-3 py-1.5 text-green-400">
            {completedAreas.length} Done
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* MAP */}
        <div className="xl:col-span-2 bg-gray-800/60 border border-gray-700/50 rounded-2xl overflow-hidden">
          <div className="p-3 border-b border-gray-700/50 flex items-center justify-between flex-wrap gap-2">
            <span className="text-white font-medium text-sm flex items-center gap-2">
              <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
              Waste Collection Map
            </span>
            <div className="flex gap-2 text-xs text-gray-400">
              <span className="flex items-center gap-1"><span className="w-6 border border-dashed border-cyan-400" /> Optimal Route</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-red-500" /> Critical</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-yellow-500" /> Moderate</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-green-500" /> Managed</span>
            </div>
          </div>
          <div ref={mapRef} style={{ height: "400px" }} className="w-full" />
        </div>

        {/* Side Panel */}
        <div className="space-y-4">
          {/* Area Checker */}
          <div className="bg-gray-800/60 border border-gray-700/50 rounded-2xl p-4">
            <h3 className="text-white font-semibold text-sm flex items-center gap-2 mb-3">
              <MapPin size={14} className="text-cyan-400" />
              Check Your Area
            </h3>
            <div className="space-y-2">
              <select
                value={areaInput}
                onChange={(e) => setAreaInput(e.target.value)}
                className="w-full bg-gray-700 text-white text-xs rounded-lg px-3 py-2.5 border border-gray-600 focus:border-cyan-500 outline-none"
              >
                <option value="">Select your area in {city.name}</option>
                {city.areas.map((a) => (
                  <option key={a.name} value={a.name}>{a.name}</option>
                ))}
              </select>
              <button
                onClick={handleAreaCheck}
                disabled={!areaInput}
                className="w-full bg-yellow-500 hover:bg-yellow-400 disabled:bg-gray-600 disabled:cursor-not-allowed text-gray-900 font-semibold text-xs py-2 rounded-lg transition-colors"
              >
                Check Waste Status
              </button>

              {showResult && (
                <div className={`rounded-xl p-3 border text-xs ${
                  areaResult
                    ? areaResult.wasteLevel > 70
                      ? "bg-red-500/10 border-red-500/30 text-red-300"
                      : areaResult.wasteLevel > 45
                      ? "bg-yellow-500/10 border-yellow-500/30 text-yellow-300"
                      : "bg-green-500/10 border-green-500/30 text-green-300"
                    : "bg-gray-700/50 border-gray-600 text-gray-300"
                }`}>
                  {areaResult ? (
                    <div className="space-y-1.5">
                      <div className="font-bold text-sm">{areaResult.area}</div>
                      <div className="flex justify-between">
                        <span>Waste Level:</span>
                        <span className="font-bold">{areaResult.wasteLevel}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Status:</span>
                        <span className="flex items-center gap-1 font-medium capitalize">{getStatusIcon(areaResult.collectionStatus)}{areaResult.collectionStatus}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Next Collection:</span>
                        <span className="font-medium">{areaResult.nextCollection}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Daily Waste:</span>
                        <span className="font-medium">{areaResult.tonnesPerDay} tonnes</span>
                      </div>
                      <div>
                        <span>Waste Types: </span>
                        <span>{areaResult.wasteType.join(", ")}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="text-lg mb-1">🔍</div>
                      No data found for "{areaInput}" in {city.name}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Collection Route Priority */}
          <div className="bg-gray-800/60 border border-gray-700/50 rounded-2xl p-4">
            <h3 className="text-white font-semibold text-sm flex items-center gap-2 mb-3">
              <TrendingUp size={14} className="text-orange-400" />
              Optimized Collection Route
            </h3>
            <div className="space-y-1.5">
              {[...wasteData]
                .sort((a, b) => b.wasteLevel - a.wasteLevel)
                .map((w, i) => (
                  <div
                    key={w.area}
                    onClick={() => setSelectedArea(w)}
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-700/40 cursor-pointer transition-colors"
                  >
                    <span className="w-5 h-5 rounded-full bg-gray-700 flex items-center justify-center text-xs font-bold text-gray-300 flex-shrink-0">
                      {i + 1}
                    </span>
                    <span className="flex-1 text-xs text-gray-300 truncate">{w.area}</span>
                    <div className="flex items-center gap-1.5">
                      <div className="w-12 h-1 bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${w.wasteLevel}%`,
                            backgroundColor: w.wasteLevel > 70 ? "#ef4444" : w.wasteLevel > 45 ? "#eab308" : "#22c55e",
                          }}
                        />
                      </div>
                      <span className="text-xs font-bold w-8 text-right" style={{
                        color: w.wasteLevel > 70 ? "#ef4444" : w.wasteLevel > 45 ? "#eab308" : "#22c55e"
                      }}>
                        {w.wasteLevel}%
                      </span>
                    </div>
                    {getStatusIcon(w.collectionStatus)}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-gray-800/60 border border-gray-700/50 rounded-2xl p-5">
        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
          <Trash2 size={16} className="text-yellow-400" />
          Waste Level by Area
        </h3>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={chartData} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="name" tick={{ fill: "#9ca3af", fontSize: 11 }} />
            <YAxis tick={{ fill: "#9ca3af", fontSize: 11 }} domain={[0, 100]} />
            <Tooltip
              contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151", borderRadius: "8px" }}
              labelStyle={{ color: "#f3f4f6" }}
            />
            <Bar dataKey="Level" name="Waste Level %" radius={[4, 4, 0, 0]}
              fill="#eab308"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Area Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
        {wasteData.map((w) => (
          <button
            key={w.area}
            onClick={() => setSelectedArea(w)}
            className={`bg-gray-800/60 border rounded-xl p-4 text-left hover:scale-[1.02] transition-all ${
              selectedArea?.area === w.area ? "border-cyan-500/50" : "border-gray-700/50"
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-semibold text-white truncate">{w.area}</span>
              {getStatusIcon(w.collectionStatus)}
            </div>
            <div
              className="text-2xl font-black mb-1"
              style={{ color: w.wasteLevel > 70 ? "#ef4444" : w.wasteLevel > 45 ? "#eab308" : "#22c55e" }}
            >
              {w.wasteLevel}%
            </div>
            <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden mb-2">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${w.wasteLevel}%`,
                  backgroundColor: w.wasteLevel > 70 ? "#ef4444" : w.wasteLevel > 45 ? "#eab308" : "#22c55e",
                }}
              />
            </div>
            <div className="space-y-0.5 text-xs text-gray-400">
              <div className="flex justify-between">
                <span>Status:</span>
                <span className={`capitalize font-medium ${getStatusColor(w.collectionStatus)}`}>{w.collectionStatus}</span>
              </div>
              <div className="flex justify-between">
                <span>Next:</span>
                <span className="text-gray-300">{w.nextCollection.split(" ").slice(0, 2).join(" ")}</span>
              </div>
              <div className="flex justify-between">
                <span>Daily:</span>
                <span className="text-gray-300">{w.tonnesPerDay}t</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-1 mt-2">
              {w.wasteType.map((t) => (
                <span key={t} className="text-[9px] bg-gray-700/60 text-gray-400 px-1.5 py-0.5 rounded-full">{t}</span>
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
