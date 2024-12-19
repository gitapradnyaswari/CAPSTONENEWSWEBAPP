import { useSelector, useDispatch } from "react-redux";
import { Navbar, NewsCard } from "../components";
import { NEWS_REDUCER_CASES } from "../store/reducers";
import { Container, Row, Col } from "react-bootstrap";

function SavedNewsPage() {
  const savedNews = useSelector((state) => state.savedNews);
  const dispatch = useDispatch();

  return (
    <main>
      <Navbar />
      <Container className="mt-4">
        <h1 className="mb-4">Saved News</h1>
        <Row className="g-3">
          {savedNews.length > 0 ? (
            savedNews.map((n) => {
              const { _id } = n;

              return (
                <Col xs={12} sm={6} md={4} lg={3} key={_id}>
                  <NewsCard
                    headline={n.headline.main}
                    abstract={n.abstract}
                    web_url={n.web_url}
                    byline={n.byline}
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
      </Container>
    </main>
  );
}

export default SavedNewsPage;