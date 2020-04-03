import React, { useState, useEffect } from 'react';
import Icons from '../../utils/IconsUtils';
import './Entry.css';

import ForgotPassword from './ForgotPassword';
import CreateAccount from './CreateAccount';
import ResetPassword from './ResetPassword';
import Login from './Login';

function Entry(props) {
  const [view, setView] = useState(1);

  function onSetView(v){
    setView(v);
  }
  
  return (
    <main className="entryMain">
      <title>{process.env.REACT_APP_APP_TITLE}</title>
      <section className="logoCibus">
        <img src={Icons.Logo} />
        <h1>Cibus</h1>
      </section>
      {
        view === 1 && <Login onLogin={props.onLogin} onSetView={onSetView}/>
      }
      {
        view === 2 && <CreateAccount onSetView={onSetView}/>
      }
      {
        view === 3 && <ForgotPassword onSetView={onSetView}/>
      }
      {
        view === 4 && <ResetPassword onSetView={onSetView}/>
      }
    </main>
  );
}

export default Entry;