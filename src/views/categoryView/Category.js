import ModalConfirmation from '../../utils/ModalConfirmationUtils';
import CategoryDataTableConfig from './CategoryDataTableConfig';
import Breadcrumb from '../../components/Breadcrumb';
import React, { useState, useEffect } from 'react';
import ModalCategory from './ModalCategory';
import Table from '../../components/Table';
import Toast from '../../components/Toast';
import api from '../../services/api';
import Auth from '../../services/Auth';

const rotasBreadcrumb =[
  { name: "Home",     path: "/"},
  { name: "Category"}
]

const END_POINT = 'category'
const PAGE_TITLE = 'Category'

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
            const response = await api.get(`${END_POINT}?page=${novaPagina || 1}&quantity=${novaQtdElementos || 10}`, await Auth.getAuthHeader());
            setCategorys(response.data)
        }
        catch(e){
            error(e);
        }
    }

    async function addCategory(dados) {
        try{
            await api.post(`${END_POINT}`, dados, await Auth.getAuthHeader());
            Toast.success(`${PAGE_TITLE} added!`)
        }
        catch(e){
            error(e);
        }   
    
        closeModal();          
    }

    async function editCategory(dados) {
        try{
            await api.put(`${END_POINT}/${categoryToAction.id}`, dados, await Auth.getAuthHeader());
            Toast.success(`${PAGE_TITLE} updated!`)
        }
        catch(e){
            error(e);
        }   
    
        closeModal();   
    }

    async function deleteCategory(validacao) {
        try{
            if (validacao) {
                await api.delete(`${END_POINT}/${categoryToAction.id}`, await Auth.getAuthHeader());
                Toast.success(`${PAGE_TITLE} removed!`)
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
        <main className="App col-12 pr-4 ml-1 pl-4">
            <section>
                <Breadcrumb routes={rotasBreadcrumb}/>

                {/* BARRA MENU INTERNO */}
                <div style={{ alignItems: 'center' }} className="col-12 row justify-content-between mx-0 px-0">
                    <span>
                        <h1 className="display-4">{PAGE_TITLE}</h1>
                    </span>
                    <span>
                        <button type="button" className="btn btn-success ml-2" onClick={() => openModal('ADD', undefined)}>
                            Add Category
                        </button>
                    </span>
                </div>

                <Table
                    data={categorys}
                    columns={CategoryDataTableConfig}
                    onAction={openModal}                   
                    onGetAll={getAllCategorys}
                    />

            </section>
            <section>

                {/* MODAIS */}
                {
                    modal && modal === 'ADD' && <ModalCategory
                        title="Add category"
                        data={undefined}
                        onClose={closeModal}
                        onSave={addCategory}
                        isOpen={modal === 'ADD'} />
                }

                {
                    modal && modal === 'EDI' && <ModalCategory
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
