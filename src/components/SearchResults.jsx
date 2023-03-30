import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Context } from "../context/ContextApi";
import { fetchDataFromAPI } from "../utils/api";
import LeftNav from "./LeftNav";
import SearchResultVideoCard from "./SearchResultsVideoCard";

const SearchResult = () => {
  const [result, setResult] = useState();
  const { searchQuery } = useParams();
  const { setLoading } = useContext(Context);

  useEffect(() => {
    fetchSearchResults(searchQuery);
  }, [searchQuery]);

  const fetchSearchResults = (searchQuery) => {
    setLoading(true);
    fetchDataFromAPI(`search/?q=${searchQuery}`).then((res) => {
      console.log(res);
      setResult(res?.contents);
      setLoading(false);
    });
  };

  return (
    <div className="flex flex-row h-[calc(100%-56px)]">
      <div className="hidden lg:block w-[240px]">
        <LeftNav />
      </div>
      <div className="grow w-[calc(100%-240px)] h-full overflow-y-auto bg-black">
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
