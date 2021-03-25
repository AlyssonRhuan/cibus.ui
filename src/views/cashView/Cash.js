import api from '../../services/api';
import ModalCash from './ModalCash';
import Toast from '../../components/Toast';
import Table from '../../components/Table';
import Auth from '../../storage/Auth.storage';
import Loading from '../../components/Loading';
import React, { useState, useEffect } from 'react';
import PageTitle from '../../components/PageTitle';
import CashDataTableConfig from './CashDataTableConfig';
import ModalConfirmation from '../../utils/ModalConfirmationUtils';
import FilterCash from './FilterCash';

const rotasBreadcrumb = [
  { name: "Home", path: "/" },
  { name: "Caixa" }
]

const END_POINT = 'cash'
const PAGE_TITLE = 'Caixa'

function Cash() {
  const [cash, setCashs] = useState();
  const [cashToAction, setCashToAction] = useState();
  const [modal, setModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({})

  useEffect(() => {
    getAll();
  }, [])

  // FUNÇÕES PARA ABRIR MODAL

  function openModal(modal, dado = undefined) {
    setModal(modal);
    setCashToAction(dado);
  }

  function closeModal() {
    setModal(undefined);
    getAll();
  }

  // FUNÇÕES 
  function onFilter(){
    getAll();
  }

  async function getAll(page, quantity) {
    try {
      const response = await api.get(END_POINT + "?page=" + (page || 1)
          + "&quantity=" + (quantity || 10)
          + "&user=" + (filters.user || '')
          + "&description=" + (filters.description || '')
          + "&openDate=" + (filters.openDate || '')
          + "&closeDate=" + (filters.closeDate || '')
          , await Auth.getAuthHeader());
      setCashs(response.data);
    }
    catch (e) {
      error(e);
    }
  }

  async function addCash(data) {
    try {
      setIsLoading(true);
      data = await api.post(`${END_POINT}`, data, await Auth.getAuthHeader());
      Toast.success(`${PAGE_TITLE} adicionado!`)
      setIsLoading(false);
    }
    catch (e) {
      error(e);
    }

    closeModal();
  }

  async function editCash(data) {
    try {
      await api.put(`${END_POINT}/${cashToAction.id}`, data, await Auth.getAuthHeader());
      Toast.success(`${PAGE_TITLE} atualizado!`);
    }
    catch (e) {
      error(e);
    }

    closeModal();
  }

  async function deleteCash(validation) {
    try {
      if (validation) {
        await api.delete(`${END_POINT}/${cashToAction.id}`, await Auth.getAuthHeader(), await Auth.getAuthHeader());
        Toast.success(`${PAGE_TITLE} removido!`);
      }
    }
    catch (e) {
      error(e);
    }

    closeModal();
  }

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
            <button type="button" className="btn btn-success ml-2" onClick={() => openModal('ADD')}>
              Adicionar caixa
            </button>
          </div>

          {
            cash && <Table
              data={cash}
              columns={CashDataTableConfig}
              onAction={openModal}
              filters={<FilterCash filters={filters} onSetFilters={setFilters} onFilter={onFilter}/>}
              onGetAll={getAll}
            />
          }

        </section>
      }
      <section>

        {/* MODAIS */}
        {
          modal && modal === 'ADD' && <ModalCash
            title={`Adicionar ${PAGE_TITLE}`}
            data={undefined}
            onClose={closeModal}
            onSave={addCash}
            isOpen={modal === 'ADD'} />
        }

        {
          modal && modal === 'EDI' && <ModalCash
              title={`Editar ${PAGE_TITLE}`}
              data={cashToAction}
              onClose={closeModal}
              onSave={editCash}
              isOpen={modal === 'EDI'} />
        }

        {
          modal && modal === 'DEL' && <ModalConfirmation
            title={`Deletar ${PAGE_TITLE}`}
            text={`Deseja deletar o caixa ${cashToAction.name}`}
            onClose={closeModal}
            onResponse={deleteCash}
            isOpen={modal === 'DEL'} />
        }

      </section>
    </main>
  );
}

export default Cash;