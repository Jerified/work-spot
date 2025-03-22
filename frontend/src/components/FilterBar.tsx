'use client';
import React from 'react';

import { Button } from "../components/ui/button";
import {  Users, Building2, Coffee, Wifi } from "lucide-react";
import { useState } from "react";

interface FilterBarProps {
  onFilterChange: (amenities: string[], price: [number, number]) => void;
}

const filters = [
  { id: 'all', label: 'All Spaces', icon: null },
  { id: 'private', label: 'Private Office', icon: Building2 },
  { id: 'meeting', label: 'Meeting Room', icon: Users },
  { id: 'hot', label: 'Hot Desk', icon: Users },
];

const amenities = [
  { id: 'wifi', label: 'WiFi', icon: Wifi },
  { id: 'coffee', label: 'Coffee', icon: Coffee },
  { id: 'meeting_rooms', label: 'Meeting Rooms', icon: Users },
  { id: 'parking', label: 'Parking', icon: Building2 },
  { id: 'phone_booth', label: 'Phone Booth', icon: Users },
  { id: 'lounge', label: 'Lounge', icon: Users },
  { id: 'printer', label: 'Printer', icon: Users },
  { id: 'kitchen', label: 'Kitchen', icon: Users },
  { id: 'air_conditioning', label: 'Air Conditioning', icon: Users },
  { id: 'security', label: 'Security', icon: Users },
];

export default function FilterBar({ onFilterChange }: FilterBarProps) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const toggleAmenity = (id: string) => {
    const newAmenities = selectedAmenities.includes(id)
      ? selectedAmenities.filter(a => a !== id)
      : [...selectedAmenities, id];
    setSelectedAmenities(newAmenities);
    onFilterChange(newAmenities, [0, 5000]); // Default price range
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      {filters.map((filter) => (
        <Button
          key={filter.id}
          variant={activeFilter === filter.id ? "default" : "outline"}
          size="sm"
          className={`rounded-full transition-all duration-200 ${
            activeFilter === filter.id
              ? 'bg-[#E16B8C] hover:bg-[#B5495B] text-white border-transparent'
              : 'bg-white text-gray-700 border-gray-200 hover:border-[#E16B8C] hover:text-[#E16B8C]'
          }`}
          onClick={() => setActiveFilter(filter.id)}
        >
          {filter.icon && <filter.icon className="h-4 w-4 mr-2" />}
          {filter.label}
        </Button>
      ))}

      <div className="h-6 w-px bg-gray-200 mx-2" />

      {amenities.map((amenity) => (
        <Button
          key={amenity.id}
          variant="outline"
          size="sm"
          className={`rounded-full transition-all duration-200 ${
            selectedAmenities.includes(amenity.id)
              ? 'bg-[#E16B8C] hover:bg-[#B5495B] text-white border-transparent'
              : 'bg-white text-gray-700 border-gray-200 hover:border-[#E16B8C] hover:text-[#E16B8C]'
          }`}
          onClick={() => toggleAmenity(amenity.id)}
        >
          <amenity.icon className="h-4 w-4 mr-2" />
          {amenity.label}
        </Button>
      ))}
    </div>
  );
}