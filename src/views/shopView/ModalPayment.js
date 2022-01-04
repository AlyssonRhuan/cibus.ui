import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import React, { useState, useEffect } from 'react';
import Auth from '../../storage/Auth.storage';
import api from '../../services/api';
import Select from 'react-select';
import IconsUtils from '../../utils/IconsUtils';
import { FaCashRegister } from "react-icons/fa";
import { AiOutlinePlus, AiOutlineLine } from 'react-icons/ai';

function ModalCart(props) {
  const [isOpen, setIsOpen] = useState(false)
  const [cart, setCart] = useState([]);
  const [openCashs, setOpenCashs] = useState([]);
  const [payment, setPayment] = useState();
  const [cash, setCash] = useState();
  const [cashKey, setCashKey] = useState();
  const [paymentKey, setPaymentKey] = useState();
  const [paymentsMethods, setPaymentMethods] = useState();

  useEffect(() => {
    setIsOpen(props.isOpen);
    setCart(props.cart);
    getAllOpenCashs();
    getPaymentMothods();
  }, [])

  function closeModal() {
    setIsOpen(!isOpen)
    props.onClose(false)
  }

  async function getAllOpenCashs() {
    const dados = await api.get(`cash/all/open`, await Auth.getAuthHeader());
    setOpenCashs(dados.data);
  }

  async function getPaymentMothods() {
    const dados = await api.get(`payment/visible`, await Auth.getAuthHeader());
    setPaymentMethods(dados.data);
  }

  function onCancelOrder() {
    props.onCancelOrder();
    closeModal();
  }

  function onConfirmOrder() {
    props.onConfirmOrder(payment, cash);
    closeModal();
  }

  function onSelectPayment(payment, key) {
    setPayment(payment);
    setPaymentKey(key);
  }

  function onSelectCash(cash, key) {
    setCash(cash);
    setCashKey(key);
  }

  function getTotalCart() {
    let total = 0;
    cart.map(product => total = total + (product.quantity * product.price))
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
              <ol className="list-group list-group-numbered">
                {
                  openCashs && openCashs.map((cash, key) => {
                    return <li key={key} className={`list-group-item d-flex justify-content-between align-items-start ${cashKey == key ? 'list-group-item-primary' : ''}`}
                      onClick={() => onSelectCash(cash, key)}>
                      <div className="ms-2 me-auto">
                        <div className="fw-bold">{cash.description}</div>
                        <small>R$ {cash.currentValue.toFixed(2)}</small>
                      </div>
                    </li>
                  })
                }
              </ol>
            </div>
            <div className="form-group col-12">
              <label htmlFor='nomeProduto'>Formas de pagamento</label>
              <ol className="list-group list-group-numbered">
                {
                  paymentsMethods && paymentsMethods.map((payment, key) => {
                    return <li key={key} className={`list-group-item d-flex justify-content-between align-items-start ${paymentKey == key ? 'list-group-item-primary' : ''}`}
                      onClick={() => onSelectPayment(payment, key)}>
                      <div className="ms-2 me-auto">
                        <div className="fw-bold">{payment.payment}</div>
                        <small>{payment.description}</small>
                      </div>
                      <div data-toggle="tooltip" title="Movimenta o caixa">
                        {payment.isCashMoviment && <FaCashRegister color="gray" />}
                      </div>

                    </li>
                  })
                }
              </ol>
            </div>
          </ModalBody>

          <ModalFooter>
            <p className="mr-5">Total R$ {getTotalCart()}</p>
            <button type="button" onClick={() => onCancelOrder()} className="btn btn-light">Cancelar pedido</button>
            <button type="button" onClick={() => onConfirmOrder()} className="btn btn-success" disabled={payment == null || cash == null}>Comprar</button>
          </ModalFooter>

        </Modal>
      </section>
    </main>
  );
}

export default ModalCart;
