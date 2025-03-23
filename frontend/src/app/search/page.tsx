'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import SearchBar from '../../components/SearchBar';
import FilterBar from '../../components/FilterBar';
import SpacesGrid from '../../components/SpacesGrid';
import { ErrorUI } from '../../components/errorUI';
import Container from '../../components/Container';
import { Space } from '../../types/space';
import React from 'react';

function SearchPageContent() {
  const searchParams = useSearchParams();
  const initialLocation = searchParams.get('location') || '';
  const initialMinPrice = searchParams.get('minPrice') || '0';
  const initialMaxPrice = searchParams.get('maxPrice') || '5000';
  const initialAmenities = searchParams.get('amenities')?.split(',') || [];
  
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState(initialLocation);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(initialAmenities);
  const [priceRange, setPriceRange] = useState<[number, number]>([
    Number(initialMinPrice),
    Number(initialMaxPrice)
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const spacesPerPage = 6;

  useEffect(() => {
    const fetchSpacesData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const API_URL = process.env.API_URL || 'http://localhost:5000/api';
        const queryParams = new URLSearchParams({
          page: currentPage.toString(),
          limit: spacesPerPage.toString(),
          ...(location && { location }),
          ...(selectedAmenities.length > 0 && { amenities: selectedAmenities.join(',') }),
          ...(priceRange[0] > 0 && { minPrice: priceRange[0].toString() }),
          ...(priceRange[1] < 5000 && { maxPrice: priceRange[1].toString() })
        });
        
        console.log('Fetching spaces with params:', Object.fromEntries(queryParams));
        const url = `${API_URL}/spaces?${queryParams}`;
        console.log('API URL:', url);
        
        const response = await fetch(url, {
          next: { revalidate: 60 },
        });
        
        if (!response.ok) {
          throw new Error(`Failed to fetch spaces: ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('API Response:', data);
        
        // Filter spaces by location if location is provided
        let filteredSpaces = data;
        if (location) {
          console.log('Filtering by location:', location);
          filteredSpaces = data.filter((space: Space) => {
            // Try both location and address fields
            const spaceLocation = String(space.location || space.address || '');
            console.log('Space location:', spaceLocation);
            const searchLocation = String(location || '');
            const matches = spaceLocation.toLowerCase().includes(searchLocation.toLowerCase());
            console.log('Matches:', matches);
            return matches;
          });
          console.log('Filtered spaces:', filteredSpaces);
        }
        
        // Filter by price range
        if (priceRange[0] > 0 || priceRange[1] < 5000) {
          filteredSpaces = filteredSpaces.filter((space: Space) => {
            const spacePrice = space.price || 0;
            return spacePrice >= priceRange[0] && spacePrice <= priceRange[1];
          });
        }
        
        // Filter by amenities
        if (selectedAmenities.length > 0) {
          filteredSpaces = filteredSpaces.filter((space: Space) => {
            const spaceAmenities = space.amenities || [];
            return selectedAmenities.every(amenity => spaceAmenities.includes(amenity));
          });
        }
        
        setSpaces(filteredSpaces);
        setTotalPages(Math.ceil(filteredSpaces.length / spacesPerPage));
      } catch (err) {
        console.error('Error fetching spaces:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
        setSpaces([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSpacesData();
  }, [currentPage, location, selectedAmenities, priceRange]);

  const handleSearch = (query: string) => {
    setLocation(query);
    setCurrentPage(1);
  };

  const handleFilterChange = (amenities: string[], price: [number, number]) => {
    setSelectedAmenities(amenities);
    setPriceRange(price);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (error) {
    return <ErrorUI error={error} onRetry={() => setCurrentPage(1)} />;
  }

  return (
    <main className="min-h-screen bg-[#191B2B]">
      <Container className="px-4 py-16">
        <div className="">
          <div className="bg-gradient-to-br from-[#2E173A]/80 to-[#191B2B]/80 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-white/10">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-4">Find Co-working Spaces</h1>
              <p className="text-gray-400 text-lg">
                {location 
                  ? `Showing spaces in ${location}`
                  : 'Enter a location to find co-working spaces'}
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="relative">
                <SearchBar onSearch={handleSearch} />
              </div>
              
              <div className="flex justify-center pt-6">
                <FilterBar onFilterChange={handleFilterChange} />
              </div>
            </div>
          </div>

          <div className="mt-12">
            {loading ? (
              <div className="text-center text-white">Loading spaces...</div>
            ) : (
              <SpacesGrid
                spaces={spaces}
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </div>
      </Container>
    </main>
  );
}

// Loading fallback component
function SearchPageLoading() {
  return (
    <div className="min-h-screen bg-[#191B2B] flex items-center justify-center">
      <div className="text-white text-xl">Loading search page...</div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchPageLoading />}>
      <SearchPageContent />
    </Suspense>
  );
}
