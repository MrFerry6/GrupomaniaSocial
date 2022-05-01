import NewUserForm from './NewUserForm';
import PostPage from './PostPage';
import { Nav, Navbar, Container, Image } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import NavLogo from './NavbarLogo.png'
import '../src/MainUser.css'


const MainUser = () => {

  const [islogged, setIsLogged] = useState(false);
  const [isSingup, setSingup] = useState(true);

  const authUrl = 'http://localhost:3001/api/auth/auth'
  useEffect(() => {
    const token = window.localStorage.getItem('session')
    if (token) {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        token: window.localStorage.getItem('session')
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      fetch(authUrl, requestOptions)
        .then(response => response.text())
        .then((result) => {
          const user = JSON.parse(result);
          setIsLogged(user.logged);

        })
        .catch(error => console.log('error', error));
    }
  }, []
  );


  function setLoginMode() {
    setSingup(false);
  }
  function setSingupMode() {
    setSingup(true);
  }

  if (islogged === true) {
    return (
      <PostPage />
    )
  };
  if (islogged === false) {
    return (
      <>
      

        <header>

          <Navbar>
            <Container  >
              <Container>
              <Navbar.Brand href="#" >                
                <Image className='logo' src={NavLogo} alt="A company logo" 
                style={{  
                   width: '85%',
                  height: '100%' }}  />
              </Navbar.Brand>
              </Container>
              <Nav className="me-auto">
                <Nav.Link onClick={setSingupMode}>
                  <h4 className='navbar-link'>SINGUP</h4>
                </Nav.Link>
                <Nav.Link onClick={setLoginMode}>
                  <h4 className='navbar-link'>LOGIN</h4>
                </Nav.Link>
              </Nav>
            </Container>
          </Navbar>
        </header>

        <main>
          <NewUserForm isSingup={isSingup} />
        </main>

      </>
    )
  };

}

export default MainUser;