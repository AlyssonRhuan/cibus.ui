import React from 'react';

function DashboardSimpleCard(props) {

  return (
    <div className={props.col}>
      <div className="card" style={{borderRadius:'10px', borderLeft: `10px solid ${props.color}`}}>
        <div className="card-body row align-items-center">
          <div className='col'>
            <h6 className="card-title" style={{color: props.color, textAlign: 'left'}}>{props.title}</h6>
            <h2 className="card-text" style={{color: 'black', textAlign: 'left'}}>{props.value}</h2>
          </div>
          <div className='col-auto'>
            <h1 style={{color: props.color}}>{props.icon}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardSimpleCard;
