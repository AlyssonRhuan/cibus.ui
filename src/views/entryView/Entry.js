import React, { useState, useEffect } from 'react';
import Icons from '../../utils/IconsUtils';
import Toast from '../../components/Toast';
import api from '../../services/api';

const END_POINT = 'login';

function Entry(props) {
  const [user, setUser] = useState({ login: null, pass: null });
  const [loading, setLoading] = useState();
  const [invalidEmail, setInvalidEmail] = useState(false)

  async function login(e) {
    setLoading(true)
    e.preventDefault();

    try {
      api.post(END_POINT, user).then(response => {
        Toast.success("Welcome");
        const authorization = response.headers.authorization;
        const userId = response.headers.authorizationid;
        const userRole = response.headers.authorizationrole;
        props.onLogin(authorization, userId, userRole);
      })
        .catch(e => {
          error(e);
          setLoading(false)
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

  const [view, setView] = useState(1);

  useEffect(() => {
    const locationHref = window.location.href;

    if (locationHref.includes("confirmAccount")) {
      const urlParams = new URLSearchParams(window.location.search);
      const userId = urlParams.get('i');

      api.put('login/account/' + userId)
        .then(res => {
          window.location.href = window.location.origin;
        })
    }

  }, [])

  return (
    <main style={{ marginLeft: '-48px' }}>

      <title>{process.env.REACT_APP_APP_TITLE}</title>

      <section className='row col-12 mx-0' style={{ height: '100vh', background: '#19222b', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <section className='' style={{ width: '350px', height: '350px', background: '#fff', borderRadius: '10px' }}>

          <section className="col-12 row mx-0 my-3">

            <section className='row col-12 pb-3 justify-content-center'>
              <img src={Icons.Logo} height='60px' />
              <section className='pt-2'>
                <h2>Cibus</h2>
              </section>
            </section>

            <form className="col-12">
              <div className="mb-3">
                <label for="login" className="form-label">Usuário</label>
                <input type="text" className="form-control" id="login" aria-describedby="userHelp" required
                  onChange={event => setUser({ ...user, login: event.target.value })} />
              </div>
              <div className="mb-3">
                <label for="password" className="form-label">Senha</label>
                <input type="password" className="form-control" id="password" required
                  onChange={event => setUser({ ...user, pass: event.target.value })} />
              </div>
              <button type="submit" className="btn btn-primary col-12"
                onClick={(e) => login(e)} disabled={!user.login || !user.pass}>Entrar</button>
            </form>

          </section>

        </section>
      </section>

    </main>
  );
}

export default Entry;