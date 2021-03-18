import React from "react";
import {
  Chart,
  Interval,
  Tooltip,
  Axis,
  Coordinate,
  getTheme,
} from "bizcharts";

function DashboardMediumCard(props) {

    const colors = props.value.reduce((pre, cur, idx) => {
      pre[cur.item] = getTheme().colors10[idx];
      return pre;
    }, {});
  
    const cols = {
      percent: {
        formatter: (val) => {
          val = val * 100 + "%";
          return val;
        },
      },
    }; 


  return (
    <div className={props.col} >
      <div className="card" style={{borderRadius:'10px', borderLeft: `10px solid ${props.color}`, height: '450px'}}>
        <div className="card-body row align-items-center">    
          <div className='col'>
            <h6 className="card-title" style={{color: props.color, textAlign: 'left'}}>{props.title}</h6>
            <Chart height={400} data={props.value} scale={cols} interactions={['element-active']} autoFit>
              <Coordinate type="theta" radius={0.75} />
              <Tooltip showTitle={false} />
              <Axis visible={false} />
              <Interval
                position="percent"
                adjust="stack"
                color="item"
                style={{
                  lineWidth: 1,
                  stroke: "#fff",
                }}
                label={[
                  "item",
                  (item) => {
                    return {
                      offset: 20,
                      content: (data) => {
                        return `${data.item}\n ${data.percent * 100}%`;
                      },
                      style: {
                        fill: colors[item],
                      },
                    };
                  },
                ]}
              />
            </Chart>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardMediumCard;
