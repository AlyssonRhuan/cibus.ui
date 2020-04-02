import React, { useState, useEffect } from 'react';
import Loading from '../../components/Loading';
import GoogleLogin from 'react-google-login';
import Toast from '../../components/Toast';
import Icons from '../../utils/IconsUtils';
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

  function googleLogin() {
    Toast.success('Google login')
  }

  const responseGoogle = (response) => {
    console.log(response)
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
            <h3>Welcome</h3>
            <form>
              {invalidEmail && <small className="form-text text-muted">This email is not valid!</small>}
              <input
                type="email"
                name="u"
                autocomplete="off"
                placeholder="Email"
                required
                onChange={event => setUser({ ...user, email: event.target.value })} />
              <input
                className="mb-0"
                type="password"
                name="p"
                autocomplete="off"
                placeholder="Password"
                required
                onChange={event => setUser({ ...user, pass: event.target.value })} />
              <button
                className="btn btn-info btn-block btn-large my-3"
                onClick={(e) => login(e)}
                disabled={!user.email || !user.pass}>
                Let me in.
              </button>
            </form>

            <p className="text-center">Or</p>

            <GoogleLogin
              className="btn btn-block display-flex justify-content-center"
              clientId="434223395402-301l8hmns2fd4m59cob4o7snporr2vuc.apps.googleusercontent.com"
              buttonText="Sign in with Google"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
            />

            <section className="mt-4 pt-3" style={{ borderTop: '1px solid rgba(158, 158, 158, .3)' }}>
              <p className="text-center font-weight-light"><a href='#'>Forgot password?</a></p>
              <p className="text-center">Don't have account? <a href='#'>Sign Up</a></p>
            </section>
          </section>
      }
    </main>
  );
}

export default Login;