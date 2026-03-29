import React, { useState, useRef, useEffect } from "react";
import { Search, MapPin, ChevronDown, X } from "lucide-react";
import { INDIAN_CITIES, City } from "../data/cityData";

interface CitySelectorProps {
  selectedCity: City;
  onCityChange: (city: City) => void;
}

export default function CitySelector({ selectedCity, onCityChange }: CitySelectorProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filtered = INDIAN_CITIES.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.state.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 bg-gray-800 hover:bg-gray-750 border border-gray-600 hover:border-cyan-500/50 rounded-xl px-4 py-2.5 text-sm text-white transition-all duration-200 min-w-[200px] justify-between group"
      >
        <div className="flex items-center gap-2">
          <MapPin size={15} className="text-cyan-400" />
          <div className="text-left">
            <div className="font-semibold text-white leading-tight">{selectedCity.name}</div>
            <div className="text-xs text-gray-400 leading-tight">{selectedCity.state}</div>
          </div>
        </div>
        <ChevronDown size={15} className={`text-gray-400 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-2 w-72 bg-gray-800 border border-gray-600 rounded-xl shadow-2xl shadow-black/50 z-50 overflow-hidden animate-in fade-in duration-150">
          {/* Search */}
          <div className="p-3 border-b border-gray-700">
            <div className="flex items-center gap-2 bg-gray-700 rounded-lg px-3 py-2">
              <Search size={14} className="text-gray-400" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search Indian cities..."
                className="flex-1 bg-transparent text-sm text-white placeholder-gray-400 outline-none"
              />
              {query && (
                <button onClick={() => setQuery("")}>
                  <X size={12} className="text-gray-400 hover:text-white" />
                </button>
              )}
            </div>
          </div>

          {/* List */}
          <div className="max-h-72 overflow-y-auto py-1 custom-scrollbar">
            {filtered.length === 0 ? (
              <div className="px-4 py-6 text-center text-gray-400 text-sm">No cities found</div>
            ) : (
              filtered.map((city) => (
                <button
                  key={city.name}
                  onClick={() => {
                    onCityChange(city);
                    setOpen(false);
                    setQuery("");
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-700 transition-colors text-left ${
                    selectedCity.name === city.name ? "bg-gray-700/80" : ""
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                      selectedCity.name === city.name
                        ? "bg-cyan-500/20 text-cyan-400"
                        : "bg-gray-600/50 text-gray-300"
                    }`}
                  >
                    {city.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className={`text-sm font-medium ${selectedCity.name === city.name ? "text-cyan-400" : "text-white"}`}>
                      {city.name}
                    </div>
                    <div className="text-xs text-gray-400">{city.state}</div>
                  </div>
                  {selectedCity.name === city.name && (
                    <div className="ml-auto w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                  )}
                </button>
              ))
            )}
          </div>

          <div className="p-2 border-t border-gray-700 text-center">
            <span className="text-xs text-gray-500">{INDIAN_CITIES.length} Indian cities available</span>
          </div>
        </div>
      )}
    </div>
  );
}
