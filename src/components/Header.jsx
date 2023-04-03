import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { fetchDataFromAPI } from "../utils/api";

import ytLogoMobile from "../images/yt-logo-mobile.png";
import ytLogo from "../images/yt-logo.png";

import { CgClose } from "react-icons/cg";
import { FaMicrophone } from "react-icons/fa";
import { FiBell } from "react-icons/fi";
import { RiVideoAddLine } from "react-icons/ri";
import { SlMenu } from "react-icons/sl";

import Loader from "../shared/Loader";

import { Context } from "../context/ContextApi";
import RealTimeSearchResults from "./RealTimeSearchResults";
import SearchBar from "./SearchBar";
import VoiceToText from "./VoiceToText";

const Header = () => {
  const { loading, mobileMenu, setMobileMenu } = useContext(Context);

  const [realTimeResults, setRealTimeResults] = useState([]);
  const [showRealTimeResults, setShowRealTimeResults] = useState(false);
  const { setLoading } = useContext(Context);
  const [showVoiceText, setShowVoiceText] = useState(false);

  const fetchRealTimeData = (searchQuery) => {
    setLoading(true);
    fetchDataFromAPI(`search/?q=${searchQuery}`).then((res) => {
      console.log(res);
      setRealTimeResults(res?.contents);
      setShowRealTimeResults(true);

      setLoading(false);
    });
  };

  const clearRealTimeResults = () => setRealTimeResults([]);

  const mobileMenuToggle = () => {
    setMobileMenu(!mobileMenu);
  };

  const { pathName } = useLocation();
  const pageName = pathName?.split("/")?.filter(Boolean)?.[0];

  return (
    <div className="bg-black">
      <header className="sticky top-0 h-14 z-10 flex flex-row items-center justify-between px-1 md:px-5 bg-black ">
        {loading && <Loader />}
        <div className="flex h-5 items-center">
          {pageName !== "video" && (
            <div
              className={`flex items-center justify-center cursor-pointer  md:mr-6 h-10 w-10 rounded-full hover:bg-[#3f3f3f]/[0.6]
           
            `}
              onClick={mobileMenuToggle}
            >
              {mobileMenu ? (
                <CgClose className="text-white text-xl" />
              ) : (
                <SlMenu className="text-white text-xl" />
              )}
            </div>
          )}
          <Link to="/" className="h-5 flex items-center">
            <img
              src={ytLogo}
              alt="Youtube"
              className="h-full hidden md:block"
            />
            <img
              src={ytLogoMobile}
              alt="Youtube"
              className="h-full md:hidden"
            />
          </Link>
        </div>
        <div className="flex flex-row relative">
          {!showVoiceText ? (
            <div className="flex flex-col relative">
              <SearchBar
                clearRealTimeResults={clearRealTimeResults}
                fetchRealTimeData={fetchRealTimeData}
                setShowRealTimeResults={setShowRealTimeResults}
              />
              {showRealTimeResults ? (
                <div className="bg-white h-[420px] pr-1  py-3  w-52 md:w-80 lg:w-[540px] absolute top-[60px] left-[20px] md:left-[60px] rounded-xl  z-50 ">
                  {realTimeResults?.map((item, index) => {
                    if (index > 10) return false;
                    return (
                      <RealTimeSearchResults
                        key={index}
                        video={item}
                        index={index}
                        action={() => setShowRealTimeResults(false)}
                      />
                    );
                  })}
                </div>
              ) : (
                ""
              )}
            </div>
          ) : (
            <VoiceToText setShowVoiceText={setShowVoiceText} />
          )}
          <div className="flex items-center justify-center cursor-pointer  md:mr-6 h-10 w-10 rounded-full hover:bg-[#3f3f3f]/[0.6]">
            <FaMicrophone
              onClick={() => setShowVoiceText(true)}
              className="text-white text-lg"
            />
          </div>
        </div>
        <div className="flex h-5 items-center justify-center">
          <div className="hidden md:flex">
            <div className="flex items-center justify-center h-10 w-10 rounded-full hover:bg-[#3f3f3f]/[0.6]">
              <RiVideoAddLine className="text-white text-xl cursor-pointer" />
            </div>
            <div className="flex items-center justify-center ml-2 h-10 w-10 rounded-full hover:bg-[#3f3f3f]/[0.6]">
              <FiBell className="text-white text-xl cursor-pointer" />
            </div>
          </div>
          <div className="flex md:ml-4 h-8 w-8 rounded-full overflow-hidden cursor-pointer">
            <img
              src="https://xsgames.co/randomusers/assets/avatars/female/20.jpg"
              alt="user"
            />
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
