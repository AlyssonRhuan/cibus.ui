import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import NotFoundView from '../views/notFoundView/NotFound';
import LoginView from '../views/loginView/Login';
import HomeView from '../views/homeView/Home';
import React from 'react';
import Auth from "../services/Auth";

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
        <Route exact path={"/"}       component={HomeView}/>
        <Route exact path={"/login"}  component={LoginView}/>
        {
          rotas && rotas.map(
            (rota, key) => <PrivateRoute exact path={rota.path} key={key} component={rota.view}/>
          )
        }
        <Route component={NotFoundView}/>
      </Switch>
    </div>
  </main>
}

export default SwitchRotas;
