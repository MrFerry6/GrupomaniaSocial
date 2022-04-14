import logo from './logo.svg';
import MainUser from './MainUser';
import React, { useEffect } from 'react'

function App() {
  const loginUrl = 'http://localhost:3001/api/auth/login'
  const singupUrl = 'http://localhost:3001/api/auth/singup'
  return (
    <MainUser></MainUser>
  );
}

export default App;
