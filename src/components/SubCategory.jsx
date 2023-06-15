import React from "react";

const SubCategory = ({ text, action, className }) => {
  return (
    <div
      className={
        "text-base cursor-pointer  h-8 flex items-center  flex-shrink-0 px-3  md:px-4 mx-1  rounded-full mb-3 " +
        className
      }
      onClick={action}
    >
      <span className="w-max">{text}</span>
    </div>
  );
};

export default SubCategory;
