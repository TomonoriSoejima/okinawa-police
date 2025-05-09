import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import { Slice as Police, Menu, X, Navigation2 } from 'lucide-react';
import { policeStations, stationLocations, getStationColor, regionColors } from '../data';
import type { PoliceStation } from '../types';

import 'leaflet/dist/leaflet.css';

const customIcon = new Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export default function Map() {
  const [selectedStation, setSelectedStation] = useState<PoliceStation | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const filteredStations = selectedRegion
    ? policeStations.filter(station => station.region === selectedRegion)
    : policeStations;

  const getGoogleMapsUrl = (address: string) => {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  };

  return (
    <div className="h-screen flex flex-col md:flex-row bg-gradient-to-br from-blue-50 to-teal-50 relative">
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setSidebarOpen(!isSidebarOpen)}
        className="md:hidden fixed top-4 right-4 z-50 bg-white/90 p-2 rounded-full shadow-lg backdrop-blur-sm"
      >
        {isSidebarOpen ? (
          <X className="w-6 h-6 text-gray-600" />
        ) : (
          <Menu className="w-6 h-6 text-gray-600" />
        )}
      </button>

      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 fixed md:relative z-40 w-full md:w-1/3 lg:w-1/4 h-full bg-white/90 backdrop-blur-sm p-4 overflow-y-auto border-r border-teal-100 shadow-lg md:translate-x-0`}
      >
        <div className="flex items-center gap-2 mb-6">
          <Police className="w-6 h-6 text-teal-600" />
          <h1 className="text-xl font-bold text-gray-800">沖縄県警察署</h1>
        </div>

        {/* Region filters */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-gray-600 mb-2">地域で絞り込み:</h2>
          <div className="flex flex-wrap gap-2">
            {Object.entries(regionColors).map(([region, color]) => (
              <button
                key={region}
                onClick={() => setSelectedRegion(selectedRegion === region ? null : region)}
                className={`px-3 py-1 rounded-full text-sm transition-all shadow-sm hover:shadow ${
                  selectedRegion === region ? 'text-white' : 'text-gray-700 bg-opacity-20'
                }`}
                style={{
                  backgroundColor: selectedRegion === region ? color : `${color}15`,
                  borderColor: color,
                  borderWidth: '1px'
                }}
              >
                {region}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {filteredStations.map((station) => (
            <div
              key={station.police_station}
              className={`p-4 rounded-lg cursor-pointer transition-all ${
                selectedStation?.police_station === station.police_station
                  ? 'bg-teal-50 border-teal-200 shadow-md'
                  : 'hover:bg-gray-50 border-gray-100 hover:shadow'
              } border`}
              onClick={() => {
                setSelectedStation(station);
                if (window.innerWidth < 768) {
                  setSidebarOpen(false);
                }
              }}
              style={{
                borderLeft: `4px solid ${getStationColor(station.police_station)}`
              }}
            >
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-gray-800">{station.police_station}</h2>
                <span
                  className="text-xs px-2 py-1 rounded-full"
                  style={{
                    backgroundColor: `${regionColors[station.region]}15`,
                    color: regionColors[station.region]
                  }}
                >
                  {station.region}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <p className="text-sm text-gray-600 flex-1">{station.address}</p>
                <a
                  href={getGoogleMapsUrl(station.address)}
                  className="text-teal-600 hover:text-teal-700 p-1.5 rounded-full hover:bg-teal-50 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Google マップで開く"
                >
                  <Navigation2 className="w-4 h-4" />
                </a>
              </div>
              <a 
                href={`tel:${station.phone.replace(/-/g, '')}`}
                className="text-sm text-teal-600 mt-1 hover:text-teal-700 transition-colors inline-block"
                onClick={(e) => e.stopPropagation()}
              >
                {station.phone}
              </a>
              <div className="mt-2">
                <p className="text-xs text-gray-500">管轄区域:</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {station.jurisdiction.map((area) => (
                    <span
                      key={area}
                      className="px-2 py-1 text-xs rounded-full"
                      style={{
                        backgroundColor: `${getStationColor(station.police_station)}15`,
                        color: getStationColor(station.police_station)
                      }}
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Map */}
      <div className="flex-1 relative z-0">
        <MapContainer
          center={[26.3344, 127.8056]}
          zoom={9}
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {stationLocations.map((location) => (
            <Marker
              key={location.name}
              position={[location.lat, location.lng]}
              icon={new Icon({
                ...customIcon.options,
                iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${getMarkerColor(getStationColor(location.name))}.png`
              })}
            >
              <Popup>
                <div className="min-w-[200px]">
                  <h3 className="font-semibold" style={{ color: getStationColor(location.name) }}>
                    {location.name}
                  </h3>
                  {policeStations.map((station) => {
                    if (station.police_station === location.name) {
                      return (
                        <div key={station.police_station} className="mt-2">
                          <div className="flex items-center gap-2 mb-2">
                            <span
                              className="text-xs px-2 py-1 rounded-full"
                              style={{
                                backgroundColor: `${regionColors[station.region]}15`,
                                color: regionColors[station.region]
                              }}
                            >
                              {station.region}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <p className="text-sm flex-1">{station.address}</p>
                            <a
                              href={getGoogleMapsUrl(station.address)}
                              className="text-teal-600 hover:text-teal-700 p-1.5 rounded-full hover:bg-teal-50 transition-colors"
                              target="_blank"
                              rel="noopener noreferrer"
                              title="Google マップで開く"
                            >
                              <Navigation2 className="w-4 h-4" />
                            </a>
                          </div>
                          <a 
                            href={`tel:${station.phone.replace(/-/g, '')}`}
                            className="text-sm text-teal-600 hover:text-teal-700 transition-colors inline-block"
                          >
                            {station.phone}
                          </a>
                          <div className="mt-2">
                            <p className="text-xs font-medium">管轄区域:</p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {station.jurisdiction.map((area) => (
                                <span
                                  key={area}
                                  className="px-2 py-1 text-xs rounded-full"
                                  style={{
                                    backgroundColor: `${getStationColor(station.police_station)}15`,
                                    color: getStationColor(station.police_station)
                                  }}
                                >
                                  {area}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}

// Helper function to convert hex colors to marker colors
function getMarkerColor(hexColor: string): string {
  const colorMap: Record<string, string> = {
    '#2E8B57': 'green',  // 北部 - Tropical forest
    '#0088A3': 'blue',   // 中部 - Deeper ocean
    '#FF7F50': 'orange', // 南部 - Coral
    '#9370DB': 'violet'  // 離島 - Tropical sunset
  };
  return colorMap[hexColor] || 'blue';
}