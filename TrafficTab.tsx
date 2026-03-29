import { useEffect, useRef, useState } from "react";
import { Activity, TrendingUp, Clock, Zap, Navigation, Info } from "lucide-react";
import {
  City,
  generateTrafficData,
  TrafficData,
  getTrafficColor,
  getTrafficBadge,
} from "../data/cityData";

interface TrafficTabProps {
  city: City;
}

export default function TrafficTab({ city }: TrafficTabProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMap = useRef<any>(null);
  const markersLayer = useRef<any>(null);
  const heatLayer = useRef<any>(null);
  const [trafficData] = useState<TrafficData[]>(() => generateTrafficData(city));
  const [selectedArea, setSelectedArea] = useState<TrafficData | null>(null);
  const [showHeat, setShowHeat] = useState(true);
  const [routeFrom, setRouteFrom] = useState<string>("");
  const [routeTo, setRouteTo] = useState<string>("");
  const [routeResult, setRouteResult] = useState<string | null>(null);
  const [mapReady, setMapReady] = useState(false);

  // Build map
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

      // Heatmap layer
      const heatPoints = generateTrafficData(city).map((t) => [
        t.lat,
        t.lng,
        t.congestionPct / 100,
      ]);
      const heat = (L as any).heatLayer(heatPoints, {
        radius: 45,
        blur: 30,
        maxZoom: 17,
        max: 1.0,
        gradient: { 0.2: "#22c55e", 0.5: "#eab308", 0.75: "#f97316", 1.0: "#ef4444" },
      });
      if (showHeat) heat.addTo(map);
      heatLayer.current = heat;

      // Markers
      const layer = L.layerGroup().addTo(map);
      markersLayer.current = layer;

      generateTrafficData(city).forEach((t) => {
        const color = getTrafficColor(t.level);
        const icon = L.divIcon({
          html: `<div style="
            width:36px;height:36px;border-radius:50%;
            background:${color}22;border:2.5px solid ${color};
            display:flex;align-items:center;justify-content:center;
            font-size:13px;font-weight:700;color:${color};
            box-shadow:0 0 12px ${color}55;
            cursor:pointer;
          ">${t.congestionPct}%</div>`,
          className: "",
          iconSize: [36, 36],
          iconAnchor: [18, 18],
        });

        const marker = L.marker([t.lat, t.lng], { icon }).addTo(layer);
        marker.bindTooltip(
          `<div style="background:#1f2937;border:1px solid #374151;border-radius:8px;padding:8px 12px;color:white;font-size:12px;">
            <b style="color:${color}">${t.area}</b><br/>
            Congestion: ${t.congestionPct}%<br/>
            Avg Speed: ${t.avgSpeed} km/h<br/>
            Status: <span style="color:${color}">${getTrafficBadge(t.level)}</span>
          </div>`,
          { direction: "top", offset: [0, -18], opacity: 1 }
        );
        marker.on("click", () => setSelectedArea(t));
      });

      setMapReady(true);
    };

    initMap();

    return () => {
      if (leafletMap.current) {
        leafletMap.current.remove();
        leafletMap.current = null;
      }
    };
  }, [city]);

  // Toggle heatmap
  useEffect(() => {
    if (!leafletMap.current || !heatLayer.current) return;
    if (showHeat) heatLayer.current.addTo(leafletMap.current);
    else leafletMap.current.removeLayer(heatLayer.current);
  }, [showHeat]);

  const handleRoute = () => {
    if (!routeFrom || !routeTo) return;
    const from = trafficData.find((t) => t.area === routeFrom);
    const to = trafficData.find((t) => t.area === routeTo);
    if (!from || !to) return;

    const intermediate = trafficData
      .filter((t) => t.area !== routeFrom && t.area !== routeTo)
      .sort((a, b) => a.congestionPct - b.congestionPct)[0];

    const direct = (from.congestionPct + to.congestionPct) / 2;
    const viaRoute = intermediate
      ? (from.congestionPct + intermediate.congestionPct + to.congestionPct) / 3
      : direct;

    if (intermediate && viaRoute < direct - 10) {
      setRouteResult(
        `🛣️ Recommended Route: ${routeFrom} → ${intermediate.area} → ${routeTo}\n` +
        `⚡ Congestion via ${intermediate.area}: ${Math.round(viaRoute)}% (saves ~${Math.round(direct - viaRoute)}% congestion)\n` +
        `📏 Better path avoids ${from.level === "high" || from.level === "critical" ? routeFrom + " peak zone" : routeTo + " peak zone"}`
      );
    } else {
      setRouteResult(
        `🛣️ Direct Route: ${routeFrom} → ${routeTo}\n` +
        `⚡ Avg Congestion: ${Math.round(direct)}%\n` +
        `✅ Direct path is currently the best option.`
      );
    }

    // Draw route line on map
    if (leafletMap.current) {
      const L = (window as any).L;
      if (L) {
        const points = intermediate && viaRoute < direct - 10
          ? [[from.lat, from.lng], [intermediate.lat, intermediate.lng], [to.lat, to.lng]]
          : [[from.lat, from.lng], [to.lat, to.lng]];
        if ((leafletMap.current as any)._routeLine) {
          leafletMap.current.removeLayer((leafletMap.current as any)._routeLine);
        }
        const line = L.polyline(points, { color: "#06b6d4", weight: 4, dashArray: "10 6", opacity: 0.9 });
        line.addTo(leafletMap.current);
        (leafletMap.current as any)._routeLine = line;
        leafletMap.current.fitBounds(line.getBounds(), { padding: [40, 40] });
      }
    }
  };

  const congestionLevels = [
    { label: "Low (<30%)", color: "#22c55e" },
    { label: "Moderate (30–55%)", color: "#eab308" },
    { label: "High (55–75%)", color: "#f97316" },
    { label: "Critical (>75%)", color: "#ef4444" },
  ];

  const worstArea = [...trafficData].sort((a, b) => b.congestionPct - a.congestionPct)[0];
  const bestArea = [...trafficData].sort((a, b) => a.congestionPct - b.congestionPct)[0];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Activity size={20} className="text-orange-400" />
            Traffic Intelligence — {city.name}
          </h2>
          <p className="text-gray-400 text-sm mt-0.5">AI-powered congestion prediction & route optimization</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowHeat(!showHeat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              showHeat ? "bg-orange-500/20 text-orange-400 border border-orange-500/40" : "bg-gray-700 text-gray-400 border border-gray-600"
            }`}
          >
            🔥 Heatmap {showHeat ? "ON" : "OFF"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* MAP */}
        <div className="xl:col-span-2 bg-gray-800/60 border border-gray-700/50 rounded-2xl overflow-hidden">
          <div className="p-3 border-b border-gray-700/50 flex items-center justify-between">
            <span className="text-white font-medium text-sm flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Live Traffic Map
            </span>
            <div className="flex gap-3">
              {congestionLevels.map((l) => (
                <div key={l.label} className="hidden sm:flex items-center gap-1 text-xs text-gray-400">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: l.color }} />
                  {l.label}
                </div>
              ))}
            </div>
          </div>
          <div ref={mapRef} style={{ height: "420px" }} className="w-full" />
        </div>

        {/* Side Panel */}
        <div className="space-y-4">
          {/* AI Suggestions */}
          <div className="bg-gray-800/60 border border-gray-700/50 rounded-2xl p-4">
            <h3 className="text-white font-semibold text-sm flex items-center gap-2 mb-3">
              <Zap size={14} className="text-yellow-400" />
              AI Traffic Suggestions
            </h3>
            <div className="space-y-2">
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-2.5 text-xs text-red-300">
                🚨 Avoid <span className="font-bold text-red-400">{worstArea?.area}</span> — {worstArea?.congestionPct}% congestion
              </div>
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-2.5 text-xs text-green-300">
                ✅ Best route via <span className="font-bold text-green-400">{bestArea?.area}</span> — only {bestArea?.congestionPct}%
              </div>
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-2.5 text-xs text-yellow-300">
                ⏱️ Peak time today: <span className="font-bold">{worstArea?.peakTime}</span>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-2.5 text-xs text-blue-300">
                📈 <span className="font-bold">{worstArea?.area}</span> will worsen in 1h → {getTrafficBadge(worstArea?.predictedNext1h)}
              </div>
            </div>
          </div>

          {/* Route Optimizer */}
          <div className="bg-gray-800/60 border border-gray-700/50 rounded-2xl p-4">
            <h3 className="text-white font-semibold text-sm flex items-center gap-2 mb-3">
              <Navigation size={14} className="text-cyan-400" />
              Route Optimizer
            </h3>
            <div className="space-y-2">
              <select
                value={routeFrom}
                onChange={(e) => setRouteFrom(e.target.value)}
                className="w-full bg-gray-700 text-white text-xs rounded-lg px-3 py-2 border border-gray-600 focus:border-cyan-500 outline-none"
              >
                <option value="">📍 Select Origin</option>
                {city.areas.map((a) => (
                  <option key={a.name} value={a.name}>{a.name}</option>
                ))}
              </select>
              <select
                value={routeTo}
                onChange={(e) => setRouteTo(e.target.value)}
                className="w-full bg-gray-700 text-white text-xs rounded-lg px-3 py-2 border border-gray-600 focus:border-cyan-500 outline-none"
              >
                <option value="">🏁 Select Destination</option>
                {city.areas.map((a) => (
                  <option key={a.name} value={a.name}>{a.name}</option>
                ))}
              </select>
              <button
                onClick={handleRoute}
                disabled={!routeFrom || !routeTo || routeFrom === routeTo}
                className="w-full bg-cyan-500 hover:bg-cyan-400 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold text-xs py-2 rounded-lg transition-colors"
              >
                Find Best Route
              </button>
              {routeResult && (
                <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-3 text-xs text-cyan-300 whitespace-pre-line">
                  {routeResult}
                </div>
              )}
            </div>
          </div>

          {/* Selected Area Info */}
          {selectedArea && (
            <div className="bg-gray-800/60 border border-gray-700/50 rounded-2xl p-4">
              <h3 className="text-white font-semibold text-sm flex items-center gap-2 mb-3">
                <Info size={14} className="text-blue-400" />
                {selectedArea.area} Details
              </h3>
              <div className="space-y-2">
                {[
                  ["Current Status", getTrafficBadge(selectedArea.level), getTrafficColor(selectedArea.level)],
                  ["Congestion", `${selectedArea.congestionPct}%`, "#f97316"],
                  ["Avg Speed", `${selectedArea.avgSpeed} km/h`, "#06b6d4"],
                  ["Peak Time", selectedArea.peakTime, "#eab308"],
                  ["In 1 Hour", getTrafficBadge(selectedArea.predictedNext1h), getTrafficColor(selectedArea.predictedNext1h)],
                  ["In 2 Hours", getTrafficBadge(selectedArea.predictedNext2h), getTrafficColor(selectedArea.predictedNext2h)],
                ].map(([label, val, color]) => (
                  <div key={label} className="flex justify-between items-center text-xs">
                    <span className="text-gray-400">{label}</span>
                    <span className="font-semibold" style={{ color }}>{val}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Traffic Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {trafficData.map((t) => (
          <button
            key={t.area}
            onClick={() => setSelectedArea(t)}
            className={`bg-gray-800/60 border rounded-xl p-3 text-left hover:scale-[1.02] transition-all cursor-pointer ${
              selectedArea?.area === t.area ? "border-cyan-500/60 bg-cyan-500/5" : "border-gray-700/50"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-white truncate">{t.area}</span>
              <span
                className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                style={{ backgroundColor: getTrafficColor(t.level) + "33", color: getTrafficColor(t.level) }}
              >
                {getTrafficBadge(t.level)}
              </span>
            </div>
            <div className="mb-1.5">
              <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${t.congestionPct}%`, backgroundColor: getTrafficColor(t.level) }}
                />
              </div>
            </div>
            <div className="flex justify-between text-[10px] text-gray-400">
              <span>{t.congestionPct}% congested</span>
              <span>{t.avgSpeed} km/h</span>
            </div>
            <div className="mt-1.5 flex items-center gap-1 text-[10px] text-gray-500">
              <TrendingUp size={9} />
              1h: {getTrafficBadge(t.predictedNext1h)}
            </div>
            <div className="flex items-center gap-1 text-[10px] text-gray-500">
              <Clock size={9} />
              Peak: {t.peakTime}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
