import { useState, useMemo } from "react";
import Navbar, { TabKey } from "./components/Navbar";
import CitySelector from "./components/CitySelector";
import Dashboard from "./components/Dashboard";
import TrafficTab from "./components/TrafficTab";
import PollutionTab from "./components/PollutionTab";
import WasteTab from "./components/WasteTab";
import AlertsTab from "./components/AlertsTab";
import InsightsTab from "./components/InsightsTab";
import ImprovementsTab from "./components/ImprovementsTab";
import { INDIAN_CITIES, City, generateAlerts } from "./data/cityData";

export default function App() {
  const [activeTab, setActiveTab] = useState<TabKey>("dashboard");
  const [selectedCity, setSelectedCity] = useState<City>(INDIAN_CITIES[0]); // Delhi as default

  const alerts = useMemo(() => generateAlerts(selectedCity), [selectedCity]);
  const alertCount = alerts.filter((a) => a.severity !== "info").length;

  const handleCityChange = (city: City) => {
    setSelectedCity(city);
    setActiveTab("dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white font-['Inter',sans-serif] relative overflow-x-hidden">
      {/* Background ambient glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-cyan-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-purple-600/4 rounded-full blur-3xl" />
      </div>
      <div className="relative z-10">
      {/* Navbar */}
      <Navbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        alertCount={alertCount}
        cityName={selectedCity.name}
      />

      {/* Page Content */}
      <main className="max-w-screen-2xl mx-auto px-4 py-5">
        {/* City Selector */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-2">
            <span className="text-gray-400 text-sm">Analyzing:</span>
            <CitySelector selectedCity={selectedCity} onCityChange={handleCityChange} />
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span>Live data • Updated just now</span>
            <span className="mx-1">|</span>
            <span>🇮🇳 {INDIAN_CITIES.length} Indian cities</span>
          </div>
        </div>

        {/* Tab Content */}
        <div className="min-h-[60vh]">
          {activeTab === "dashboard" && (
            <Dashboard city={selectedCity} onTabChange={setActiveTab} />
          )}
          {activeTab === "traffic" && <TrafficTab city={selectedCity} />}
          {activeTab === "pollution" && <PollutionTab city={selectedCity} />}
          {activeTab === "waste" && <WasteTab city={selectedCity} />}
          {activeTab === "alerts" && <AlertsTab city={selectedCity} />}
          {activeTab === "insights" && <InsightsTab city={selectedCity} />}
          {activeTab === "improvements" && <ImprovementsTab city={selectedCity} />}
        </div>
      </main>
      </div>
    </div>
  );
}
