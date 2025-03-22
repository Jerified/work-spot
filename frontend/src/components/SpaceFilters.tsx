'use client';

import { useState } from 'react';
import React from 'react';

const AMENITIES = [
  'wifi',
  'printer',
  'meeting_room',
  'coffee',
  'parking',
  'air_conditioning',
  'security',
];

interface SpaceFiltersProps {
  filters: {
    city?: string;
    minPrice?: number;
    maxPrice?: number;
    amenities?: string[];
    availability?: boolean;
  };
  onFilterChange: (filters: SpaceFiltersProps['filters']) => void;
}
export default function SpaceFilters({ filters, onFilterChange }: SpaceFiltersProps) {
  const [localFilters, setLocalFilters] = useState(filters);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (key: keyof typeof filters, value: any) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleAmenityToggle = (amenity: string) => {
    const currentAmenities = localFilters.amenities || [];
    const newAmenities = currentAmenities.includes(amenity)
      ? currentAmenities.filter((a) => a !== amenity)
      : [...currentAmenities, amenity];
    handleChange('amenities', newAmenities);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Filters</h2>
      
      <div className="space-y-4">
        {/* City Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            City
          </label>
          <input
            type="text"
            value={localFilters.city || ''}
            onChange={(e) => handleChange('city', e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter city"
          />
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price Range ($/hour)
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              value={localFilters.minPrice || ''}
              onChange={(e) => handleChange('minPrice', Number(e.target.value))}
              className="w-1/2 px-3 py-2 border rounded-md"
              placeholder="Min"
            />
            <input
              type="number"
              value={localFilters.maxPrice || ''}
              onChange={(e) => handleChange('maxPrice', Number(e.target.value))}
              className="w-1/2 px-3 py-2 border rounded-md"
              placeholder="Max"
            />
          </div>
        </div>

        {/* Availability */}
        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={localFilters.availability || false}
              onChange={(e) => handleChange('availability', e.target.checked)}
              className="rounded text-blue-600"
            />
            <span className="text-sm font-medium text-gray-700">
              Available Only
            </span>
          </label>
        </div>

        {/* Amenities */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Amenities
          </label>
          <div className="space-y-2">
            {AMENITIES.map((amenity) => (
              <label key={amenity} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={localFilters.amenities?.includes(amenity) || false}
                  onChange={() => handleAmenityToggle(amenity)}
                  className="rounded text-blue-600"
                />
                <span className="text-sm text-gray-600">
                  {amenity.replace('_', ' ')}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 