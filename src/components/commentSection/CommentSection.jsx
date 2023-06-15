import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { fetchDataFromAPI } from "../..//utils/api";
import { Context } from "../../context/ContextApi";
import CommentInput from "./CommentInput";
import UsersComments from "./UsersComments";

import useTraverseTree from "../../customHook/useTraverseTree";

import { MdOutlineSort } from "react-icons/md";

const CommentSection = () => {
  const [showSort, setShowSort] = useState(false);
  const [sortMethod, setSortMethod] = useState("top");
  const { setLoading } = useContext(Context);

  const [comments, setComments] = useState([]);
  const [commentsDetails, setCommentsDetails] = useState(null);

  const { insertNode } = useTraverseTree();

  function handelInsertComment(item, commentID) {
    const finalTree = insertNode(comments, commentID, item);
    return finalTree;
  }

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

    if (fetchCommentsData.timeoutId) {
      clearTimeout(fetchCommentsData.timeoutId);
    }
    fetchCommentsData.timeoutId = setTimeout(() => {
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
    }, 500);
  };

  return (
    <div className="relative flex flex-col ">
      <div className="flex flex-row text-white text-md items-center font-semibold  cursor-pointer ">
        <span>{commentsDetails?.totalCommentsCount} Comments</span>
        <span
          onClick={() => setShowSort((prev) => !prev)}
          className="flex flex-col items-center  gap-2  "
        >
          <span className="flex flex-row gap-2">
            <MdOutlineSort className="text-2xl text-white flex flex-col  ml-12 md:ml-20 lg:ml-28 xl:ml-36" />
            Sort
          </span>
          {showSort && (
            <div className=" text-white w-32  overflow-hidden rounded-lg  z-10">
              <span
                onClick={() => handleSortMethodChange("top")}
                className={`hover:bg-white/[0.3] flex items-center justify-center px-1 py-2 cursor-pointer text-center text-sm z-10
            ${sortMethod === "top" ? "bg-white/[0.3]" : "bg-white/[0.15]"}
            `}
              >
                Top Comments
              </span>
              <span
                onClick={() => handleSortMethodChange("new")}
                className={`hover:bg-white/[0.4] flex items-center justify-center px-1 py-2 cursor-pointer text-center text-sm -z-10
            ${sortMethod === "new" ? "bg-white/[0.4]" : "bg-white/[0.15]"}
            `}
              >
                Newest First
              </span>
            </div>
          )}
        </span>
      </div>

      <CommentInput
        handelInsertComment={handelInsertComment}
        comments={comments}
      />

      {comments?.map((comment) => {
        return (
          <UsersComments
            key={comment.commentId}
            comment={comment}
            handelInsertComment={handelInsertComment}
          />
        );
      })}
    </div>
  );
};

export default CommentSection;
