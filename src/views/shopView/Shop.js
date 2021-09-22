import Loading from '../../components/Loading';
import React, { useState, useEffect } from 'react';
import IconsUtils from '../../utils/IconsUtils';
import Toast from '../../components/Toast';
import api from '../../services/api';
import Auth from '../../storage/Auth.storage';
import { AiFillPlusCircle, AiOutlineInfoCircle } from 'react-icons/ai';
import Cart from './Cart';
import ModalPayment from './ModalPayment';
import ModalProductDetails from './ModalProductDetails';
import ModalVoucher from './ModalVoucher';


function Shop(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState(0);
  const [pagination, setPagination] = useState({});
  const [cart, setCart] = useState([]);
  const [modal, setModal] = useState();
  const [cartUpdate, setCartUpdate] = useState();
  const [payment, setPayment] = useState();
  const [orderId, setOrderId] = useState();

  const [categories, setCategories] = useState();
  const [products, setProducts] = useState();
  const [productDetails, setProductDetails] = useState();

  useEffect(() => {
    getAllCategories();
    getProductsByCategoryId(0);
  }, [cart, cartUpdate])

  // FUNÇÕES PARA ABRIR MODAL

  function openModal(modal, dado = undefined) {
    setModal(modal);
  }

  function closeModal() {
    setModal(undefined);
  }

  function closeModalVoucher() {
    setCart([])
    closeModal();
  }

  // FUNÇÕES 

  async function getAllCategories() {
    setIsLoading(true);
    const dados = await api.get(`category/valuelabel`, await Auth.getAuthHeader());
    setCategories([...[{ id: 0, value: 0, label: "Todos" }], ...dados.data]);
    setIsLoading(false);
  }

  async function getProductsByCategoryId(categoryId) {
    setIsLoading(true);
    const dados = await api.get(`product/category/${categoryId}?page=${pagination.page || 1}&quantity=${pagination.quantity || 8}`, await Auth.getAuthHeader());
    setProducts(dados.data.content);
    setPagination({
      totalPages: dados.data.totalPages,
      totalElements: dados.data.totalElements,
      quantity: dados.data.size,
      page: dados.data.number + 1,
      last: dados.data.last,
      first: dados.data.first
    })
    setIsLoading(false);
  }

  function onModalPayment() {
    closeModal();
    setModal('PAYMENT');
  }

  function onModalProductDetails(product) {
    setProductDetails(product);
    setModal('PRODUCT_DETAILS');
  }

  function onNextPage() {
    if (pagination.page < pagination.totalPages) {
      pagination.page = pagination.page + 1;
    }
    getProductsByCategoryId(activeCategory);
  }

  function onPreviousPage() {
    if (pagination.page > 1) {
      pagination.page = pagination.page - 1;
    }
    getProductsByCategoryId(activeCategory);
  }

  function onBuy(product) {
    var productNotUpdated = true;

    cart.map(p => {
      if (p.product.id === product.id) {
        p.quantity++;
        productNotUpdated = false;
        setCart(cart)
      }
    })

    if (productNotUpdated) {
      let productToCart = {
        quantity: 1,
        price: product.price,
        product: product
      }

      setCart([...cart, productToCart])
    }
    setCartUpdate(Date.now());
  }

  function onChangeQuantity(productId, quantity) {
    if (quantity > 0) {
      cart.map(p => {
        if (p.product.id === productId) {
          p.quantity = quantity;
          setCart(cart)
        }
      })
      setCartUpdate(Date.now());
    }
    else {
      onRemoveProduct(productId)
    }
  }

  function onRemoveProduct(productId) {
    let newCart = cart.filter(p => p.product.id != productId);
    setCart(newCart)
    setCartUpdate(Date.now());
  }

  function onCategorySelected(categoryId) {
    setActiveCategory(categoryId);
    pagination.page = 1;
    getProductsByCategoryId(categoryId);
  }

  function onCancelOrder() {
    setCart([])
  }

  async function onConfirmOrder(payment) {
    try {
      setIsLoading(true);
      let data = await api.post(`sale`, { saleProducts: this.cart, payment: payment}, await Auth.getAuthHeader());
      setOrderId(data.data.id);
      setPayment(payment);
      setModal('VOUCHER');
      setIsLoading(false);
    }
    catch (e) {
      error(e);
    }
  }

  function error(e) {
    Toast.error(e.response ? e.response.data.message : e.message);
    console.error(e.response ? e.response.data.message : e.message);
  }

  // RENDER

  return (



    <main className="col-12 m-2" style={{ zIndex: '0' }}>
      {isLoading
        ? <Loading />
        : <section className="row px-0 px-0">

          {/* CATEGORIAS */}
          <div className="list-group col-2 mx-0 px-0">
            {
              categories && categories.map((category, key) => {
                return <a href="#" key={category.value} className={`list-group-item list-group-item-action ${activeCategory === category.id ? "active" : ""}`}
                  onClick={() => onCategorySelected(category.id)}>{category.label}</a>
              })
            }
          </div>

          <div className="col-8 row mx-0 px-0 justify-content-center">

            {/* PRODUTOS */}
            <div className="row col-12" style={{ minHeight: '90vh' }}>
              {products && products.map((product, key) => {
                return <div className="col-3 mb-4" key={key}>
                  <div className="col-12" key={key} style={{ borderRadius: '15px', overflow: 'hidden', boxShadow: '5px 5px 10px 0px rgba(0,0,0,0.125)' }}>
                    <div className="p-4 mt-3 mx-0" style={{ height: '200px', width: '100%', border: '1px solid rgba(0,0,0,0.125)', backgroundColor: '#f2f2f2' }}>
                      <img src={product.image ? product.image : IconsUtils.Logo} className="card-img-top" alt={product.name}
                        style={{ position: 'relative', top: '50%', transform: 'translateY(-50%)' }} />
                    </div>
                    <div className="col-12 row mx-0 px-0 mt-3 justify-content-between">
                      <div className="col-12 d-flex justify-content-between px-0">
                        <p><b>{product.name}</b></p>
                        <a onClick={() => onModalProductDetails(product)} style={{ cursor: 'pointer' }}><AiOutlineInfoCircle color="gray" size='25px' /></a>
                      </div>
                      <div className="col-12 px-0" style={{ color: 'gray', fontSize: '12px' }}>
                        {product.quickDescription}
                      </div>
                      <div className="col-12 d-flex justify-content-between px-0">
                        <p><b>{product.price && `R$ ${product.price.toFixed(2)}`}</b></p>
                        <a onClick={() => onBuy(product)} style={{ cursor: 'pointer' }}><AiFillPlusCircle color="#007bff" size='30px' /></a>
                      </div>
                    </div>
                  </div>
                </div>
              })}
            </div>

            {/* PAGINAÇÃO */}
            <div className="col-12 row justify-content-center mx-0">
              {
                pagination && <div>
                  <nav aria-label="Page navigation example" style={{ width: '100%' }}>
                    <ul className="pagination">
                      <li className={`page-item ${pagination.first ? "disabled" : ""}`}>
                        <a className="page-link" href="#" tabindex="-1" aria-disabled={`${pagination.first ? "true" : "false"}`} onClick={() => onPreviousPage()}>Anterior</a>
                      </li>
                      <li className="page-item disabled">
                        {pagination ? <a className="page-link" href="#" tabindex="-1" aria-disabled="true">{pagination.page} de {pagination.totalPages}</a> : "0"}
                      </li>
                      <li className={`page-item ${pagination.last ? "disabled" : ""}`}>
                        <a className="page-link" href="#" aria-disabled={`${pagination.last ? "true" : "false"}`} onClick={() => onNextPage()}>Próximo</a>
                      </li>
                    </ul>
                  </nav>
                </div>
              }
            </div>

          </div>

          {/* CARRINHO */}
          <div className="col-2 row justify-content-between mx-0">
            <Cart
              title={`Carrinho`}
              cart={cart}
              onChangeQuantity={onChangeQuantity}
              onRemoveProduct={onRemoveProduct}
              onClose={closeModal}
              onCancelOrder={onCancelOrder}
              onModalPayment={onModalPayment}
              isOpen={modal === 'CART'} />
          </div>

          <section>
            {/* MODAIS */}
            {
              modal && modal === 'PAYMENT' && <ModalPayment
                title={`Pagamento`}
                cart={cart}
                onClose={closeModal}
                onCancelOrder={onCancelOrder}
                onConfirmOrder={onConfirmOrder}
                isOpen={modal === 'PAYMENT'} />
            }
            {
              modal && modal === 'PRODUCT_DETAILS' && <ModalProductDetails
                title={'Sobre o produto'}
                product={productDetails}
                onClose={closeModal}
                isOpen={modal === 'PRODUCT_DETAILS'} />
            }
            {
              modal && modal === 'VOUCHER' && <ModalVoucher
                title={'Comprovante'}
                cart={cart}
                payment={payment}
                orderId={orderId}
                onClose={closeModalVoucher}
                isOpen={modal === 'VOUCHER'} />
            }
          </section>
        </section>
      }
    </main>
  );
}

export default Shop;