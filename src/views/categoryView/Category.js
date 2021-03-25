import ModalConfirmation from '../../utils/ModalConfirmationUtils';
import CategoryDataTableConfig from './CategoryDataTableConfig';
import PageTitle from '../../components/PageTitle';
import React, { useState, useEffect } from 'react';
import ModalCategory from './ModalCategory';
import Table from '../../components/Table';
import Toast from '../../components/Toast';
import api from '../../services/api';
import Auth from '../../storage/Auth.storage';
import FilterCategory from './FilterCategory';

const rotasBreadcrumb =[
  { name: "Home",     path: "/"},
  { name: "Categoria"}
]

const END_POINT = 'category'
const PAGE_TITLE = 'Categoria'

function Category() {
    const [categorys, setCategorys] = useState();
    const [categoryToAction, setCategoryToAction] = useState()
    const [modal, setModal] = useState(undefined)
    const [filters, setFilters] = useState({})

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

    function onFilter(){
        getAllCategorys();
    }

    async function getAllCategorys(novaPagina, novaQtdElementos) {
        try{
            const response = await api.get(END_POINT + "?page=" + (novaPagina || 1)
                + "&quantity=" + (novaQtdElementos || 10)
                + "&name=" + (filters.name || '')
                + "&description=" + (filters.description || '')
                + "&active=" + (filters.active || 'BOUTH')
                , await Auth.getAuthHeader());
            setCategorys(response.data)
        }
        catch(e){
            error(e);
        }
    }

    async function addCategory(dados) {
        try{
            await api.post(`${END_POINT}`, dados, await Auth.getAuthHeader());
            Toast.success(`${PAGE_TITLE} adicionada!`)
        }
        catch(e){
            error(e);
        }   
    
        closeModal();          
    }

    async function editCategory(dados) {
        try{
            await api.put(`${END_POINT}/${categoryToAction.id}`, dados, await Auth.getAuthHeader());
            Toast.success(`${PAGE_TITLE} atualizada!`)
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
                Toast.success(`${PAGE_TITLE} removida!`)
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

                {/* BARRA MENU INTERNO */}
                <div style={{ alignItems: 'center' }} className="col-12 row justify-content-between mx-0 px-0">
                    <PageTitle title={PAGE_TITLE} breadcrumb={rotasBreadcrumb} />
                    <button type="button" className="btn btn-success ml-2" onClick={() => openModal('ADD', undefined)}>
                        Adicionar categoria
                    </button>
                </div>

                <Table
                    data={categorys}
                    columns={CategoryDataTableConfig}
                    onAction={openModal}     
                    filters={<FilterCategory filters={filters} onSetFilters={setFilters} onFilter={onFilter}/>}              
                    onGetAll={getAllCategorys}
                    />

            </section>
            <section>

                {/* MODAIS */}
                {
                    modal && modal === 'ADD' && <ModalCategory
                        title="Adicionar categoria"
                        data={undefined}
                        onClose={closeModal}
                        onSave={addCategory}
                        isOpen={modal === 'ADD'} />
                }

                {
                    modal && modal === 'EDI' && <ModalCategory
                        title="Editar categoria"
                        data={categoryToAction}
                        onClose={closeModal}
                        onSave={editCategory}
                        isOpen={modal === 'EDI'} />
                }

                {
                    modal && modal === 'DEL' && <ModalConfirmation
                        title="Deletar categoria"
                        text={`Deseja deletar a categoria ${categoryToAction.name}`}
                        onClose={closeModal}
                        onResponse={deleteCategory}
                        isOpen={modal === 'DEL'} />
                }

            </section>
        </main>
    );
}

export default Category;
