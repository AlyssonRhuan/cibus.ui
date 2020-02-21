import {BrowserRouter as Router, Switch, Route, NavLink } from "react-router-dom";
import NotFoundView from './views/notFoundView/NotFound'
import React, { useState, useEffect } from 'react';
import MenuOverlay from './components/MenuOverlay';
import { ToastContainer } from 'react-toastify';
import LoginView from './views/loginView/Login';
import GlobablConfig from './configs/Global';
import Icons from './utils/IconsUtils';
import Rotas from './configs/Routes';

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

function App() {
  const [menuAtivo, setMenuAtivo] = useState(false);
  const [rotas, setRotas] = useState();
  const [token, setToken] = useState();

  useEffect(() => {        
    setToken(localStorage.getItem("Authorization"));
    Rotas().then(res => {
      setRotas(res)
    });
  }, [])

  return (    
    <Router>
      <title>{GlobablConfig.Title}</title>
      <div className="container-fluid">
        <div className="row">   
        
          <ToastContainer />     

          {/* BARRA SUPERIOR */}
          <header style={{color:'white'}} className="col-12 navbar navbar-dark bg-primary justify-content-between align-middle px-5">
            <span className="pl-2">              
              <a onClick={()=>setMenuAtivo(true)}>
                <img className="icon_small" src={Icons.MenuWhite}/>Menu
              </a>
            </span>
            <span>
              {GlobablConfig.AppName}
            </span>
            <span className="pr-2">              
              <img className="icon_small" src={Icons.MeWhite}/> Me
            </span>
          </header>   

          {/* MENU LATERAL */}
          <div>
            <div style={{left:`${menuAtivo ? '0px' : '-300px' }`}} className="sideBarMenu">       
              <ul className="nav nav-pills flex-column my-3">              
                <a 
                  onClick={()=>setMenuAtivo(false)}
                  className="nav-link sideBarMenuClose justify-content-end">
                    <img className="icon_medium" src={Icons.CloseWhite}/>
                </a>
                {
                  rotas && rotas.map(
                    (rota, key) => <li className="nav-item" key = {key} >
                      <NavLink
                        exact = {true} 
                        activeClassName='active' 
                        className="nav-link align-middle"
                        onClick={()=>setMenuAtivo(false)}
                        to={rota && rota.path}>
                          <img className="icon_medium" src={rota.icon}/>
                          <spam>{rota.name}</spam>
                        </NavLink>
                    </li>   
                  )
                }
              </ul>
            </div> 
            <MenuOverlay 
              ativo={menuAtivo}
              onClick={setMenuAtivo}/>
          </div>

          {/* SWITCH DE ROTA */}
          <Switch className="col-12">
            <Route exact path="/login">
              <LoginView/>
            </Route>
            {
              rotas && rotas.map(
                (rota, key) => <PrivateRoute exact path={rota.path} key={key}>
                    { rota.view }
                </PrivateRoute>
              )
            }   
          </Switch> 

        </div>
      </div>
    </Router>    
  );
}

export default App;
