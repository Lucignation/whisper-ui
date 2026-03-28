import { Skeleton } from "../ui/skeleton";

const LoadingSkeleton = () => {
  return (
    <div className="flex w-full flex-col p-[20px] items-center  h-[84vh]">
      <div className="flex flex-col space-y-3 w-full">
        <Skeleton className="h-[125px] w-[100%] bg-[#ffffff20] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[100%] bg-[#ffffff20]" />
          <Skeleton className="h-4 w-[100%] bg-[#ffffff20]" />
        </div>
        <Skeleton className="h-[50px] w-[50px] bg-[#ffffff20] rounded-full" />
      </div>
      <div className="flex flex-col space-y-3 mt-[40px] w-full">
        <Skeleton className="h-[125px] w-[100%] bg-[#ffffff20] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[100%] bg-[#ffffff20]" />
          <Skeleton className="h-4 w-[100%] bg-[#ffffff20]" />
        </div>
        <Skeleton className="h-[50px] w-[50px] bg-[#ffffff20] rounded-full" />
      </div>
    </div>
  );
};

export default LoadingSkeleton;
