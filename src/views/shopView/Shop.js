import Loading from '../../components/Loading';
import React, { useState, useEffect } from 'react';
import IconsUtils from '../../utils/IconsUtils';
import Toast from '../../components/Toast';
import api from '../../services/api';
import Auth from '../../storage/Auth.storage';
import { AiFillPlusCircle, AiOutlineInfoCircle } from 'react-icons/ai';
import { AiOutlinePlusCircle, AiOutlineMinusCircle, AiOutlineRest } from 'react-icons/ai';
import { AiOutlineLeft, AiOutlineDown, AiOutlineRight, AiOutlineUp } from 'react-icons/ai';
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
  }, [])

  // FUNÇÕES PARA ABRIR MODAL

  function closeModal() {
    setModal(undefined);
  }

  function closeModalVoucher() {
    setCart([])
    closeModal();
  }

  // FUNÇÕES 

  function getTotalCart() {
    let total = 0;
    cart.map(product => total = total + (product.quantity * product.price))
    return total.toFixed(2);
  }

  async function getAllCategories() {
    const dados = await api.get(`category/valuelabel`, await Auth.getAuthHeader());
    setCategories([...[{ id: 0, value: 0, label: "Todos" }], ...dados.data]);
  }

  async function getProductsByCategoryId(categoryId) {
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
    let newCart = cart;
    let check_index = newCart.findIndex(p => p.product.id == product.id);
    let productToCart;

    if (check_index !== -1) {
      productToCart = newCart[check_index];
      newCart.splice(check_index, 1);
      productToCart.quantity++;
    } else {
      productToCart = {
        quantity: 1,
        price: product.price,
        product: product
      }
    }

    newCart = [...cart, productToCart]
    setCart(newCart);
  }

  function onChangeQuantity(productId, quantity) {
    let check_index = cart.findIndex(p => p.product.id == productId);
    let productToCart = cart[check_index];
    cart.splice(check_index, 1);

    if (quantity > 0) {
      productToCart.quantity = quantity;
      setCart([...cart, productToCart])
    }
    else {
      onRemoveProduct(productId)
    }
  }

  function onRemoveProduct(productId) {
    let newCart = cart.filter(p => p.product.id != productId);
    setCart(newCart)
  }

  function onCategorySelected(categoryId) {
    setActiveCategory(categoryId);
    pagination.page = 1;
    getProductsByCategoryId(categoryId);
  }

  function onCancelOrder() {
    setCart([])
  }

  async function onConfirmOrder(payment, cash) {
    try {
      let data = await api.post(`sale`, { saleProducts: cart, payment: payment, cash: cash }, await Auth.getAuthHeader());
      setOrderId(data.data.id);
      setPayment(payment);
      setModal('VOUCHER');
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
    <main className="App col-12 px-0 py-0" style={{ zIndex: '0' }}>

      <section className="col-12" style={{ backgroundColor: "#dfbe9f", height: "50px" }}>
        <section className="d-flex justify-content-between align-items-center" style={{height: "100%"}}> 
          <div><AiOutlineLeft/> VOLTAR</div>
          <div>2</div>
          <div>3</div>
        </section>      
      </section>

      <section className="col-12 px-0" style={{ backgroundColor: "#d9b18c" }}>
        <section className="d-flex justify-content-between">

          {/* CATEGORIAS */}          
          {/* <ul className="col-2 mx-0 px-0" style={{ listStyleType: "none" }}>
            {
              categories && categories.map((category, key) => {
                return <li className="my-1 py-2" key={category.value} onClick={() => onCategorySelected(category.id)} style={{ cursor: "pointer" }}>{category.label}</li>
              })
            }
          </ul> */}
          <div className="list-group col-2 mx-0 px-0">
            {
              categories && categories.map((category, key) => {
                return <a href="#" key={category.value} 
                  className={`list-group-item list-group-item-action ${activeCategory === category.id ? "active" : ""}`}
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
            <div className="col-12 row mx-0 px-0 justify-content-center" style={{ overflowY: 'auto', maxHeight: '98vh' }}>
              <div className="col-12 row mx-0 px-0" style={{ minHeight: '83vh' }}>
                <ul className="list-group col-12">
                  <p style={{ textAlign: 'center' }}><b>Carrinho</b></p>
                  {cart && cart.sort(function (a, b) {
                    if (a.product.name < b.product.name) { return -1; }
                    if (a.product.name > b.product.name) { return 1; }
                    return 0;
                  }).map((product, key) => <li key={key} className="row list-group-item d-flex align-items-center" style={{ height: '110px', borderRight: '0px', borderLeft: '0px' }}>
                    <div className="col-12 d-flex justify-content-between px-0">
                      <b>{product.product.name}</b>
                      <span>R$ {(product.quantity * product.product.price).toFixed(2)}</span>
                    </div>
                    <div className="col-12 px-0" style={{ color: 'gray', fontSize: '11px' }}>
                      {product.product.price && `R$ ${product.product.price.toFixed(2)} / un`}
                    </div>
                    <div className="col-12 d-flex justify-content-between px-0">
                      <AiOutlinePlusCircle style={{ cursor: 'pointer' }} onClick={() => onChangeQuantity(product.product.id, product.quantity + 1)} color='gray' size='30px' />
                      <div>{product.quantity}</div>
                      <AiOutlineMinusCircle style={{ cursor: 'pointer' }} onClick={() => onChangeQuantity(product.product.id, product.quantity - 1)} color='gray' size='30px' />
                      <AiOutlineRest style={{ cursor: 'pointer' }} onClick={() => onRemoveProduct(product.product.id)} color='IndianRed' size='30px' />
                    </div>
                  </li>)
                  }
                </ul>
              </div>
              <div className="col-12 row mx-0 px-0 mt-2 justify-content-center">
                <ul className="list-group col-12">
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Subtotal: <b>R$ {getTotalCart()}</b>
                  </li>
                </ul>
                <button type="button" onClick={() => onModalPayment()} className="btn btn-warning mt-2 mx-0" disabled={cart.length < 1}>Fechar pedido</button>
              </div>
            </div>
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
      </section>
    </main>
  );
}

export default Shop;