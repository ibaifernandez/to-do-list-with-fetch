import React, { useState } from "react";

import { Context } from "./ContextCreator.jsx";

export const ContextProvider = ({ children }) => {
    const [username, setUsername] = useState("Ibai");
    console.log(username);

    return (
        <Context.Provider value={{username:username}}>
            {children}
        </Context.Provider>
    );
};