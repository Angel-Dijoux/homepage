import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonImage() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[140px] w-[250px] rounded-xl" />
    </div>
  );
}
