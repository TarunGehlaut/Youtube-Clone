import { abbreviateNumber } from "js-abbreviation-number";
import React, { useContext, useEffect, useState } from "react";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { BsCheckCircleFill } from "react-icons/bs";
import { RiMusicFill } from "react-icons/ri";
import { RxDividerVertical, RxDotsHorizontal } from "react-icons/rx";
import { TbShare3 } from "react-icons/tb";
import { TfiDownload } from "react-icons/tfi";
import ReactPlayer from "react-player/youtube";
import { useParams } from "react-router-dom";

import LeftNav from "./LeftNav";

import { Context } from "../context/ContextApi";
import { fetchDataFromAPI } from "../utils/api";
import CommentSection from "./commentSection/CommentSection";
import SuggestionVideoCard from "./SuggestionVideoCard";

const VideoDetails = () => {
  const [video, setVideo] = useState();
  const [relatedVideos, setRelatedVideos] = useState();

  const [subscribe, setSubcribe] = useState(false);
  const { id } = useParams();
  const { setLoading, mobileMenu } = useContext(Context);

  useEffect(() => {
    fetchVideoDetails();
    fetchRelatedVideos();
  }, [id]);

  const fetchVideoDetails = () => {
    setLoading(true);
    fetchDataFromAPI(`video/details/?id=${id}`).then((res) => {
      setVideo(res);
      setLoading(false);
    });
  };

  const fetchRelatedVideos = () => {
    setLoading(true);
    fetchDataFromAPI(`video/related-contents/?id=${id}`).then((res) => {
      setRelatedVideos(res);
      setLoading(false);
    });
  };

  return (
    <>
      {mobileMenu && (
        <div>
          <LeftNav />
        </div>
      )}
      <div className="flex justify-center flex-row h-[calc(100%-56px)] bg-black overflow-y-auto">
        <div className="w-full max-w-[1380px] flex flex-col lg:flex-row">
          <div className="flex flex-col lg:w-[calc(100%-350px)] xl:w-[calc(100%-400px)] px-4 py-3 lg:py-6 ">
            {/* Video PLayes */}
            <div className="h-[200px] md:h-[400px] lg:h-[400px] xl:h-[550px] ml-[-16px] lg:ml-0 mr-[-16px] lg:mr-0">
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${id}`}
                controls
                width="100%"
                height="100%"
                style={{ backgroundColor: "#000000" }}
                playing={false}
              />
            </div>
            {/* Details */}
            <div>
              <div className="text-white font-bold text-sm md:text-xl mt-4 line-clamp-2">
                {video?.title}
              </div>
              <div className="flex justify-between flex-col md:flex-row mt-4">
                <div className="flex">
                  <div className="flex items-start">
                    <div className="flex h-11 w-11 rounded-full overflow-hidden">
                      <img
                        className="h-full w-full object-cover"
                        src={video?.author?.avatar[0]?.url}
                        alt={video?.author?.title}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-col ml-3 overflow-x-auto">
                    <div className="text-white text-md font-semibold flex items-center truncate">
                      {video?.author?.title}
                      {video?.author?.badges?.[0]?.type ===
                      "VERIFIED_CHANNEL" ? (
                        <BsCheckCircleFill className="ml-1 text-white/[0.5] text-[12px]" />
                      ) : "OFFICIAL_ARTIST_CHANNEL" ? (
                        <RiMusicFill className="ml-1 text-white/[0.5] text-[12px]" />
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="text-white/[0.7] text-sm truncate">
                      {video?.author?.stats?.subscribersText}
                    </div>
                  </div>

                  <div className="text-[#303030]   font-semibold ml-1 md:ml-2  mt-2 flex items-center justify-center h-8  md::h-11 px-2  md:px-4 rounded-3xl bg-white">
                    {subscribe ? "Subscribed" : "Subscribe"}
                  </div>
                </div>
                <div className="flex  text-white mt-4 md:mt-0 font-semibold gap-[6px] overflow-x-auto pb-2">
                  <div className="flex items-center justify-center h-8  md::h-11 px-2  md:px-4 rounded-3xl bg-white/[0.15]">
                    <AiOutlineLike className="text-xl text-white mr-1" />
                    {`${abbreviateNumber(video?.stats?.views, 2)}`}

                    <RxDividerVertical className="text-xl text-white mx-1" />
                    <AiOutlineDislike className="text-xl text-white " />
                  </div>
                  <div className="flex items-center justify-center h-8  md::h-11 px-2  md:px-4 rounded-3xl bg-white/[0.15]">
                    <TbShare3 className="text-xl text-white mr-1" />
                    Share
                  </div>
                  <div className="flex items-center justify-center h-8  md::h-11 px-2  md:px-4 rounded-3xl bg-white/[0.15] ">
                    <TfiDownload className="text-xl text-white mr-2" />
                    Download
                  </div>
                  <div className="flex items-center justify-center  w-8 h-8  md::h-11 md:w-11 px-2  md:px-4 rounded-full bg-white/[0.15] ">
                    <RxDotsHorizontal className="text-xl text-white " />
                  </div>
                </div>
              </div>
            </div>
            {/* Comment Section */}
            <div className="flex flex-col mt-5 px-4 py-3 lg:py-6 ">
              <CommentSection />
            </div>
          </div>
          {/* Suggested Videos */}
          <div className="flex flex-col py-6 px-4 lg:w-[350px] xl:w-[400px]">
            {relatedVideos?.contents?.map((item) => {
              if (item?.type !== "video") return false;
              return (
                <SuggestionVideoCard
                  key={item?.video?.videoId}
                  video={item?.video}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoDetails;
