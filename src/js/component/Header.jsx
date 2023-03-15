import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { Context } from "../context/ContextCreator.jsx";

export const Header = () => {
    const { username, serUsername } = useContext(Context);
    const location = useLocation();

    return (
        <Navbar collapseOnSelect expand="lg" className="bg-dark">
            <Container>
                <Navbar.Brand className="text-light">
                    Task List Manager
                </Navbar.Brand>
                <Nav className="ms-auto">
                    {location.pathname !== "/tasklist" ? (
                        <span className="text-light">Welcome, stranger!</span>
                    ) : (
                        <Nav.Link
                            className="text-light"
                            href="https://portfolio.ibaifernandez.com"
                        >
                            {username}
                        </Nav.Link>
                    )}
                </Nav>
            </Container>
        </Navbar>
    );
};
