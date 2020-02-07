import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Switch, Route, NavLink, Link } from "react-router-dom";
import Rotas from './configs/Rotas'
import GlobablConfig from './configs/Global'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [menuAtivo, setMenuAtivo] = useState(false);

  useEffect(() => {    

  }, [])

  return (    
    <Router>
      <div className="container-fluid">
        <div className="row">   
        
          <ToastContainer />     

          {/* BARRA SUPERIOR */}
          <header style={{color:'white'}} className="col-12 navbar navbar-dark bg-primary justify-content-between px-5">
            <span className="pl-2">
              <a onClick={()=>setMenuAtivo(true)}>Menu</a>
            </span>
            <span>
              {GlobablConfig.AppName}
            </span>
            <span className="pr-2">
              User
            </span>
          </header>   

          {/* MENU LATERAL */}
          <div style={{left:`${menuAtivo ? '0px' : '-300px' }`}} className="sideBarMenu">       
            <ul className="nav nav-pills flex-column my-3">              
              <a 
                onClick={()=>setMenuAtivo(false)}
                className="nav-link sideBarMenuClose">
                  Close
              </a>
              {
                Rotas && Rotas.map(
                  (rota, key) => <li className="nav-item" key = {key} >
                    <NavLink
                      exact = {true} 
                      activeClassName='active' 
                      className="nav-link"
                      onClick={()=>setMenuAtivo(false)}
                      to={rota && rota.path}>
                        {rota.label}
                      </NavLink>
                  </li>   
                )
              }
            </ul>
          </div>     

          {/* SWITCH DE ROTA */}
          <Switch className="col-12">
            {
              Rotas.map(
                (rota, key) => <Route exact path={rota.path} key={key}>
                    {
                      React.createElement(rota.view)
                    }
                </Route>
              )
            }
          </Switch> 

        </div>
      </div>
    </Router>    
  );
}

export default App;
