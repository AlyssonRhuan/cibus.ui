import ModalConfirmation from '../../utils/ModalConfirmationUtils'
import ProductDataTableConfig from './ProductDataTableConfig'
import React, { useState, useEffect } from 'react';
import Toast from '../../components/Toast'
import Table from '../../components/Table'
import ModalProduct from './ModalProduct'
import api from '../../services/api'

function Product() {
  const [products, setProducts] = useState();
  const [productToAction, setProductToAction] = useState();
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllProducts();
  }, [])

  // FUNÇÕES PARA ABRIR MODAL

  /**
   * Open the product modal
   * @param {String} modal Which modal type is. 
   * @param {Object} dado Values from a product 
   */
  function openModal(modal, dado = undefined) {
    setModal(modal);
    setProductToAction(dado);
  }

  function closeModal() {
    setModal(undefined);
    getAllProducts();
  }

  // FUNÇÕES 

  async function getAllProducts(novaPagina, novaQtdElementos) {
    try {
      const response = await api.get(`produtos?pagina=${novaPagina || 1}&qtdElementos=${novaQtdElementos || 10}`)
      setProducts(response.data);
    }
    catch (e) {
      error(e);
    }
  }

  async function addProduct(dados) {
    try {
      await api.post(`produtos`, dados);
      Toast.success("Produto adicionada!")
    }
    catch (e) {
      error(e);
    }
    
    closeModal();
  }

  async function editProduct(dados) {
    try {
      await api.put(`produtos/${productToAction.id}`, dados);
      Toast.success("Produto atualizada!");
    }
    catch (e) {
      error(e);
    }

    closeModal();
  }

  async function deleteProduct(validacao) {
    try {
      if (validacao) {
        await api.delete(`produtos/${productToAction.id}`);
        Toast.success("Produto removido!");
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
    <main className="App col-12 px-5">
      <section>

        {/* BREADCRUMB */}
        <nav aria-label="breadcrumb" className="pt-3">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="/">Home</a></li>
            <li className="breadcrumb-item active" aria-current="page">Product</li>
          </ol>
        </nav>

        {/* BARRA MENU INTERNO */}
        <div style={{ alignItems: 'center' }} className="col-12 row justify-content-between mx-0 px-0">
          <span>
            <h1 className="display-4">Products</h1>
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
            title="Adicionar produto"
            data={undefined}
            onClose={closeModal}
            onSave={addProduct}
            isOpen={modal === 'ADD'} />
        }

        {
          modal && modal === 'EDI' && <ModalProduct
            title="Editar produto"
            data={productToAction}
            onClose={closeModal}
            onSave={editProduct}
            isOpen={modal === 'EDI'} />
        }

        {
          modal && modal === 'DEL' && <ModalConfirmation
            title="Deletar produto"
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