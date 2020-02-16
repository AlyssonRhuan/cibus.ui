import React, { useState, useEffect } from 'react';
import GlobablConfig from '../../configs/Global'
import Rotas from '../../configs/Rotas';

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
        <h1 className="display-4">Welcome to {GlobablConfig.AppName}</h1>
        <div className="col-12 row justify-content-between">
          {
            rotas && rotas.filter(
              rota => rota.caminho !== '/'
            ).map(
              (rota, key) => <a class="card_home col-4 mt-5" href={rota.caminho}>                
                <img className="icon_card" src={rota.iconHome}/>
                <h5 class="card-title">{rota.nome}</h5>
              </a>
            )
          }
        </div>
      </section>
    </main>
  );
}

export default Home;
