import React from "react";
import { useLocation } from "react-router-dom";

import favicon from "../../img/favicon.jpeg"

const Footer = () => {
    const location = useLocation();

    return (
        <div className="container mt-5">
            <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
                <p className="col-md-4 mb-0 text-dark">
                    &copy; 2022 Ibai Fernández, Inc.
                </p>

                <a
                    href="/"
                    className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
                >
                    <img
                        className=""
                        width="50"
                        height="50"
                        src={favicon}
                    />
                </a>
                {location.pathname === "/" ? null : (
                <a href="/" className="nav-link px-2 text-dark">
                    Go back to the beginning
                </a>    
                )}
            </footer>
        </div>
    );
};

export default Footer;