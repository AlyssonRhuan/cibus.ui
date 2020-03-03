import {BrowserRouter as NavLink } from "react-router-dom";
import React from 'react';

function NavMenu(props) {

  const rotas = props.rotas;
  debugger

  return (
    <main>
      <div className="sideBarMenu">       
        <ul className="nav nav-pills flex-column">  
        {
          rotas && rotas.map(
            (rota, key) => <li className="nav-item" key = {key} >
              <NavLink
                exact = {true} 
                activeClassName='active' 
                className="nav-link align-middle"
                to={rota && rota.path}>
                  <img className="icon_small" src={rota.icon}/>
                  <spam>{rota.name}</spam>
                </NavLink>
            </li>   
          )
        }
        </ul>
      </div>
    </main>
  );
}

export default NavMenu;
