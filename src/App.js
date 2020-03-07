import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import LoginView from './views/loginView/Login';
import MainView from './views/mainView/Main';

import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

async function getToken(){
  const token = await localStorage.getItem("Authorization");
  return token;
}

function App() {
  const [token, setToken] = useState();  
  
  function onLogout(){
    localStorage.removeItem("Authorization");  
    localStorage.removeItem("AuthorizationId");      
    setToken(false);
  }
  
  function onLogin(authorization, userId){    
    localStorage.setItem("Authorization", authorization);
    localStorage.setItem("AuthorizationId", userId);  
    setToken(authorization);
  }

  useEffect(() => { 
    getToken().then(res => {
      setToken(res);
    });
  }, [])

  return ( 
    <main>      
      <ToastContainer hideProgressBar />
      {token && <MainView onLogout={onLogout}/> }
      {!token && <LoginView onLogin={onLogin}/>}
    </main>
  );
}

export default App;
