import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./store/index";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./error-page";
import HomePage from "./pages/HomePage";
import ProgrammingPage from "./pages/ProgrammingPage";
import CovidPage from "./pages/CovidPage";
import SavedNewsPage from "./pages/SavedNews";
import SearchPage from "./pages/SearchPage";

const routes = [
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/programming",
    element: <ProgrammingPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/covid-19",
    element: <CovidPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/saved",
    element: <SavedNewsPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/search",
    element: <SearchPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
];

const root = ReactDOM.createRoot(document.getElementById("root"));

const router = createBrowserRouter(routes);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();