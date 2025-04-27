import { BrowserRouter as Router, Routes, Route, Redirect } from "react-router-dom";
import NotFoundView from '../views/notFoundView/NotFound';
import ShopView from '../views/shopView/Shop';
import React from 'react';
import Auth from "../storage/Auth.storage";

function SwitchRotas(props) {
  const rotas = props.rotas;

  return <main>
    {/* SWITCH DE ROTA */}
    <div>
      <Routes>
        <Route exact path={"/"} component={ShopView}/>
        {
          rotas && rotas.map(
            (rota, key) =>  rota.roles.includes(props.userRule) && <Route path={rota.path} element={<rota.view/>}/>
          )
        }
        <Route component={NotFoundView}/>
      </Routes>
    </div>
  </main>
}

export default SwitchRotas;
