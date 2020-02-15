import ModalConfirmation from '../../utils/ModalConfirmationUtils';
import DataBaseService from '../../services/DataBaseService';
import UserDataTableConfig from './UserDataTableConfig';
import Breadcrumb from '../../components/Breadcrumb';
import React, { useState, useEffect } from 'react';
import Table from '../../components/Table';
import Toast from '../../components/Toast';
import ModalUser from './ModalUser';

const rotasBreadcrumb =[
  { name: "Home",     path: "/"},
  { name: "User"}
]

function User() {
    const [users, setUsers] = useState();
    const [userToAction, setUserToAction] = useState()
    const [modal, setModal] = useState(undefined)

    useEffect(() => {
        getAllUsers();
    }, [])

    // FUNÇÕES PARA ABRIR MODAL

    function openModal(modal, user) {
        setModal(modal);
        setUserToAction(user);
    }

    function closeModal() {
        setModal(undefined);
        getAllUsers();
    }

    // FUNÇÕES 

    async function getAllUsers() {
    }

    function addUser(dados) {
    }

    function editUser(dados) {
    }

    function deleteUser(validacao) {
    }

    // RENDER

    return (
        <main className="App col-12 px-5">
            <section>
                <Breadcrumb rotas={rotasBreadcrumb}/>

                {/* BARRA MENU INTERNO */}
                <div style={{ alignItems: 'center' }} className="col-12 row justify-content-between mx-0 px-0">
                    <span>
                        <h1 className="display-4">Users</h1>
                    </span>
                    <span>
                        <button type="button" className="btn btn-success ml-2" onClick={() => openModal('ADD', undefined)}>
                            Add User
                        </button>
                    </span>
                </div>

                <Table
                    data={users}
                    columns={UserDataTableConfig}
                    onAction={openModal}
                    />

            </section>
            <section>

                {/* MODAIS */}
                {
                    modal && modal === 'ADD' && <ModalUser
                        title="Add user"
                        data={undefined}
                        onClose={closeModal}
                        onSave={addUser}
                        isOpen={modal === 'ADD'} />
                }

                {
                    modal && modal === 'EDI' && <ModalUser
                        title="Edit user"
                        data={userToAction}
                        onClose={closeModal}
                        onSave={editUser}
                        isOpen={modal === 'EDI'} />
                }

                {
                    modal && modal === 'DEL' && <ModalConfirmation
                        title="Delete user"
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