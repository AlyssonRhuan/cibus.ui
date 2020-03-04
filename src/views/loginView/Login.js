import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import Loading from '../../components/Loading';
import Icons from '../../utils/IconsUtils';
import Toast from '../../components/Toast';
import api from '../../services/Api';
import './Login.css';

const END_POINT = 'login'

function Home() {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
    
  async function login(e) {
    setLoading(true)
    e.preventDefault();
    try {
      api.post(END_POINT, user).then(response => {
        Toast.success(`Welcome ${user.login}`)            
        const authorization = response.headers.authorization;
        const userId = response.headers.authorizationid;
        debugger
        localStorage.setItem("Authorization", authorization);
        localStorage.setItem("AuthorizationId", userId);
        window.location.href = '/';
      })
    }
    catch (e) {
      error(e);
      setLoading(false)
    }
  }

  function error(e) {
    Toast.error(e.response ? e.response.data.message : e.message);
    console.error(e.response ? e.response.data.message : e.message);
  }

  return (
    <main className="mainLogin">          
      <title>{process.env.REACT_APP_APP_TITLE}</title>
      <ToastContainer hideProgressBar/>     
      <section className="logoCibus">
        <img src={Icons.Logo} />
        <h1>Cibus</h1>
      </section>
      {
        loading
          ? <Loading/>
          : <section className="login">
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
        }
    </main>
  );
}

export default Home;
