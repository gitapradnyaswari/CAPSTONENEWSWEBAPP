import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Navbar, NewsCard } from "../components";
import { NEWS_REDUCER_CASES } from "../store/reducers";
import { fetchNews } from "../store/actions";
import { Container, Row, Col } from "react-bootstrap";

function SearchPage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const query = params.get("query");

  const newsReducer = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (query) {
      dispatch(fetchNews({ q: query }));
    }
  }, [query, dispatch]);

  const isSaved = (newsId) => newsReducer.savedNews.some((news) => news._id === newsId);

  return (
    <main>
      <Navbar />
      <Container className="mt-4">
        <h1 className="mb-4">Search Results for: {query}</h1>
        {newsReducer.news.length > 0 ? (
          <Row className="g-3">
            {newsReducer.news.map((n) => (
              <Col xs={12} sm={6} md={4} lg={3} key={n._id}>
                <NewsCard
                  headline={n.headline.main}
                  abstract={n.abstract}
                  web_url={n.web_url}
                  byline={n.byline}
                  isSaved={isSaved(n._id)}
                  onSave={() =>
                    dispatch({
                      type: NEWS_REDUCER_CASES.SAVE_NEWS,
                      news: n,
                    })
                  }
                  onUnsave={() =>
                    dispatch({
                      type: NEWS_REDUCER_CASES.REMOVE_NEWS,
                      news: n,
                    })
                  }
                />
              </Col>
            ))}
          </Row>
        ) : (
          <p>No search results found for "{query}".</p>
        )}
      </Container>
    </main>
  );
}

export default SearchPage;