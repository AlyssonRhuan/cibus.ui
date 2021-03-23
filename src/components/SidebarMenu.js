import { BrowserRouter as Router, NavLink } from "react-router-dom";
import Auth from '../storage/Auth.storage';
import { BiHomeAlt } from "react-icons/bi";
import { HiLogout } from "react-icons/hi"; 
import Icons from '../utils/IconsUtils';
import React from 'react';

function SidebarMenu(props) {
  const rotas = props.rotas;

  function onLogout(){
    Auth.onLogout();
    props.onLogout();
  }

  return <main>
    <div className="sideBarMenu">

      {/* LOGO */}
      <ul className="nav nav-pills flex-column mb-3">
        <li>
          <section className="nav-logo-link align-middle">
            <img className="icon" src={Icons.LogoWhite} />
            <span className="ml-3">Cibus</span>
          </section>
        </li>
      </ul>


      {/* ANOTHER LINKS */}
      <ul className="nav nav-pills flex-column">
        <li className="nav-item">
          <NavLink
            exact={true}
            activeClassName='active'
            className='nav-link align-middle'
            to={"/"}>
            <BiHomeAlt/>
            <span className="ml-3">Home</span>
          </NavLink>
        </li>
        {
          rotas && rotas.map(
            (rota, key) => rota.isInSideBar && <li className="nav-item" key={key} >
              <NavLink
                exact={true}
                activeClassName='active'
                className='nav-link align-middle'
                style={rota.style}
                to={rota && rota.path}>
                {rota.icon}
                <span className="ml-3">{rota.name}</span>
              </NavLink>
            </li>
          )
        }
      </ul>

      <ul className="nav nav-pills flex-column mt-3">

        {/* LOGOUT */}
        <li className="nav-item" >
          <section className="nav-link align-middle" onClick={() => onLogout()}>
            <HiLogout/>
            <span className="ml-3">Logout</span>
          </section>
        </li>

      </ul>

    </div>
  </main>
}

export default SidebarMenu;
