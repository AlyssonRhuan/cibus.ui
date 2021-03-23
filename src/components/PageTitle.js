import React from 'react';
import Breadcrumb from './Breadcrumb';

function PageTitle(props) {

  return (
    <main className="" style={{textAlign: 'left'}}>
      <span>
          <h1 className="display-4 mb-0 pb-0 mt-2">{props.title}</h1>
          {props.breadcrumb && <Breadcrumb routes={props.breadcrumb}/>}
      </span>    
    </main>
  );
}

export default PageTitle;
