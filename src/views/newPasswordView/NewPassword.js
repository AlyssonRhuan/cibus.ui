import React, { useState, useEffect } from 'react';
import Loading from '../../components/Loading';
import Icons from '../../utils/IconsUtils';
import Toast from '../../components/Toast';
import Auth from '../../services/Auth';
import api from '../../services/api';
import './NewPassword.css';

const END_POINT = 'login';

function NewPassword() {
  const [password, setPassword] = useState({ pass: null, confirmPass: null });
  const [user, setUser] = useState({id: 1, pass: null});
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [loading, setLoading] = useState();

  async function sendNewPass(e) {
    setLoading(true)

    if(password.pass == password.confirmPass){
      try {
        setUser({id: 0, pass: password.pass});
        api.put(END_POINT, user).then(response => {
          Toast.success("Password reset!");
          Auth.onResetPassword();
        }).catch(err => {
          setLoading(false)
        })
      }
      catch (e) {
        error(e);
        setLoading(false)
      }
    }
    else {
      Toast.error('Passowrds doesn\'t match!');
      setInvalidPassword(true)
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
      <section className="logoCibus">
        <img src={Icons.Logo} />
        <h1>Cibus</h1>
      </section>
      {
        loading
          ? <Loading />
          : <section className="login">
            <h1>New password</h1>
            <form>
              {invalidPassword && <small className="form-text text-muted">Passowrds doesn't match!</small>}
              <input
                type="password"
                name="u"
                placeholder="Password"
                required
                onChange={event => setPassword({ ...password, pass: event.target.value })}
              />
              <input
                type="password"
                name="p"
                placeholder="Confirm password"
                required
                onChange={event => setPassword({ ...password, confirmPass: event.target.value })}
              />
              <button
                className="btn btn-primary btn-block btn-large"
                onClick={sendNewPass}
                disabled={!password.pass || !password.confirmPass}
              >
                Send
                  </button>
            </form>
          </section>
      }
    </main>
  );
}

export default NewPassword;
