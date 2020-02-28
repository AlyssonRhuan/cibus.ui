import ModalConfirmation from '../../utils/ModalConfirmationUtils';
import ProfileDataTableConfig from './ProfileDataTableConfig';
import Breadcrumb from '../../components/Breadcrumb';
import React, { useState, useEffect } from 'react';
import Table from '../../components/Table';
import Toast from '../../components/Toast';
import ModalProfile from './ModalProfile';
import api from '../../services/api';

const rotasBreadcrumb =[
  { name: "Home",     path: "/"},
  { name: "Profile"}
]

const END_POINT = 'profile'
const PAGE_TITLE = 'Profile'

function Profile() {
    const [profiles, setProfiles] = useState([]);
    const [profileToAction, setProfileToAction] = useState();
    const [modal, setModal] = useState(undefined);

    useEffect(() => {
        getAllProfiles();
    }, [])

    // FUNÇÕES PARA ABRIR MODAL

    function openModal(modal, dado) {
        setModal(modal);
        setProfileToAction(dado);
    }

    function closeModal() {
        setModal(undefined);
        getAllProfiles();
    }

    // FUNÇÕES 

    async function getAllProfiles(page, quantity) {
        try{
            const response = await api.get(`${END_POINT}?page=${page || 1}&quantity=${quantity || 10}`);
            setProfiles(response.data)
        }
        catch(e){
            error(e);
        }
    }

    async function addProfile(data) {
        try{
            await api.post(`${END_POINT}`, data);
            Toast.success(`${PAGE_TITLE} added!`);
        }
        catch(e){
            error(e);
        }   
    
        closeModal();          
    }

    async function editProfile(data) {
        try{
            await api.put(`${END_POINT}/${profileToAction.id}`, data);
            Toast.success(`${PAGE_TITLE} updated!`);
        }
        catch(e){
            error(e);
        }   
    
        closeModal();   
    }

    async function deleteProfile(validation) {
        try{
            if (validation) {
                await api.delete(`${END_POINT}/${profileToAction.id}`);
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
                            Add Profile
                        </button>
                    </span>
                </div>

                <Table
                    data={profiles}
                    columns={ProfileDataTableConfig}
                    onAction={openModal}                   
                    onGetAll={getAllProfiles}
                    />

            </section>
            <section>

                {/* MODAIS */}
                {
                    modal && modal === 'ADD' && <ModalProfile
                        title="Add profile"
                        data={undefined}
                        onClose={closeModal}
                        onSave={addProfile}
                        isOpen={modal === 'ADD'} />
                }

                {
                    modal && modal === 'EDI' && <ModalProfile
                        title="Edit profile"
                        data={profileToAction}
                        onClose={closeModal}
                        onSave={editProfile}
                        isOpen={modal === 'EDI'} />
                }

                {
                    modal && modal === 'DEL' && <ModalConfirmation
                        title="Delete profile"
                        text={`Deseja deletar o perfil ${profileToAction.nome}`}
                        onClose={closeModal}
                        onResponse={deleteProfile}
                        isOpen={modal === 'DEL'} />
                }

            </section>
        </main>
    );
}

export default Profile;