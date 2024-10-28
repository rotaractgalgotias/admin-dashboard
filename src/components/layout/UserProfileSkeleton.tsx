import { Skeleton } from "@/components/ui/skeleton";
import { ChevronDown } from "lucide-react";

export function UserProfileSkeleton() {
  return (
    <div className="p-4 border-t border-border">
      <div className="flex items-center gap-3">
        <Skeleton className="size-8 rounded-full" />
        <div className="flex flex-col items-start gap-1">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-36" />
        </div>
        <ChevronDown className="size-4 text-muted-foreground ml-auto" />
      </div>
    </div>
  );
}
