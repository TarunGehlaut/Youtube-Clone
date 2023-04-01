import axios from "axios";

const BASE_URL = "https://youtube138.p.rapidapi.com";

const options = {
  method: "GET",
  url: "https://youtube138.p.rapidapi.com/auto-complete/",
  params: { hl: "en", gl: "US" },
  headers: {
    "X-RapidAPI-Key": process.env.REACT_APP_YOUTUBE_API_KEY,
    "X-RapidAPI-Host": "youtube138.p.rapidapi.com",
  },
};

const RATE_LIMIT_MS = 1000; // 1 request per second
let lastRequestTime = 0;

export const fetchDataFromAPI = async (url) => {
  // Wait until the rate limit allows the next request
  const now = Date.now();
  const elapsed = now - lastRequestTime;
  if (elapsed < RATE_LIMIT_MS) {
    await new Promise((resolve) =>
      setTimeout(resolve, RATE_LIMIT_MS - elapsed)
    );
  }

  try {
    const { data } = await axios.get(`${BASE_URL}/${url}`, options);
    lastRequestTime = Date.now();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
