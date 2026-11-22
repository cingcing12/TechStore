import React from 'react';

export default function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-neutral-200/70 p-4 flex flex-col space-y-4 overflow-hidden shadow-xs">
      {/* Image Skeleton */}
      <div className="aspect-4/3 w-full rounded-xl skeleton-shimmer"></div>

      {/* Content Skeleton */}
      <div className="space-y-3 flex-1 flex flex-col justify-between pt-1">
        <div className="space-y-2">
          {/* Category & Rating */}
          <div className="flex items-center justify-between">
            <div className="h-3.5 w-16 rounded-md skeleton-shimmer"></div>
            <div className="h-3.5 w-12 rounded-md skeleton-shimmer"></div>
          </div>

          {/* Title */}
          <div className="h-4.5 w-3/4 rounded-md skeleton-shimmer"></div>
          <div className="h-4.5 w-1/2 rounded-md skeleton-shimmer"></div>

          {/* Specs tags */}
          <div className="flex gap-1.5 pt-1">
            <div className="h-5 w-20 rounded-md skeleton-shimmer"></div>
            <div className="h-5 w-24 rounded-md skeleton-shimmer"></div>
          </div>
        </div>

        {/* Price & Button */}
        <div className="pt-3 border-t border-neutral-100 flex items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="h-2.5 w-8 rounded skeleton-shimmer"></div>
            <div className="h-6 w-16 rounded-md skeleton-shimmer"></div>
          </div>
          <div className="h-9 w-28 rounded-xl skeleton-shimmer"></div>
        </div>
      </div>
    </div>
  );
}

