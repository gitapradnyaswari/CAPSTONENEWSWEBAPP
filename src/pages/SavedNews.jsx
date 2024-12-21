import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navbar, NewsCard } from "../components";
import { NEWS_REDUCER_CASES } from "../store/reducers";
import { Container, Row, Col } from "react-bootstrap";
import Footer from "../components/Footer";

function SavedNewsPage() {
  const savedNews = useSelector((state) => state.savedNews);
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const groupSize = 3;
  const totalPages = Math.ceil(savedNews.length / itemsPerPage);

  const handlePageChange = (page) => {
    if (page < 1) {
      setCurrentPage(1);
    } else if (page > totalPages) {
      setCurrentPage(totalPages);
    } else {
      setCurrentPage(page);
    }
  };

  const currentGroup = Math.ceil(currentPage / groupSize);
  const startPage = (currentGroup - 1) * groupSize + 1;
  const endPage = Math.min(startPage + groupSize - 1, totalPages);

  const paginatedNews = savedNews.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  useEffect(() => {
    if (paginatedNews.length === 0 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }, [paginatedNews, currentPage]);

  return (
    <main>
      <Navbar />
      <Container className="mt-4">
        <h1 className="mb-4" style={{ textAlign: 'center' }}>Saved News</h1>
        <Row className="g-3">
          {paginatedNews.length > 0 ? (
            paginatedNews.map((n) => {
              const { _id } = n;
              return (
                <Col xs={12} sm={6} md={4} lg={3} key={_id}>
                  <NewsCard
                    headline={n.headline.main}
                    abstract={n.abstract}
                    web_url={n.web_url}
                    byline={n.byline}
                    multimedia={n.multimedia}
                    isSaved={true}
                    onUnsave={() =>
                      dispatch({
                        type: NEWS_REDUCER_CASES.REMOVE_NEWS,
                        news: n,
                      })
                    }
                  />
                </Col>
              );
            })
          ) : (
            <p>No saved news to display.</p>
          )}
        </Row>

        {savedNews.length > 0 && (
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
        )}
      </Container>

      {savedNews.length > 0 && <Footer />}
    </main>
  );
}

export default SavedNewsPage;