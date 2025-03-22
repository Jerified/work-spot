"use client";

import React from 'react';
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { fetchSpaces, setSelectedSpace } from "../../../store/features/spaceSlice";
import Image from "next/image";
import { Space } from "../../../types/space";
import ReviewForm from "../../../components/ReviewForm";
import SpaceMap from "../../../components/SpaceMap";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import { MapPin, Star, Wifi, Coffee, Printer, MonitorSmartphone, ParkingCircle, AirVent, PhoneCall, Sofa, Utensils, Lock } from "lucide-react";
import Container from "../../../components/Container";

export default function SpaceDetails() {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { selectedSpace, loading, error } = useSelector(
    (state: RootState) => state.spaces
  );
  const [showReviewForm, setShowReviewForm] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchSpaces({})).then((action) => {
        if (action.payload) {
          const space = (action.payload as Space[]).find((s) => s._id === id);
          if (space) {
            dispatch(setSelectedSpace(space));
          }
        }
      });
    }
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !selectedSpace) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-center">
          <h1 className="text-2xl font-bold mb-2">Error</h1>
          <p>{error || "Space not found"}</p>
        </div>
      </div>
    );
  }

  const images = [...selectedSpace.images];
  while (images.length < 3) {
    images.push(images[0] || "/placeholder-image.jpg");
  }

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error: unknown) {
      return "Unknown date";
    }
  };

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'wifi':
        return <Wifi className="w-5 h-5" />;
      case 'coffee':
      case 'coffee_machine':
        return <Coffee className="w-5 h-5" />;
      case 'printer':
      case 'printing':
        return <Printer className="w-5 h-5" />;
      case 'monitors':
      case 'screen':
        return <MonitorSmartphone className="w-5 h-5" />;
      case 'parking':
        return <ParkingCircle className="w-5 h-5" />;
      case 'ac':
      case 'air_conditioning':
        return <AirVent className="w-5 h-5" />;
      case 'phone_booth':
      case 'phone_room':
        return <PhoneCall className="w-5 h-5" />;
      case 'lounge':
      case 'lounge_area':
        return <Sofa className="w-5 h-5" />;
      case 'kitchen':
      case 'pantry':
        return <Utensils className="w-5 h-5" />;
      case 'security':
      case 'access_control':
        return <Lock className="w-5 h-5" />;
      default:
        return <Star className="w-5 h-5" />; 
    }
  };

  interface Address {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  }

  const address = (selectedSpace as unknown as { address: Address }).address || {
    street: '',
    city: '',
    state: '',
    zipCode: ''
  };

  type ReviewWithDate = typeof selectedSpace.reviews[0] & { createdAt: string };
  const reviewsWithDates: ReviewWithDate[] = selectedSpace.reviews.map(review => ({
    ...review,
    createdAt: new Date().toISOString() 
  }));

  return (
    <Container className="py-12">
      {/* Image Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* Main Image */}
        <div className="md:col-span-2 h-[500px] w-full relative rounded-lg overflow-hidden">
          <Image
            src={images[0]}
            alt={selectedSpace.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Thumbnail Grid */}
        <div className="grid grid-rows-2 gap-4 h-[500px]">
          {images.slice(1, 3).map((image, index) => (
            <div
              key={index}
              className="relative rounded-lg overflow-hidden"
            >
              <Image
                src={image}
                alt={`${selectedSpace.name} ${index + 1}`}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>

      {/* Space Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column - Details */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h1 className="text-4xl font-bold mb-4">{selectedSpace.name}</h1>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                <span className="ml-1 text-lg font-medium">
                  {selectedSpace.rating.toFixed(1)}
                </span>
              </div>
              <span className="text-gray-500">•</span>
              <span className="text-gray-600">
                {selectedSpace.reviews.length} reviews
              </span>
              <span className="text-gray-500">•</span>
              <Badge
                variant={selectedSpace.available ? "default" : "destructive"}
              >
                {selectedSpace.available ? "Available" : "Unavailable"}
              </Badge>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed">
              {selectedSpace.description}
            </p>
          </div>

          {/* Amenities */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Amenities</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {selectedSpace.amenities.map((amenity, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-lg"
                >
                  {getAmenityIcon(amenity)}
                  <span className="text-sm text-gray-700 capitalize">
                    {amenity.replace(/_/g, ' ')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Map Section */}
          <div className="w-full">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <MapPin /> Location
            </h2>
            <p className="text-gray-600 mb-4">
              {address.street}, {address.city}, {address.state} {address.zipCode}
            </p>
            <div className="h-[400px] w-full rounded-lg overflow-hidden">
              <SpaceMap space={selectedSpace} />
            </div>
          </div>

          {/* Reviews */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
            {selectedSpace.reviews.length > 0 ? (
              <div className="space-y-6">
                {reviewsWithDates.map((review, index) => (
                  <div key={index} className="border-b pb-4 last:border-0">
                    <div className="flex items-center mb-2">
                      <div className="flex items-center text-yellow-400">
                        <Star className="h-5 w-5 fill-yellow-400" />
                        <span className="ml-1 font-medium text-lg">
                          {review.rating}
                        </span>
                      </div>
                      <span className="mx-2 text-gray-500">•</span>
                      <span className="text-gray-600 text-sm">
                        {formatDate(review.createdAt)}
                      </span>
                    </div>
                    <p className="text-gray-700 text-lg">{review.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No reviews yet. Be the first to leave a review!</p>
            )}
          </div>
        </div>

        <div className="space-y-8">
          {/* Booking Card */}
          <div className="p-6 rounded-lg shadow-lg border border-white">
            <h2 className="text-2xl font-semibold mb-4">Booking Details</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Price</span>
                <span className="font-semibold">
                  ₦{selectedSpace.pricePerHour.toLocaleString()}/hour
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Capacity</span>
                <span className="font-semibold">
                  {selectedSpace.capacity} people
                </span>
              </div>
              <Button
                className="w-full text-lg py-3"
                disabled={!selectedSpace.available}
              >
                {selectedSpace.available
                  ? "Book Now"
                  : "Currently Unavailable"}
              </Button>
              <button
                className="w-full text-lg py-2 border-gray-300 bg-[#E16B8C] rounded"
                onClick={() => setShowReviewForm(true)}
              >
                Write a Review
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Review Form Modal */}
      {showReviewForm && (
        <ReviewForm
          space={selectedSpace}
          onClose={() => setShowReviewForm(false)}
        />
      )}
    </Container>
  );
}
