import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import React, { useState, useEffect } from 'react';
import Rotas from '../../configs/Rotas'

function ModalComponent(props) {
    const [isOpen, setIsOpen] = useState(false)
    const [profile, setProfile] = useState({})
    const [rotas, setRotas] = useState();
    
  useEffect(() => {
    Rotas().then(res => {
      setRotas(res)
    });
    setIsOpen(props.isOpen);  
    onEditModal();
  }, [])

  function onEditModal(){
    if(props.data != undefined){
      setProfile(props.data)
    }
  }

  function closeModal(){      
    setIsOpen(!isOpen)
    props.onClose(false)
  }

  function saveModal(){ 
    props.onSave(profile) 
    setIsOpen(!isOpen)
  }

  function atualizarTela(route){
    if(isProfileHasView(route)){
      const novasTelas = profile.telas.filter(
        tela => {return tela.id != route.id}
      )
      setProfile({...profile, telas:novasTelas})
    }
    else{
      if(profile.telas)
        setProfile({...profile, telas:[...profile.telas, route]})
      else
        setProfile({...profile, telas:[route]})
    }      
  }

  function isRouteChecked(route){ 
    return isProfileHasView(route);
  }

  function isProfileHasView(route){ 
    let retorno = false;
    profile && profile.telas && profile.telas.map(
      tela => {
        if(tela.id === route.id)
          retorno = true;
      }
    )
    return retorno;
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
                    <input type='text' className="form-control" id='profileName' placeholder='Profile name'
                      onChange={event => setProfile({...profile, nome:event.target.value})} value={profile.nome}/>
                  </div>  
               
                  <div className="form-group col-12">
                    <label htmlFor='userName'>Telas</label>
                    <div className="form-group col-12"  style={{overflowY:"auto", height:"150px"}}>
                      {
                        rotas && rotas.map(
                          rota => <div className="custom-control custom-switch py-1 pl-4">
                              <input type="checkbox" className="custom-control-input" id={[rota.id]} 
                                checked={isRouteChecked(rota)}
                                onChange={event => atualizarTela(rota)} />
                              <label className="custom-control-label" htmlFor={[rota.id]}>{rota.nome}</label>
                            </div>
                        )                    
                      }
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