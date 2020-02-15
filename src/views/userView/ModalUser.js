import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import React, { useState, useEffect } from 'react';
import Select from 'react-select'

function ModalComponent(props) {
    const [isOpen, setIsOpen] = useState(false)
    const [user, setUser] = useState("")
    const [actions, setActions] = useState("")
    const [passConfirm, setPassConfirm] = useState("")

    const listAction = [
      { value: 'ADI', label : 'Adicionar'},
      { value: 'ATU', label : 'Atualizar'},
      { value: 'LER', label : 'Ler'},
      { value: 'REM', label : 'Remover'}
    ]
    
  useEffect(() => {
    setIsOpen(props.isOpen);
    onEditModal();
  }, [])

  function onEditModal(){
    if(props.data !== undefined){
      setUser(props.data)
    }
  }

  function closeModal(){      
    setIsOpen(!isOpen)
    props.onClose(false)
  }

  function saveModal(){ 
    if(user.pass !== passConfirm){
      window.alert("Senha não confere");
    }
    else{
      props.onSave(user)
      closeModal()
    }
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
                    <input type='text' className="form-control" id='userName' placeholder='User name'
                      onChange={event => setUser({...user, name:event.target.value})} value={user.name}/>
                  </div>   
                  <div className="form-group col-12">
                    <label for='userLogin'>Login</label>
                    <input type='text' className="form-control" id='userLogin' placeholder='User login'
                      onChange={event => setUser({...user, login:event.target.value})} value={user.login}/>
                  </div>   
                  <div className="form-group col-12">
                    <label for='userPass'>Profile</label>
                    <input type='password' className="form-control" id='userPass' placeholder='User password'
                      onChange={event => setUser({...user, pass:event.target.value})} value={user.pass}/>
                  </div>   
                  <div className="form-group col-12">
                    <label htmlFor="productCategory">Actions</label>
                    <Select isMulti className="basic-multi-select" classNamePrefix="select" 
                      onChange={event => setActions(event)}
                      options={listAction} value={actions}/>
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