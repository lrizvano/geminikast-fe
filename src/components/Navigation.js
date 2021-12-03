import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import logo from "../geminikast-logo.png";

export default function Navigation() {
  return (
    <Navbar bg="secondary" expand="lg">
      <Navbar.Brand href="/" className="text-light">
        <img
          alt=""
          src={logo}
          width="30"
          height="30"
          className="d-inline-block align-top"
        />{" "}
        Geminikast
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/news" className="text-light">
            News
          </Nav.Link>
          <Nav.Link href="/reviews" className="text-light">
            Reviews
          </Nav.Link>
          <Nav.Link href="/about" className="text-light">
            About
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
