import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import LeftNavMenuItems from "../components/LeftNavMenuItems";
import { Context } from "../context/ContextApi";
import { categories } from "../utils/constants";

const LeftNav = () => {
  const { selectCategories, setSelectCategories, mobileMenu, setMobileMenu } =
    useContext(Context);

  const navigate = useNavigate();

  const categoryHandler = (name, type) => {
    switch (type) {
      case "home":
        return setSelectCategories(name);
      case "category":
        return setSelectCategories(name);
      case "menu":
        return false;
      default:
        break;
    }
  };

  return (
    <>
      <div
        className={`md:block w-[240px]  overflow-y-auto h-full py-4 bg-[#0f0f0f] fixed z-10  md:translate-x-0 transition-all ${
          mobileMenu ? "translate-x-0" : "translate-x-[-240px]"
        }`}
      >
        <div className="flex flex-col px-5">
          {categories.map((category, index) => {
            return (
              <React.Fragment key={index}>
                <LeftNavMenuItems
                  text={category.type === "home" ? "Home" : category.name}
                  icon={category.icon}
                  action={() => {
                    categoryHandler(category.name, category.type);
                    setMobileMenu(false);
                    navigate("/");
                  }}
                  className={`${
                    selectCategories === category.name ? "bg-white/[0.15]" : ""
                  }`}
                />
                {category.divider && <hr className="my-5 border-white/[0.2]" />}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {mobileMenu && (
        <div
          onClick={() => setMobileMenu(false)}
          className=" h-[100%-56] flex flex-grow  bg-[#dbdbdb] cursor-pointer md:hidden z-50"
        ></div>
      )}
    </>
  );
};

export default LeftNav;
