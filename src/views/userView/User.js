import api from '../../services/api';
import ModalUser from './ModalUser';
import Toast from '../../components/Toast';
import Table from '../../components/Table';
import Auth from '../../storage/Auth.storage';
import Loading from '../../components/Loading';
import React, { useState, useEffect } from 'react';
import PageTitle from '../../components/PageTitle';
import UserDataTableConfig from './UserDataTableConfig';
import ModalConfirmation from '../../utils/ModalConfirmationUtils';
import FilterUser from './FilterUser';

const rotasBreadcrumb = [
  { name: "Home", path: "/" },
  { name: "Usuários" }
]

const END_POINT = 'user'
const PAGE_TITLE = 'Usuários'

function User() {
  const [users, setUsers] = useState();
  const [userToAction, setUserToAction] = useState();
  const [modal, setModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({})

  useEffect(() => {
    getAllUsers();
  }, [])

  // FUNÇÕES PARA ABRIR MODAL

  function openModal(modal, dado = undefined) {
    setModal(modal);
    setUserToAction(dado);
  }

  function closeModal() {
    setModal(undefined);
    getAllUsers();
  }

  // FUNÇÕES 

  function onFilter(name, login) {
    getAllUsers();
  }

  async function getAllUsers(page, quantity) {
    try {
      const response = await api.get(END_POINT + "?page=" + (page || 1)
        + "&quantity=" + (quantity || 10)
        + "&name=" + (filters.name || '')
        + "&login=" + (filters.login || '')
        , await Auth.getAuthHeader());
      setUsers(response.data);
    }
    catch (e) {
      error(e);
    }
  }

  async function addUser(data) {
    try {
      setIsLoading(true);
      data = await api.post(`${END_POINT}`, data, await Auth.getAuthHeader());
      Toast.success(`${PAGE_TITLE} adicionado!`);
      setIsLoading(false);
    }
    catch (e) {
      error(e);
    }

    closeModal();
  }

  async function editUser(data) {
    try {
      await api.put(`${END_POINT}/${userToAction.id}`, data, await Auth.getAuthHeader());
      Toast.success(`${PAGE_TITLE} atualizado!`);
    }
    catch (e) {
      error(e);
    }

    closeModal();
  }

  async function deleteUser(validation) {
    try {
      if (validation) {
        await api.delete(`${END_POINT}/${userToAction.id}`, await Auth.getAuthHeader(), await Auth.getAuthHeader());
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
    <main className="App col-12 px-4">
      {isLoading
        ? <Loading />
        : <section>

          {/* BARRA MENU INTERNO */}
          <div style={{ alignItems: 'center' }} className="col-12 row justify-content-between mx-0 px-0">
            <PageTitle title={PAGE_TITLE} breadcrumb={rotasBreadcrumb} />
            <button type="button" className="btn btn-success ml-2" onClick={() => openModal('ADD')}>
              Adicionar usuário
            </button>
          </div>

          {
            users && <Table
              data={users}
              columns={UserDataTableConfig}
              onAction={openModal}
              filters={<FilterUser filters={filters} onSetFilters={setFilters} onFilter={onFilter} />}
              onGetAll={getAllUsers}
            />
          }

        </section>
      }
      <section>

        {/* MODAIS */}
        {
          modal && modal === 'ADD' && <ModalUser
            title={`Adicionar ${PAGE_TITLE}`}
            data={undefined}
            onClose={closeModal}
            onSave={addUser}
            isOpen={modal === 'ADD'} />
        }

        {
          modal && modal === 'EDI' && <ModalUser
            title={`Editar ${PAGE_TITLE}`}
            data={userToAction}
            onClose={closeModal}
            onSave={editUser}
            isOpen={modal === 'EDI'} />
        }

        {
          modal && modal === 'DEL' && <ModalConfirmation
            title={`Deletar ${PAGE_TITLE}`}
            text={`Deseja deletar o usuário ${userToAction.name}`}
            onClose={closeModal}
            onResponse={deleteUser}
            isOpen={modal === 'DEL'} />
        }

      </section>
    </main>
  );
}

export default User;