import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SideBarMenu from './components/SidebarMenu';
import SwitchRotas from './components/SwitchRotas';
import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Loading from './components/Loading';
import Rotas from './services/Routes';
import './App.css';

function App() {
  const [rotas, setRotas] = useState();
  const [loading, setLoading] = useState();

  useEffect(() => {
    setLoading(true);
    Rotas().then(res => {
      setRotas(res)
      setLoading(false);
    });
  }, [])

  return (
    <section className="ml-5">
      <ToastContainer hideProgressBar />
      <title>{process.env.REACT_APP_APP_TITLE}</title>

      {
        loading
          ? <Loading />
          : <Router>
            <SideBarMenu rotas={rotas} />
            <SwitchRotas rotas={rotas} />
          </Router>
      }
    </section>
  );
}

export default App;