import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "../styles/index.css";

import { Layout } from "./Layout.jsx";
import { Home } from "./pages/Home.jsx";
import { Signup } from "./pages/Signup.jsx";
import { Login } from "./pages/Login.jsx";
import { TaskList } from "./pages/Tasklist.jsx";
import { ContextProvider } from "./context/ContextProvider.jsx";

const App = () => {
    return (
    <BrowserRouter>
        <ContextProvider>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/tasklist" element={<TaskList />} />
                </Route>
            </Routes>
        </ContextProvider>
    </BrowserRouter>
    );
}

ReactDOM.render(<App />, document.querySelector("#app"));
