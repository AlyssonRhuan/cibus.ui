import ModalConfirmation from '../../utils/ModalConfirmationUtils';
import UserDataTableConfig from './UserDataTableConfig';
import Breadcrumb from '../../components/Breadcrumb';
import React, { useState, useEffect } from 'react';
import Table from '../../components/Table';
import Toast from '../../components/Toast';
import api from '../../services/api';
import ModalUser from './ModalUser';

const rotasBreadcrumb =[
  { name: "Home",     path: "/"},
  { name: "User"}
]

const END_POINT = 'user'
const PAGE_TITLE = 'User'

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

    async function getAllUsers(page, quantity) {
        try{
            const response = await api.get(`${END_POINT}?page=${page || 1}&quantity=${quantity || 10}`);
            setUsers(response.data)
        }
        catch(e){
            error(e);
        }
    }

    async function addUser(data) {
        try{
            await api.post(`${END_POINT}`, data);
            Toast.success(`${PAGE_TITLE} added!`);
        }
        catch(e){
            error(e);
        }   
    
        closeModal();          
    }

    async function editUser(dados) {
        try{
            await api.put(`${END_POINT}/${userToAction.id}`, dados);
            Toast.success(`${PAGE_TITLE} updated!`);
        }
        catch(e){
            error(e);
        }   
    
        closeModal();   
    }

    async function deleteUser(validacao) {
        try{
            if (validacao) {
                await api.delete(`${END_POINT}/${userToAction.id}`);
                Toast.success(`${PAGE_TITLE} removed!`);
            }            
        }
        catch(e){
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
        <main className="App col-12 px-5">
            <section>
                <Breadcrumb routes={rotasBreadcrumb}/>

                {/* BARRA MENU INTERNO */}
                <div style={{ alignItems: 'center' }} className="col-12 row justify-content-between mx-0 px-0">
                    <span>
                        <h1 className="display-4">{PAGE_TITLE}</h1>
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