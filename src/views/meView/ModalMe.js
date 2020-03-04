import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import React, { useState, useEffect } from 'react';
import Icons from '../../utils/IconsUtils'

function ModalComponent(props) {
    const [isOpen, setIsOpen] = useState(false)
    const [user, setUser] = useState({})

    const [cardProfileAdmin, setCardProfileAdmin] = useState(false)
    const [cardProfileSalesman, setCardProfileSalesman] = useState(false)
    
  useEffect(() => {
    setIsOpen(props.isOpen);
    onEditModal();
  }, [])

  function onEditModal(){ 
    if(props.data !== undefined){
      setUser(props.data);

      props.data.profiles.map(profile => {
        profile === "ADMIN" && setCardProfileAdmin(true);
        profile === "SALESMAN" && setCardProfileSalesman(true);
      })
    }
  }

  function closeModal(){      
    setIsOpen(!isOpen)
    props.onClose(false)
  }

  function saveModal(){ 
    let profiles = [];

    cardProfileAdmin && profiles.push(1);
    cardProfileSalesman && profiles.push(2);

    user.profiles = profiles;

    props.onSave(user);
    closeModal();
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
                  <div className="form-group col-6">
                    <label htmlFor='imagemProduto'>Image</label> 
                    <div className="custom-file">
                      <input type="file" className="custom-file-input" id="validatedCustomFile" required/>
                      <label className="custom-file-label" htmlFor="validatedCustomFile">Pick a image...</label>
                      <div className="invalid-feedback">Example invalid custom file feedback</div>
                    </div>
                  </div>     
                  <div className="form-group col-6" title="Profile Admin has full access">
                    <div class={`card text-center card_profile ${cardProfileAdmin && "border-primary"}`}
                      onClick={() => setCardProfileAdmin(!cardProfileAdmin)}>
                      <img class="card-img-top icon_large pt-3" src={Icons.Profile} alt="Card image cap" style={{width: "100%", height:"60px"}}/>
                      <div class="card-body">
                        <h5 class="card-title">Admin</h5>
                      </div>
                    </div>
                  </div>  
                  <div className="form-group col-6" title="Profile Salesman has no access to Admin pages">
                    <div class={`card text-center card_profile ${cardProfileSalesman && "border-primary"}`}
                      onClick={() => setCardProfileSalesman(!cardProfileSalesman)}>
                      <img class="card-img-top icon_large pt-3" src={Icons.User} alt="Card image cap" style={{width: "100%", height:"60px"}}/>
                      <div class="card-body">
                        <h5 class="card-title">Salesman</h5>
                      </div>
                    </div>
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