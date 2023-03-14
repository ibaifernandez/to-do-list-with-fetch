import React, { useState, useContext } from "react";

import { Context } from "./ContextCreator.jsx";

export const ContextProvider = ({ children }) => {
    const [username, setUsername] = useState("");

    return (
        <Context.Provider
            value={{ username: username, setUsername: setUsername }}
        >
            {children}
        </Context.Provider>
    );
};
