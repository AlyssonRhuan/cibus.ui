import React, { useState, useEffect } from 'react';
import api from '../services/api';
import Auth from '../storage/Auth.storage';
import Toast from './Toast';
import Loading from './Loading';

function DashboardSimpleCard(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [report, setReport] = useState();

  useEffect(() => {
    getReportData(props.report.request, props.report.id, props.period);
  }, [])

  async function getReportData(reportEndPoint, reportId, period) {
    try {
      const response = await api.get(`${reportEndPoint}/${reportId}/${period}`, await Auth.getAuthHeader())
      setReport(response.data);
      setIsLoading(false);
    }
    catch (e) {
      error(e);
    }
  }

  function error(e) {
    Toast.error(e.response ? e.response.data.message : e.message);
    console.error(e.response ? e.response.data.message : e.message);
  }

  return (
    <div className={'col-3 mb-3 pl-0'}>
      <div className="card" style={{ borderRadius: '10px', borderLeft: `10px solid #19222b` }}>
        <div className="card-body row align-items-center">
          <div className='col-12'>
            {
              isLoading
                ? '...'
                : <div>
                  <h6 className="card-title" style={{ color: '#19222b', textAlign: 'left' }}>{report.title}</h6>
                  <h2 className="card-text" style={{ color: 'black', textAlign: 'left' }}>
                    {
                      (
                        report.data == undefined
                          ? <Loading/>
                          : `${(report.prefix || '')} ${(report.data.length > 0 ? report.data[0].value : '-')} ${(report.sufix || '')}`
                      )
                    }
                  </h2>
                </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardSimpleCard;
