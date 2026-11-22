import React from 'react';

export default function SkeletonSlider() {
  return (
    <div className="relative rounded-3xl overflow-hidden h-[340px] sm:h-[400px] lg:h-[440px] w-full border border-neutral-200/80 shadow-xs skeleton-shimmer">
      <div className="relative z-10 h-full flex flex-col justify-between p-6 sm:p-10 lg:p-12 max-w-2xl">
        <div className="space-y-3 pt-2">
          {/* Title skeleton */}
          <div className="h-9 sm:h-12 w-3/4 max-w-md rounded-2xl bg-neutral-300/60"></div>
          {/* Subtitle skeleton */}
          <div className="h-4 w-1/2 max-w-xs rounded-lg bg-neutral-300/50 mt-2"></div>
        </div>

        {/* Bottom controls skeleton */}
        <div className="flex items-center space-x-3 pt-4">
          <div className="h-8 w-24 rounded-xl bg-neutral-300/60"></div>
          <div className="h-10 w-32 rounded-xl bg-neutral-300/60"></div>
        </div>
      </div>

      {/* Dots skeleton in bottom right */}
      <div className="absolute bottom-5 right-6 z-10 flex items-center space-x-2">
        <div className="w-7 h-2 rounded-full bg-neutral-300/70"></div>
        <div className="w-2 h-2 rounded-full bg-neutral-300/50"></div>
        <div className="w-2 h-2 rounded-full bg-neutral-300/50"></div>
        <div className="w-2 h-2 rounded-full bg-neutral-300/50"></div>
      </div>
    </div>
  );
}
