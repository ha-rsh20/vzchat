import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";

function Footer() {
  let year = new Date().getFullYear();
  return (
    <div>
      {console.log()}
      <Navbar fixed="bottom" bg="dark" variant="dark">
        <Container className="text-center text-muted">
          <Col lg={12} className="text-center text-light">
            {year} - All Rights are Reserved!!!
          </Col>
        </Container>
      </Navbar>
    </div>
  );
}

export default Footer;
