import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import React, { useState, useEffect } from 'react';
import Auth from '../../storage/Auth.storage';
import api from '../../services/api';
import Select from 'react-select';

function ModalComponent(props) {
  const [isOpen, setIsOpen] = useState(false)
  const [product, setProduct] = useState({ user: {id: localStorage.getItem("AuthorizationId")}})

  useEffect(() => {
    setIsOpen(props.isOpen);
    onEditModal();
  }, [])

  function onEditModal() {
    if (props.data !== undefined) {
      setProduct(props.data)
    }
  }

  function closeModal() {
    setIsOpen(!isOpen)
    props.onClose(false)
  }

  function saveModal() {
    props.onSave(product)
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
            <div className="form-group col-8">
              <label htmlFor='description'>Descrição</label>
              <input type='text' className="form-control" id='description' placeholder='Descrição'
                onChange={event => setProduct({ ...product, description: event.target.value })} value={product.description} />
            </div>
            <div className="form-group col-4">
              <label htmlFor='openValue'>Valor de abertura</label>
              <input type='text' className="form-control" id='openValue' placeholder='Valor de abertura'
                onChange={event => setProduct({ ...product, startValue: event.target.value })} value={product.startValue} />
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
