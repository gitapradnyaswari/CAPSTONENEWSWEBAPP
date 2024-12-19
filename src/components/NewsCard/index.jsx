import React from "react";
import { Card, Button } from "react-bootstrap";

const truncateChar = (text, maxLength = 150) => {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};

function NewsCard(props) {
  const { headline, abstract, web_url, byline, onSave, onUnsave, isSaved } = props;

  const handleNewsPageClick = () => {
    try {
      const url = new URL(web_url);
      window.open(url.href, "_blank");
    } catch (e) {
      console.warn("Invalid web_url:", web_url);
      alert("The source URL is not valid or not available.");
    }
  };

  const getDomainName = (url) => {
    try {
      const domain = new URL(url).hostname;
      return domain.replace("www.", "");
    } catch (e) {
      return "";
    }
  };

  return (
    <Card className="h-100 d-flex flex-column">
      <Card.Body className="d-flex flex-column">
        <Card.Subtitle className="mb-2 text-muted">
          <a
            href={web_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-decoration-none text-dark"
          >
            {getDomainName(web_url)}
          </a>
        </Card.Subtitle>

        <Card.Title>{headline}</Card.Title>

        <Card.Text className="flex-grow-1">{truncateChar(abstract)}</Card.Text>

        <Card.Text className="text-muted">By {byline?.original || "Unknown"}</Card.Text>

        <div className="mt-auto d-flex justify-content-between">
          <Button variant="primary" size="sm" className="w-50 me-2" onClick={handleNewsPageClick}>
            News Page
          </Button>
          <Button
            variant={isSaved ? "danger" : "success"}
            size="sm"
            className="w-50"
            onClick={() => {
              if (isSaved) {
                onUnsave && onUnsave();
              } else {
                onSave && onSave();
              }
            }}
          >
            {isSaved ? "Unsave" : "Save"}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export { NewsCard };