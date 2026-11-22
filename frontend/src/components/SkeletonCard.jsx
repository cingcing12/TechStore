import React from 'react';

export default function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-neutral-200/70 p-4 flex flex-col space-y-4 overflow-hidden shadow-2xs">
      {/* Image Skeleton */}
      <div className="aspect-4/3 w-full rounded-xl skeleton-shimmer"></div>

      {/* Content Skeleton */}
      <div className="space-y-3 flex-1 flex flex-col justify-between pt-1">
        <div className="space-y-2">
          {/* Rating */}
          <div className="h-3 w-16 rounded-md skeleton-shimmer"></div>

          {/* Title */}
          <div className="h-4.5 w-3/4 rounded-md skeleton-shimmer"></div>

          {/* Single clean spec line */}
          <div className="h-3 w-1/2 rounded-md skeleton-shimmer"></div>
        </div>

        {/* Price & Button */}
        <div className="pt-3 border-t border-neutral-100 flex items-center justify-between gap-3">
          <div className="h-6 w-16 rounded-md skeleton-shimmer"></div>
          <div className="h-8.5 w-24 rounded-xl skeleton-shimmer"></div>
        </div>
      </div>
    </div>
  );
}
