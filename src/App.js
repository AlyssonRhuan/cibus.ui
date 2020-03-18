import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoadingPaginaInteira from './components/LoadingPaginaInteira';
import SideBarMenu from './components/SidebarMenu';
import SwitchRotas from './components/SwitchRotas';
import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import LoginView from './views/loginView/Login';
import Toast from './components/Toast';
import Rotas from './services/Routes';

import Me from './services/Me';

// STORAGES
import AuthStorage from './storage/Auth.storage';
import MeStorage from './storage/Me.storage';
import RotasStorage from './storage/Rotas.storage';

// STYLES
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const MeContext = React.createContext();
  const RouterContext = React.createContext();

  const [rotas, setRotas] = useState();
  const [loading, setLoading] = useState();
  const [isAuth, setIsAuth] = useState();
  const [me, setMe] = useState();

  useEffect(() => {
    setLoading(true);
    setIsAuth(AuthStorage.isAuthenticated());
    setLoading(false);
  }, [])

  function onLogin(authorization, userId) {
    setLoading(true);
    AuthStorage.onLogin(authorization, userId)
      .then(response => {
        setIsAuth(true);

        Rotas().then(res => { setRotas(res); })
        Me().then(res => { setMe(res); })

      })
      .catch(err => {
        Toast.error(err.message)
        AuthStorage.onLogout();
        setIsAuth(false);
      })
      .finally(fin =>
        setLoading(false)
      )
  }

  function onLogout() {
    setLoading(true);
    setIsAuth(AuthStorage.isAuthenticated());
    setLoading(false);
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
            : <MeContext.Provider value={me}>
              <RouterContext.Provider value={rotas}>
                <Router>
                  <SideBarMenu rotas={rotas} onLogout={onLogout} />
                  <SwitchRotas rotas={rotas} onLogout={onLogout} />
                </Router>
              </RouterContext.Provider>
            </MeContext.Provider>
      }
    </section>
  );
}

export default App;