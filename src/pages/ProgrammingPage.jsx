import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navbar, NewsCard } from "../components";
import { NEWS_REDUCER_CASES } from "../store/reducers";
import { fetchNews } from "../store/actions";
import { Container, Row, Col } from "react-bootstrap";

function ProgrammingPage() {
  const newsReducer = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    const query = {
      q: "Programming",
      fq: 'news_desk:("Technology")',
    };
    dispatch(fetchNews(query));
  }, [dispatch]);

  const isSaved = (newsId) => newsReducer.savedNews.some((news) => news._id === newsId);

  return (
    <main>
      <Navbar />
      <Container className="mt-4">
        <h1 className="mb-4">Programming News</h1>
        <Row className="g-3">
          {newsReducer.news.map((n) => {
            return (
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
            );
          })}
        </Row>
      </Container>
    </main>
  );
}

export default ProgrammingPage;