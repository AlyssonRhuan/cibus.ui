import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import React, { useState, useEffect } from 'react';
import 'react-image-crop/dist/ReactCrop.css';
import 'react-image-crop/lib/ReactCrop.scss';
import ReactCrop from 'react-image-crop';

function ModalUploadImage(props) {  
  const [crop, setCrop] = useState({ aspect: 4 / 3 });
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState({})
  const [image, setImage] = useState()

  const [cardProfileAdmin, setCardProfileAdmin] = useState(false)
  const [cardProfileSalesman, setCardProfileSalesman] = useState(false)
  
  useEffect(() => {
    setIsOpen(props.isOpen);
  }, [])

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


  return <main>
      <section>
          <Modal isOpen={isOpen}>

              <ModalHeader>
                  Image upload
              </ModalHeader>
              
              <ModalBody className={`row`}>
                     
                <div className="form-group col-12">
                  <label>Image</label> 
                  <div className="custom-file">
                    <input type="file" className="custom-file-input" required onChange={e => console.log(e)}/>
                    <label className="custom-file-label">Pick a image...</label>
                    <div className="invalid-feedback">Example invalid custom file feedback</div>
                  </div>
                </div>     

                <ReactCrop src={image} crop={crop} onChange={newCrop => setCrop(newCrop)} />

              </ModalBody>

              <ModalFooter>
                  <button type="button" onClick={() => closeModal()} className="btn btn-danger">Cancel</button>
                  <button type="button" onClick={() => saveModal()} className="btn btn-success">Save</button>
              </ModalFooter>

          </Modal>
      </section>
  </main>
  
  
  
}

export default ModalUploadImage;
