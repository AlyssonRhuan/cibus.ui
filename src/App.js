import {BrowserRouter as Router, Switch, Route, NavLink } from "react-router-dom";
import NotFoundView from './views/notFoundView/NotFound'
import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import LoginView from './views/loginView/Login';
import Loading from './components/Loading';
import Icons from './utils/IconsUtils';
import Rotas from './configs/Routes';

import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function PrivateRoute({children}) {
  return <Route>
      {
        React.createElement(children)
      }
    </Route>
}

async function getToken(){
  const token = await localStorage.getItem("Authorization");
  return token;
}

function App() {
  const [rotas, setRotas] = useState();
  const [token, setToken] = useState();
  const [loading, setLoading] = useState();
  
  function logout(){
    setLoading(true);
    localStorage.removeItem("Authorization"); 
    setToken(null);
    setLoading(false);
  }

  useEffect(() => { 
    setLoading(true);
    getToken().then(
      response => {
        setToken(response);

        if(response){
          Rotas().then(res => {
            setRotas(res)
            setLoading(false);
          })    
        }
        else{
          setLoading(false);
        }
        
      }
    );

  }, [])

  return (  
    loading
    ? <Loading/>
    : !token      
      ? <LoginView/>
      : <Router>
        <title>{process.env.REACT_APP_APP_TITLE}</title>
        <ToastContainer hideProgressBar/>     
        
        {/* MENU LATERAL */}
        {
          token && <div>
            <div>
              <div className="sideBarMenu">       
                <ul className="nav nav-pills flex-column">   
                  <li>
                    <section className="nav-logo-link align-middle">                    
                      <img className="icon_small" src={Icons.Logo}/>
                      <spam>Cibus</spam>
                    </section>
                  </li>
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
                  <li className="nav-item" >
                    <section className="nav-link align-middle" onClick={logout}>                    
                      <img className="icon_small" src={Icons.LogoutWhite}/>
                      <spam>Logout</spam>
                    </section>
                  </li>
                </ul>
              </div> 
            </div>
          </div>
        }

        {/* SWITCH DE ROTA */}
        <div className={`${token ? "ml-5" : ""}`}>
          <Switch>
            {
              rotas && rotas.map(
                (rota, key) => <PrivateRoute exact path={rota.path} key={key}>
                  { 
                    rota.view
                  }
                </PrivateRoute>
              )              
            }  
             <Route>
               <NotFoundView/>
             </Route>
          </Switch>           
        </div>
      </Router>    
  );
}

export default App;
