import ModalConfirmation from '../../utils/ModalConfirmationUtils';
import ProductSkuDataTableConfig from './ProductSkuDataTableConfig';
import ModalProductDetails from './ModalProductDetails';
import Breadcrumb from '../../components/Breadcrumb';
import TextEditor from '../../components/TextEditor';
import React, { useState, useEffect } from 'react';
import Auth from '../../storage/Auth.storage';
import Toast from '../../components/Toast';
import Table from '../../components/Table';
import api from '../../services/api';
import Select from 'react-select';

const rotasBreadcrumb = [
  { name: "Home", path: "/" },
  { name: "Product", path: "/product" },
  { name: "Details" }
]

const END_POINT = 'product'
const END_POINT_SKU = 'product/sku'
const PAGE_TITLE = 'Product details'
let PRODUCT_ID = 0

function Product(props) {
  const [product, setProduct] = useState({});
  const [productSku, setProductSku] = useState([]);
  const [productToAction, setProductToAction] = useState();
  const [modal, setModal] = useState(false);
  // VARIAVEIS UTILIZAVEIS NO MODAL
  const [listCategorys, setListCategorys] = useState();

  useEffect(() => {
    PRODUCT_ID = props.match.params.productId;

    getProduct();
    getProductsKU();
    getListCategorys();
  }, [])

  // FUNÇÕES PARA ABRIR MODAL

  function openModal(modal, dado = undefined) {
    setModal(modal);
    setProductToAction(dado);
  }

  function closeModal() {
    setModal(undefined);
    getProduct();
  }

  // FUNÇÕES 

  async function getListCategorys() {
    const dados = await api.get(`category/valuelabel`, await Auth.getAuthHeader());
    setListCategorys(dados.data);
  }

  // PRODUTO

  async function getProduct() {
    try {
      const response = await api.get(`${END_POINT}/${PRODUCT_ID}`, await Auth.getAuthHeader())
      setProduct(response.data);
    }
    catch (e) {
      error(e);
    }
  }

  async function editProduct() {
    debugger
    try {
      await api.put(`${END_POINT}/${product.id}`, product, await Auth.getAuthHeader());
      Toast.success(`${PAGE_TITLE} updated!`);
    }
    catch (e) {
      error(e);
    }
  }

  // SKU

  async function getProductsKU(page, quantity) {
    try {
      const response = await api.get(`${END_POINT_SKU}?idProduct=${PRODUCT_ID}&page=${page || 1}&quantity=${quantity || 10}`, await Auth.getAuthHeader())
      setProductSku(response.data);
    }
    catch (e) {
      error(e);
    }
  }

  async function addProductSku(data) {
    try {
      data.product = {
        'id': PRODUCT_ID
      };

      await api.post(`${END_POINT_SKU}`, data, await Auth.getAuthHeader());
      Toast.success(`${PAGE_TITLE} added!`);
      getProductsKU(1, 10);
    }
    catch (e) {
      error(e);
    }

    closeModal();
  }

  async function editProductSku(data) {
    try {
      data.product = {
        'id': PRODUCT_ID
      };

      await api.put(`${END_POINT_SKU}/${data.id}`, data, await Auth.getAuthHeader());
      Toast.success(`${PAGE_TITLE} updated!`);

      getProductsKU(1, 10);
    }
    catch (e) {
      error(e);
    }
  }

  async function deleteProductSku(validation) {
    try {
      if (validation) {
        await api.delete(`${END_POINT_SKU}/${productToAction.id}`, await Auth.getAuthHeader(), await Auth.getAuthHeader());
        Toast.success(`${PAGE_TITLE} removed!`);

        getProductsKU(1, 10);
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
        <Breadcrumb routes={rotasBreadcrumb} />

        {/* BARRA MENU INTERNO */}

        <form className="form-row">
          <div style={{ alignItems: 'center' }} className="col-12 row justify-content-between mx-0 px-0">
            <span>
              <h1 className="display-4">{PAGE_TITLE}</h1>
            </span>
            <span>
              <button type="submit" className="btn btn-success ml-2" onClick={editProduct}>Save</button>
            </span>
          </div>

          <div className="form-row col-6">
            <div className="form-group col-12">
              <label htmlFor='nomeProduto'>Name</label>
              <input type='text' className="form-control" id='nomeProduto' placeholder='Nome do produto'
                onChange={event => setProduct({ ...product, name: event.target.value })} value={product.name} />
            </div>

            <div className="form-group col-12">
              <label htmlFor="productCategory">Category</label>
              <Select isMulti className="basic-multi-select" classNamePrefix="select"
                onChange={event => setProduct({ ...product, categorys: event })}
                options={listCategorys && listCategorys} value={product.categorys} />
            </div>

            <div className="form-group col-6">
              <div className="custom-control custom-switch">
                <input type="checkbox" className="custom-control-input" id="switchDigital" checked={product.prodcutDigital}
                  onChange={event => setProduct({ ...product, prodcutDigital: event.target.checked })} />
                <label className="custom-control-label" htmlFor="switchDigital">Product digital</label>
              </div>
            </div>

            <div className="form-group col-6">
              <div className="custom-control custom-switch">
                <input type="checkbox" className="custom-control-input" id="switchVisivel" checked={product.visible}
                  onChange={event => setProduct({ ...product, visible: event.target.checked })} />
                <label className="custom-control-label" htmlFor="switchVisivel">Product {product.visible ? "visible" : "invisible"}</label>
              </div>
            </div>
          </div>

          <div className="form-row col-6">
            {product.description && <TextEditor value={product.description} label='Description'
              onChange={value => setProduct({ ...product, description: value })}/>}
          </div>

        </form>
      </section>
      <section>
        <button type="button" className="btn btn-info mt-3 float-right" onClick={() => openModal('ADD')}>
          Add Product
        </button> 
        {
          productSku && <Table
            data={productSku}
            columns={ProductSkuDataTableConfig}
            onAction={openModal}
            onGetAll={getProduct}
          />
        }

      </section>
      <section>

        {/* MODAIS */}
        {
          modal && modal === 'ADD' && <ModalProductDetails
            title={`Add ${PAGE_TITLE}`}
            data={undefined}
            onClose={closeModal}
            onSave={addProductSku}
            isOpen={modal === 'ADD'} />
        }

        {
          modal && modal === 'EDI' && <ModalProductDetails
            title={`Edit ${PAGE_TITLE}`}
            data={productToAction}
            onClose={closeModal}
            onSave={editProductSku}
            isOpen={modal === 'EDI'} />
        }

        {
          modal && modal === 'DEL' && <ModalConfirmation
            title={`Delete ${PAGE_TITLE}`}
            text={`Deseja deletar o produto cor ${productToAction.colorName}, de tamanho ${productToAction.size} e preço RS ${productToAction.price}`}
            onClose={closeModal}
            onResponse={deleteProductSku}
            isOpen={modal === 'DEL'} />
        }

      </section>
    </main>
  );
}

export default Product;