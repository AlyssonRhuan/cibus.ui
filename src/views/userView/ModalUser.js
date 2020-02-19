import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import React, { useState, useEffect } from 'react';
import api from '../../services/api'
import Select from 'react-select'
import { act } from 'react-dom/test-utils';

function ModalComponent(props) {
    const [isOpen, setIsOpen] = useState(false)
    const [actions, setActions] = useState("")
    const [profiles, setListProfiles] = useState("")
    const [user, setUser] = useState({
      "actionRead": false,
      "actionAdd": false,
      "actionUpdate": false,
      "actionRemove": false
    })

    const listAction = [
      { value: 'actionAdd',    label : 'Adicionar'},
      { value: 'actionUpdate',     label : 'Atualizar'},
      { value: 'actionRead',     label : 'Ler'},
      { value: 'actionRemove',  label : 'Remover'}
    ]
    
  useEffect(() => {
    getListProfiles();
    setIsOpen(props.isOpen);
    onEditModal();
  }, [])

  useEffect(() => {
    getActionsFromData();
  }, [user])

  async function getListProfiles() {
      const dados = await api.get(`profile/valuelabel`);
      setListProfiles(dados.data);
  }

  function getActionsFromData(){ 
    let actionsFromData = []

    if(user && user.get){
      actionsFromData.push({ value: 'actionRead', label : 'Ler'});
    }
    if(user && user.post){
      actionsFromData.push({ value: 'actionAdd', label : 'Adicionar'});
    }
    if(user && user.put){
      actionsFromData.push({ value: 'actionUpdate', label : 'Atualizar'});
    }
    if(user && user.delete){
      actionsFromData.push({ value: 'actionRemove', label : 'Remover'});
    }

    setActions(actionsFromData);
  }

  function onEditModal(){ 
    if(props.data !== undefined){
      setUser(props.data);
    }
  }

  function closeModal(){      
    setIsOpen(!isOpen)
    props.onClose(false)
  }

  function saveModal(){ 
    user.actionRead = false;
    user.actionAdd = false;
    user.actionUpdate = false;
    user.actionRemove = false;

    actions && actions.map(
      action => user[action.value] = true
    ) 

    props.onSave(user)
    closeModal()
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
                    <label htmlFor='userName'>Name</label>
                    <input type='text' className="form-control" id='userName' placeholder='User name'
                      onChange={event => setUser({...user, name:event.target.value})} value={user.name}/>
                  </div>   
                  <div className="form-group col-12">
                    <label htmlFor='userEmail'>Email</label>
                    <input type='text' className="form-control" id='userEmail' placeholder='User email'
                      onChange={event => setUser({...user, email:event.target.value})} value={user.email}/>
                  </div>        
                  <div className="form-group col-6">
                    <label htmlFor='userLogin'>Login</label>
                    <input type='text' className="form-control" id='userLogin' placeholder='User login'
                      onChange={event => setUser({...user, login:event.target.value})} value={user.login}/>
                  </div>                
                  <div class="form-group col-6">
                    <label htmlFor="profile">Profile</label>
                    <Select className="basic-multi-select" classNamePrefix="select" 
                      onChange={event => setUser({...user, profile:event})}
                      options={profiles} value={user.profile}/>
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