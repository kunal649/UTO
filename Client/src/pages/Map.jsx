import { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import L from "leaflet";
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

const ProfessionalNgoMap = () => {
  const [map, setMap] = useState(null);

  // Verified Indian NGO coordinates
  const mockNgos = [
    { id: 1, name: "Delhi NGO", location: [28.6139, 77.209] }, // Delhi
    { id: 2, name: "Mumbai NGO", location: [19.076, 72.8777] }, // Mumbai
    { id: 3, name: "Bangalore NGO", location: [12.9716, 77.5946] }, // Bangalore
  ];

  useEffect(() => {
    if (!map) return;

    // Clear previous layers
    map.eachLayer((layer) => map.removeLayer(layer));

    // Add guaranteed visible base layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
      map
    );

    // Add simple markers
    mockNgos.forEach((ngo) => {
      L.marker(ngo.location)
        .bindPopup(`<strong>${ngo.name}</strong>`)
        .addTo(map);
    });

    // Add visible red/green zones
    L.rectangle(
      [
        [28.6139, 77.209],
        [28.5, 77.3],
      ],
      { color: "#ff0000", fillOpacity: 0.2 }
    )
      .bindPopup("High Priority Zone")
      .addTo(map);

    L.rectangle(
      [
        [19.076, 72.8777],
        [19.0, 73.0],
      ],
      { color: "#00ff00", fillOpacity: 0.2 }
    )
      .bindPopup("Safe Zone")
      .addTo(map);
  }, [map]);

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <MapContainer
        center={[20.5937, 78.9629]}
        zoom={5}
        style={{ height: "100%", width: "100%" }}
        whenCreated={setMap}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap"
        />
      </MapContainer>
    </div>
  );
};

export default ProfessionalNgoMap;
