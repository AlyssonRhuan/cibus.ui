import React, { useState, useEffect } from 'react';
import ModalConfirmation from '../../utils/ModalConfirmationUtils'
import DataBaseService from '../../services/DataBaseService'
import Toast from '../../components/Toast'
import Table from '../../components/Table'

import ModalCategory from './ModalCategory'
import CategoryDataTableConfig from './CategoryDataTableConfig'

const TABLE_NAME = 'categorys'

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

    async function getAllCategorys() {
        const dados = await DataBaseService.getAll(TABLE_NAME)
        setCategorys(dados)
    }

    function addCategory(dados) {
        DataBaseService.push(TABLE_NAME, dados);
        Toast.success("Categoria adicionada!")
    }

    function editCategory(dados) {
        DataBaseService.update(TABLE_NAME, dados.key, dados);
        Toast.success("Categoria atualizada!");
    }

    function deleteCategory(validacao) {
        if (validacao) {
            DataBaseService.delete(TABLE_NAME, categoryToAction.key);
            Toast.success("Categoria removida!");
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
                        <li className="breadcrumb-item active" aria-current="page">Category</li>
                    </ol>
                </nav>

                {/* BARRA MENU INTERNO */}
                <div style={{ alignItems: 'center' }} className="col-12 row justify-content-between mx-0 px-0">
                    <span>
                        <h1 className="display-4">Category</h1>
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