import React, { createContext, useEffect, useState } from "react";

import { fetchDataFromAPI } from "../utils/api";

export const Context = createContext();

export const AppContext = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [selectCategories, setSelectCategories] = useState("New");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetchSelectCategoriesData(selectCategories);
  }, [selectCategories]);

  const fetchSelectCategoriesData = (query) => {
    setLoading(true);
    fetchDataFromAPI(`search/?q=${query}`).then(({ contents }) => {
      console.log(contents);
      setSearchResults(contents);
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
      }}
    >
      {children}
    </Context.Provider>
  );
};
