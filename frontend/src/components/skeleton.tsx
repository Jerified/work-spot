import { Skeleton } from '@/components/ui/skeleton';

export function SpaceCardSkeleton() {
  return (
    <div className="group overflow-hidden hover:shadow-xl transition-all duration-300 rounded-lg bg-gradient-to-br from-[#2E173A] to-[#191B2B] backdrop-blur-sm h-[450px] flex flex-col">
      {/* Image placeholder */}
      <div className="relative aspect-video">
        <Skeleton className="h-full w-full absolute" />
        <div className="absolute top-3 right-3">
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
      </div>

      {/* Header content */}
      <div className="p-4 pb-2">
        <div className="flex justify-between items-start">
          <div>
            <Skeleton className="h-6 w-[150px] mb-2" />
            <div className="flex items-center gap-2 mt-1">
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-4 w-[180px]" />
            </div>
          </div>
          <Skeleton className="h-6 w-[80px]" />
        </div>
      </div>

      {/* Middle content */}
      <div className="px-4 flex-1">
        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-1.5">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-16" />
          </div>
          <div className="flex items-center gap-1.5">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>

        <div className="mt-4">
          <Skeleton className="h-4 w-full mb-1" />
          <Skeleton className="h-4 w-[90%]" />
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto">
        <div className="bg-gray-700 h-px my-3" />
        <div className="p-4 pt-0">
          <Skeleton className="h-10 w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export function HomeSkeleton() {
  return (
    <section className="py-12 bg-[#191B2B]">
      <div className="px-4 !mt-6">
        <Skeleton className="h-10 w-[250px] mb-8" /> {/* Featured Spaces heading */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <SpaceCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </section>
  );
}