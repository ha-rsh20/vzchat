import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";

function Footer() {
  let year = new Date().getFullYear();
  return (
    <div>
      <Navbar fixed="bottom" bg="dark" variant="dark">
        <div style={{ width: "100%", textAlign: "center", color: "white" }}>
          {year} - All Rights are Reserved!!!
        </div>
      </Navbar>
    </div>
  );
}

export default Footer;
