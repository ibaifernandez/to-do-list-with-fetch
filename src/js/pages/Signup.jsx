import React, { useEffect, useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router";

import { Context } from "../context/ContextCreator.jsx";

export const Signup = () => {
    const navigate = useNavigate();

    const { username, setUsername } = useContext(Context);

    const handleUsername = (e) => {
        setUsername(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createUser(username);
    };

    const createUser = (username) => {
        fetch(`https://assets.breatheco.de/apis/fake/todos/user/${username}`, {
            method: "POST",
            body: JSON.stringify([]),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((resp) => {
                // console.log(resp.ok); // will be true if the response is successfull
                console.log(resp.status); // the status code = 200 or code = 400 etc.
                // console.log(resp); // will try return the exact result as string
                return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
            })
            .then((data) => {
                //here is were your code should start after the fetch finishes
                if (data.result) {
                    alert(
                        "User created succesfully. Your username is " +
                            username +
                            "."
                    );
                    // navigate("/tasklist");
                } else {
                    alert(
                        "This user already exists. please, log in. Click to be redirected to the login page."
                    );
                    // navigate("/tasklist");
                }
            })
            .catch((error) => {
                //error handling
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
                    What's gonna be your username?
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
