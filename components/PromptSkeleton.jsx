"use client";

const PromptSkeleton = () => {
  return (
    <div className="prompt_card animate-pulse">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-300"></div>
          <div className="flex flex-col gap-2 flex-1">
            <div className="h-4 bg-gray-300 rounded w-24"></div>
            <div className="h-3 bg-gray-300 rounded w-32"></div>
          </div>
        </div>
        <div className="w-5 h-5 bg-gray-300 rounded"></div>
      </div>
      <p className="my-4 text-sm text-gray-700">
        <div className="h-16 bg-gray-300 rounded"></div>
      </p>
      <p className="text-sm bg-gray-300 rounded w-20 h-4"></p>
    </div>
  );
};

export const SkeletonLoader = ({ count = 3 }) => {
  return (
    <div className="mt-16 prompt_layout">
      {Array.from({ length: count }).map((_, i) => (
        <PromptSkeleton key={i} />
      ))}
    </div>
  );
};

export default PromptSkeleton;
