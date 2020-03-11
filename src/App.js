import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoadingPaginaInteira from './components/LoadingPaginaInteira';
import SideBarMenu from './components/SidebarMenu';
import SwitchRotas from './components/SwitchRotas';
import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import LoginView from './views/loginView/Login';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Toast from './components/Toast';
import Rotas from './services/Routes';
import Auth from './services/Auth';
import './App.css';

function App() {
  const [rotas, setRotas] = useState();
  const [loading, setLoading] = useState();
  const [isAuth, setIsAuth] = useState();

  useEffect(() => {
    setLoading(true);

    setIsAuth(Auth.isAuthenticated());
    Auth.isAuthenticated()
      ? Rotas()
        .then(res => {
          setRotas(res);
        })
        .catch(res => {
          Toast.error(res.message)
        })
        .finally(fin =>
          setLoading(false)
        )
      : setLoading(false);

  }, [])

  function onLogin() {
    setIsAuth(Auth.isAuthenticated());
  }

  function onLogout() {
    setIsAuth(Auth.isAuthenticated());
  }

  return (
    <section className="ml-5">
      <ToastContainer hideProgressBar />
      <title>{process.env.REACT_APP_APP_TITLE}</title>
      {
        loading
          ? <LoadingPaginaInteira />
          : !isAuth
            ? <LoginView onLogin={onLogin} />
            : <Router>
              <SideBarMenu rotas={rotas} onLogout={onLogout} />
              <SwitchRotas rotas={rotas} onLogout={onLogout} />
            </Router>
      }
    </section>
  );
}

export default App;