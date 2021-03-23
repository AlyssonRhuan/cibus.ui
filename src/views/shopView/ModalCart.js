import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import React, { useState, useEffect } from 'react';
import Auth from '../../storage/Auth.storage';
import api from '../../services/api';
import Select from 'react-select';
import IconsUtils from '../../utils/IconsUtils';

function ModalCart(props) {
  const [isOpen, setIsOpen] = useState(false)
  const [totalCart, setTotalCart] = useState(0)

  useEffect(() => {
    setIsOpen(props.isOpen);
  }, [])

  function closeModal() {
    setIsOpen(!isOpen)
    props.onClose(false)
  }

  function saveModal() {
    props.onSave()
    setIsOpen(!isOpen)
  }

  function onCancelOrder(){
    props.onCancelOrder();
    closeModal();
  }

  function onConfirmOrder(){
    props.onConfirmOrder();
    closeModal();
  }

  function getTotalCart(){
    let total = 0;
    props.cart.map( product => total = total + ( product.quantity * product.price ) )
    return total.toFixed(2);
  }

  return (
    <main>
      <section>
        <Modal isOpen={isOpen}>

          <ModalHeader toggle={() => closeModal()}>
            {props.title}
          </ModalHeader>

          <ModalBody className="row">
            {
              props.cart && props.cart.map( 
                (product, key) => {
                  return <div className="col-12 mb-1">
                          <div className="card"  key={key} >
                            <div className="row g-0">
                              <div className="col-md-4">
                                <img src={product.product.image ? product.product.image : IconsUtils.Logo} className="card-img-top" 
                                style={{maxHeight: '100px', maxWidth: '100px', height: 'auto', width: 'auto', 
                                position: 'relative', top: '50%', transform: 'translateY(-50%)'}} alt="..."/>
                              </div>
                              <div className="col-md-8">
                                <div className="card-body">
                                  <h5 className="card-title mb-0">{product.product.name}</h5>
                                  <p className="card-text">
                                    Quantidade: {product.quantity}<br/>
                                    Preço unitário: R$ {product.price.toFixed(2)}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                }
              )
            }
          </ModalBody>

          <ModalFooter>
            <p className="mr-5">Total R$ { getTotalCart() }</p>
            <button type="button" onClick={() => onCancelOrder()} className="btn btn-light">Cancelar pedido</button>
            <button type="button" onClick={() => onConfirmOrder()} className="btn btn-success">Comprar</button>
          </ModalFooter>

        </Modal>
      </section>
    </main>
  );
}

export default ModalCart;
