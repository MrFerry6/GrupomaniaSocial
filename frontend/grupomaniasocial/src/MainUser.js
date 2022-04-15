import NewUserForm from './NewUserForm';
import { Nav, Navbar, Container } from 'react-bootstrap';
import React, { useState} from 'react';

const MainUser = () => {
  const loginUrl = 'http://localhost:3001/api/auth/login'
  const singupUrl = 'http://localhost:3001/api/auth/singup'
  const [isSingup, setSingup] = useState(true);
  function setLoginMode(){
    setSingup(false);
  }
  function setSingupMode(){
    setSingup(true);
  }

  return (
    <>
      <header>
        <Navbar bg="secondary" variant="light">
          <Container>
            <Navbar.Brand href="#home">GRUPOMANIA-SOCIAL</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link onClick={setSingupMode}>SINGUP</Nav.Link>
              <Nav.Link onClick={setLoginMode}>LOGIN</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </header>

      <main>
        <NewUserForm isSingup={isSingup} />
      </main>

    </>
  );

}

export default MainUser;
