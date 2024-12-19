import qs from "qs";
import { NEWS_REDUCER_CASES } from "../reducers";

const BASE_API_URL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";

export function fetchNews(query) {
  return async function (dispatch) {
    console.log("#2 fetchNews() - Start fetching news");

    const apiKey = process.env.REACT_APP_API_KEY;
    if (!apiKey) {
      console.error("API Key is missing! Make sure REACT_APP_API_KEY is set in your .env file.");
      return;
    }

    try {
      dispatch({ type: NEWS_REDUCER_CASES.FETCHING_NEWS });

      const queryString = qs.stringify(
        {
          ...query,
          "api-key": apiKey,
        },
        { encode: true }
      );

      console.log("#4 fetch api NY TIMES - Sending request");
      const response = await fetch(`${BASE_API_URL}?${queryString}`);

      const responseJSON = await response.json();

      if (!response.ok) {
        throw new Error(`Error fetching news: ${responseJSON.message}`);
      }

      console.log("#5 fetch api NY TIMES - Response received:", responseJSON);

      dispatch({
        type: NEWS_REDUCER_CASES.INSERT_NEWS,
        news: responseJSON.response.docs,
      });
    } catch (error) {
      console.error("[fetchNews Error]:", error.message || error);
    } finally {
      dispatch({ type: NEWS_REDUCER_CASES.DONE_FETCHING_NEWS });
    }
  };
}