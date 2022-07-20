import PageTitle from '../../components/PageTitle';
import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import Auth from '../../storage/Auth.storage';
import Toast from '../../components/Toast';
import DashboardSimpleCard from '../../components/DashboardSimpleCard';
import DashboardMediumCard from '../../components/DashboardMediumCard';
import DashboardLargeCard from '../../components/DashboardLargeCard';
import { FaCashRegister } from "react-icons/fa";
import FilterReport from '../../components/FilterReport';

const END_POINT = 'report'
const PAGE_TITLE = 'Relatórios'

const rotasBreadcrumb = [
  { name: "Home", path: "/" },
  { name: "Relatórios" }
]

function Report(props) {
  const [categoryId, setCategoryId] = useState(1);
  const [filterSelected, setFilterSelected] = useState('DAY');
  const [reports, setReports] = useState([]);

  useEffect(() => {
    getAll(filterSelected);
  }, [])

  async function getAll(period) {
    try {
      const response = await api.get(`${END_POINT}/all/${period}`, await Auth.getAuthHeader())
      setReports(response.data)
    }
    catch (e) {
      error(e);
    }
  }

  function onFilterSelected(period){
    setFilterSelected(period);
    getAll(period);
  }

  function error(e) {
    Toast.error(e.response ? e.response.data.message : e.message);
    console.error(e.response ? e.response.data.message : e.message);
  }

  return (
    <main className="App col-12 px-4">
      <section>

        {/* BARRA MENU INTERNO */}
        <div style={{ alignItems: 'center' }} className="col-12 row justify-content-between mx-0 px-0">
          <PageTitle title={PAGE_TITLE} breadcrumb={rotasBreadcrumb} />
          <FilterReport onSelected={onFilterSelected} filterSelected={filterSelected} />
        </div>

        <section className='row mx-0' style={{ maxHeight: '80vh', overflowY: 'auto' }}>
          {
            reports.map((report, key) => {
              if (report.size === 1) {
                return <DashboardSimpleCard key={key} report={report} period={filterSelected}/>
              }
              else if (report.size === 2) {
                return <DashboardMediumCard key={key} title={report.title} value={['']} col='col-4 mb-3 pl-0' icon={<FaCashRegister />} />
              }
              else if (report.size === 3) {
                return <DashboardLargeCard key={key} title={report.title} value={''} col='col-6 mb-3 pl-0' icon={<FaCashRegister />} />
              }
            })
          }
        </section>

      </section>
    </main>
  );
}

export default Report;