import React, { useState, useEffect } from 'react';
import ModalProduct from './ModalProduct'
import Table from '../../components/Table'
import ProductDataTableConfig from './ProductDataTableConfig'
import DataBaseService from '../../services/DataBaseService'
import Toast from '../../components/Toast'
import ModalConfirmation from '../../utils/ModalConfirmationUtils'

const TABLE_NAME = 'products'

function Product() {
  const [products, setProducts] = useState();
  const [productToAction, setProductToAction] = useState();
  const [modal, setModal] = useState(false);
  
  useEffect(() => {
    getAllProducts();
  }, [])  

  // FUNÇÕES PARA ABRIR MODAL

  function openModal(modal, product) {
      setModal(modal);
      setProductToAction(product);
  }

  function closeModal() {
      setModal(undefined);
      getAllProducts();
  }

  // FUNÇÕES 

  async function getAllProducts() {
    const dados = await DataBaseService.getAll(TABLE_NAME)
    setProducts(dados)
  }

  function addProduct(dados) {
      DataBaseService.push(TABLE_NAME, dados);
      Toast.success("Produto adicionado!")
  }

  function editProduct(dados) {
      DataBaseService.update(TABLE_NAME, dados.key, dados);
      Toast.success("Produto atualizado!");
  }

  function deleteProduct(validacao) {
      if (validacao) {
          DataBaseService.delete(TABLE_NAME, productToAction.key);
          Toast.success("Produto removido!");
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
            <li className="breadcrumb-item active" aria-current="page">Product</li>
          </ol>
        </nav>

        {/* BARRA MENU INTERNO */}
        <div style={{alignItems:'center'}} className="col-12 row justify-content-between mx-0 px-0">
          <span>
            <h1 className="display-4">Products</h1>
          </span>
          <span>
            <button type="button" className="btn btn-success ml-2" onClick={() => openModal('ADD', undefined)}>
              Add Product
            </button>
          </span>
        </div>

        <Table
            data={products}
            columns={ProductDataTableConfig}
            onAction={openModal}
            />

        </section>
        <section>

          {/* MODAIS */}
          {
              modal && modal === 'ADD' && <ModalProduct
                  title="Add product"
                  data={undefined}
                  onClose={closeModal}
                  onSave={addProduct}
                  isOpen={modal === 'ADD'} />
          }

          {
              modal && modal === 'EDI' && <ModalProduct
                  title="Edit product"
                  data={productToAction}
                  onClose={closeModal}
                  onSave={editProduct}
                  isOpen={modal === 'EDI'} />
          }

          {
              modal && modal === 'DEL' && <ModalConfirmation
                  title="Delete product"
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