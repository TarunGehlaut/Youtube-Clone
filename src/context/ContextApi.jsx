import React, { createContext, useEffect, useState } from "react";

import { fetchDataFromAPI } from "../utils/api";

export const Context = createContext();

export const AppContext = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [selectCategories, setSelectCategories] = useState("New");
  const [searchResults, setSearchResults] = useState([]);
  const [cursor, setCursor] = useState(null);

  useEffect(() => {
    fetchSelectCategoriesData(selectCategories);
  }, [selectCategories]);

  const fetchSelectCategoriesData = (query) => {
    setLoading(true);
    fetchDataFromAPI(`search/?q=${query}`)
      .then((res) => {
        setSearchResults(res?.contents || []);
        setCursor(res?.cursorNext);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  const handleLoadMore = () => {
    setLoading(true);
    fetchDataFromAPI(`search/?q=${selectCategories}&cursor=${cursor}`)
      .then((res) => {
        setSearchResults((prevSearchResults) => [
          ...prevSearchResults,
          ...res?.contents,
        ]);
        setCursor(res?.cursorNext);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <Context.Provider
      value={{
        loading,
        setLoading,
        mobileMenu,
        setMobileMenu,
        selectCategories,
        setSelectCategories,
        searchResults,
        setSearchResults,
        handleLoadMore,
      }}
    >
      {children}
    </Context.Provider>
  );
};
