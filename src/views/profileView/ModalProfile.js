import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import React, { useState, useEffect } from 'react';
import Rotas from '../../configs/Routes'

function ModalComponent(props) {
    const [isOpen, setIsOpen] = useState(false)
    const [profile, setProfile] = useState({})
    const [routes, setRoutes] = useState();
    
  useEffect(() => {
    Rotas().then(res => {
      setRoutes(res)
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
      const novasTelas = profile.views.filter(
        tela => {return tela.id != route.id}
      )
      setProfile({...profile, views:novasTelas})
    }
    else{
      if(profile.views)
        setProfile({...profile, views:[...profile.views, route]})
      else
        setProfile({...profile, views:[route]})
    }      
  }

  function isRouteChecked(route){ 
    return isProfileHasView(route);
  }

  function isProfileHasView(route){ 
    let retorno = false;
    profile && profile.views && profile.views.map(
      view => {
        if(view.id === route.id)
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
                      onChange={event => setProfile({...profile, name:event.target.value})} value={profile.name}/>
                  </div>  
                                                               
                  <div className="form-group col-12">                    
                    <label htmlFor='userName'>Views</label>                    
                    <div className="form-group col-12"  style={{overflowY:"auto", height:"150px"}}>                      
                      {
                        routes && routes.map(
                          (route, key) => <div className="custom-control custom-switch">
                            <input type="checkbox" className="custom-control-input" id={[route.id]} checked={isRouteChecked(route)}
                              onChange={event => atualizarTela(route)} />
                            <label className="custom-control-label" htmlFor={[route.id]}>{route.name}</label>
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