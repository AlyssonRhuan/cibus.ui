import React, { useState, useEffect } from 'react';
import ModalConfirmation from '../../utils/ModalConfirmationUtils'
import DataBaseService from '../../services/DataBaseService'
import ModalUser from './ModalUser'
import Table from '../../components/Table'
import UserDataTableConfig from './UserDataTableConfig'
import Toast from '../../components/Toast'

const TABLE_NAME = 'users'

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
        const dados = await DataBaseService.getAll(TABLE_NAME)
        setUsers(dados)
    }

    function addUser(dados) {
        DataBaseService.push(TABLE_NAME, dados);
        Toast.success("Usuário adicionado!")
    }

    function editUser(dados) {
        DataBaseService.update(TABLE_NAME, dados.key, dados);
        Toast.success("Usuário atualizado!");
    }

    function deleteUser(validacao) {
        if (validacao) {
            DataBaseService.delete(TABLE_NAME, userToAction.key);
            Toast.success("Usuário removido!");
        }
        else
        {
            Toast.warn("Ação cancelada!");
        }

        closeModal();
    }

    // RENDER

    return (
        <main className="App col-12 px-5">
            <section>

                {/* BREADCRUMB */}
                <nav aria-label="breadcrumb" className="pt-3">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="/">Home</a></li>
                        <li className="breadcrumb-item active" aria-current="page">User</li>
                    </ol>
                </nav>

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