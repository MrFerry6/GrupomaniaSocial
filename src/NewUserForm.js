
import { Form, Button, Container } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
const PasswordValidator = require('password-validator');

const NewUserForm = ({ isSingup }) => {
  const loginUrl = 'http://localhost:3001/api/auth/login'
  const singupUrl = 'http://localhost:3001/api/auth/signup'

  const [body, setBody] = useState([
    {
      email: '',
      password: ''
    }
  ]);
  const [disableButton, setDisableButton] = useState(true);

  useEffect(() => {
    if(validateEmail(body.email) && validatePassword(body.password)){
      setDisableButton(false);
    }
    if(!validateEmail(body.email) || !validatePassword(body.password)){
      setDisableButton(true);
    }


  }, [body])

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
        console.log('result; ' + result);
        sessionStorage.setItem('session', result)
        window.location.reload(false);
      })
      .catch(error => console.log('error', error));
  };

  function validateEmail(email) {
    if(email){
    return email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );}
    else{return false}
  };
  function validatePassword(password){
    var passShema = new PasswordValidator();
    passShema.is().min(8);
    passShema.is().max(25);
    passShema.has().uppercase();
    passShema.has().lowercase();
    passShema.has().not().spaces();
    return passShema.validate(password);
  }
  return (
    <>
      <Container style={{
        marginTop: '2rem'
      }}>
        <Form>
          <Container>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label style={{
                fontSize: 'medium',
                fontWeight: '900',
                color: 'rgb(124, 42, 12)'
              }}
              >EMAIL ADDRESS</Form.Label>
              <Form.Control type="email" placeholder="Enter email" onChange={handleEmailChange}
                style={{
                  fontSize: 'small',
                  fontWeight: '700',
                  color: 'black',
                }} />

            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label style={{
                fontSize: 'medium',
                fontWeight: '900',
                color: 'rgb(124, 42, 12)'
              }}
              >PASSWORD</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={handlePasswordChange} />
            </Form.Group>
            <Button variant="primary" onClick={handleSubmit} disabled={disableButton}
              style={
                disableButton ? {
                  backgroundColor: 'rgb(229, 190, 177)',
                  fontSize: 'small',
                  fontWeight: '700',
                  color: 'black',
              } : {                                        
                   backgroundColor: 'rgb(124, 42, 12)',
                   fontSize: 'small',
                  fontWeight: '700',
                  color: 'white', }
          }>
              {isSingup ? 'SINGUP' : 'LOGIN'}
            </Button>
          </Container>
        </Form></Container></>
  )
}

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
