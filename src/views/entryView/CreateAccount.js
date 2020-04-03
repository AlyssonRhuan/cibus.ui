import React, { useState, useEffect } from 'react';
import Loading from '../../components/Loading';
import GoogleLogin from 'react-google-login';
import Toast from '../../components/Toast';
import Icons from '../../utils/IconsUtils';
import api from '../../services/api';

import validateEmail from '../../utils/ValidateEmail.utils';

const END_POINT = 'user';

function CreateAccount(props) {
  const [user, setUser] = useState({ email: null, pass: null });
  const [loading, setLoading] = useState();
  const [invalidEmail, setInvalidEmail] = useState(false)

  async function createAccount(e) {
    setLoading(true)
    setInvalidEmail(false);
    e.preventDefault();

    if (validateEmail(user.email)) {

      try {
        api.post(END_POINT, user).then(response => {
          Toast.success("Account created.");
          props.onSetView(1);
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

  const responseGoogleSuccess = (googleLogin) => {
    setLoading(true)
    const user = { email: googleLogin.Qt.zu, name: googleLogin.Qt.Ad, pass: googleLogin.Qt.dV }

    try {
      api.post(END_POINT, user).then(response => {
        Toast.success("Account created.");
        props.onSetView(1);
      })
    }
    catch (e) {
      error(e);
      setLoading(false)
    }
  }

  const responseGoogleError = (response) => {
    error(response)
  }

  function error(e) {
    Toast.error(e.response ? e.response.data.message : e.message);
    console.error(e.response ? e.response.data.message : e.message);
  }

  return (
    <section>
      {
        loading
          ? <Loading />
          : <section className="login">
            <h3>Create your account</h3>
            <form>
              {invalidEmail && <small className="form-text text-muted">This email is not valid!</small>}
              <input
                type="email"
                name="email"
                autocomplete="off"
                placeholder="Email"
                required
                onChange={event => setUser({ ...user, email: event.target.value })} />
              <input
                type="text"
                name="name"
                autocomplete="off"
                placeholder="Name"
                required
                onChange={event => setUser({ ...user, name: event.target.value })} />
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
                onClick={(e) => createAccount(e)}
                disabled={!user.email || !user.pass}>
                Create
              </button>
            </form>

            <p className="text-center">Or</p>

            <GoogleLogin
              className="btn btn-block display-flex justify-content-center"
              clientId="434223395402-301l8hmns2fd4m59cob4o7snporr2vuc.apps.googleusercontent.com"
              buttonText="Create with Google"
              onSuccess={responseGoogleSuccess}
              onFailure={responseGoogleError}
              cookiePolicy={'single_host_origin'}
            />

            <section className="mt-4 pt-3" style={{ borderTop: '1px solid rgba(158, 158, 158, .3)' }}>
              <p className="text-center">Already have account? <a href='#' onClick={() => props.onSetView(1)}>Sign In</a></p>
            </section>
          </section>
      }
    </section>
  );
}

export default CreateAccount;