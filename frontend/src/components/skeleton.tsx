import { Skeleton } from '@/components/ui/skeleton';

export function SpaceCardSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-[200px] w-full rounded-lg" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[80%]" />
        <Skeleton className="h-4 w-[60%]" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-[50%]" />
        <Skeleton className="h-4 w-[70%]" />
      </div>
      <div className="flex gap-2">
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-6 w-16" />
      </div>
    </div>
  );
}

export function HomeSkeleton() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Skeleton className="h-10 w-[300px] mb-4" />
        <Skeleton className="h-6 w-[400px]" />
      </div>
      <div className="mb-8">
        <Skeleton className="h-12 w-full" />
      </div>
      <div className="mb-8">
        <Skeleton className="h-12 w-[200px]" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <SpaceCardSkeleton key={index} />
        ))}
      </div>
    </main>
  );
}