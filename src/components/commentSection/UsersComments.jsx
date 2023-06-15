import React, { useEffect, useState } from "react";
import {
  AiFillCaretDown,
  AiFillCaretUp,
  AiFillDislike,
  AiFillLike,
  AiOutlineDislike,
  AiOutlineLike,
} from "react-icons/ai";
import { useParams } from "react-router-dom";

import { abbreviateNumber } from "js-abbreviation-number";
import { fetchDataFromAPI } from "../../utils/api";
import CommentInput from "./CommentInput";

const UsersComments = ({ comment, handelInsertComment }) => {
  const [showReply, setShowReply] = useState(false);
  const [commentReplies, setCommentReplies] = useState([]);
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);

  const { id } = useParams();

  let cursorReplies = "";
  if (comment?.cursorReplies) {
    const fullCursor = comment?.cursorReplies;
    cursorReplies = fullCursor?.replace(/%3D/g, "");
  }

  useEffect(() => {
    fetchCommentReplies();
  }, [showReply]);

  const fetchCommentReplies = () => {
    if (showReply) {
      if (fetchCommentReplies.timeoutId) {
        clearTimeout(fetchCommentReplies.timeoutId);
      }
      fetchCommentReplies.timeoutId = setTimeout(() => {
        fetchDataFromAPI(`video/comments/?id=${id}&cursor=${cursorReplies}`)
          .then((res) => {
            setCommentReplies(res?.comments);
          })
          .catch((err) => {
            console.log(err);
          });
      }, 500);
    }
  };

  const likeHandler = () => {
    setLike(!like);

    if (dislike) {
      setDislike(false);
    }
  };

  const dislikeHandler = () => {
    setDislike(!dislike);
    if (like) {
      setLike(false);
    }
  };

  const showReplyHandler = () => {
    setShowReply((prev) => !prev);
  };

 

  return (
    <div>
      <div className="flex text-white mt-4 items-start">
        <div className="flex items-start">
          <div className="flex h-10 w-10 rounded-full overflow-hidden">
            <img
              className="h-full w-full object-cover "
              src={comment?.author?.avatar?.[0]?.url}
              alt={comment?.author?.title}
              loading="lazy"
            />
          </div>
        </div>
        <div className="flex flex-col ml-2 ">
          <div className="flex flex-row  text-sm overflow-hidden items-center gap-2">
            <span className=" font-semibold   text-white  ">
              {comment?.author?.title}
            </span>
            <span className=" font-semibold   text-white/[0.7]">
              {comment?.publishedTimeText}
            </span>
          </div>
          <div className="text-sm text-white font-semibold mt-[2px]">
            {comment?.content}
          </div>
          <div className="flex flex-row mt-3 items-center">
            {like ? (
              <AiFillLike
                onClick={likeHandler}
                className="text-xl text-white mr-1 cursor-pointer"
              />
            ) : (
              <AiOutlineLike
                onClick={likeHandler}
                className="text-xl text-white mr-1 cursor-pointer"
              />
            )}

            {comment?.stats?.replies > 1 &&
              abbreviateNumber(comment?.stats?.votes, 2)}

            {dislike ? (
              <AiFillDislike
                onClick={dislikeHandler}
                className="text-xl text-white ml-3 cursor-pointer"
              />
            ) : (
              <AiOutlineDislike
                onClick={dislikeHandler}
                className="text-xl text-white ml-3 cursor-pointer"
              />
            )}
            <span className="text-sm text-white ml-5 cursor-pointer">
              Reply
            </span>
          </div>
        </div>
      </div>
      <div className="mt-2  ml-8">
        {comment?.stats?.replies > 0 && (
          <div
            onClick={showReplyHandler}
            className="flex flex-row gap-1 items-center ml-10   text-[#3ea6ff] w-max px-4 py-2 rounded-full hover:bg-[#263850] cursor-pointer "
          >
            <span className="mt-[2px]">
              {showReply ? (
                <AiFillCaretUp className="text-xl text-[#3ea6ff]" />
              ) : (
                <AiFillCaretDown className="text-xl text-[#3ea6ff]" />
              )}
            </span>
            <span>{abbreviateNumber(comment?.stats?.replies, 2)} Replies</span>
          </div>
        )}
        {showReply && (
          <>
            <CommentInput
              comments={comment}
              handelInsertComment={handelInsertComment}
            />
            {commentReplies?.map((comment) => {
              return (
                <UsersComments key={comment.commentId} comment={comment} />
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default UsersComments;
