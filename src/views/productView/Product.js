import ModalConfirmation from '../../utils/ModalConfirmationUtils';
import ProductDataTableConfig from './ProductDataTableConfig';
import Breadcrumb from '../../components/Breadcrumb';
import React, { useState, useEffect } from 'react';
import Toast from '../../components/Toast';
import Table from '../../components/Table';
import ModalProduct from './ModalProduct';
import Auth from '../../services/Auth';
import api from '../../services/api';

const rotasBreadcrumb =[
  { name: "Home",     path: "/"},
  { name: "Product"}
]

const END_POINT = 'product'
const PAGE_TITLE = 'Product'

function Product() {
  const [products, setProducts] = useState();
  const [productToAction, setProductToAction] = useState();
  const [modal, setModal] = useState(false);

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

  async function getAllProducts(page, quantity) {
    try {
      const response = await api.get(`${END_POINT}?page=${page || 1}&quantity=${quantity || 10}`, await Auth.getAuthHeader())
      setProducts(response.data);
    }
    catch (e) {
      error(e);
    }
  }

  async function addProduct(data) {
    try {
      await api.post(`${END_POINT}`, data, await Auth.getAuthHeader());
      Toast.success(`${PAGE_TITLE} added!`)
    }
    catch (e) {
      error(e);
    }
    
    closeModal();
  }

  async function editProduct(data) {
    try {
      await api.put(`${END_POINT}/${productToAction.id}`, data, await Auth.getAuthHeader());
      Toast.success(`${PAGE_TITLE} updated!`);
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
        Toast.success(`${PAGE_TITLE} removed!`);
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
    <main className="App col-12 pr-4 ml-1 pl-4">
      <section>        
        <Breadcrumb routes={rotasBreadcrumb}/>

        {/* BARRA MENU INTERNO */}
        <div style={{ alignItems: 'center' }} className="col-12 row justify-content-between mx-0 px-0">
          <span>
            <h1 className="display-4">{PAGE_TITLE}</h1>
          </span>
          <span>
            <button type="button" className="btn btn-success ml-2" onClick={() => openModal('ADD')}>
              Add Product
            </button>
          </span>
        </div>

        {
          products && <Table
            data={products}
            columns={ProductDataTableConfig}
            onAction={openModal}
            onGetAll={getAllProducts}
          />
        }

      </section>
      <section>

        {/* MODAIS */}
        {
          modal && modal === 'ADD' && <ModalProduct
            title={`Add ${PAGE_TITLE}`}
            data={undefined}
            onClose={closeModal}
            onSave={addProduct}
            isOpen={modal === 'ADD'} />
        }

        {
          modal && modal === 'EDI' && <ModalProduct
            title={`Edit ${PAGE_TITLE}`}
            data={productToAction}
            onClose={closeModal}
            onSave={editProduct}
            isOpen={modal === 'EDI'} />
        }

        {
          modal && modal === 'DEL' && <ModalConfirmation
            title={`Delete ${PAGE_TITLE}`}
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