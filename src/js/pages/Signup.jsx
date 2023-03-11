import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router";

export const Signup = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");

    const handleUsername = (e) => {
        setUsername(e.target.value);
        console.log(e.target.value)
        console.log(username)
    }

    const createUser = (username) => {
        console.log(username);
        fetch(`https://assets.breatheco.de/apis/fake/todos/user/${username}`, {
            method: "POST",
            body: JSON.stringify([]),
            headers: {
                "Content-Type": "application/json"
            },
            })
            .then(resp => {
                // console.log(resp.ok); // will be true if the response is successfull
                // console.log(resp.status); // the status code = 200 or code = 400 etc.
                // console.log(resp); // will try return the exact result as string
                return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
            })
            .then(data => {
                //here is were your code should start after the fetch finishes
                if (data.result) {
                    alert("User created succesfully. Your username is " + username + ".")
                    navigate("/tasklist")
                } else { 
                    alert("This user already exists. please, log in. Click to be redirected to the login page.")
                    navigate("/login")
                } 
                
            })
            .catch(error => {
                //error handling
                console.log(error);
            });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        createUser(username);
    }
    
    return (
        <Form className="w-50 mx-auto bg-light mt-5 p-5">
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>What's gonna be your username?</Form.Label>
                <Form.Control type="text" placeholder="Enter username" onChange={handleUsername} value={username} />
            </Form.Group>
        
              <Button variant="primary" type="submit" onClick={handleSubmit}>
                Submit
              </Button>
            </Form>
        );
    } 