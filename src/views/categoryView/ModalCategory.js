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
    setIsOpen(!isOpen)
  }

  return (
    <main>
        <section>
            <Modal isOpen={isOpen}>

                <ModalHeader>
                    {props.title}
                </ModalHeader>
                
                <ModalBody className="row">                    
                  <div className="form-group col-12">
                    <label for='userName'>Name</label>
                    <input type='text' className="form-control" id='categoryName' placeholder='Category name'
                      onChange={event => setCategory({...category, name:event.target.value})} value={category.name}/>
                  </div>  

                  <div className="form-group col-12">
                    <label for='userName'>Description</label>
                    <input type='text' className="form-control" id='categoryName' placeholder='Category name'
                      onChange={event => setCategory({...category, description:event.target.value})} value={category.description}/>
                  </div>  
                                                               
                  <div className="form-group col-12">
                    <div className="custom-control custom-switch">
                      <input type="checkbox" className="custom-control-input" id="switchVisivel"  checked={category.active}
                        onChange={event => setCategory({...category, active:event.target.checked})} />
                      <label className="custom-control-label" htmlFor="switchVisivel">{category.active ? "Ativo" : "Não ativo"}</label>
                    </div>
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