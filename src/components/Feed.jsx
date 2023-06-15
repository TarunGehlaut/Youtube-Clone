import React, { useContext, useRef } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

import { useNavigate } from "react-router-dom";

import { subCat } from "../utils/constants";

import LeftNav from "../components/LeftNav";
import { Context } from "../context/ContextApi";
import SubCategory from "./SubCategory";
import VideoCard from "./VideoCard";
import VideoCardSkeleton from "./laodingSkeletons/VideoCardSkeleton";

const Feed = () => {
  const { loading, searchResults, selectCategories, setSelectCategories } =
    useContext(Context);

  const subCategoryContainer = useRef(null);

  const navigate = useNavigate();

  const navigation = (direction) => {
    const container = subCategoryContainer.current;
    if (!container) return;

    const scrollAmount =
      direction === "left"
        ? container.scrollLeft - (container.offsetWidth + 1)
        : container.scrollLeft + (container.offsetWidth + 1);

    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="flex flex-row h-[calc(100%-56px)]">
      <LeftNav />
      <div className="md:translate-x-[240px] w-full md:w-[calc(100%-240px)]  h-full  overflow-y-auto  bg-[#0f0f0f]">
        <div className="relative w-full  py-4 bg-[#0f0f0f]  mb-2 ">
          <div className=" after:content-[''] after:top-0 after:left-0  after:absolute after:bg-darkLeftGradient after:h-full after:w-[50px] after:md:w-[160px] after:pointer-events-none">
            <AiOutlineLeft
              onClick={() => navigation("left")}
              className={`text-white  h-8 w-8 p-2  rounded-full hover:bg-[#3f3f3f]/[0.6] absolute translate-y-1/2 cursor-pointer  z-10 hidden md:block left-2 top-[-1px]
              `}
            />
          </div>

          <div className=" before:content-[''] before:top-0 before:right-0 before:absolute before:bg-darkRightGradient before:h-full before:w-[50px] before:md:w-[128px] before:pointer-events-none">
            <AiOutlineRight
              onClick={() => navigation("right")}
              className={`text-white  h-8 w-8 p-2  rounded-full hover:bg-[#3f3f3f]/[0.6] absolute translate-y-1/2 cursor-pointer  z-10 hidden md:block right-2 top-[-1px]
              `}
            />
          </div>

          <div
            ref={subCategoryContainer}
            className="flex flex-row items-center md:ml-10  md:pl-7  overflow-x-scroll scrollbar-hide"
          >
            {subCat.map((item, index) => {
              return (
                <SubCategory
                  key={index}
                  action={() => {
                    setSelectCategories(item.name);
                    navigate("/");
                  }}
                  text={item.name}
                  className={`${
                    selectCategories === item.name
                      ? "bg-white text-black hover:bg-white"
                      : "bg-white/[0.15] text-white hover:bg-white/[0.4]"
                  }  
                    `}
                />
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4  px-16">
          {loading && (
            <>
              {Array.from({ length: 8 }).map((_, index) => (
                <VideoCardSkeleton key={index} />
              ))}
            </>
          )}
          {!loading &&
            searchResults &&
            searchResults.map((video, index) => {
              if (video?.type !== "video") return false;
              return <VideoCard key={index} video={video?.video} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default Feed;
