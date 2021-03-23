import React from 'react';
import { useHistory } from "react-router-dom";
import { SiProbot } from 'react-icons/si'

function UnavailableService() {  
  let history = useHistory();

  function goToHome() {    
    history.push("/");
  }

  return (
    <main className="App col-12 pt-5">
      <section className="col-12">
        <h4>Ops, algo inesperado ocorreu!<br/>Estamos trabalhando para corrigir.</h4>
      </section>
      <section className="col-12 pt-5">        
        <h1 style={{fontSize: '150px'}}><SiProbot/></h1>
      </section>
      <section className="col-12 pt-5">
        <button onClick={() => goToHome()} className="btn btn-primary mb-2">Ir para o inicio</button>
      </section>
    </main>
  );
}

export default UnavailableService;