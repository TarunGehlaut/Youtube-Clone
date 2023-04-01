import React, { useContext, useEffect, useRef, useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

import { useNavigate } from "react-router-dom";

import InfiniteScroll from "react-infinite-scroll-component";

import { subCat } from "../utils/constants";

import LeftNav from "../components/LeftNav";
import { Context } from "../context/ContextApi";
import SubCategory from "./SubCategory";
import VideoCard from "./VideoCard";

const Feed = () => {
  const {
    loading,
    searchResults,
    handleScroll,
    selectCategories,
    setSelectCategories,
    data,
  } = useContext(Context);

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
      <div className="md:translate-x-[240px] w-full md:w-[calc(100%-240px)]  h-full overflow-y-auto  bg-black">
        <div className=" w-full  py-4 bg-black  mb-2 relative">
          <AiOutlineLeft
            onClick={() => navigation("left")}
            className={`text-white  h-8 w-8 p-2  rounded-full hover:bg-[#3f3f3f]/[0.6] absolute translate-y-1/2 cursor-pointer  z-10 hidden md:block left-2 top-[-1px]
              `}
          />

          <AiOutlineRight
            onClick={() => navigation("right")}
            className={`text-white  h-8 w-8 p-2  rounded-full hover:bg-[#3f3f3f]/[0.6] absolute translate-y-1/2 cursor-pointer  z-10 hidden md:block right-2 top-[-1px]
              `}
          />

          <div
            ref={subCategoryContainer}
            className="flex flex-row items-center ml-3  md:pl-7  overflow-x-scroll truncate"
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

        <>
          <InfiniteScroll
            dataLength={searchResults.length}
            next={handleScroll}
            hasMore={!!data?.cursorNext}
            loader={<h4>Loading...</h4>}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-5"
          >
            {!loading &&
              searchResults &&
              searchResults.map((video, index) => {
                if (video?.type !== "video") return false;
                return <VideoCard key={index} video={video?.video} />;
              })}
          </InfiniteScroll>
        </>
      </div>
    </div>
  );
};

export default Feed;
