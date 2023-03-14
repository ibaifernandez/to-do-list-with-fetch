import React, { useContext } from "react";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { Context } from "../context/ContextCreator.jsx";

export const Header = () => {
    const { username, serUsername } = useContext(Context);

    return (
        <Navbar collapseOnSelect expand="lg" className="bg-dark">
            <Container>
                <Navbar.Brand className="text-light">
                    Task List Manager
                </Navbar.Brand>
                <Nav className="ms-auto">
                    {username === "" ? (
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
