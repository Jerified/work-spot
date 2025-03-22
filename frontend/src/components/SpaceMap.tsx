'use client';

import { useEffect, useRef } from 'react';
import { Space } from "@/types/space";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface SpaceMapProps {
  space: Space;
}

export default function SpaceMap({ space }: SpaceMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const map = L.map(mapRef.current).setView([6.5244, 3.3792], 13); // Default to Lagos coordinates

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Geocode the address using Nominatim (OpenStreetMap's geocoding service)
    const address = `${space.address.street}, ${space.address.city}, ${space.address.state}, Nigeria`;
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`)
      .then(response => response.json())
      .then(data => {
        if (data && data[0]) {
          const { lat, lon } = data[0];
          map.setView([lat, lon], 15);
          L.marker([lat, lon]).addTo(map);
        }
      })
      .catch(error => console.error('Error geocoding:', error));

    return () => {
      map.remove();
    };
  }, [space]);

  return (
    <div className="w-full h-[300px] rounded-lg overflow-hidden">
      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
} 