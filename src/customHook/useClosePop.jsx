import { useEffect } from "react";

const useClosePop = (setIsPopup) => {
  useEffect(() => {
    function handleEscapeKey(e) {
      if (e.key === "escape") {
        setIsPopup(false);
      }
    }

    function handleClickOutside(e) {
      if (e.target.id !== "popup") {
        setIsPopup(false);
      }
    }

    document.addEventListener("keydown", handleEscapeKey);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsPopup]);
};

export default useClosePop;
