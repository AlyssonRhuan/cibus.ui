import React, { useState, useEffect } from 'react';
import GlobablConfig from '../../configs/Global'
import Rotas from '../../configs/Routes';
import './Login.css';
import Icons from '../../utils/IconsUtils'

function Home() {
  const [rotas, setRotas] = useState();

  useEffect(() => {        
    Rotas().then(res => {
      setRotas(res)
    });
  }, [])

  return (
    <main className="mainLogin">
      <section className="logoCibus">
        <img src={Icons.Logo} />
        <h1>Cibus</h1>
      </section>
      <section className="login">
        <h1>Login</h1>
        <form method="post">
          <input type="text" name="u" placeholder="Username" required="required" />
          <input type="password" name="p" placeholder="Password" required="required" />
          <button type="submit" className="btn btn-primary btn-block btn-large">Let me in.</button>
        </form>
      </section>
    </main>
  );
}

export default Home;
