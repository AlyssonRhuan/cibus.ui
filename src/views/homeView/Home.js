import React, { useState, useEffect } from 'react';
import Loading from '../../components/Loading';
import DashboardSimpleCard from '../../components/DashboardSimpleCard';
import DashboardMediumCard from '../../components/DashboardMediumCard';
import DashboardLargeCard from '../../components/DashboardLargeCard';
import api from '../../services/api';
import Auth from '../../storage/Auth.storage';
import Toast from '../../components/Toast';
import { FiDollarSign, FiBookOpen, FiBook, FiAnchor } from 'react-icons/fi';

const END_POINT = 'dashboard'
const PAGE_TITLE = 'Dashboard'

function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState();

  useEffect(() => {   
    getData();
  }, [])

  async function getData() {
    try {
      setIsLoading(true);
      const response = await api.get(`${END_POINT}`, await Auth.getAuthHeader())
      setDashboardData(response.data);
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
    <main className="App col-12 pr-4 ml-1 pl-4">
      {isLoading
        ? <Loading />
        : <section>

          {/* BARRA MENU INTERNO */}
          <div className="row mx-0">
            <span>
              <h1 className="display-4 py-4">{PAGE_TITLE}</h1>
            </span>
          </div>

          <div className='row'>
            <DashboardSimpleCard title='VENDAS DO DIA' value='R$ 123,12' color='blue' col='col-sm-4' icon={<FiDollarSign/>}/>
            <DashboardSimpleCard title='PEDIDOS EM ABERTO' value='12' color='orange' col='col-sm-4' icon={<FiBookOpen/>}/>
            <DashboardSimpleCard title='PEDIDOS FECHADOS' value='123' color='green' col='col-sm-4' icon={<FiBook/>}/>
          </div>

          <div className='row mt-4'>

            <div className="col-8">
              <DashboardLargeCard title='PEDIDOS FECHADOS' value='123' color='black' col='col px-0' icon={<FiBook/>}/>
            
           
            </div>

            <div className="col-sm-4">
              <DashboardMediumCard title='PEDIDOS FECHADOS' value='123' color='black' col='col px-0' icon={<FiBook/>}/>
            </div>
          </div>

        </section>
      }
    </main>
  );
}

export default Home;
