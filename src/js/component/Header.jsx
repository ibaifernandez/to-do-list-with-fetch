import React, { useContext } from "react";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { ContextProvider } from "../context/ContextProvider.jsx"

export const Header = () => {
  
  const { username } = useContext(ContextProvider);
  console.log("This is " + username)
  
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-dark">
      <Container>
        <Navbar.Brand className="text-light">Task List Manager</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Nav className="ms-auto">
            <Nav.Link className="text-light" eventKey={2} href="#">
              {username === undefined ? "Welcome!" : username }
            </Nav.Link>
          </Nav>
      </Container>
    </Navbar>
  );
}