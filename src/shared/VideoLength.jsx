import React from "react";

const VideoLength = ({ time }) => {
  function secondsToHMS(totalSeconds) {
    const hours = Math.floor((totalSeconds / 3600) % 24);
    const minutes = Math.floor((totalSeconds / 60) % 60);
    const seconds = Math.floor(totalSeconds % 60);

    return [hours, minutes, seconds]
      .map((value) => (value < 10 ? "0" + value : value))
      .filter((value, index) => value !== "00" || index > 0)
      .join(":");
  }

  return (
    <div className="absolute bottom-2 right-2 py-1 px-2 text-white text-xs bg-black rounded-md">
      {secondsToHMS(time)}
    </div>
  );
};

export default VideoLength;
