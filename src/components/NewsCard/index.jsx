import React from "react";
import { Card, Button } from "react-bootstrap";

const truncateChar = (text, maxLength = 150) => {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};

function NewsCard(props) {
  const { headline, abstract, web_url, byline, multimedia, onSave, onUnsave, isSaved } = props;

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

  // Select image from multimedia or fallback to a placeholder
  const imageUrl =
    multimedia && multimedia.length > 0
      ? `https://www.nytimes.com/${multimedia.find((media) => media.subtype === "xlarge")?.url || multimedia[0].url}`
      : "https://via.placeholder.com/300x200.png?text=No+Image";

  return (
    <Card className="h-100 d-flex flex-column shadow-sm border-0 rounded">
      <Card.Img
        variant="top"
        src={imageUrl}
        alt={headline}
        style={{
          height: "200px",
          objectFit: "cover",
          transition: "transform 0.3s ease",
          borderRadius: "10px",
        }}
        className="card-img-top"
      />
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

        <Card.Title className="fw-bold text-dark">{headline}</Card.Title>

        <Card.Text className="flex-grow-1 text-muted">{truncateChar(abstract)}</Card.Text>

        <Card.Text className="text-muted">By {byline?.original || "Unknown"}</Card.Text>

        <div className="mt-auto d-flex justify-content-between">
          {/* Teks Read More yang dapat diklik */}
          <span
            className="text-primary"
            style={{ cursor: "pointer", textDecoration: "underline" }}
            onClick={handleNewsPageClick}
          >
            Read More
          </span>
          <Button
            variant={isSaved ? "danger" : "success"}  // Change to 'success' for green
            size="sm"
            className="w-auto"  // Change to 'w-auto' for auto width
            onClick={() => {
              if (isSaved) {
                onUnsave && onUnsave();
              } else {
                onSave && onSave();
              }
            }}
            style={{
              transition: "background-color 0.3s, transform 0.3s",
              borderRadius: "5px",
            }}
          >
            {isSaved ? "Unsave" : "Save"}
          </Button>
        </div>
      </Card.Body>

      {/* Hover effect for Card */}
      <style jsx>{`
        .card:hover {
          transform: translateY(-10px);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .card-img-top:hover {
          transform: scale(1.05);
        }

        .btn:hover {
          transform: scale(1.05);
        }
      `}</style>
    </Card>
  );
}

export { NewsCard };