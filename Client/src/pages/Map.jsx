import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet.heat";
import "leaflet/dist/leaflet.css";
import "../Map.css";

// Fix leaflet icons
const DefaultIcon = L.icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

// Component to add heat map
function HeatMapLayer() {
  const map = useMap();

  useEffect(() => {
    // Taboo intensity data (lat, lng, intensity from 0-1)
    // Higher intensity (closer to 1) means more taboos (more red)
    const tabooHeatData = [
      // Delhi area - high taboo intensity
      [28.6139, 77.209, 0.9],
      [28.59, 77.21, 0.8],
      [28.62, 77.22, 0.85],
      [28.61, 77.23, 0.7],
      [28.58, 77.19, 0.75],

      // Mumbai area - medium taboo intensity
      [19.076, 72.8777, 0.5],
      [19.05, 72.86, 0.45],
      [19.08, 72.88, 0.6],
      [19.07, 72.89, 0.55],

      // Bangalore area - low taboo intensity (more green)
      [12.9716, 77.5946, 0.2],
      [12.98, 77.58, 0.15],
      [12.96, 77.6, 0.25],
      [12.95, 77.57, 0.1],

      // Chennai area - very low taboo intensity (greenest)
      [13.0827, 80.2707, 0.05],
      [13.07, 80.28, 0.03],
      [13.09, 80.26, 0.08],
    ];

    // Create and add heat layer to map
    const heatLayer = L.heatLayer(tabooHeatData, {
      radius: 25,
      blur: 15,
      maxZoom: 10,
      // Custom gradient: green (low taboo) to red (high taboo)
      gradient: {
        0.0: "green", // No/very low taboo
        0.3: "yellowgreen",
        0.5: "yellow", // Medium taboo
        0.7: "orange",
        0.9: "red", // High taboo
        1.0: "darkred", // Extreme taboo
      },
    }).addTo(map);

    return () => {
      map.removeLayer(heatLayer);
    };
  }, [map]);

  return null;
}

const ProfessionalNgoMap = () => {
  // Verified Indian NGO coordinates
  const mockNgos = [
    { id: 1, name: "Delhi NGO (High Taboo Area)", location: [28.6139, 77.209] }, // Delhi
    {
      id: 2,
      name: "Mumbai NGO (Medium Taboo Area)",
      location: [19.076, 72.8777],
    }, // Mumbai
    {
      id: 3,
      name: "Bangalore NGO (Low Taboo Area)",
      location: [12.9716, 77.5946],
    }, // Bangalore
    {
      id: 4,
      name: "Chennai NGO (Minimal Taboo Area)",
      location: [13.0827, 80.2707],
    }, // Chennai
  ];

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <MapContainer
        center={[20.5937, 78.9629]}
        zoom={5}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap"
        />

        {/* NGO Markers */}
        {mockNgos.map((ngo) => (
          <Marker key={ngo.id} position={ngo.location}>
            <Popup>
              <strong>{ngo.name}</strong>
            </Popup>
          </Marker>
        ))}

        {/* Heat Map Layer for Taboo Intensity */}
        <HeatMapLayer />
      </MapContainer>
    </div>
  );
};

export default ProfessionalNgoMap;
