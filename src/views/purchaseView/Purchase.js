import api from '../../services/api';
import Toast from '../../components/Toast';
import Table from '../../components/Table';
import Auth from '../../storage/Auth.storage';
import Loading from '../../components/Loading';
import React, { useState, useEffect } from 'react';
import PageTitle from '../../components/PageTitle';
import Shop from '../shopView/Shop';
import { AiOutlineShoppingCart } from 'react-icons/ai'

const rotasBreadcrumb = [
  { name: "Home", path: "/" },
  { name: "Purchase" }
]

const END_POINT = ''
const PAGE_TITLE = 'Purchase'

function Purchase() {
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState(false);

  useEffect(() => {

  }, [])

  function error(e) {
    Toast.error(e.response ? e.response.data.message : e.message);
    console.error(e.response ? e.response.data.message : e.message);
  }

  // RENDER

  return (
    <main className="App col-12 pr-4 ml-1 pl-4">
      {isLoading
        ? <Loading />
        : <section>

          {/* BARRA MENU INTERNO */}
          <div style={{ alignItems: 'center' }} className="col-12 row justify-content-between mx-0 px-0">
            <PageTitle title={PAGE_TITLE} breadcrumb={rotasBreadcrumb} />
          </div>

          <Shop/>
        </section>
      }
    </main>
  );
}

export default Purchase;