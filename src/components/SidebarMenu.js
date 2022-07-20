import { BrowserRouter as Router, NavLink } from "react-router-dom";
import Auth from '../storage/Auth.storage';
import { BiLogOut, BiArrowFromLeft, BiArrowFromRight } from "react-icons/bi";
import { AiOutlineUser } from "react-icons/ai";
import Icons from '../utils/IconsUtils';
import React, { useState } from 'react';
import MeView from '../views/meView/Me';

function SidebarMenu(props) {
  const rotas = props.rotas;
  const [sideBarMenuOpen, setSideBarMenuOpen] = useState(false);
  const [modal, setModal] = useState();

  function onLogout() {
    setSideBarMenuOpen(false)
    Auth.onLogout();
    props.onLogout();
  }

  // FUNÇÕES PARA MODAL

  function openModal(modal) {
    setModal(modal);
  }

  function closeModal() {
    setModal(undefined);
  }

  return <main>
    <div className="sideBarMenu justify-content-between" style={{ width: `${sideBarMenuOpen ? '250px' : '49px'}` }}>

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
        {
          rotas && rotas.map(
            (rota, key) => rota.isInSideBar && rota.roles.includes(props.userRule) && <li className="nav-item" key={key} >
              <NavLink
                exact={true}
                activeClassName=''
                className='nav-link align-middle'
                style={rota.style}
                to={rota && rota.path ? rota.path : ""}>
                {rota.icon}
                <span className="ml-3">{rota.name}</span>
              </NavLink>
            </li>
          )
        }

      </ul>


      {/* ANOTHER LINKS */}
      <ul className="nav nav-pills flex-column">
        {/* ME MODAL */}
        <li className="nav-item" >
          <section className="nav-link align-middle" onClick={() => openModal('ME')}>
            <AiOutlineUser />
            <span className="ml-3">Eu</span>
          </section>
        </li>

        {/* LOGOUT */}
        <li className="nav-item" >
          <section className="nav-link align-middle" onClick={() => onLogout()}>
            <BiLogOut />
            <span className="ml-3">Logout</span>
          </section>
        </li>
      </ul>

      <ul className="nav nav-pills flex-column mt-3">

        {/* LOGOUT */}
        <li className="nav-item" >
          <section className="nav-link align-middle" style={{ paddingLeft: `${sideBarMenuOpen ? '215px' : '17px'}`, transition: '.5s' }} onClick={() => setSideBarMenuOpen(!sideBarMenuOpen)}>
            {
              sideBarMenuOpen ? <BiArrowFromRight /> : <BiArrowFromLeft />
            }
          </section>
        </li>

      </ul>

    </div>


    {/* MODAIS */}
    {
      modal && modal === 'ME' && <MeView
        title={`Meu perfil`}
        onClose={closeModal}
        isOpen={modal === 'ME'} />
    }

  </main>
}

export default SidebarMenu;
