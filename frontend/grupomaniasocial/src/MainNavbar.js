import { Nav, Navbar, Container } from 'react-bootstrap';
import React, { useState} from 'react';

const MainNavbar = ({ isSingup}) => {
  const loginUrl = 'http://localhost:3001/api/auth/login'
  const singupUrl = 'http://localhost:3001/api/auth/singup'
  const [isSingup, setSingup] = useState(true);
  function setLoginMode(){
    setSingup(false);
    console.log(isSingup)
  }
  function setSingupMode(){
    setSingup(true);
    console.log(isSingup)
  }


  return (
    <Navbar bg="secondary" variant="light">
      <Container>
        <Navbar.Brand href="#home">GRUPOMANIA-SOCIAL</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link onClick={setSingupMode}>SINGUP</Nav.Link>
          <Nav.Link onClick={setLoginMode}>LOGIN</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default MainNavbar;