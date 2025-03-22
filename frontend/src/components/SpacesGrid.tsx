'use client';

import { Suspense } from 'react';
import SpaceCard from '@/components/SpaceCard';
import { HomeSkeleton } from '@/components/skeleton';
import { Space } from '@/types/space';
import { Button } from '@/components/ui/button';

interface SpacesGridProps {
  spaces: Space[];
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function SpacesGrid({ spaces, totalPages, currentPage, onPageChange }: SpacesGridProps) {
  return (
    <section className="py-12 bg-[#191B2B]">
      <div className="px-4 !mt-6">
        <h2 className="text-3xl font-bold text-white mb-8">Featured Spaces</h2>
        <Suspense fallback={<HomeSkeleton />}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {spaces?.map((space) => (
              <SpaceCard key={space._id} space={space} />
            ))}
          </div>

          {(!spaces || spaces.length === 0) && (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-white mb-2">
                No spaces found
              </h3>
              <p className="text-gray-400">
                Try adjusting your search or filters to find what you&apos;re looking for
              </p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  onClick={() => onPageChange(page)}
                  className="bg-[#E16B8C] hover:bg-[#B5495B] text-white"
                >
                  {page}
                </Button>
              ))}
            </div>
          )}
        </Suspense>
      </div>
    </section>
  );
} 