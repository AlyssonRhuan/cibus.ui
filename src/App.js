import {BrowserRouter as Router, Switch, Route, NavLink, Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import GlobablConfig from './configs/Global';
import Rotas from './configs/Rotas';
import MenuOverlay from './components/MenuOverlay'
import Icons from './utils/IconsUtils'

import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [menuAtivo, setMenuAtivo] = useState(false);
  const [rotas, setRotas] = useState();

  useEffect(() => {        
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
                        to={rota && rota.caminho}>
                          <img className="icon_medium" src={rota.icon}/>
                          <spam>{rota.nome}</spam>
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
            {
              rotas && rotas.map(
                (rota, key) => <Route exact path={rota.caminho} key={key}>
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
