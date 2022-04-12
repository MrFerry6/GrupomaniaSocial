import logo from './logo.svg';
import './App.css';
import NewUserForm from './NewUserForm';
import React, { useEffect } from 'react'

function App() {
  const loginUrl = 'http://localhost:3001/api/auth/login'
  const singupUrl = 'http://localhost:3001/api/auth/singup'
  return (
    <NewUserForm  ></NewUserForm>
  );
}

export default App;
