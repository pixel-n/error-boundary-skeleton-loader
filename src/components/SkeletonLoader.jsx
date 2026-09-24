import React from 'react';

export const SkeletonLoader = () => {
  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm animate-pulse space-y-4">
      <div className="flex items-center gap-4">
        {/* Avatar skeleton */}
        <div className="w-14 h-14 bg-slate-200 rounded-full shrink-0" />
        <div className="space-y-2 flex-1">
          {/* Name skeleton */}
          <div className="h-5 bg-slate-200 rounded-md w-1/3" />
          {/* Role badge skeleton */}
          <div className="h-4 bg-slate-200 rounded-md w-1/4" />
        </div>
      </div>
      {/* Bio text skeleton */}
      <div className="space-y-2 pt-2">
        <div className="h-3.5 bg-slate-200 rounded w-full" />
        <div className="h-3.5 bg-slate-200 rounded w-4/5" />
      </div>
    </div>
  );
};