import React, { useEffect, useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router";

import { Context } from "../context/ContextCreator.jsx";

export const Login = () => {
    const navigate = useNavigate();

    const { username, setUsername } = useContext(Context);

    const handleUsername = (e) => {
        setUsername(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        checkUser(username);
    };

    const checkUser = (username) => {
        fetch(`https://assets.breatheco.de/apis/fake/todos/user/${username}`, {
            method: "GET",
            body: JSON.stringify(),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((resp) => {
                return resp.json();
            })
            .then((data) => {
                alert("User " + username + " found!");
                navigate("/tasklist");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <Form className="w-25 mx-auto bg-light mt-5 p-4 min-width-300">
            <Form.Group
                className="mb-3 d-flex text-center flex-column justify-content-center"
                controlId="formBasicEmail"
            >
                <Form.Label className="fs-4 mb-5">
                    What's your username?
                </Form.Label>
                <Form.Control
                    className="w-75 mx-auto"
                    type="text"
                    placeholder="Enter username"
                    onChange={handleUsername}
                    value={username}
                />
            </Form.Group>

            <Button
                className="btn btn-primary d-flex justify-content-center text-center mx-auto w-75 mb-5"
                type="submit"
                onClick={handleSubmit}
            >
                Submit
            </Button>
        </Form>
    );
};
