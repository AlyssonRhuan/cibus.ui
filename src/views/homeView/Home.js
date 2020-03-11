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
    <main className="App col-12">
      <section style={{display: "flex", flexFlow: "column", justifyContent: "space-between", height:"100vh"}}>

        <div className="col-12 row justify-content-center align-items-center">
          {
            rotas && rotas.filter(
              rota => rota.path !== '/'
            ).map(
              (rota, key) => <a className="card_home col-2 mt-3 mx-1 pt-4" href={rota.path} key={key}>                
                <img className="icon_card" src={rota.iconHome}/>
                <h5 className="card-title">{rota.name}</h5>
              </a>
            )
          }
        </div>   

      </section>
    </main>
  );
}

export default Home;
