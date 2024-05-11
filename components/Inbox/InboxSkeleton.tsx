import { Skeleton } from "@/components/ui/skeleton";

const InboxSkeleton = () => {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-md dark:bg-gray-950 dark:text-gray-50">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
          <Skeleton className="h-[20px] w-[100px] rounded" />
        </div>
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="divide-y divide-gray-200 dark:divide-gray-800"
          >
            <div className="group">
              <div className="w-full flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">
                <div className="flex items-center gap-4">
                  <Skeleton className="h-[40px] w-[40px] rounded-full" />
                  <div>
                    <div className="font-medium">
                      <Skeleton className="h-[20px] w-[200px] rounded" />
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      <Skeleton className="h-[20px] w-[200px] rounded" />
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  <Skeleton className="h-[20px] w-[100px] rounded" />
                </div>
              </div>
              <div className="px-6 py-4 text-sm">
                <div>
                  <Skeleton className="h-[20px] w-[400px] rounded" />
                </div>
                <div className="mt-4 flex items-center justify-between text-gray-500 dark:text-gray-400">
                  <div>
                    <Skeleton className="h-[20px] w-[100px] rounded" />
                  </div>
                  <div>
                    <Skeleton className="h-[20px] w-[100px] rounded" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InboxSkeleton;
