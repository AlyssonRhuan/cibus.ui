import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import React, { useState, useEffect } from 'react';
import IconsUtils from '../../utils/IconsUtils';
import { AiOutlineQrcode } from 'react-icons/ai';
import QRCode from "react-qr-code";

function ModalVoucher(props) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(props.isOpen);
  }, [])

  function closeModal() {
    setIsOpen(!isOpen)
    props.onClose(false)
  }

  function getTotalCart() {
    let total = 0;
    props.cart.map(product => total = total + (product.quantity * product.price))
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
              <div className="card mb-3" style={{ maxWidth: '540px;', border: '0px' }}>
                <div className="row g-0">
                  <div className="col-md-5" style={{ textAlign: 'center' }}>
                    <QRCode value={props}/>
                  </div>
                  <div className="px-0 py-0 card-body">
                    <ol className="list-group list-group-numbered">
                      <li className="list-group-item d-flex justify-content-between align-items-start">
                        <div className="ms-2 me-auto">
                          <h5>Código da compra</h5>
                          {props.orderId}
                        </div>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-start">
                        <div className="ms-2 me-auto">
                          <h5>Forma de pagamento</h5>
                          {props.payment.payment}
                        </div>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-start">
                        <div className="ms-2 me-auto">
                          <h5>Valor total</h5>
                          R$ {getTotalCart()}
                        </div>
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </ModalBody>

          <ModalFooter>
            <button type="button" onClick={() => props.onClose()} className="btn btn-warning">Fechar</button>
            <button type="button" className="btn btn-light">Imprimir</button>
          </ModalFooter>

        </Modal>
      </section>
    </main >
  );
}

export default ModalVoucher;
