import React, { useState, useEffect } from 'react';
import Loading from '../../components/Loading';
import DashboardSimpleCard from '../../components/DashboardSimpleCard';
import DashboardMediumCard from '../../components/DashboardMediumCard';
import DashboardLargeCard from '../../components/DashboardLargeCard';
import api from '../../services/api';
import Auth from '../../storage/Auth.storage';
import Toast from '../../components/Toast';
import { FiDollarSign, FiBookOpen, FiBook, FiAnchor } from 'react-icons/fi';
import PageTitle from '../../components/PageTitle';
import FilterHome from './FilterHome';

const END_POINT = 'dashboard'
const PAGE_TITLE = 'Home'

const rotasBreadcrumb =[
  { name: "Home",     path: "/"},
  { name: "Sales"}
]

function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [filterSelected, setFilterSelected] = useState('DAY');
  const [dashboardData, setDashboardData] = useState({
    'salesTotal': 0,
    'ordersOpenned': 0,
    'ordersClosed': 0,
    'products': [],
    'categories': []
  });

  useEffect(() => {   
    getData(filterSelected);
  }, [])

  function onFilterSelected(period){
    setFilterSelected(period);
    getData(period);
  }

  async function getData(period) {
    try {
      setIsLoading(true);
      const response = await api.get(`${END_POINT}/${period}`, await Auth.getAuthHeader())
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
          <div style={{ alignItems: 'center' }}  className="col-12 row justify-content-between mx-0 px-0">
            <PageTitle title={PAGE_TITLE}/>
            <FilterHome onSelected={onFilterSelected} filterSelected={filterSelected}/>
          </div>

          <div className='row mt-3'>
            <DashboardSimpleCard title='VALOR EM VENDAS' value={dashboardData.salesTotal.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})} color='blue' col='col-sm-4' icon={<FiDollarSign/>}/>
            <DashboardSimpleCard title='PEDIDOS EM ABERTO' value={dashboardData.ordersOpenned} color='orange' col='col-sm-4' icon={<FiBookOpen/>}/>
            <DashboardSimpleCard title='PEDIDOS FECHADOS' value={dashboardData.ordersClosed} color='green' col='col-sm-4' icon={<FiBook/>}/>
          </div>

          <div className='row mt-4'>

            <div className="col-sm-8">
              <DashboardLargeCard title='ITENS MAIS VENDIDOS' value={dashboardData.products} color='lightblue' col='col px-0' icon={<FiBook/>}/>
            </div>

            <div className="col-sm-4">
              <DashboardMediumCard title='CATEGORIAS MAIS VENDIDAS' value={dashboardData.categories} color='brown ' col='col px-0' icon={<FiBook/>}/>
            </div>
          </div>

        </section>
      }
    </main>
  );
}

export default Home;
