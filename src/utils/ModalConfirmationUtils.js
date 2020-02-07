import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

function ModalConfirmationUtils(props) {
    const [isOpen, setIsOpen] = useState(false)
    
  useEffect(() => {
    setIsOpen(props.isOpen)
  }, [])

  function response(response){ 
    props.onResponse(response)
    closeModal()
  }

  function closeModal(){      
    setIsOpen(!isOpen)
    props.onClose(false)
  }

  return (
    <main>
        <section>
            <Modal isOpen={isOpen}>

                <ModalHeader>
                    {props.title}
                </ModalHeader>
                
                <ModalBody>
                  <span>
                    {props.text}
                  </span>
                </ModalBody>

                <ModalFooter>
                    <button type="button" onClick={() => response(true)} className="btn btn-success">Yes</button>
                    <button type="button" onClick={() => response(false)} className="btn btn-danger">No</button>
                </ModalFooter>

            </Modal>
        </section>
    </main>
  );
}

export default ModalConfirmationUtils;
