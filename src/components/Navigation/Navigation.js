import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import logo from '../../geminikast.jpg';
import { Link } from 'react-router-dom';

export default function Navigation() {
  return (
    <Navbar className="style.navbarContainer" expand="lg">
      <Navbar.Brand>
        <Link to="/">
          <img
            alt=""
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />
          {'Geminikast'}
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Link to="/podcast">Podcast</Link>
          <Link to="/reviews">Reviews</Link>
          <Link to="/about">About</Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
