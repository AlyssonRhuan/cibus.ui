import {BrowserRouter as Router, Switch, Route, NavLink } from "react-router-dom";
import NotFoundView from './views/notFoundView/NotFound'
import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import LoginView from './views/loginView/Login';
import GlobablConfig from './configs/Global';
import Icons from './utils/IconsUtils';
import Rotas from './configs/Routes';

import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import api from "./services/api";
import { Nav } from "reactstrap";

function PrivateRoute({children}) {
  return <Route>
      {
        React.createElement(children)
      }
    </Route>
}

async function getToken(){
  const response = api.get('login');
  const token = await localStorage.getItem("Authorization");
  return token;
}

function App() {
  const [rotas, setRotas] = useState();
  const [token, setToken] = useState();

  useEffect(() => {        
    getToken().then(
      response => {
        setToken(response);
      }
    );

    Rotas().then(res => {
      setRotas(res)
    })
  }, [])

  return (  
    token  
    ? <Router>
      <title>{GlobablConfig.Title}</title>
      <ToastContainer />     
      
      {/* MENU LATERAL */}
      {
        token && <div>
          <div>
            <div className="sideBarMenu">       
              <ul className="nav nav-pills flex-column my-3">   
                <li className="nav-item" >
                  <section className="nav-link align-middle">                    
                    <img className="icon_medium" src={Icons.Logo}/>
                    <spam className="icon_span">Cibus</spam>
                  </section>
                </li>
                {
                  rotas && rotas.map(
                    (rota, key) => <li className="nav-item" key = {key} >
                      <NavLink
                        exact = {true} 
                        activeClassName='active' 
                        className="nav-link align-middle"
                        to={rota && rota.path}>
                          <img className="icon_medium" src={rota.icon}/>
                          <spam className="icon_span">{rota.name}</spam>
                        </NavLink>
                    </li>   
                  )
                }
                <li className="nav-item" >
                  <section className="nav-link align-middle">                    
                    <img className="icon_medium" src={Icons.LogoutWhite}/>
                    <spam className="icon_span">Logout</spam>
                  </section>
                </li>
              </ul>
            </div> 
          </div>
        </div>
      }

      {/* SWITCH DE ROTA */}
      <div className={`${token ? "ml-5" : ""}`}>
        <Switch>
          <Route exact path="/login">                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
            <LoginView/>
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
        </Switch> 
      </div>
    </Router>    
    : <LoginView/>
  );
}

export default App;
