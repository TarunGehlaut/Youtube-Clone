import React, { useRef, useState } from "react";
import { SetTextAreaHeight } from "./SetTextAreaHeight";

const CommentInput = ({ handelInsertComment, comments }) => {
  const [isReplying, setIsReplying] = useState(false);
  const [item, setItem] = useState("");
  const textAreaContainer = useRef();

  const cancelInputHandler = () => {
    setIsReplying(false);
    SetTextAreaHeight(textAreaContainer.current, "48px", true);
  };

  const inputHandler = (e) => {
    const comment = e.target.value;
    if (comment.trim().length > 0) {
      setIsReplying(true);
      setItem(comment);
    } else {
      setIsReplying(false);
      SetTextAreaHeight(textAreaContainer.current, "48px", true);
    }
  };

  const onComment = () => {
    handelInsertComment(item, comments?.id);
  };

  return (
    <div className="flex flex-col mt-2 ">
      <div className="flex flex-row  relative">
        {/* img */}
        <div className="flex h-10 w-10 rounded-full overflow-hidden cursor-pointer ">
          <img
            className="w-full h-full"
            src="https://moodoffdp.com/wp-content/uploads/2023/04/Cute-Anime-Boy-DP-for-Whatsapp.jpg"
            alt="user"
          />
        </div>
        {/* text */}
        <div className="ml-3 flex-1 ">
          <textarea
            placeholder="Add a comment..."
            ref={textAreaContainer}
            onInput={(e) => {
              SetTextAreaHeight(e, "32px", false);
            }}
            onChange={(e) => inputHandler(e)}
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
            onClick={onComment}
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
