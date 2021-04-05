import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import logo from '../geminikast.jpg';

export default function Navigation() {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">
        <img
          alt=""
          src={logo}
          width="30"
          height="30"
          className="d-inline-block align-top"
        />
        {' Geminikast'}
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#link">Podcast</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
