import NewUserForm from './NewUserForm';
import PostPage from './PostPage';
import { Nav, Navbar, Container } from 'react-bootstrap';
import React, { useState, useEffect} from 'react';



const MainUser = () => {

  const [islogged, setIsLogged] = useState(false); 

  const authUrl = 'http://localhost:3001/api/auth/auth'
  useEffect(() => {
     console.log('UseEffect working ')
     var myHeaders = new Headers();
     myHeaders.append("Content-Type", "application/json");
   
     var raw = JSON.stringify({
       token: window.sessionStorage.getItem('token')
     });
   
     var requestOptions = {
       method: 'POST',
       headers: myHeaders,
       body: raw,
       redirect: 'follow'
     };

     fetch(authUrl , requestOptions)
     .then(response => response.text())
     .then((result) => {
        const user = JSON.parse(result);
        setIsLogged(user.logged);
        console.log(islogged);
        console.log(user)          
     })
     .catch(error => console.log('error', error));
   });


  const [isSingup, setSingup] = useState(true);
  function setLoginMode(){
    setSingup(false);
  }
  function setSingupMode(){
    setSingup(true);
  }
  console.log('Cagon dios '+islogged)
  if(islogged === true){
  return (
    <PostPage/>
  )};
  if(islogged === false){
    return(
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
    )
  };
  
}

export default MainUser;
 /* const signedBody = {
    token : sessionStorage.getItem('token')
  }
  const signedRequetOptions = setRequestOptions(signedBody);
  fetch(authUrl, signedRequetOptions)
  .then(result =>{
    console.log(result);
  })*/