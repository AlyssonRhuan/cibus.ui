import React from 'react';
import Table from '../components/Table';
import HomeLastSalesDataTableConfig from '../views/homeView/HomeLastSalesDataTableConfig';

import { Chart, Interval, Tooltip } from 'bizcharts';

function DashboardLargeCard(props) {

  return (
    <div className={props.col} >
      <div className="card" style={{borderRadius:'10px', borderLeft: `10px solid ${props.color}`, height: '450px'}}>
        <div className="card-body row align-items-center">
          <div className='col'>
            <h6 className="card-title" style={{color: props.color, textAlign: 'left'}}>{props.title}</h6>
            <Chart height={300} autoFit data={props.value} interactions={['active-region']} padding="auto">
              <Interval position="product*quantity" />
              <Tooltip shared />
            </Chart>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardLargeCard;
