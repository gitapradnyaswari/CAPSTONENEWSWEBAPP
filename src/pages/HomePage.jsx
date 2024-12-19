import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navbar, NewsCard } from "../components";
import { fetchNews } from "../store/actions";
import { Container, Row, Col } from "react-bootstrap";
import { NEWS_REDUCER_CASES } from "../store/reducers";

function HomePage() {
  const newsReducer = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    const query = {
      fq: `glocations:("Indonesia")`,
    };
    dispatch(fetchNews(query));
  }, [dispatch]);

  const isSaved = (newsId) => {
    return newsReducer.savedNews.some((news) => news._id === newsId);
  };

  return (
    <main>
      <Navbar />
      <Container className="mt-4">
        <h1 className="mb-4">Main News</h1>
        <Row className="g-3">
          {newsReducer.news.length > 0 ? (
            newsReducer.news.map((n) => {
              const { headline, abstract, web_url, byline, _id } = n;
              return (
                <Col xs={12} sm={6} md={4} lg={3} key={_id}>
                  <NewsCard
                    headline={headline.main}
                    abstract={abstract}
                    web_url={web_url}
                    byline={byline}
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
            })
          ) : (
            <p>No news available</p>
          )}
        </Row>
      </Container>
    </main>
  );
}

export default HomePage;