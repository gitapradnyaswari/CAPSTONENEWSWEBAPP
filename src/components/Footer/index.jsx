import React from "react";
import { Container } from "react-bootstrap";

function Footer() {
  return (
    <footer
      className="bg-dark text-white py-4 mt-4"
      style={{
        marginTop: "auto", // Menjaga footer selalu di bawah
        width: "100%",
      }}
    >
      <Container className="text-center">
        <p>© 2024 News Web App. All rights reserved.</p>
      </Container>
    </footer>
  );
}

export default Footer;