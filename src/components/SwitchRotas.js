import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NotFoundView from '../views/notFoundView/NotFound';
import LoginView from '../views/loginView/Login';
import HomeView from '../views/homeView/Home';
import React from 'react';

function SwitchRotas(props) {
  const rotas = props.rotas;

  function PrivateRoute({ path, component }) {
    return <Route exact path={path}  component={component}/>
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
