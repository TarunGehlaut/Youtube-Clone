import { IoIosSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const RealTimeSearchResults = ({ video, action }) => {
  const navigate = useNavigate();
  let type = video?.type;

  const navigateHandler = () => {
    if (type === "video") {
      navigate(`/video/${video?.video?.videoId}`);
    } else {
      navigate(`/searchResult/${video?.channel?.title}`);
    }
  };
  return (
    <div
      onClick={() => {
        navigateHandler();
        action();
      }}
      className="flex flex-row items-center pl-1  md:pl-4 pr-2 py-2 cursor-pointer"
    >
      <span className="mr-2">
        <IoIosSearch className="text-xl text-black/[0.6]" />
      </span>
      <div className="text-black/[0.8] font-semibold text-base truncate">
        {video?.type === "channel" ? (
          <p className="text-sm text-black  truncate">
            {video?.channel?.title}
          </p>
        ) : (
          ""
        )}
        <p>{video?.video?.title}</p>
      </div>
    </div>
  );
};

export default RealTimeSearchResults;
