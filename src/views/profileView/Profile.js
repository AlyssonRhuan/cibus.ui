import ModalConfirmation from '../../utils/ModalConfirmationUtils'
import ProfileDataTableConfig from './ProfileDataTableConfig'
import React, { useState, useEffect } from 'react';
import Table from '../../components/Table'
import Toast from '../../components/Toast'
import ModalProfile from './ModalProfile'
import api from '../../services/api'

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

    async function getAllProfiles(novaPagina, novaQtdElementos) {
        try{
            const response = await api.get(`perfil?pagina=${novaPagina || 1}&qtdElementos=${novaQtdElementos || 10}`);
            setProfiles(response.data)
        }
        catch(e){
            error(e);
        }
    }

    async function addProfile(dados) {
        try{
            await api.post(`perfil`, dados);
            Toast.success("Profile added!")
        }
        catch(e){
            error(e);
        }   
    
        closeModal();          
    }

    async function editProfile(dados) {
        try{
            await api.put(`perfil/${profileToAction.id}`, dados);
            Toast.success("Profile updated!");
        }
        catch(e){
            error(e);
        }   
    
        closeModal();   
    }

    async function deleteProfile(validacao) {
        try{
            if (validacao) {
                await api.delete(`perfil/${profileToAction.id}`);
                Toast.success("Profile removed!");
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

                {/* BREADCRUMB */}
                <nav aria-label="breadcrumb" className="pt-3">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="/">Home</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Profile</li>
                    </ol>
                </nav>

                {/* BARRA MENU INTERNO */}
                <div style={{ alignItems: 'center' }} className="col-12 row justify-content-between mx-0 px-0">
                    <span>
                        <h1 className="display-4">Profile</h1>
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