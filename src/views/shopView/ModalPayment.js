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
  const [openCashs, setOpenCashs] = useState([]);
  const [payment, setPayment] = useState();
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
    const dados = await api.get(`payment`, await Auth.getAuthHeader());
    setPaymentMethods(dados.data);
  }

  function onCancelOrder() {
    props.onCancelOrder();
    closeModal();
  }

  function onConfirmOrder() {
    props.onConfirmOrder(payment);
    closeModal();
  }

  function onSelectPayment(payment, key) {
    setPayment(payment);
    setPaymentKey(key);
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
              <ol className="list-group list-group-numbered">
                {
                  paymentsMethods && paymentsMethods.map((payment, key) => {
                    return <li key={key} className={`list-group-item d-flex justify-content-between align-items-start ${paymentKey == key ? 'list-group-item-primary' : ''}`}
                      onClick={() => onSelectPayment(payment, key)}>
                      <div className="ms-2 me-auto">
                        <div className="fw-bold">{payment.payment}</div>
                        <small>{payment.description}</small>
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
            <button type="button" onClick={() => onConfirmOrder()} className="btn btn-success" disabled={payment == null}>Comprar</button>
          </ModalFooter>

        </Modal>
      </section>
    </main>
  );
}

export default ModalCart;
