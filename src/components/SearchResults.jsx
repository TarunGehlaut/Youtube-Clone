import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Context } from "../context/ContextApi";
import { fetchDataFromAPI } from "../utils/api";
import FilterSearchResults from "./FilterSearchResults";
import LeftNav from "./LeftNav";
import SearchResultVideoCard from "./SearchResultsVideoCard";

import { VscSettings } from "react-icons/vsc";

const SearchResult = () => {
  const [result, setResult] = useState([]);
  const { searchQuery } = useParams();
  const { setLoading } = useContext(Context);
  const [showFilter, setShowFilter] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    fetchSearchResults(searchQuery);
  }, [searchQuery]);

  const fetchSearchResults = (searchQuery) => {
    setLoading(true);
    fetchDataFromAPI(`search/?q=${searchQuery}`).then((res) => {
      setResult(res?.contents);
      setData(res);
      setLoading(false);
    });
  };

  return (
    <div className="flex flex-row h-[calc(100%-56px)]">
      <div className="hidden lg:block w-[240px]">
        <LeftNav />
      </div>
      <div className="grow w-[calc(100%-240px)] flex flex-col h-full overflow-y-auto bg-black">
        <div className="text-xl flex flex-col border-b-2 border-zinc-700 ml-5 mr-16  lg:mr-24 xl:mr-32 mt-5 ">
          <span
            onClick={() => setShowFilter((prev) => !prev)}
            className="flex items-center justify-center text-white text-sm  h-8 w-20   rounded-2xl hover:bg-[#3f3f3f]/[0.6] cursor-pointer "
          >
            <VscSettings className="text-white text-xl mr-1 rotate-90 " />
            Filter
          </span>
          {showFilter && (
            <FilterSearchResults
              data={data}
              setResult={setResult}
              setData={setData}
            />
          )}
        </div>
        <div className="grid grid-cols-1 gap-2 p-5">
          {result?.map((item, index) => {
            if (item?.type !== "video") return false;
            return <SearchResultVideoCard key={index} video={item.video} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
