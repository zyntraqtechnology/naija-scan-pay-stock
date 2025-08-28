import { Skeleton } from "@/components/ui/skeleton"

export default function StorefrontDetailLoading() {
  return (
    <div className="flex flex-col w-full">
      <div className="p-6 border-b">
        <Skeleton className="h-8 w-64 mb-2" />
        <Skeleton className="h-4 w-96" />
      </div>

      <div className="p-4 md:p-6 space-y-6 w-full">
        {/* Top Action Bar */}
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Skeleton className="h-9 w-20 mr-4" />
            <Skeleton className="h-6 w-24" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-9 w-28" />
            <Skeleton className="h-9 w-32" />
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-10" />
            ))}
          </div>

          {/* Content Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Skeleton className="h-[400px] w-full rounded-lg" />
            </div>
            <div className="space-y-6">
              <Skeleton className="h-[200px] w-full rounded-lg" />
              <Skeleton className="h-[200px] w-full rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
