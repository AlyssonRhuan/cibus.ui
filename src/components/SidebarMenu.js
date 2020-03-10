import { BrowserRouter as Router, NavLink } from "react-router-dom";
import Icons from '../utils/IconsUtils';
import React from 'react';
import Auth from '../services/Auth'

function SidebarMenu(props) {
  const rotas = props.rotas;

  return <main>
    <div className="sideBarMenu">

      {/* LOGO */}
      <ul className="nav nav-pills flex-column">
        <li>
          <section className="nav-logo-link align-middle">
            <img className="icon_small" src={Icons.LogoWhite} />
            <span>Cibus</span>
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
            <img className="icon_small" src={Icons.HomeWhite} />
            <span>Home</span>
          </NavLink>
        </li>
        {
          rotas && rotas.map(
            (rota, key) => <li className="nav-item" key={key} >
              <NavLink
                exact={true}
                activeClassName='active'
                className='nav-link align-middle'
                to={rota && rota.path}>
                <img className="icon_small" src={rota.icon} />
                <span>{rota.name}</span>
              </NavLink>
            </li>
          )
        }
      </ul>

      {/* LOGOUT */}
      <ul className="nav nav-pills flex-column">
        <li className="nav-item" >
          <section className="nav-link align-middle" onClick={Auth.onLogout}>
            <img className="icon_small" src={Icons.LogoutWhite} />
            <span>Logout</span>
          </section>
        </li>
      </ul>

    </div>
  </main>
}

export default SidebarMenu;
