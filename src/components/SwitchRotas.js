import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import NotFoundView from '../views/notFoundView/NotFound';
import ShopView from '../views/shopView/Shop';
import React from 'react';
import Auth from "../storage/Auth.storage";

function SwitchRotas(props) {
  const rotas = props.rotas;

  function PrivateRoute({ path, component }) {
    !Auth.isAuthenticated() && props.onLogout()
    return Auth.isAuthenticated() && <Route exact path={path} component={component}/>
  }

  return <main>
    {/* SWITCH DE ROTA */}
    <div>
      <Switch>
        <Route exact path={"/"} component={ShopView}/>
        {
          rotas && rotas.map(
            (rota, key) =>  rota.roles.includes(props.userRule) && <PrivateRoute exact path={rota.path} key={key} component={rota.view}/>
          )
        }
        <Route component={NotFoundView}/>
      </Switch>
    </div>
  </main>
}

export default SwitchRotas;
