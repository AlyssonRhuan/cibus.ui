import React, { useState, useEffect } from 'react';
import Rotas from '../../services/Routes';

function Home() {
  const [rotas, setRotas] = useState();

  useEffect(() => {        
    Rotas().then(res => {
      setRotas(res)
    });
  }, [])

  return (
    <main className="App col-12 pt-5">
      <section>
        <h1 className="display-4">{process.env.REACT_APP_APP_NAME}</h1>
        <div className="col-12 row justify-content-center">
          {
            rotas && rotas.filter(
              rota => rota.path !== '/' && rota.path !== '/me'
            ).map(
              (rota, key) => <a class="card_home col-2 mt-3 mx-1 pt-4" href={rota.path}>                
                <img className="icon_card" src={rota.iconHome}/>
                <h5 class="card-title">{rota.name}</h5>
              </a>
            )
          }
        </div>
      </section>
    </main>
  );
}

export default Home;
