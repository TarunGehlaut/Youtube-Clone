import React, { useRef, useState } from "react";
import { SetTextAreaHeight } from "./SetTextAreaHeight";

const CommentInput = ({ onComment }) => {
  const [commentBody, setCommentBody] = useState("");
  const [isReplying, setIsReplying] = useState(false);
  const textAreaContainer = useRef();

  const cancelInputHandler = () => {
    setIsReplying(false);
    setCommentBody("");
    SetTextAreaHeight(textAreaContainer.current, "48px", true);
  };

  const inputHandler = (e) => {
    const comment = e.target.value;
    if (comment.length === 0) {
      setIsReplying(false);
      setCommentBody("");
      SetTextAreaHeight(textAreaContainer.current, "48px", true);
    } else {
      setCommentBody(comment);
      setIsReplying(true);
    }
  };

  const newComment = {
    0: {
      author: {
        avatar: {
          0: {
            url: "https://xsgames.co/randomusers/assets/avatars/female/20.jpg",
          },
        },
      },
      title: "Tarun Gehlaut",
      commentId: "UgwW1S95-KHLW2bUI-14AaABAg",
      content: commentBody,
      creatorHeart: false,
      pinned: null,
      publishedTimeText: "1 ]minx ago",
      stats: {
        replies: 0,
        votes: 0,
      },
    },
    comments: [],
  };

  return (
    <div className="flex flex-col mt-2 ">
      <div className="flex flex-row  relative">
        {/* img */}
        <div className="flex h-10 w-10 rounded-full overflow-hidden cursor-pointer ">
          <img
            className="w-full h-full"
            src="https://xsgames.co/randomusers/assets/avatars/female/20.jpg"
            alt="user"
          />
        </div>
        {/* text */}
        <div className="ml-3 flex-1 ">
          <textarea
            placeholder="Add a comment..."
            value={commentBody}
            ref={textAreaContainer}
            onInput={(e) => {
              SetTextAreaHeight(e, "32px", false);
            }}
            onChange={inputHandler}
            className="bg-inherit z-1  text-white text-base resize-none outline-none border-b-2  overflow-y-hidden border-zinc-400  w-full focus:border-white transition-all"
          />
        </div>
      </div>
      {/* comment and cancel button */}
      {isReplying && (
        <div className="flex flex-row justify-end gap-4 my-2 mr-4">
          <button
            className="text-sm text-white h-10  hover:bg-white/[0.5]  px-5 rounded-full cursor-pointer"
            onClick={(e) => cancelInputHandler(e)}
          >
            Cancel
          </button>
          <button
            onClick={() => onComment(newComment)}
            className="text-sm bg-[#303030] text-white/[0.7] h-10   rounded-full px-5  cursor-pointer "
          >
            Reply
          </button>
        </div>
      )}
    </div>
  );
};

export default CommentInput;
