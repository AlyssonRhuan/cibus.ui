import React from 'react';
import Table from '../components/Table';
import HomeLastSalesDataTableConfig from '../views/homeView/HomeLastSalesDataTableConfig';

import { Chart, Interval, Tooltip } from 'bizcharts';

const data = [
  { year: 'Coxinha', sales: 38 },
  { year: 'Agua', sales: 52 },
  { year: 'Suco Laranja', sales: 61 },
  { year: 'Almoço', sales: 45 },
  { year: 'Esfirra', sales: 48 },
  { year: 'Bolo', sales: 38 },
  { year: 'Danone', sales: 38 },
  { year: 'Palha Italiana', sales: 38 },
];

function DashboardLargeCard(props) {

  return (
    <div className={props.col} >
      <div className="card" style={{borderRadius:'10px', borderLeft: `10px solid ${props.color}`, height: '450px'}}>
        <div className="card-body row align-items-center">
          <div className='col'>
            <h6 className="card-title" style={{color: props.color, textAlign: 'left'}}>PRODUTOS MAIS VENDIDOS</h6>
            <Chart height={300} autoFit data={data} interactions={['active-region']} padding="auto">
              <Interval position="year*sales" />
              <Tooltip shared />
            </Chart>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardLargeCard;
