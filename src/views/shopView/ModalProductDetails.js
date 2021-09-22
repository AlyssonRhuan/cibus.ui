import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import React, { useState, useEffect } from 'react';
import IconsUtils from '../../utils/IconsUtils';

function ModalProductDetails(props) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(props.isOpen);
  }, [])

  function closeModal() {
    setIsOpen(!isOpen)
    props.onClose(false)
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
                  <div className="col-md-4">
                    <img src={props.product.image ? props.product.image : IconsUtils.Logo} className="img-fluid rounded-start" alt={props.product.name}
                      style={{ position: 'relative', top: '50%', transform: 'translateY(-50%)' }} />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">{props.product.name}</h5>
                      <p className="card-text">{props.product.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ModalBody>

          <ModalFooter>
            <p className="card-text"><small className="text-muted">Preço unitário R$ {props.product.price.toFixed(2)}</small></p>
          </ModalFooter>

        </Modal>
      </section>
    </main>
  );
}

export default ModalProductDetails;
