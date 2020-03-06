import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import Loading from '../../components/Loading';
import Icons from '../../utils/IconsUtils';
import Toast from '../../components/Toast';
import api from '../../services/api';
import './Login.css';

import validateEmail from '../../utils/ValidateEmail.utils'

const END_POINT = 'login'

function Home() {
  const [user, setUser] = useState({email: null, pass: null});
  const [loading, setLoading] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false)

  async function login(e) {
    setLoading(true)
    setInvalidEmail(false);
    e.preventDefault();

    if (validateEmail(user.email)) {
      try {
        api.post(END_POINT, user).then(response => {
          Toast.success(`Welcome ${user.login}`)
          const authorization = response.headers.authorization;
          const userId = response.headers.authorizationid;

          localStorage.setItem("Authorization", authorization);
          localStorage.setItem("AuthorizationId", userId);
          window.location.href = '/';
        })
      }
      catch (e) {
        error(e);
      }
    } else {
      Toast.error('Email nao é valido');
      setInvalidEmail(true)
    }
    setLoading(false)

  }

  function error(e) {
    Toast.error(e.response ? e.response.data.message : e.message);
    console.error(e.response ? e.response.data.message : e.message);
  }

  return (
    <main className="mainLogin">
      <title>{process.env.REACT_APP_APP_TITLE}</title>
      <ToastContainer hideProgressBar />
      <section className="logoCibus">
        <img src={Icons.Logo} />
        <h1>Cibus</h1>
      </section>
      {
        loading
          ? <Loading />
          : <section className="login">
            <h1>Login</h1>
            <form>
              {invalidEmail && <small className="form-text text-muted">Invalid e-mail!</small>}
              <input
                type="email"
                name="u"
                placeholder="Email"
                required
                onChange={event => setUser({ ...user, email: event.target.value })}
              />
              <input
                type="password"
                name="p"
                placeholder="Password"
                required
                onChange={event => setUser({ ...user, pass: event.target.value })}
              />
              <button
                className="btn btn-primary btn-block btn-large"
                onClick={(e) => login(e)}
                disabled={!user.email || !user.pass}
              >
                Let me in.
                  </button>
            </form>
          </section>
      }
    </main>
  );
}

export default Home;
