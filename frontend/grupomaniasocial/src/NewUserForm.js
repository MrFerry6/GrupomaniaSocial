import { useEffect, useState } from "react";
import { Form, Button } from 'react-bootstrap';
import React from 'react';


const NewUserForm = ({ handleSubmit }) => {

  const [body, setBody] = useState([
    {
      email: '',
      password: ''
    }
  ]);
  function handleEmailChange(event) {
    setBody({ email: event.target.value });
  }
  function handlePasswordChange(event) {
    setBody({ password: event.target.value });
  }

  function handleSubmit(){
    fetch('http://localhost:3001/api/auth/signup', {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      body:JSON.stringify( body)})
    .then((res, req) => {
      console.log('Ole Ole')
    })
    .catch((error, res) => {
      console.log('Error: Fetch not sended')
      res.status(500).json({
        error
      })
    })

  };

  useEffect(() => {
    console.log('UseEffect working ')
  }, [body]);

  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={handleEmailChange} />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={handlePasswordChange} />
      </Form.Group>

      <Button variant="primary"  onClick={handleSubmit}>
        Submit
      </Button>
    </Form>);
}

export default NewUserForm;