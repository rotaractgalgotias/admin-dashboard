import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function ActivityLogSkeleton() {
  return (
    <div className="p-6">
      <Skeleton className="h-8 w-48 mb-6" />
      <ul className="space-y-8">
        {[...Array(5)].map((_, index) => (
          <li key={index} className="relative pl-10 pb-8">
            {index !== 4 && (
              <div className="absolute left-[19px] top-[40px] bottom-0 w-px bg-gray-200" />
            )}
            <div className="flex items-start">
              <Skeleton className="absolute left-0 w-8 h-8 rounded-full" />
              <div className="flex-1 ml-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <div>
                      <Skeleton className="h-4 w-24 mb-1" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                  </div>
                  <Skeleton className="h-4 w-24" />
                </div>
                <Skeleton className="h-4 w-full max-w-[300px] mt-2" />
                <div className="mt-2 flex items-center space-x-4">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <div className="mt-2 flex items-center space-x-2">
                  <Skeleton className="h-6 w-6 rounded-full" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <div className="mt-3">
                  <Skeleton className="h-8 w-24" />
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
