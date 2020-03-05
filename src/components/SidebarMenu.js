import {BrowserRouter as NavLink } from "react-router-dom";
import Icons from '../utils/IconsUtils';
import React from 'react';

function SidebarMenu(props) {
  return <div className="sideBarMenu">       
            <ul className="nav nav-pills flex-column">  

              {/* LOGO */}
              <li>
                <section className="nav-logo-link align-middle">                    
                  <img className="icon_small" src={Icons.Logo}/>
                  <spam>Cibus</spam>
                </section>
              </li>     

              {/* HOME */}
              <li className="nav-item" >
                <NavLink
                  exact = {true} 
                  activeClassName='active' 
                  className="nav-link align-middle"
                  to={"/"}>
                    <img className="icon_small" src={Icons.HomeWhite}/>
                    <spam>Home</spam>
                  </NavLink>
              </li>

              {/* ANOTHER LINKS */}
              {
                props.rotas && props.rotas.map(
                  (rota, key) => <li className="nav-item" key={key} >
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

              {/* LOGOUT */}
              <li className="nav-item" >
                <section className="nav-link align-middle" onClick={props.onLogout}>                    
                  <img className="icon_small" src={Icons.LogoutWhite}/>
                  <spam>Logout</spam>
                </section>
              </li>
              
            </ul>
          </div> 
}

export default SidebarMenu;
