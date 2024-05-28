import { Skeleton } from "@/components/ui/skeleton";

const InboxSkeleton = () => {
  return (
    <div className="w-full max-w-3xl mx-auto py-6 px-4 md:px-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Skeleton className="w-20 h-8 bg-slate-100" />
          <Skeleton className="w-20 h-8 bg-slate-100" />
          <Skeleton className="w-20 h-8 bg-slate-100" />
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex items-start space-x-4 rounded-lg border border-gray-200 p-4">
          <Skeleton className=" w-full h-12 bg-slate-100" />
        </div>
      </div>
    </div>
  );
};

export default InboxSkeleton;
