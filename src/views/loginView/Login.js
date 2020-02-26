import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import Icons from '../../utils/IconsUtils';
import Toast from '../../components/Toast';
import api from '../../services/api';
import './Login.css';

const END_POINT = 'login'

function Home(props) {
  const [user, setUser] = useState();
  
  async function login(e) {
    e.preventDefault();
    try {
      api.post(`http://localhost:8080/${END_POINT}`, user).then(response => {
        Toast.success(`Welcome ${user.login}`)            
        const authorization = response.headers.authorization;
        localStorage.setItem("Authorization", authorization);
        window.location.href = '/';
      })
    }
    catch (e) {
      debugger
      error(e);
    }
  }

  function error(e) {
    Toast.error(e.response ? e.response.data.message : e.message);
    console.error(e.response ? e.response.data.message : e.message);
  }

  return (
    <main className="mainLogin">      
      <ToastContainer />     
      <section className="logoCibus">
        <img src={Icons.Logo} />
        <h1>Cibus</h1>
      </section>
      <section className="login">
        <h1>Login</h1>
        <form>
          <input 
            type="text" 
            name="u" 
            placeholder="Username" 
            required
            onChange={event => setUser({...user, login:event.target.value})}
          />
          <input 
            type="password" 
            name="p" 
            placeholder="Password" 
            required
            onChange={event => setUser({...user, pass:event.target.value})}
          />
          <button className="btn btn-primary btn-block btn-large" onClick={(e) => login(e)}>Let me in.</button>
        </form>
      </section>
    </main>
  );
}

export default Home;
