import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Brand from "./Brand";

export default function Navigation() {
  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Brand />
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/reviews">Reviews</Nav.Link>
          <Nav.Link href="/news">News</Nav.Link>
          <Nav.Link href="/about">About</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
