import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Navbar, NewsCard } from "../components";
import { NEWS_REDUCER_CASES } from "../store/reducers";
import { fetchNews } from "../store/actions";
import { Container, Row, Col } from "react-bootstrap";
import Footer from "../components/Footer";

function SearchPage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const query = params.get("query");

  const newsReducer = useSelector((state) => state);
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10
  const itemsToShow = 8;
  const groupSize = 3;
  const totalPages = Math.ceil(newsReducer.totalHits / itemsPerPage);

  useEffect(() => {
    if (query) {
      dispatch({ type: NEWS_REDUCER_CASES.RESET_NEWS });
      const searchQuery = {
        q: query,
        page: currentPage - 1,
      };
      dispatch(fetchNews(searchQuery));
    }
  }, [query, currentPage, dispatch]);  

  const isSaved = (newsId) => {
    return newsReducer.savedNews.some((news) => news._id === newsId);
  };

  const currentGroup = Math.ceil(currentPage / groupSize);
  const startPage = (currentGroup - 1) * groupSize + 1;
  const endPage = Math.min(startPage + groupSize - 1, totalPages);
  
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <main>
      <Navbar />
      <Container className="mt-4">
        <h1 className="mb-4" style={{ textAlign: 'center' }}>Search Results for: {query}</h1>
        {newsReducer.news.length > 0 ? (
          <>
            <Row className="g-3">
              {newsReducer.news.slice(0, itemsToShow).map((n) => {
                const { headline, abstract, web_url, byline, multimedia, _id } = n;
                return (
                  <Col xs={12} sm={6} md={4} lg={3} key={_id}>
                    <NewsCard
                      headline={headline.main}
                      abstract={abstract}
                      web_url={web_url}
                      byline={byline}
                      multimedia={multimedia}
                      newsId={_id}
                      isSaved={isSaved(_id)}
                      onSave={() => {
                        dispatch({
                          type: NEWS_REDUCER_CASES.SAVE_NEWS,
                          news: n,
                        });
                      }}
                      onUnsave={() => {
                        dispatch({
                          type: NEWS_REDUCER_CASES.REMOVE_NEWS,
                          news: n,
                        });
                      }}
                    />
                  </Col>
                );
              })}
            </Row>

            <nav aria-label="Page navigation">
              <ul className="pagination justify-content-center mt-4">
                {["Previous", ...Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i), "Next"].map((item, index) => {
                  const isPage = typeof item === "number";
                  const isDisabled =
                    (item === "Previous" && currentPage === 1) ||
                    (item === "Next" && currentPage === totalPages);
                  const isActive = isPage && item === currentPage;

                  return (
                    <li
                      key={index}
                      className={`page-item ${isDisabled ? "disabled" : ""} ${isActive ? "active" : ""}`}
                    >
                      <button
                        className="page-link"
                        onClick={() => {
                          if (!isDisabled) {
                            handlePageChange(
                              item === "Previous"
                                ? currentPage - 1
                                : item === "Next"
                                ? currentPage + 1
                                : item
                            );
                          }
                        }}
                        style={{
                          backgroundColor: isActive ? "#dcdcdc" : "white", // Abu-abu jika aktif
                          borderColor: "#ccc", // Border abu-abu
                          color: "black", // Teks hitam
                        }}
                      >
                        {isPage ? item : item}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </>
        ) : (
          <p>No search results found for "{query}".</p>
        )}
      </Container>
      <Footer />
    </main>
  );
}

export default SearchPage;