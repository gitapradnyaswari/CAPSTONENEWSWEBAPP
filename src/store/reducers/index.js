export const NEWS_REDUCER_CASES = {
  INSERT_NEWS: "INSERT_NEWS",
  FETCHING_NEWS: "FETCHING_NEWS",
  DONE_FETCHING_NEWS: "DONE_FETCHING_NEWS",
  SAVE_NEWS: "SAVE_NEWS",
  REMOVE_NEWS: "REMOVE_NEWS",
  RESET_NEWS: "RESET_NEWS",
};

const newsState = {
  news: [],
  savedNews: [],
  loading: false,
  totalPages: 0,  // Menyimpan total halaman untuk pagination
  totalHits: 0,   // Menyimpan total berita yang ada
};

const newsReducer = (state = newsState, action) => {
  switch (action.type) {
    case NEWS_REDUCER_CASES.INSERT_NEWS: {
      console.log("#5 NEWS_REDUCER_CASES.INSERT_NEWS");
      return {
        ...state,
        news: action.news,
        loading: false,
        totalHits: action.totalHits,  // Menyimpan total berita yang didapat dari API
        totalPages: Math.ceil(action.totalHits / 10),  // Menghitung total halaman berdasarkan total berita
      };
    }
    case NEWS_REDUCER_CASES.FETCHING_NEWS: {
      console.log("#3 NEWS_REDUCER_CASES.FETCHING_NEWS");
      return {
        ...state,
        loading: true,
      };
    }
    case NEWS_REDUCER_CASES.DONE_FETCHING_NEWS: {
      console.log("#6 NEWS_REDUCER_CASES.DONE_FETCHING_NEWS");
      return {
        ...state,
        loading: false,
      };
    }
    case NEWS_REDUCER_CASES.SAVE_NEWS: {
      const isAlreadySaved = state.savedNews.some(
        (news) => news._id === action.news._id
      );
      if (isAlreadySaved) return state;
      return {
        ...state,
        savedNews: [...state.savedNews, action.news],
      };
    }
    case NEWS_REDUCER_CASES.REMOVE_NEWS: {
      const updatedSavedNews = state.savedNews.filter(
        (news) => news._id !== action.news._id
      );
      return {
        ...state,
        savedNews: updatedSavedNews,
      };
    }
    case NEWS_REDUCER_CASES.RESET_NEWS: {
      return {
        ...state,
        news: [],
        totalHits: 0,
      };
    }
    default:
      return state;
  }
};

export { newsReducer };