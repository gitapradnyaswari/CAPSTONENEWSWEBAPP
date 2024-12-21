import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navbar, NewsCard } from "../components";
import { NEWS_REDUCER_CASES } from "../store/reducers";
import { fetchNews } from "../store/actions";
import { Container, Row, Col } from "react-bootstrap";
import Footer from "../components/Footer";

function CovidPage() {
  const newsReducer = useSelector((state) => state);
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10
  const itemsToShow = 8;
  const groupSize = 3;
  const totalPages = Math.ceil(newsReducer.totalHits / itemsPerPage);

  useEffect(() => {
    const query = {
      q: "COVID-19",
      page: currentPage - 1,
    };
    dispatch(fetchNews(query));
  }, [dispatch, currentPage]);

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
        <h1 className="mb-4" style={{ textAlign: 'center' }}>COVID-19 News</h1>
        <Row className="g-3">
          {newsReducer.news.length > 0 ? (
            newsReducer.news.slice(0, itemsToShow).map((n) => { 
              const { _id } = n;
              return (
                <Col xs={12} sm={6} md={4} lg={3} key={_id}>
                  <NewsCard
                    headline={n.headline.main}
                    abstract={n.abstract}
                    web_url={n.web_url}
                    byline={n.byline}
                    multimedia={n.multimedia}
                    newsId={n._id}
                    isSaved={isSaved(n._id)}
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
            })
          ) : (
            <p>No news available</p>
          )}
        </Row>

        <nav aria-label="Page navigation">
          <ul className="pagination justify-content-center mt-4">
            {["Previous", ...Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i), "Next"].map((item, index) => {
              const isPage = typeof item === "number";
              const isDisabled =
                (!isPage && item === "Previous" && currentPage === 1) ||
                (!isPage && item === "Next" && currentPage === totalPages);
              const isActive = isPage && item === currentPage;

              const handleClick = () => {
                if (!isPage) {
                  handlePageChange(item === "Previous" ? currentPage - 1 : currentPage + 1);
                } else {
                  handlePageChange(item);
                }
              };

              return (
                <li
                  key={item}
                  className={`page-item ${isDisabled ? "disabled" : ""} ${isActive ? "active" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={handleClick}
                    style={{
                      backgroundColor: isActive ? "#dcdcdc" : "white",
                      borderColor: "#ccc",
                      color: isActive ? "black" : "black",
                    }}
                    disabled={isDisabled}
                  >
                    {isPage ? item : item}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </Container>
      <Footer />
    </main>
  );
}

export default CovidPage;