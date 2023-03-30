import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { fetchDataFromAPI } from "../..//utils/api";
import { Context } from "../../context/ContextApi";

import { MdOutlineSort } from "react-icons/md";

const CommentSection = () => {
  const [showSort, setShowSort] = useState(false);
  const [sortMethod, setSortMethod] = useState("top");
  const { setLoading, mobileMenu } = useContext(Context);

  const [comments, setComments] = useState([]);
  const [commentsDetails, setCommentsDetails] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    fetchCommentsData();
  }, [sortMethod]);

  let cursorFilter = "";

  const handleSortMethodChange = (method) => {
    setSortMethod(method);
    setShowSort(false);
  };

  const fetchCommentsData = () => {
    setLoading(true);

    if (sortMethod === "top") {
      cursorFilter =
        "Eg0SC2RJVThzWnN6bVI4GAYyJSIRIgtkSVU4c1pzem1SODAAeAJCEGNvbW1lbnRzLXNlY3Rpb24";
    } else if (sortMethod === "new") {
      cursorFilter =
        "Eg0SC2RJVThzWnN6bVI4GAYyJSIRIgtkSVU4c1pzem1SODABeAJCEGNvbW1lbnRzLXNlY3Rpb24";
    }

    try {
      fetchDataFromAPI(`video/comments/?id=${id}&cursor=${cursorFilter}`)
        .then((res) => {
          setComments(res?.comments);
          setCommentsDetails(res);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } catch (err) {
      console.log(err);
    }
  };

  console.log(comments);

  return (
    <div className="relative">
      <div className="flex flex-row text-white text-md items-center font-semibold gap-10 cursor-pointer ">
        <span>{commentsDetails?.totalCommentsCount} Comments</span>
        <span
          onClick={() => setShowSort((prev) => !prev)}
          className="flex flex-row items-center  gap-2  "
        >
          <MdOutlineSort className="text-2xl text-white " />
          Sort
        </span>
      </div>
      {showSort && (
        <div className="flex flex-col text-white w-32  overflow-hidden rounded-lg absolute left-[116px] top-8">
          <span
            onClick={() => handleSortMethodChange("top")}
            className={`hover:bg-white/[0.4] flex items-center justify-center px-2 py-4 cursor-pointer text-center first-letter:
            ${sortMethod === "top" ? "bg-white/[0.4]" : "bg-white/[0.15]"}
            `}
          >
            Top Comments
          </span>
          <span
            onClick={() => handleSortMethodChange("new")}
            className={`hover:bg-white/[0.4] flex items-center justify-center px-2 py-4 cursor-pointer text-center
            ${sortMethod === "new" ? "bg-white/[0.4]" : "bg-white/[0.15]"}
            `}
          >
            Newest First
          </span>
        </div>
      )}
      <div>
        {/* {comments.map((item) => {
          return (
            <p key={item?.commentId} className="text-white text-md">
              {item}
            </p>
          );
        })} */}
      </div>
    </div>
  );
};

export default CommentSection;
