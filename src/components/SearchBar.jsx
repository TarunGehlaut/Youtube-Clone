import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { CgClose } from "react-icons/cg";
import { IoIosSearch } from "react-icons/io";

const SearchBar = ({
  fetchRealTimeData,
  clearRealTimeResults,
  setShowRealTimeResults,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncingQuery, setDebouncingQuery] = useState(searchQuery);

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(debouncingQuery);
    }, 400);

    return () => {
      clearTimeout(timer);
    };
  }, [debouncingQuery]);

  useEffect(() => {
    if (searchQuery !== "") {
      fetchRealTimeData(searchQuery);
    } else {
      clearRealTimeResults();
      setShowRealTimeResults(false);
    }
  }, [searchQuery]);

  const searchQueryHandler = (event) => {
    if (
      (event?.key === "Enter" || event === "searchButton") &&
      searchQuery?.length > 0
    ) {
      navigate(`/searchResult/${searchQuery}`);
      setShowRealTimeResults(false);
    }
  };

  return (
    <div className="group flex items-center mx-2">
      <div className="flex  h-8 md:h-10 md:ml-10 md:pl-5 border border-[#3f3f3f] rounded-l-3xl group-focus-within:border-blue-500 md:group-focus-within:ml-5 md:group-focus-within:pl-0">
        <div className="w-10 hidden items-center justify-center md:group-focus-within:flex">
          <IoIosSearch className="text-white text-xl" />
        </div>
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => setDebouncingQuery(e.target.value)}
          onKeyUp={searchQueryHandler}
          value={debouncingQuery}
          className="outline-none bg-transparent text-white pr-5 pl-5 md:pl-0 w-44 md:w-64 lg:w-[500px] md:group-focus-within:pl-5"
        />
        {debouncingQuery?.length > 0 && (
          <div
            className={`flex items-center justify-center cursor-pointer  mr-1 h-7 w-7 lg:h-10 lg:w-10 rounded-full hover:bg-[#3f3f3f]/[0.6]`}
          >
            <CgClose
              onClick={() => {
                setDebouncingQuery("");
                setShowRealTimeResults(false);
              }}
              className="text-white text-sm lg:text-xl"
            />
          </div>
        )}
      </div>
      <button
        className="flex items-center justify-center bg-white/[0.1] rounded-r-3xl w-10 md:w-16 h-8 md:h-10 border border-l-0 border-[#3f3f3f]"
        onClick={() => searchQueryHandler("searchButton")}
      >
        <IoIosSearch className="text-white text-xl" />
      </button>
    </div>
  );
};

export default SearchBar;
