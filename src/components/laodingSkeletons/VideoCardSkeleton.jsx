const VideoCardSkeleton = () => {
  return (
    <div className="rich-grid-media-skeleton pointer-events-none m-0   ">
      <div className="video-details pb-10 flex flex-col ">
        <div className="rich-thumbnail  skeleton-bg-color bg-[#292929] relative rounded-lg w-full before:block  before:content-[''] before:rounded-lg before:bg-[#0000001a] before:w-full before:h-48  before:pt-14"></div>
        <div className="details flex ">
          <div className="channel-avatar skeleton-bg-color bg-[#292929] h-10 rounded-full mt-3 mr-3 w-10"></div>
          <div className="details-text-shell flex-auto">
            <div className="rich-video-title text-shell skeleton-bg-color w-[90%] rounded-sm  h-5 my-[10px] bg-[#292929]"></div>
            <div className="rich-video-meta text-shell skeleton-bg-color w-[60%] rounded-sm  h-5 my-[10px] bg-[#292929]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCardSkeleton;
