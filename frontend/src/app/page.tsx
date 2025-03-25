"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { fetchSpaces } from "../store/features/spaceSlice";
import SearchBar from "../components/SearchBar"
import FilterBar from "../components/FilterBar";
import SpacesGrid from "../components/SpacesGrid";
import { HomeSkeleton } from "../components/skeleton";
import { ErrorUI } from "../components/errorUI";
import { Button } from "../components/ui/button";
import { ArrowRight, Building2, Clock, MapPin, Users } from "lucide-react";
import Container from "../components/Container";
import React from "react";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { spaces: reduxSpaces, error: reduxError, loading: reduxLoading } = useSelector(
    (state: RootState) => state.spaces
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const spacesPerPage = 6;

  const handleFilterChange = useCallback((amenities: string[], price: [number, number]) => {
    setSelectedAmenities(amenities);
    setPriceRange(price);
    setCurrentPage(1);
  }, []);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  useEffect(() => {
    dispatch(fetchSpaces());
  }, [dispatch]);

  useEffect(() => {
    const fetchSpacesData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const NEXT_PUBLIC_API_URL =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
        const queryParams = new URLSearchParams({
          page: currentPage.toString(),
          limit: spacesPerPage.toString(),
          ...(searchQuery && { search: searchQuery }),
          ...(selectedAmenities.length > 0 && {
            amenities: selectedAmenities.join(","),
          }),
          ...(priceRange[0] > 0 && { minPrice: priceRange[0].toString() }),
          ...(priceRange[1] < 5000 && { maxPrice: priceRange[1].toString() }),
        });

        const response = await fetch(`${NEXT_PUBLIC_API_URL}/api/spaces?${queryParams}`, {
          next: { revalidate: 60 },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch spaces: ${response.statusText}`);
        }

        const data = await response.json();
        setTotalPages(Math.ceil((data.total || data.length || 0) / spacesPerPage));
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching spaces:", err);
        setError(err instanceof Error ? err.message : "An error occurred");
        setIsLoading(false);
      }
    };

    fetchSpacesData();
  }, [currentPage, searchQuery, selectedAmenities, priceRange]);

  const filteredSpaces = useMemo(() => {
    const spaces = reduxSpaces || [];
    
    return spaces.filter(space => {
      if (searchQuery && !space.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
          !space.description.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      if (selectedAmenities.length > 0 && 
          !selectedAmenities.every(amenity => space.amenities.includes(amenity))) {
        return false;
      }
      
      if (space.pricePerHour < priceRange[0] || space.pricePerHour > priceRange[1]) {
        return false;
      }
      
      return true;
    });
  }, [reduxSpaces, searchQuery, selectedAmenities, priceRange]);

  const paginatedSpaces = useMemo(() => {
    const startIndex = (currentPage - 1) * spacesPerPage;
    return filteredSpaces.slice(startIndex, startIndex + spacesPerPage);
  }, [filteredSpaces, currentPage, spacesPerPage]);

  const calculatedTotalPages = useMemo(() => {
    return Math.ceil(filteredSpaces.length / spacesPerPage);
  }, [filteredSpaces.length, spacesPerPage]);

  const stats = useMemo(() => [
    {
      icon: <Building2 className="h-8 w-8 sm:h-10 sm:w-10 md:h-8 md:w-8 lg:h-12 lg:w-12 text-[#E16B8C] mx-auto" />,
      value: `${reduxSpaces?.length || 0}+`,
      label: "Available Spaces"
    },
    {
      icon: <Users className="h-8 w-8 sm:h-10 sm:w-10 md:h-8 md:w-8 lg:h-12 lg:w-12 text-[#E16B8C] mx-auto" />,
      value: "1000+",
      label: "Happy Members"
    },
    {
      icon: <MapPin className="h-8 w-8 sm:h-10 sm:w-10 md:h-8 md:w-8 lg:h-12 lg:w-12 text-[#E16B8C] mx-auto" />,
      value: "12+",
      label: "Cities Covered"
    },
    {
      icon: <Clock className="h-8 w-8 sm:h-10 sm:w-10 md:h-8 md:w-8 lg:h-12 lg:w-12 text-[#E16B8C] mx-auto" />,
      value: "24/7",
      label: "Available Spaces"
    }
  ], [reduxSpaces?.length]);

  if (error || reduxError) {
    return <ErrorUI error={(error || reduxError || "Unknown error")} onRetry={() => setCurrentPage(1)} />;
  }

  return (
    <main>
      <Container className="px-4">
        <section className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-r from-[#191B2B] to-[#2E173A] overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
          <div className="container mx-auto px-4 relative z-10 flex items-center justify-center">
            <div className="max-w-3xl text-center">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Find Your Perfect{" "}
                <span className="text-[#E16B8C]">Workspace</span> in Africa
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Discover and book amazing co-working spaces that match your
                needs and inspire productivity.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-[#E16B8C] hover:bg-[#B5495B] text-white"
                  onClick={() => {
                    document
                      .getElementById("search-section")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Browse Spaces <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-white border-white/20 bg-white/10"
                  onClick={() => {
                    document
                      .getElementById("stats-section")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section
          id="stats-section"
          className="!py-12 md:!py-16 lg:!py-20 bg-[#191B2B]"
        >
          <div className="py-4 md:py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-12">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group flex items-center gap-2">
                  <div className="bg-[#2E173A]/30 p-4 sm:p-5 md:p-5 rounded-2xl mb-4 sm:mb-5 md:mb-6 transition-all duration-300 group-hover:bg-[#2E173A]/50">
                    {stat.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-3">
                      {stat.value}
                    </h3>
                    <p className="text-gray-400 text-sm sm:text-base md:text-base lg:text-lg">
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="search-section" className="py-4 bg-[#191B2B]">
          <div className="bg-gradient-to-br from-[#2E173A]/80 to-[#191B2B]/80 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-white/10 py-4">
            <div className="text-center mb-8">
              <h2 className="text-xl font-bold text-white mb-4">
                Find Your Perfect Space
              </h2>
              <p className="text-gray-400 text-lg">
                Search through our collection of premium co-working spaces
              </p>
            </div>

            <div className="space-y-6 mx-auto flex flex-col justify-center">
              <div className="relative max-w-2xl sm:max-w-3xl md:max-w-6xl mx-auto flex justify-center items-center">
                <SearchBar onSearch={handleSearch} />
              </div>

              <div className="flex justify-center items-center pt-6">
                <FilterBar onFilterChange={handleFilterChange} />
              </div>
            </div>
          </div>
        </section>

        {isLoading || reduxLoading ? (
          <HomeSkeleton />
        ) : (
          <SpacesGrid
            spaces={paginatedSpaces}
            totalPages={calculatedTotalPages || totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        )}
      </Container>
    </main>
  );
}