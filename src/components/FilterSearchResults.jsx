import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../context/ContextApi";
import { fetchDataFromAPI } from "../utils/api";

import { CgClose } from "react-icons/cg";

const FilterSearchResults = ({ data, setResult, setData }) => {
  const [filterMethod, setFilterMethod] = useState("Relevance");
  const [cursor, setCursor] = useState("");

  const { setLoading } = useContext(Context);

  const { searchQuery } = useParams();

  const fetchFIlteredData = (searchQuery) => {
    setLoading(true);

    let url = `search/?q=${searchQuery}`;
    if (cursor) {
      url += `&cursor=${cursor}`;
    }
    fetchDataFromAPI(url).then((res) => {
      console.log(res);
      setResult(res?.contents);
      setData(res);
      setLoading(false);
    });
  };

  const handleUnSelect = () => {
    setFilterMethod("Relevance");
    setCursor(null);
  };

  useEffect(() => {
    fetchFIlteredData(searchQuery);
  }, [cursor, searchQuery, filterMethod]);

  return (
    <div className="my-5 flex flex-row justify-between items-start">
      {data?.filterGroups?.map((filterGroup, index) => {
        if (filterGroup?.title === "Type") {
          return false;
        }
        return (
          <div key={index} className="flex flex-col ">
            <h3 className="text-sm text-white font-semibold uppercase pr-10 pb-4 border-b-2 border-zinc-500">
              {filterGroup?.title}
            </h3>
            <div className="flex flex-col gap-2 my-5">
              {filterGroup?.filters?.map((filter, index) => {
                return (
                  <div className="flex items-center gap-2">
                    <div
                      onClick={() => {
                        setCursor(filter?.cursorSelect);
                        setFilterMethod(filter?.label);
                        // setShowFilter(false);
                      }}
                      key={index}
                      className={` ${
                        filterMethod === filter?.label
                          ? "text-white"
                          : "text-white/[0.7]"
                      }  text-base font-medium cursor-pointer  `}
                    >
                      {filter?.label}
                    </div>
                    {filterMethod === filter?.label &&
                      filterMethod !== "Relevance" && (
                        <div
                          onClick={handleUnSelect}
                          className="ml-5 cursor-pointer"
                        >
                          <CgClose className="text-xl text-white" />
                        </div>
                      )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FilterSearchResults;
