import SalesDataTableConfig from './SaleDataTableConfig';
import PageTitle from '../../components/PageTitle';
import React, { useState, useEffect } from 'react';
import Table from '../../components/Table';
import Toast from '../../components/Toast';
import api from '../../services/api';
import Auth from '../../storage/Auth.storage';
import FiltersSale from './FiltersSale';
import { AiFillCaretDown } from 'react-icons/ai';

const rotasBreadcrumb =[
  { name: "Home",     path: "/"},
  { name: "Sales"}
]

const END_POINT = 'sale'
const PAGE_TITLE = 'Sales'

function Sale() {
    const [sales, setSales] = useState();    
    const [filters, setFilters] = useState({
        'product': '',
        'category': '',
        'date': '',
        'status': ''
    });


    useEffect(() => {
        getAll();
    }, [])

    // FUNÇÕES 

    async function getAll(novaPagina, novaQtdElementos) {
        try{
            const response = await api.get(
                END_POINT + 
                "?page=" +  ( novaPagina || 1 ) +
                "&quantity=" + ( novaQtdElementos || 10 ) +
                "&product=" + filters.product +
                "&date=" + filters.date +
                "&status=" + filters.status
                , await Auth.getAuthHeader()
            );
                
            setSales(response.data)
        }
        catch(e){
            error(e);
        }
    }

    function error(e) {
        Toast.error(e.response ? e.response.data.message : e.message);
        console.error(e.response ? e.response.data.message : e.message);
    }

    // RENDER

    return (
        <main className="App col-12 pr-4 ml-1 pl-4">
            <section>

                {/* BARRA MENU INTERNO */}
                <div style={{ alignItems: 'center' }} className="col-12 row justify-content-between mx-0 px-0">
                    <PageTitle title={PAGE_TITLE} breadcrumb={rotasBreadcrumb} />
                </div>

                <Table
                    data={sales}
                    columns={SalesDataTableConfig}            
                    onGetAll={getAll}
                    filters={<FiltersSale/>}
                    hasAction={false}
                    />

            </section>
        </main>
    );
}

export default Sale;
