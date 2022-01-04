import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

function ModalComponent(props) {
  const [isOpen, setIsOpen] = useState(false)
  const [payment, setPayment] = useState({
    id: 0,
    payment: "",
    description: "",
    visible: true
  })

  useEffect(() => {
    setIsOpen(props.isOpen);
    onEditModal();
  }, [])

  function onEditModal() {
    if (props.data != undefined) {
      setPayment(props.data)
    }
  }

  function closeModal() {
    setIsOpen(!isOpen)
    props.onClose(false)
  }

  function saveModal() {
    props.onSave(payment)
    setIsOpen(!isOpen)
  }

  return (
    <main>
      <section>
        <Modal size="lg" isOpen={isOpen}>

          <ModalHeader>
            {props.title}
          </ModalHeader>

          <ModalBody className="row">
            <div className="form-group col-12">
              <label for='userName'>Nome</label>
              <input type='text' className="form-control" id='categoryName' placeholder='Forma de pagamento'
                onChange={event => setPayment({ ...payment, payment: event.target.value })} value={payment.payment} />
            </div>

            <div className="form-group col-12">
              <label for='userName'>Descrição</label>
              <input type='text' className="form-control" id='categoryName' placeholder='Descrição'
                onChange={event => setPayment({ ...payment, description: event.target.value })} value={payment.description} />
            </div>

            <div className="form-group col-6">
              <div className="custom-control custom-switch">
                <input type="checkbox" className="custom-control-input" id="switchVisiblel" checked={payment.visible}
                  onChange={event => setPayment({ ...payment, visible: event.target.checked })} />
                <label className="custom-control-label" htmlFor="switchVisiblel">{payment.visible ? "Visível" : "Não visível"}</label>
              </div>
            </div>

            <div className="form-group col-6">
              <div className="custom-control custom-switch">
                <input type="checkbox" className="custom-control-input" id="switchMoveCash" checked={payment.isCashMoviment}
                  onChange={event => setPayment({ ...payment, isCashMoviment: event.target.checked })} />
                <label className="custom-control-label" htmlFor="switchMoveCash">{payment.isCashMoviment ? "Movimenta o caixa" : "Não movimenta o caixa"}</label>
              </div>
            </div>
          </ModalBody>

          <ModalFooter>
            <button type="button" onClick={() => closeModal()} className="btn btn-light">Cancelar</button>
            <button type="button" onClick={() => saveModal()} className="btn btn-success">Salvar</button>
          </ModalFooter>

        </Modal>
      </section>
    </main>
  );
}

export default ModalComponent;