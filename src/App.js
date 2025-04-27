import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingPaginaInteira from './components/LoadingPaginaInteira';
import SideBarMenu from './components/SidebarMenu';
import SwitchRotas from './components/SwitchRotas';
import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import EntryView from './views/entryView/Entry';
import Toast from './components/Toast';
import Rotas from './services/Routes';
import Auth from "./storage/Auth.storage";
import ShopView from './views/shopView/Shop';
import NotFoundView from './views/notFoundView/NotFound';

// STORAGES
import AuthStorage from './storage/Auth.storage';

// STYLES
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [rotas, setRotas] = useState();
  const [loading, setLoading] = useState();
  const [isAuth, setIsAuth] = useState();
  const [isConfirmAccount, setIsConfirmAccount] = useState(false);
  const [userRole, setUserRole] = useState();

  useEffect(() => {    
    setLoading(true);
    setRotas(Rotas());
    
    AuthStorage.isAuthenticated().then(response => {
      setIsAuth(response);
      setLoading(false);
    });

  }, [])

  function onLogin(authorization, userId, userRole) {
    setLoading(true);
    AuthStorage.onLogin(authorization, userId, userRole)
      .then(response => {
        setIsAuth(true);
        setRotas(Rotas());
        setUserRole(userRole);
        console.log(userRole)
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
    setIsAuth(false);
    AuthStorage.onLogout();
    setLoading(false);
  }
  
  return (
    <section>
      <Router>
        <Routes>
          <Route exact path={"/"} element={<ShopView/>}/>
          <Route exact path={"/portal"} element={<EntryView/>}/>
          {
            rotas && rotas.map(
              (rota, key) =>  <Route path={rota.path} element={<rota.view/>}/>
            )
          }
          <Route element={NotFoundView}/>
        </Routes>
      </Router>


      
      {/* <ToastContainer hideProgressBar />
      <title>{process.env.REACT_APP_APP_TITLE}</title>
      {
        loading
          ? <LoadingPaginaInteira />
          : !isAuth
            ? <EntryView isConfirmedAccount={isConfirmAccount} onLogin={onLogin} />
            : <Router>
                  <SideBarMenu rotas={rotas} onLogout={onLogout} userRule={userRole}/>
                  <SwitchRotas rotas={rotas} onLogout={onLogout} userRule={userRole}/>
                </Router>      } */}
    </section>
  );
}

export default App;