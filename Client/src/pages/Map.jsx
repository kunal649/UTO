import { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.heat";
import "leaflet.markercluster";
import "../App.css";

const NGO_API =
  "https://api.data.gov.in/resource/8d3b6596-b09e-4077-aebf-425193185a5b";

const ProfessionalNgoMap = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [map, setMap] = useState(null);
  const heatLayerRef = useRef(null);

  const mockNgos = [
    {
      id: "MH-2023-001",
      name: "Mumbai Health Initiative",
      location: [19.076, 72.8777],
      sectors: ["Healthcare", "Sanitation"],
      budget: 2500000,
      impactScore: 8.7,
      status: "active",
      lastUpdated: "2023-12-15",
      contact: { email: "info@mhi.org", phone: "+912234567890" },
      projects: [
        { name: "Clean Water Access", progress: 85 },
        { name: "Women's Health", progress: 65 },
      ],
      website: "https://mhi.org",
      verification: "Govt Certified",
    },
    {
      id: "MH-2023-002",
      name: "Mumbai Health Initiative 2",
      location: [65.076, 83.8777],
      sectors: ["Healthcare", "Sanitation"],
      budget: 2500000,
      impactScore: 8.7,
      status: "active",
      lastUpdated: "2023-12-15",
      contact: { email: "info@mhi.org", phone: "+912234567890" },
      projects: [
        { name: "Clean Water Access", progress: 85 },
        { name: "Women's Health", progress: 65 },
      ],
      website: "https://mhi.org",
      verification: "Govt Certified",
    },
    {
      id: "MH-2023-003",
      name: "Mumbai Health Initiative 3",
      location: [45.076, 92.8777],
      sectors: ["Healthcare", "Sanitation"],
      budget: 2500000,
      impactScore: 8.7,
      status: "active",
      lastUpdated: "2023-12-15",
      contact: { email: "info@mhi.org", phone: "+912234567890" },
      projects: [
        { name: "Clean Water Access", progress: 85 },
        { name: "Women's Health", progress: 65 },
      ],
      website: "https://mhi.org",
      verification: "Govt Certified",
    },
    {
      id: "MH-2023-004",
      name: "Mumbai Health Initiative 4",
      location: [49.076, 42.8777],
      sectors: ["Healthcare", "Sanitation"],
      budget: 2500000,
      impactScore: 8.7,
      status: "active",
      lastUpdated: "2023-12-15",
      contact: { email: "info@mhi.org", phone: "+912234567890" },
      projects: [
        { name: "Clean Water Access", progress: 85 },
        { name: "Women's Health", progress: 65 },
      ],
      website: "https://mhi.org",
      verification: "Govt Certified",
    },
  ];

  useEffect(() => {
    if (!map) return; 

    const initMap = async () => {
      try {
        const response = await fetch(NGO_API, {
          headers: { "X-API-KEY": import.meta.env.VITE_API_KEY || "" },
        });
        const data = await response.json();
        const ngos =
          data.records && data.records.length ? data.records : mockNgos;

        // Prepare heatmap data: [lat, lng, intensity]
        const heatData = ngos.map((n) => [
          n.location[0],
          n.location[1],
          n.impactScore,
        ]);

        // Create marker clusters with custom styling
        const clusters = L.markerClusterGroup({
          spiderfyOnMaxZoom: true,
          showCoverageOnHover: false,
          iconCreateFunction: (cluster) =>
            L.divIcon({
              html: `<div class="cluster-marker">${cluster.getChildCount()}</div>`,
              className: "custom-cluster",
            }),
        });

        ngos.forEach((ngo) => {
          const marker = L.circleMarker(ngo.location, {
            radius: 8,
            color: ngo.status === "active" ? "#4CAF50" : "#F44336",
            weight: 2,
            opacity: 0.8,
            fillOpacity: 0.4,
          });
          marker.bindPopup(`<strong>${ngo.name}</strong><br/>ID: ${ngo.id}`);
          clusters.addLayer(marker);
        });

        heatLayerRef.current = L.heatLayer(heatData, {
          radius: 35,
          blur: 25,
          gradient: { 0.3: "#00FF00", 0.5: "#FFFF00", 0.7: "#FF0000" },
          maxZoom: 12,
        });

        // Add the heatmap layer and clusters to the map
        heatLayerRef.current.addTo(map);
        clusters.addTo(map);

        // Add a layers control
        L.control
          .layers(
            {
              "Base Map": L.tileLayer(
                "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
                { attribution: "© CARTO" }
              ),
            },
            {
              "NGO Heatmap": heatLayerRef.current,
              "Cluster Markers": clusters,
            }
          )
          .addTo(map);
      } catch (error) {
        console.error("Error fetching NGO data:", error);
        // Fallback to mock data if fetch fails
        const clusters = L.markerClusterGroup();
        mockNgos.forEach((ngo) => {
          const marker = L.circleMarker(ngo.location, {
            radius: 8,
            color: ngo.status === "active" ? "#4CAF50" : "#F44336",
            weight: 2,
            opacity: 0.8,
            fillOpacity: 0.4,
          });
          marker.bindPopup(`<strong>${ngo.name}</strong><br/>ID: ${ngo.id}`);
          clusters.addLayer(marker);
        });
        clusters.addTo(map);
      }
    };

    initMap();
  }, [map]);

  return (
    <div className="map-container">
      <MapContainer
        center={[20.5937, 78.9629]}
        zoom={6}
        style={{ height: "100vh", width: "100%" }}
        whenCreated={setMap}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='© <a href="https://carto.com/">CARTO</a>'
        />
      </MapContainer>

      <div className="map-controls">
        <div className="legend">
          <h4>Map Legend</h4>
          <div>
            <span className="heat-red"></span> High Priority
          </div>
          <div>
            <span className="heat-green"></span> Progressive Zones
          </div>
          <div>
            <span className="cluster-marker"></span> NGO Cluster
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalNgoMap;
