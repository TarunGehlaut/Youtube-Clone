import React from "react";

const SuggestedVideoCardSkeleton = () => {
  return (
    <div className="rich-grid-media-skeleton pointer-events-none  mb-3 ">
      <div className="video-details flex items-center gap-2 ">
        <div className="rich-thumbnail  skeleton-bg-color  relative  block  content-['']  bg-[#292929]  h-24 xl:h-28 w-40 min-w-[168px] lg:w-[140px] lg:min-w-[140px] xl:w-[180x] xl:min-w-[180px] rounded-xl "></div>

        <div className="details-text-shell flex-auto">
          <div className="rich-video-title text-shell skeleton-bg-color w-[90%] rounded-sm  h-5 my-[10px] bg-[#292929]"></div>
          <div className="rich-video-meta text-shell skeleton-bg-color w-[75%] rounded-sm  h-5 my-[10px] bg-[#292929]"></div>
          <div className="rich-video-meta text-shell skeleton-bg-color w-[60%] rounded-sm  h-5 my-[10px] bg-[#292929]"></div>
        </div>
      </div>
    </div>
  );
};

export default SuggestedVideoCardSkeleton;
