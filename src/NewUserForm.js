
import { Form, Button, Container } from 'react-bootstrap';
import React, { useState } from 'react';


const NewUserForm = ({ isSingup }) => {
  const loginUrl = 'http://localhost:3001/api/auth/login'
  const singupUrl = 'http://localhost:3001/api/auth/signup'

  const [body, setBody] = useState([
    {
      email: '',
      password: ''
    }
  ]);
  function handleEmailChange(event) {
    setBody(
      {
        email: event.target.value,
        password: body.password
      });
  }
  function handlePasswordChange(event) {
    setBody(
      {
        email: body.email,
        password: event.target.value
      });
  }


  function handleSubmit() {
    const requestOptions = setRequestOptions(body);

    fetch(isSingup ? singupUrl : loginUrl, requestOptions)
      .then(response => response.text())
      .then((result) => {
        console.log('result; '+result);
        sessionStorage.setItem('session', result)
        window.location.reload(false);    
      })
      .catch(error => console.log('error', error));
  };
  return (
    <>
    <Container style={{ 
      marginTop:'2rem'
       }}>
    <Form>
      <Container>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label style={{  
                  fontSize:'medium',
                  fontWeight:'900',
                  color: 'rgb(229, 73, 17)'}}
                  >EMAIL ADDRESS</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={handleEmailChange}
         style={{  
          fontSize:'small',
          fontWeight:'700',
          color: 'black',}} />
      
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label style={{  
                  fontSize:'medium',
                  fontWeight:'900',
                  color: 'rgb(229, 73, 17)'}}
                  >PASSWORD</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={handlePasswordChange} />
      </Form.Group>
      <Button variant="primary" onClick={handleSubmit}
       style={{ 
         backgroundColor:'rgb(299, 73, 17)'
         
       }}>
        {isSingup ? 'SINGUP' : 'LOGIN'}
      </Button>
      </Container>
     
    </Form></Container></>
  )}

export default NewUserForm;

function setRequestOptions(body) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    email: body.email,
    password: body.password
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  return requestOptions;
}
