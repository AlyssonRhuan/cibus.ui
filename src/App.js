import {BrowserRouter as Router, Switch, Route, NavLink } from "react-router-dom";
import NotFoundView from './views/notFoundView/NotFound';
import SidebarMenu from './components/SidebarMenu';
import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import LoginView from './views/loginView/Login';
import HomeView from './views/homeView/Home';
import Loading from './components/Loading';
import Icons from './utils/IconsUtils';
import Rotas from './services/Routes';

import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function PrivateRoute({children}) {
  return <Route>
      {
        React.createElement(children)
      }
    </Route>
}

async function getToken(){
  const token = await localStorage.getItem("Authorization");
  return token;
}

function App() {
  const [token, setToken] = useState();
  const [rotas, setRotas] = useState();
  
  function logout(){
    localStorage.removeItem("Authorization");  
    localStorage.removeItem("AuthorizationId");      
    setRotas(false);
    setToken(null);
  }

  useEffect(() => { 
    getToken().then(res => {
      setToken(res);
    });

    Rotas().then(res => {
      setRotas(res)
    });  
    
  }, [])

  return (  
    !token    
    ? <LoginView/>
    : !rotas
      ? <Loading/>
      : <Router>
          <title>{process.env.REACT_APP_APP_TITLE}</title>
          <ToastContainer hideProgressBar/>     
          {/* <SidebarMenu
            rotas={rotas}
            onLogout={logout}/> */}
            
          {
            <div className="sideBarMenu">    
                
              {/* LOGO */}
              <ul className="nav nav-pills flex-column">  
                <li>
                  <section className="nav-logo-link align-middle">                    
                    <img className="icon_small" src={Icons.LogoWhite}/>
                    <span>Cibus</span>
                  </section>
                </li>     
              </ul>


              {/* ANOTHER LINKS */}
              <ul className="nav nav-pills flex-column">     
                <li className="nav-item" >
                  <NavLink
                    exact = {true} 
                    activeClassName='active' 
                    className="nav-link align-middle"
                    to={"/"}>
                      <img className="icon_small" src={Icons.HomeWhite}/>
                      <span>Home</span>
                    </NavLink>
                </li>
                {
                  rotas && rotas.map(
                    (rota, key) => <li className="nav-item" key={key} >
                      <NavLink
                        exact = {true} 
                        activeClassName='active' 
                        className="nav-link align-middle"
                        to={rota && rota.path}>
                          <img className="icon_small" src={rota.icon}/>
                          <span>{rota.name}</span>
                        </NavLink>
                    </li>   
                  )
                }
                </ul>

                {/* LOGOUT */}
                <ul className="nav nav-pills flex-column">  
                  <li className="nav-item" >
                    <section className="nav-link align-middle" onClick={() => logout()}>                    
                      <img className="icon_small" src={Icons.LogoutWhite}/>
                      <span>Logout</span>
                    </section>
                  </li>                
              </ul>

            </div> 
          }

          {/* SWITCH DE ROTA */}
          <div className={`${token ? "ml-5" : ""}`}>
            <Switch>
              <Route exact path={"/"}>
                <HomeView/>
              </Route>
              {
                rotas && rotas.map(
                  (rota, key) => <PrivateRoute exact path={rota.path} key={key}>
                    { 
                      rota.view
                    }
                  </PrivateRoute>
                )              
              }  
              <Route>
                <NotFoundView/>
              </Route>
            </Switch>           
          </div>
        </Router>    
  );
}

export default App;
