import ModalConfirmation from '../../utils/ModalConfirmationUtils'
import ProfileDataTableConfig from './ProfileDataTableConfig'
import React, { useState, useEffect } from 'react';
import ModalProfile from './ModalProfile'
import Toast from '../../components/Toast'
import Table from '../../components/Table'
import api from '../../services/api'

function Category() {
    const [categorys, setCategorys] = useState();
    const [categoryToAction, setCategoryToAction] = useState()
    const [modal, setModal] = useState(undefined)

    useEffect(() => {
        getAllCategorys();
    }, [])

    // FUNÇÕES PARA ABRIR MODAL

    function openModal(modal, dado) {
        setModal(modal);
        setCategoryToAction(dado);
    }

    function closeModal() {
        setModal(undefined);
        getAllCategorys();
    }

    // FUNÇÕES 

    async function getAllCategorys(novaPagina, novaQtdElementos) {
        try{
            const response = await api.get(`categoria?pagina=${novaPagina || 1}&qtdElementos=${novaQtdElementos || 10}`);
            setCategorys(response.data)
        }
        catch(e){
            error(e);
        }
    }

    async function addCategory(dados) {
        try{
            await api.post(`categoria`, dados);
            Toast.success("Categoria adicionada!")
        }
        catch(e){
            error(e);
        }   
    
        closeModal();          
    }

    async function editCategory(dados) {
        try{
            await api.put(`categoria/${categoryToAction.id}`, dados);
            Toast.success("Categoria atualizada!");
        }
        catch(e){
            error(e);
        }   
    
        closeModal();   
    }

    async function deleteCategory(validacao) {
        try{
            if (validacao) {
                await api.delete(`categoria/${categoryToAction.id}`);
                Toast.success("Categoria removida!");
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
                    data={categorys}
                    columns={ProfileDataTableConfig}
                    onAction={openModal}                   
                    onGetAll={getAllCategorys}
                    expandableRows={true}
                    />

            </section>
            <section>

                {/* MODAIS */}
                {
                    modal && modal === 'ADD' && <ModalProfile
                        title="Add category"
                        data={undefined}
                        onClose={closeModal}
                        onSave={addCategory}
                        isOpen={modal === 'ADD'} />
                }

                {
                    modal && modal === 'EDI' && <ModalProfile
                        title="Edit category"
                        data={categoryToAction}
                        onClose={closeModal}
                        onSave={editCategory}
                        isOpen={modal === 'EDI'} />
                }

                {
                    modal && modal === 'DEL' && <ModalConfirmation
                        title="Delete category"
                        text={`Deseja deletar a categoria ${categoryToAction.nome}`}
                        onClose={closeModal}
                        onResponse={deleteCategory}
                        isOpen={modal === 'DEL'} />
                }

            </section>
        </main>
    );
}

export default Category;