import api from '../../services/api';
import ModalProduct from './ModalProduct';
import Toast from '../../components/Toast';
import Table from '../../components/Table';
import Auth from '../../storage/Auth.storage';
import Loading from '../../components/Loading';
import React, { useState, useEffect } from 'react';
import PageTitle from '../../components/PageTitle';
import ProductDataTableConfig from './ProductDataTableConfig';
import ModalConfirmation from '../../utils/ModalConfirmationUtils';
import FilterProduct from './FilterProduct';

const rotasBreadcrumb = [
  { name: "Home", path: "/" },
  { name: "Produtos" }
]

const END_POINT = 'product'
const PAGE_TITLE = 'Produto'

function Product() {
  const [products, setProducts] = useState();
  const [productToAction, setProductToAction] = useState();
  const [modal, setModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({})

  useEffect(() => {
    getAllProducts();
  }, [])

  // FUNÇÕES PARA ABRIR MODAL

  function openModal(modal, dado = undefined) {
    setModal(modal);
    setProductToAction(dado);
  }

  function closeModal() {
    setModal(undefined);
    getAllProducts();
  }

  // FUNÇÕES 
  function onFilter(){
    getAllProducts();
  }

  async function getAllProducts(page, quantity) {
    try {
      const response = await api.get(END_POINT + "?page=" + (page || 1)
          + "&quantity=" + (quantity || 10)
          + "&name=" + (filters.name || '')
          + "&categoryId=" + (filters.category || 0)
          + "&active=" + (filters.active || 'BOUTH')
          , await Auth.getAuthHeader());
      setProducts(response.data);
    }
    catch (e) {
      error(e);
    }
  }

  async function addProduct(data) {
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

  async function editProduct(data) {
    try {
      await api.put(`${END_POINT}/${productToAction.id}`, data, await Auth.getAuthHeader());
      Toast.success(`${PAGE_TITLE} atualizado!`);
    }
    catch (e) {
      error(e);
    }

    closeModal();
  }

  async function deleteProduct(validation) {
    try {
      if (validation) {
        await api.delete(`${END_POINT}/${productToAction.id}`, await Auth.getAuthHeader(), await Auth.getAuthHeader());
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
              Adicionar produto
            </button>
          </div>

          {
            products && <Table
              data={products}
              columns={ProductDataTableConfig}
              onAction={openModal}
              filters={<FilterProduct filters={filters} onSetFilters={setFilters} onFilter={onFilter}/>}
              onGetAll={getAllProducts}
            />
          }

        </section>
      }
      <section>

        {/* MODAIS */}
        {
          modal && modal === 'ADD' && <ModalProduct
            title={`Adicionar ${PAGE_TITLE}`}
            data={undefined}
            onClose={closeModal}
            onSave={addProduct}
            isOpen={modal === 'ADD'} />
        }

        {
          modal && modal === 'EDI' && <ModalProduct
              title={`Editar ${PAGE_TITLE}`}
              data={productToAction}
              onClose={closeModal}
              onSave={editProduct}
              isOpen={modal === 'EDI'} />
        }

        {
          modal && modal === 'DEL' && <ModalConfirmation
            title={`Deletar ${PAGE_TITLE}`}
            text={`Deseja deletar o produto ${productToAction.name}`}
            onClose={closeModal}
            onResponse={deleteProduct}
            isOpen={modal === 'DEL'} />
        }

      </section>
    </main>
  );
}

export default Product;