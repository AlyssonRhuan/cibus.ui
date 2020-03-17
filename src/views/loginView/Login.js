import React, { useState, useEffect } from 'react';
import Loading from '../../components/Loading';
import Icons from '../../utils/IconsUtils';
import Toast from '../../components/Toast';
import api from '../../services/api';
import './Login.css';

import validateEmail from '../../utils/ValidateEmail.utils';

const END_POINT = 'login';

function Login(props) {
  const [user, setUser] = useState({ email: null, pass: null });
  const [loading, setLoading] = useState();
  const [invalidEmail, setInvalidEmail] = useState(false)

  async function login(e) {
    setLoading(true)
    setInvalidEmail(false);
    e.preventDefault();

    if (validateEmail(user.email)) {

      try {
        api.post(END_POINT, user).then(response => {
          Toast.success("Welcome");
          const authorization = response.headers.authorization;
          const userId = response.headers.authorizationid;
          props.onLogin(authorization, userId);
        })
      }
      catch (e) {
        error(e);
        setLoading(false)
      }

    } else {
      Toast.error('This email is not valid!');
      setInvalidEmail(true)
    }
  }

  function error(e) {
    Toast.error(e.response ? e.response.data.message : e.message);
    console.error(e.response ? e.response.data.message : e.message);
  }

  return (
    <main className="mainLogin">
      <title>{process.env.REACT_APP_APP_TITLE}</title>
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
              {invalidEmail && <small className="form-text text-muted">This email is not valid!</small>}
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

export default Login;
