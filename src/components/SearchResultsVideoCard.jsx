import { abbreviateNumber } from "js-abbreviation-number";
import React from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { IoIosRadio } from "react-icons/io";
import { RiMusicFill } from "react-icons/ri";
import { Link } from "react-router-dom";

import VideoLength from "../shared/VideoLength";

const SearchResultVideoCard = ({ video }) => {
  return (
    <Link to={`/video/${video?.videoId}`}>
      <div className="flex flex-col md:flex-row mb-8 md:mb-3 lg:hover:bg-white/[0.1] rounded-xl ">
        <div className="relative flex shrink-0 h-48 md:h-28 lg:h-40 xl:h-48 w-full md:w-48 lg:w-64 xl:w-80 rounded-xl bg-slate-800 overflow-hidden">
          <img
            className="h-full w-full object-center"
            src={video?.thumbnails[0]?.url}
            alt={video?.author?.title}
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
        <div className="flex flex-col ml-2 md:ml-6 mt-2 overflow-hidden">
          <span className="text-lg md:text-xl font-semibold line-clamp-2 text-white">
            {video?.title}
          </span>
          <div className="flex mt-2 md:mt-0 text-sm font-semibold text-white/[0.7] truncate overflow-hidden">
            <span>{`${abbreviateNumber(video?.stats?.views, 2)} views`}</span>
            <span className="flex text-[24px] leading-none font-bold text-white/[0.7] relative top-[-10px] mx-1">
              .
            </span>
            <span className="truncate">{video?.publishedTimeText}</span>
          </div>

          <div className="flex items-center mt-2">
            <div className="flex items-start mr-3">
              <div className="flex h-8 w-8 rounded-full overflow-hidden">
                <img
                  className="h-full w-full object-cover"
                  src={video?.author?.avatar[0]?.url}
                  alt={video?.author?.title}
                />
              </div>
              <span className="text-sm font-semibold mt-1 ml-2 text-white/[0.7] flex items-center">
                {video?.author?.title}
                {video?.author?.badges?.[0]?.type === "VERIFIED_CHANNEL" ? (
                  <BsCheckCircleFill className="ml-1 text-white/[0.5] text-[12px]" />
                ) : "OFFICIAL_ARTIST_CHANNEL" ? (
                  <RiMusicFill className="ml-1 text-white/[0.5] text-[12px]" />
                ) : (
                  ""
                )}
              </span>
            </div>
          </div>
          <div className=" flex-col hidden md:flex">
            <span className="empty:hidden text-sm line-clamp-1 md:line-clamp-2 text-white/[0.7] md:pr-24 md:my-4">
              {video?.descriptionSnippet}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SearchResultVideoCard;
