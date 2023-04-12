import { abbreviateNumber } from "js-abbreviation-number";
import { BsCheckCircleFill } from "react-icons/bs";
import { IoIosRadio } from "react-icons/io";
import { RiMusicFill } from "react-icons/ri";
import VideoLength from "../shared/VideoLength";

import { Link } from "react-router-dom";

const SuggestionVideoCard = ({ video }) => {
  return (
    <Link to={`/video/${video?.videoId}`}>
      <div className="flex  mb-3">
        <div className="relative h-24 lg:h-20 xl:h-24 w-40 min-w-[168px] lg:w-32 lg:min-w-[128px] xl:w-40 xl:min-w-[168px] rounded-xl bg-slate-800 overflow-hidden">
          <img
            className="h-full w-full object-cover "
            src={video?.thumbnails?.[0]?.url}
            alt={video?.title}
            loading="lazy"
          />
          {video?.isLiveNow === false ? (
            <VideoLength time={video?.lengthSeconds} />
          ) : (
            <div className="absolute bottom-2 right-2 py-1 px-2 text-white text-xs bg-red-700  rounded-md flex items-center">
              <span className="mr-1">
                <IoIosRadio />
              </span>
              <span>LIVE</span>
            </div>
          )}
        </div>
        <div className="flex flex-col ml-3 overflow-hidden">
          <span className="text-sm font-bold line-clamp-2 text-white lg:text-xs xl:text-sm">
            {video?.title}
          </span>
          <span className="flex font-semibold items-center text-[12px] lg:text-[10px] xl:text-[12px] text-white/[0.7] mt-2">
            {video?.author?.title}
            {video?.author?.badges?.[0]?.type === "VERIFIED_CHANNEL" ? (
              <BsCheckCircleFill className="ml-1 text-white/[0.5] text-[12px] lg:text-[10px] xl:text-[12px]" />
            ) : "OFFICIAL_ARTIST_CHANNEL" ? (
              <RiMusicFill className="ml-1 text-white/[0.5] text-[12px] lg:text-[10px] xl:text-[12px]" />
            ) : (
              ""
            )}
          </span>

          {video?.isLiveNow === false ? (
            <div className="flex items-center text-[12px] lg:text-[10px] xl:text-[12px] text-white/[0.7] font-semibold truncate overflow-hidden">
              <span>{`${abbreviateNumber(video?.stats?.views, 2)} views`}</span>
              <span className="flex leading-none font-semibold text-white/[0.7] text-2xl relative top-[-7px] mx-1">
                .
              </span>
              <span className="truncate">{video?.publishedTimeText}</span>
            </div>
          ) : (
            <div className="flex items-center text-sm text-white/[0.7] font-semibold truncate overflow-hidden gap-1">
              <span>{abbreviateNumber(video?.stats?.viewers, 2)}</span>
              <span>watching</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default SuggestionVideoCard;
