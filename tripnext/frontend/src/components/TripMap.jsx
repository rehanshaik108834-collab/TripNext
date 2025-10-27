import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const TripMap = ({ destinations }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize map
    if (!mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapRef.current).setView([22.0, -159.5], 9);

      // Add OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(mapInstanceRef.current);
    }

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Add markers for destinations
    if (destinations && destinations.length > 0) {
      const bounds = [];

      destinations.forEach((dest, index) => {
        const marker = L.marker([dest.lat, dest.lng])
          .addTo(mapInstanceRef.current)
          .bindPopup(`
            <div>
              <h3 style="font-weight: bold; margin-bottom: 4px;">${dest.name}</h3>
              <p style="font-size: 12px; color: #666;">${dest.address}</p>
              <p style="font-size: 12px; margin-top: 4px;">Day ${dest.day} - ${dest.time}</p>
            </div>
          `);

        markersRef.current.push(marker);
        bounds.push([dest.lat, dest.lng]);
      });

      // Fit map to show all markers
      if (bounds.length > 0) {
        mapInstanceRef.current.fitBounds(bounds, { padding: [50, 50] });
      }

      // Draw lines between destinations in order
      if (destinations.length > 1) {
        const latLngs = destinations.map(d => [d.lat, d.lng]);
        L.polyline(latLngs, {
          color: '#FF6B4A',
          weight: 3,
          opacity: 0.7,
          dashArray: '10, 5'
        }).addTo(mapInstanceRef.current);
      }
    }

    return () => {
      // Cleanup markers when component unmounts
      markersRef.current.forEach(marker => marker.remove());
    };
  }, [destinations]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapRef} className="w-full h-full" />
      <div className="absolute top-4 right-4 z-[1000]">
        <div className="bg-white rounded-lg shadow-md px-3 py-2 text-sm">
          <span className="font-semibold">{destinations?.length || 0}</span> destinations
        </div>
      </div>
    </div>
  );
};

export default TripMap;