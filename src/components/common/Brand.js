import React from "react";
import logo from "../../geminikast-logo.svg";
import Navbar from "react-bootstrap/Navbar";

export default function Brand(props) {
  return (
    <Navbar.Brand href="/" className="text-info">
      <img
        alt=""
        src={logo}
        width="40"
        height="40"
        className="d-inline-block"
      />{" "}
      The Geminikast
    </Navbar.Brand>
  );
}
