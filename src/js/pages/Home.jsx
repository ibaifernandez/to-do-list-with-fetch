import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate()
  const [show, setShow] = useState(false);

  const closeModal = () => setShow(false);
  const showModal = () => setShow(true);
  const navigateToLogin = () => navigate("/login");
  const navigateToSignup = () => navigate("/signup");

  return (
  <>  
    <div className="container-fluid my-5 w-50">
      <h1 className="h1 text-center">~ Task List Manager ~</h1>
      <div className="container-fluid my-4">
        <p className="lead text-center my-3">
          You're about to access to the most unbelievable Task List Manager of the whole World Wide Web!
        </p>
        <p className="lead text-center my-3">
          Click on the 'Get Started!' button so that we can begin!
        </p>
      </div>
      
      <Button className="btn btn-danger d-flex mx-auto my-4" onClick={showModal}>
        Get started!
      </Button>
    </div>
      <Modal
        show={show}
        onHide={closeModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Welcome!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you already registered as a Taks List Manager user?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={navigateToLogin}>
            Yes
          </Button>
          <Button variant="primary" onClick={navigateToSignup}>No</Button>
        </Modal.Footer>
      </Modal>
      </>
  );

render(<Example />);

};