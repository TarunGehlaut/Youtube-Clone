import Skeleton from "react-loading-skeleton";

const VideoCardSkeleton = () => {
  return (
    <div className="flex flex-col mb-4">
      <div className="relative h-48 md:h-40 md:rounded-xl overflow-hidden bg-white/[0.2]">
        <Skeleton height="100%" width="100%" />
      </div>
      <div className="flex mt-3">
        <div className="flex items-start">
          <div className="flex h-10 w-10 rounded-full overflow-hidden bg-white/[0.2]">
            <Skeleton circle height="100%" width="100%" />
          </div>
          <div className="flex flex-col ml-2 items-center">
            <Skeleton count={3} height="100%" width="25%" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCardSkeleton;
