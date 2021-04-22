import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import React, { useState, useEffect } from 'react';
import Auth from '../../storage/Auth.storage';
import api from '../../services/api';
import Select from 'react-select';
import IconsUtils from '../../utils/IconsUtils';
import { AiOutlinePlus, AiOutlineLine } from 'react-icons/ai';

function ModalCart(props) {
  const [isOpen, setIsOpen] = useState(false)
  const [cart, setCart] = useState([]);
  const [totalCart, setTotalCart] = useState(0);
  const [openCashs, setOpenCashs] = useState([]);
  const [payments, setPayments] = useState([
    {id:1, payment:'Dinheiro', value:30},
    {id:3, payment:'Cartão de crédito', value:10}
  ]);

  useEffect(() => {
    setIsOpen(props.isOpen);
    setCart(props.cart);
    getAllOpenCashs();
  }, [])

  function closeModal() {
    setIsOpen(!isOpen)
    props.onClose(false)
  }

  async function getAllOpenCashs(){    
    const dados = await api.get(`cash/all/open`, await Auth.getAuthHeader());
    setOpenCashs(dados.data);
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

  function onIncreasingQuantity(productId){
    cart.map(product => {
      if(product.product.id === productId){
        product.quantity = product.quantity + 1;
      }
    })
  }
  
  function onDecreasingQuantity(productId){
    cart.map(product => {
      if(product.product.id === productId){
        product.quantity = product.quantity + 1;
      }
    })
  }

  function getTotalCart(){
    let total = 0;
    cart.map( product => total = total + ( product.quantity * product.price ) )
    return total.toFixed(2);
  }

  return (
    <main>
      <section>
        <Modal size="lg" isOpen={isOpen}>

          <ModalHeader toggle={() => closeModal()}>
            {props.title}
          </ModalHeader>

          <ModalBody className="row">
            <div className="form-group col-12">
              <label htmlFor='nomeProduto'>Selecione um caixa</label>
              <select className="form-control" aria-label="Default select example">
                {
                  openCashs && openCashs.map(
                    (cash, key) => {
                      return <option value={cash.id} key={key}>{cash.description} - R$ {cash.currentValue.toFixed(2)}</option>
                    }
                  )
                }
              </select>
            </div>
            <div className="form-group col-12 mb-0">
              <label htmlFor='nomeProduto'>Formas de pagamento</label>
            </div>
            <div className="form-group col-4 mb-0">
              <select className="form-control" aria-label="Default select example">
                  <option value="dinheiro" >Dinheiro</option>
                  <option value="dinheiro" >Cartão de crédito</option>
                  <option value="dinheiro" >Cartão de débito</option>
                  <option value="dinheiro" >Credito em conta</option>
              </select>
            </div>
            <div className="form-group col-4 mb-0">
              <input type='text' className="form-control" id='nomeProduto' placeholder='Valor'/>
            </div>
            <div className="form-group col-4 mb-0">
              <button type="button" className="btn btn-light">Adicionar pagamento</button>
            </div>
            <div className="form-group col-12">
              <ol className="list-group list-group-numbered">
                {
                  payments && payments.map(
                    (payment, key) => {
                      return <li key={key} className="list-group-item d-flex justify-content-between align-items-start">
                        <div className="ms-2 me-auto">
                          <div className="fw-bold">{payment.payment}</div>
                          R$ {payment.value.toFixed(2)}
                        </div>
                        <button type="button" class="btn btn-outline-primary">Remover</button>
                      </li>
                    }
                  )
                }
              </ol>
            </div>
          </ModalBody>

          <ModalFooter>
            <p className="mr-5">Total R$ { getTotalCart() }</p>
            <button type="button" onClick={() => onCancelOrder()} className="btn btn-light">Cancelar pedido</button>
            <button type="button" onClick={() => onConfirmOrder(cart)} className="btn btn-success">Comprar</button>
          </ModalFooter>

        </Modal>
      </section>
    </main>
  );
}

export default ModalCart;
