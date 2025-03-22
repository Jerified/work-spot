"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { SlidersHorizontal, MapPin, User, LogOut, Settings, BookMarked } from "lucide-react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { logout } from "@/store/features/authSlice";
import AuthModal from "./auth/AuthModal";
import { toast } from 'sonner';
import Container from "./Container";

export default function Header() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  console.log('Auth State:', user);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  console.log(user)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedAuth = localStorage.getItem('auth');
      if (storedAuth) {
        const parsedAuth = JSON.parse(storedAuth);
        if (parsedAuth.user) {
          dispatch({ type: 'auth/setUser', payload: parsedAuth.user });
        }
      }
    }
  }, [dispatch]);

  const amenities = [
    "wifi",
    "parking",
    "meeting_rooms",
    "coffee",
    "printer",
    "air_conditioning",
    "security",
    "reception",
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location) params.append('location', location);
    if (priceRange.min) params.append('minPrice', priceRange.min);
    if (priceRange.max) params.append('maxPrice', priceRange.max);
    if (selectedAmenities.length > 0) params.append('amenities', selectedAmenities.join(','));
    
    router.push(`/search?${params.toString()}`);
  };

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
  };

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Logged out successfully');
  };

  return (
    <header className="sticky top-0 z-50 borde bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-transparent">
      <Container className="flex py-4 items-center">
        <div className="mr-4">
          <Link className="mr-6 flex items-center space-x-2" href="/">
            <span className="text-2xl font-bold">WorkSpot</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-between md:space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <form onSubmit={handleSearch} className="relative">
              <div className="relative rounded-full px-4">
                <MapPin className="absolute left-6 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Enter location (e.g., Ikeja, Lagos)"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="h-9 w-full md:w-[300px] lg:w-[400px] !rounded-full !pl-10 text-md placeholder:pl-"
                />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-5 top-1/2 transform -translate-y-1/2 h-7 w-7 hover:bg-transparent cursor-pointer"
                    >
                      <SlidersHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[200px]">
                    <div className="p-4 space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Price Range
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          <Input
                            type="number"
                            placeholder="Min"
                            value={priceRange.min}
                            onChange={(e) =>
                              setPriceRange((prev) => ({
                                ...prev,
                                min: e.target.value,
                              }))
                            }
                            className="h-8"
                          />
                          <Input
                            type="number"
                            placeholder="Max"
                            value={priceRange.max}
                            onChange={(e) =>
                              setPriceRange((prev) => ({
                                ...prev,
                                max: e.target.value,
                              }))
                            }
                            className="h-8"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Amenities</label>
                        <div className="space-y-1">
                          {amenities.map((amenity) => (
                            <DropdownMenuCheckboxItem
                              key={amenity}
                              checked={selectedAmenities.includes(amenity)}
                              onCheckedChange={() => toggleAmenity(amenity)}
                            >
                              {amenity.replace("_", " ")}
                            </DropdownMenuCheckboxItem>
                          ))}
                        </div>
                      </div>
                      <Button type="submit" className="w-full">
                        Apply Filters
                      </Button>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </form>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative h-8 w-8 rounded-full">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => toast.info('Coming soon!')}>
                    <BookMarked className="mr-2 h-4 w-4" />
                    My Bookings
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => toast.info('Coming soon!')}>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={handleLogout}
                    className="text-red-600 focus:text-red-600"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-1 md:space-x-2 bg-[#E16B8C]/70 hover:bg-[#E16B8C] transition-colors rounded-md px-2 md:px-[1.2rem] text-sm py-3 backdrop-blur-xl">
                <button
                  onClick={() => {
                    setAuthMode('login');
                    setShowAuthModal(true);
                  }}
                >
                  Sign In
                </button>
              </div>
            )}
          </div>
        </div>
      </Container>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode={authMode}
        setAuthMode={setAuthMode}
        setShowAuthModal={setShowAuthModal}
      />
    </header>
  );
}
