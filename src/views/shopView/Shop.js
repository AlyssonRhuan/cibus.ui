import Loading from '../../components/Loading';
import React, { useState, useEffect } from 'react';
import IconsUtils from '../../utils/IconsUtils';
import Toast from '../../components/Toast';
import api from '../../services/api';
import Auth from '../../storage/Auth.storage';
import { AiOutlineShoppingCart } from 'react-icons/ai'
import ModalCart from './ModalCart';

const END_POINT = ''
const PAGE_TITLE = 'Purchase'

function Shop(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState(0);
  const [pagination, setPagination] = useState({  });
  const [cart, setCart] = useState([]);
  const [modal, setModal] = useState();

  const [categories, setCategories] = useState();
  const [products, setProducts] = useState();

  useEffect(() => {
    getAllCategories();    
    getProductsByCategoryId(0);
  }, [])

  // FUNÇÕES PARA ABRIR MODAL

  function openModal(modal, dado = undefined) {
    setModal(modal);
  }

  function closeModal() {
    setModal(undefined);
  }

  // FUNÇÕES 

  async function getAllCategories(){    
    setIsLoading(true);
    const dados = await api.get(`category/valuelabel`, await Auth.getAuthHeader());
    setCategories([...[{id: 0, value: 0, label: "Todos"}], ...dados.data]);
    setIsLoading(false);
  }

  async function getProductsByCategoryId(categoryId){    
    setIsLoading(true);
    const dados = await api.get(`product/category/${categoryId}?page=${pagination.page || 1}&quantity=${pagination.quantity || 6}`, await Auth.getAuthHeader());
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

  function onNextPage(){
    if(pagination.page < pagination.totalPages){
      pagination.page = pagination.page + 1;
    }
    getProductsByCategoryId(activeCategory);
  }

  function onPreviousPage(){
    if(pagination.page > 1){
      pagination.page = pagination.page - 1;
    }
    getProductsByCategoryId(activeCategory);
  }

  function onBuy(product){
    var productNotUpdated = true;

    cart.map(p => {
      if(p.product.id === product.id){
        p.quantity++;
        productNotUpdated = false;
        setCart(cart)
      }
    })
    
    if(productNotUpdated){
      let productToCart = {
        quantity: 1,
        price: product.price,
        product: product
      }

      setCart([...cart, productToCart])
    }
    
    Toast.success(`O produto ${product.name} foi adicionado ao carrinho`)
  }

  function onCategorySelected(categoryId){
    setActiveCategory(categoryId);
    pagination.page = 1;
    getProductsByCategoryId(categoryId);
  }

  function onCancelOrder(){
    setCart([])
  }
  
  async function onConfirmOrder(){
    try {
      setIsLoading(true);
      await api.post(`sale/all`, cart, await Auth.getAuthHeader());
      Toast.success(`Compra realizada com sucesso.`)
    }
    catch (e) {
      error(e);
    }

    setIsLoading(false);
    setCart([])
    closeModal();
  }

  function error(e) {
    Toast.error(e.response ? e.response.data.message : e.message);
    console.error(e.response ? e.response.data.message : e.message);
  }

  // RENDER

  return (
    <main className="col-12" style={{zIndex: '0'}}>
      {isLoading
        ? <Loading />
        : <section className="row px-0 px-0">

            <div className="list-group col-2 mx-0 px-0" style={{backgroundColor: ''}}>
              {
                categories && categories.map((category, key) => {
                  return  <a href="#" key={category.value} className={`list-group-item list-group-item-action ${activeCategory === category.id ? "active" : ""}`}
                  onClick={() => onCategorySelected(category.id)}>{category.label}</a>
                })
              }
            </div>

            <div className="col-10 row mx-0 px-0" style={{overflowY: 'auto', height: '80vh', backgroundColor: ''}}>
              {products && products.map( (product, key) => {
                return <div className="col-4 mb-1">
                        <div className="card"  key={key} >
                          <div className="row g-0">
                            <div className="col-md-5">
                              <img src={product.image ? product.image : IconsUtils.Logo} className="card-img-top" 
                              style={{maxHeight: '100px', maxWidth: '100px', height: 'auto', width: 'auto', 
                              position: 'relative', top: '50%', transform: 'translateY(-50%)'}} alt="..."/>
                            </div>
                            <div className="col-md-7">
                              <div className="card-body">
                                <h5 className="card-title">{product.name}</h5>
                                {/* <p className="card-text">{product.description}</p> */}
                                <p class="card-text"><small class="text-muted">{product.price && `R$ ${product.price.toFixed(2)}`}</small></p>
                                <a href="#" onClick={() => onBuy(product)} className="btn btn-success">Comprar</a>
                              </div>
                            </div>
                          </div>
                        </div>
                </div>
              })}

              <div className="col-12 row justify-content-between mx-0">
                {
                  pagination && <div>
                    <nav aria-label="Page navigation example" style={{width: '100%'}}>
                    <ul className="pagination">
                      <li className={`page-item ${pagination.first ? "disabled" : ""}`}>
                        <a className="page-link" href="#" tabindex="-1" aria-disabled={`${pagination.first ? "true" : "false"}`} onClick={() => onPreviousPage()}>Anterior</a>
                      </li>
                      <li className="page-item disabled">
                        { pagination ? <a className="page-link" href="#" tabindex="-1" aria-disabled="true">{pagination.page} de {pagination.totalPages}</a> : "0"}
                      </li>
                      <li className={`page-item ${pagination.last ? "disabled" : ""}`}>
                        <a className="page-link" href="#" aria-disabled={`${pagination.last ? "true" : "false"}`} onClick={() => onNextPage()}>Próximo</a>
                      </li>
                    </ul>
                  </nav>
                  </div>
                }
              
                <div>
                  <button type="button" className="btn btn-warning ml-2" onClick={() => openModal('ADD')}>
                    <AiOutlineShoppingCart/> Carrinho <span className="badge badge-light">{cart.length}</span>
                  </button>
                </div>
            </div>
          </div>    
          <section>
            {/* MODAIS */}
            {
              modal && modal === 'ADD' && <ModalCart
                title={`Carrinho`}
                cart={cart}
                onClose={closeModal}
                onCancelOrder={onCancelOrder}
                onConfirmOrder={onConfirmOrder}
                isOpen={modal === 'ADD'} />
            }
          </section>
        </section>
      }
    </main>
  );
}

export default Shop;