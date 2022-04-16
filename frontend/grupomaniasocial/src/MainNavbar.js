import { Nav, Navbar, Container } from 'react-bootstrap';
import React, { useState} from 'react';

const MainNavbar = ({ isSingup}) => {
  const [isSingup, setSingup] = useState(true);
  function setLoginMode(){
    setSingup(false);
  }
  function setSingupMode(){
    setSingup(true);
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