import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import React, { useState, useEffect } from 'react';
import Auth from '../../storage/Auth.storage';
import api from '../../services/api';
import Select from 'react-select';
import UploadImage from '../../components/UploadImage';
import IconsUtils from '../../utils/IconsUtils';

function ModalComponent(props) {
  const [isOpen, setIsOpen] = useState(false)
  const [product, setProduct] = useState({ prodcutDigital: false, visible: true })

  // VARIAVEIS UTILIZAVEIS NO MODAL
  const [listCategorys, setListCategorys] = useState();

  useEffect(() => {
    getListCategorys();
    setIsOpen(props.isOpen);
    onEditModal();
  }, [])

  async function getListCategorys() {
    const dados = await api.get(`category/valuelabel`, await Auth.getAuthHeader());
    setListCategorys(dados.data);
  }

  function onEditModal() {
    if (props.data !== undefined) {
      setProduct(props.data)
    }
  }

  function onUploadImage(image) {
    console.log(image)
    setProduct({ ...product, image: image })
    console.log(image)
  }

  function closeModal() {
    setIsOpen(!isOpen)
    props.onClose(false)
  }

  function saveModal() {
    props.onSave(product)
    setIsOpen(!isOpen)
  }

  return (
    <main>
      <section>
        <Modal size="lg" isOpen={isOpen}>

          <ModalHeader>
            {props.title}
          </ModalHeader>

          <ModalBody className="row">
            <section className="col-8 row">
              <div className="form-group col-12">
                <label htmlFor='nomeProduto'>Name</label>
                <input type='text' className="form-control" id='nomeProduto' placeholder='Nome do produto'
                  onChange={event => setProduct({ ...product, name: event.target.value })} value={product.name} />
              </div>

              <div className="form-group col-12">
                <label htmlFor='description'>Descrição</label>
                <input type='text' className="form-control" id='description' placeholder='Descrição'
                  onChange={event => setProduct({ ...product, description: event.target.value })} value={product.description} />
              </div>

              <div className="form-group col-6">
                <label htmlFor='price'>Preço</label>
                <input type='text' className="form-control" id='price' placeholder='Preço'
                  onChange={event => setProduct({ ...product, price: event.target.value })} value={product.price} />
              </div>

              <div className="form-group col-6">
                <label htmlFor="productCategory">Categorias</label>
                <Select isMulti className="basic-multi-select" classNamePrefix="select"
                  onChange={event => setProduct({ ...product, categorys: event })}
                  options={listCategorys && listCategorys} value={product.categorys} />
              </div>

              <div className="form-group col-6">
                <div className="custom-control custom-switch">
                  <input type="checkbox" className="custom-control-input" id="switchVisivel" checked={product.visible}
                    onChange={event => setProduct({ ...product, visible: event.target.checked })} />
                  <label className="custom-control-label" htmlFor="switchVisivel">Produto {!product.visible && "não"} visível</label>
                </div>
              </div>
            </section>

            <section className="col-4">
              <label>Imagem do produto</label>
              <div className="" style={{ height: '235px', width: '100%', border: '1px solid rgba(0,0,0,0.125)', backgroundColor: '#f2f2f2' }}>
              <img src={product.image ? product.image : IconsUtils.Logo} className="card-img-top" alt={product.name}
                  style={{ position: 'relative', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
              <UploadImage onSave={onUploadImage} />
            </section>
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
