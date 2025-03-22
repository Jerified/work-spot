"use client";
import React from 'react';
import Image from "next/image";
import Link from "next/link";
import { Badge } from "../components/ui/badge";
import { MapPin, Star, Clock } from "lucide-react";
import { Space } from "../../src/types/space";
import { Separator } from "./ui/separator";

interface SpaceCardProps {
  space: Space;
}

export default function SpaceCard({ space }: SpaceCardProps) {
  console.log(space);
  return (
    <div className="group overflow-hidden hover:shadow-xl transition-all duration-300 rounded-lg bg-gradient-to-br from-[#2E173A] to-[#191B2B] backdrop-blur-sm h-[450px flex flex-col">
      <div className="relative aspect-video">
        <Image
          src={space.images[0] || "/placeholder.jpg"}
          alt={space.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {space.available && (
          <Badge className="absolute top-3 right-3 bg-green-500/90 text-white border-none">
            Available Now
          </Badge>
        )}
      </div>

      <div className="p-4 pb-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold group-hover:text-[#a3707f] transition-colors line-clamp-1">
              {space.name}
            </h3>
            <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
              <MapPin className="w-4 h-4" />
              <div>
  {`${space.address.street}, ${space.address.city}, ${space.address.state}`}
</div>

            </div>
          </div>
          <Badge variant="secondary" className="font-mono">
            ₦{space.pricePerHour}/hr
          </Badge>
        </div>
      </div>

      <div className="px-4 flex-1">
        <div className="flex items-center gap-6 text-sm text-gray-300">
          <div className="flex items-center gap-1.5">
            <Star className="w-4 h-4 text-yellow-400" />
            <span>
              {space.rating.toFixed(1)} ({space.reviews.length})
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            <span>{space.available ? "24/7" : "Limited Hours"}</span>
          </div>
        </div>

        <p className="mt-4 text-sm text-gray-300 line-clamp-2">
          {space.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {space.amenities.slice(0, 3).map((amenity: string) => (
            <Badge
              key={amenity}
              variant="outline"
              className="text-xs !bg-[#a3707f] !border-none !ring-none"
            >
              {amenity}
            </Badge>
          ))}{" "}
          {space.amenities.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{space.amenities.length - 3} more
            </Badge>
          )}
        </div>
      </div>

      <div className="mt-auto">
        <Separator className="bg-gray-700 my-3" />
        <div className="p-4 pt-0">
          <Link
            href={`/spaces/${space._id}`}
            className="block w-full py-2 text-center text-white bg-gradient-to-br from-[#2E173A] to-[#191B2B] rounded-lg transition-colors duration-200 hover:from-[#3E274A] hover:to-[#292B3B]"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
