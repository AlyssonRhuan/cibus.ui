import React, { useState, useEffect } from 'react';
import { AiOutlinePlusCircle, AiOutlineMinusCircle, AiOutlineRest } from 'react-icons/ai';

function Cart(props) {
  const [cart, setCart] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [totalCart, setTotalCart] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsOpen(props.isOpen);
    setCart(props.cart);
  }, [])

  function onConfirmOrder() {
    props.onModalPayment();
  }

  function getTotalCart() {
    let total = 0;
    cart.map(product => total = total + (product.quantity * product.price))
    return total.toFixed(2);
  }

  return (
    <main>
      <section>
        <div className="col-12 row mx-0 px-0 justify-content-center" style={{ overflowY: 'auto', maxHeight: '98vh' }}>
          <div className="col-12 row mx-0 px-0" style={{ minHeight: '83vh' }}>
            <ul className="list-group col-12">
              <p style={{ textAlign: 'center' }}><b>Carrinho</b></p>
              {cart && cart.map((product, key) => <li key={key} className="row list-group-item d-flex align-items-center" style={{ height: '110px', borderRight: '0px', borderLeft: '0px' }}>
                <div className="col-12 d-flex justify-content-between px-0">
                  <b>{product.product.name}</b>
                  <span>R$ {(product.quantity * product.product.price).toFixed(2)}</span>
                </div>
                <div className="col-12 px-0" style={{ color: 'gray', fontSize: '11px' }}>
                  {product.product.price && `R$ ${product.product.price.toFixed(2)} / un`}
                </div>
                <div className="col-12 d-flex justify-content-between px-0">
                  <AiOutlinePlusCircle style={{cursor: 'pointer'}} onClick={() => props.onChangeQuantity(product.product.id, product.quantity + 1)} color='gray' size='30px' />
                  <div>{product.quantity}</div>
                  <AiOutlineMinusCircle style={{cursor: 'pointer'}} onClick={() => props.onChangeQuantity(product.product.id, product.quantity - 1)}  color='gray' size='30px' />
                  <AiOutlineRest style={{cursor: 'pointer'}} onClick={() => props.onRemoveProduct(product.product.id)}  color='IndianRed' size='30px' />
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
            <button type="button" onClick={() => onConfirmOrder(cart)} className="btn btn-warning mt-2 mx-0" disabled={cart.length < 1}>Fechar pedido</button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Cart;



