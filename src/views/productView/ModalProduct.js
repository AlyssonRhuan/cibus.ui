import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import DataBaseService from '../../services/DataBaseService'

function ModalComponent(props) {
  const [isOpen, setIsOpen] = useState(false)
  const [product, setProduct] = useState("")

  // VARIAVEIS UTILIZAVEIS NO MODAL
  const [listCategorys, setListCategorys] = useState();
    
  useEffect(() => {
    getListCategorys();
    setIsOpen(props.isOpen);
    onEditModal();
  }, [])

  async function getListCategorys() {
    const dados = await DataBaseService.getAll('categorys')
    setListCategorys(dados)
  }

  function onEditModal(){
    if(props.data != undefined){
      setProduct(props.data)
    }
  }

  function closeModal(){      
    setIsOpen(!isOpen)
    props.onClose(false)
  }

  function saveModal(){ 
    props.onSave(product)
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
                    <label for='productName'>Name</label>
                    <input type='text' className="form-control" id='productName' placeholder='Product name'
                      onChange={event => setProduct({...product, name:event.target.value})} value={product.name}/>
                  </div>   
                  <div className="form-group">
                    <label for="productCategory">Category</label>
                    <select className="form-control" id="productCategory" onChange={event => setProduct({...product, category:event.target.value})} value={product.category}>
                      <option></option>
                      {
                        listCategorys && listCategorys.map((category) => 
                          <option>{category.name}</option>
                        )
                      }
                    </select>
                  </div>     
                </ModalBody>

                <ModalFooter>
                    <button type="button" onClick={() => closeModal()} className="btn btn-danger">Cancel</button>
                    <button type="button" onClick={() => saveModal()} className="btn btn-success">Save</button>
                </ModalFooter>

            </Modal>
        </section>
    </main>
  );
}

export default ModalComponent;
