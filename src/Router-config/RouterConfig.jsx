import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Feed from "../components/Feed";
import Header from "../components/Header";
import SearchResults from "../components/SearchResults";
import VideoDetails from "../components/VideoDetails";

const RouterConfig = () => {
  return (
    <BrowserRouter>
      <div className="flex flex-col h-full">
        <Header />
        <Routes>
          <Route path="/" element={<Feed />} exact />
          <Route
            path="/searchResult/:searchQuery"
            element={<SearchResults />}
          />
          <Route path="/video/:id" element={<VideoDetails />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default RouterConfig;
