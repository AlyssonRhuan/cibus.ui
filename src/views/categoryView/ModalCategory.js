import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

function ModalComponent(props) {
    const [isOpen, setIsOpen] = useState(false)
    const [category, setCategory] = useState({
      id: 0,
      nome: "",
      descricao: "",
      ativo: true,
      icone: ""
    })
    
  useEffect(() => {
    setIsOpen(props.isOpen);
    onEditModal();
  }, [])

  function onEditModal(){
    if(props.data != undefined){
      setCategory(props.data)
    }
  }

  function closeModal(){      
    setIsOpen(!isOpen)
    props.onClose(false)
  }

  function saveModal(){ 
    props.onSave(category)
    closeModal()
  }

  return (
    <main>
        <section>
            <Modal isOpen={isOpen}>

                <ModalHeader>
                    {props.title}
                </ModalHeader>
                
                <ModalBody>
                  <div className="form-group">
                    <label for='userName'>Name</label>
                    <input type='text' className="form-control" id='categoryName' placeholder='Category name'
                      onChange={event => setCategory({...category, nome:event.target.value})} value={category.nome}/>
                  </div>  
                  <div className="form-group">
                    <label for='userName'>Descricao</label>
                    <input type='text' className="form-control" id='categoryName' placeholder='Category name'
                      onChange={event => setCategory({...category, descricao:event.target.value})} value={category.descricao}/>
                  </div>  
                  <div class="form-check ml-3 col-10">
                    <input 
                      type="checkbox" 
                      class="form-check-input" 
                      id="checkboxIsAdmin"
                      onChange={event => setCategory({...category, ativo:event.target.checked})}
                      checked={category.ativo}/>
                    <label class="form-check-label" htmlFor="checkboxIsAdmin">Ativo</label>
                  </div>
                </ModalBody>

                <ModalFooter>
                    <button type="button" onClick={() => closeModal()} className="btn btn-light">Cancel</button>
                    <button type="button" onClick={() => saveModal()} className="btn btn-success">Save</button>
                </ModalFooter>

            </Modal>
        </section>
    </main>
  );
}

export default ModalComponent;