import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ColorPicker from '../../components/ColorPicker';
import React, { useState, useEffect } from 'react';
import Auth from '../../storage/Auth.storage';
import api from '../../services/api';

function ModalComponent(props) {
  const [isOpen, setIsOpen] = useState(false)
  const [product, setProduct] = useState({ prodcutDigital: false })

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
        <Modal isOpen={isOpen}>

          <ModalHeader>
            {props.title}
          </ModalHeader>

          <ModalBody className="row">
            <div className="form-group col-10">
              <label htmlFor="productCategory">Color Name</label>
              <input type='text' className="form-control" id='ProductColor' placeholder='Color name'
                onChange={event => setProduct({ ...product, colorName: event.target.value })} value={product.colorName} />
            </div>

            <div className="form-group col-2">
              <label htmlFor="productCategory">Color</label>
              <ColorPicker colorCode={product.colorCode} onChange={code => setProduct({ ...product, colorCode: code })}/>
            </div>

            <div className="form-group col-4">
              <label htmlFor='nomeProduto'>Price</label>
              <input type='text' className="form-control" id='ProductPrice' placeholder='Price'
                onChange={event => setProduct({ ...product, price: event.target.value })} value={product.price} />
            </div>

            <div className="form-group col-4">
              <label htmlFor='nomeProduto'>Size</label>
              <input type='text' className="form-control" id='ProductColor' placeholder='Size'
                onChange={event => setProduct({ ...product, size: event.target.value })} value={product.size} />
            </div>

            <div className="form-group col-4">
              <label htmlFor="productCategory">Stock</label>
              <input type='text' className="form-control" id='ProductColor' placeholder='Stock quantity'
                onChange={event => setProduct({ ...product, stockQuantity: event.target.value })} value={product.stockQuantity} />
            </div>
            
            <div className="form-group col-12">
              <label for="exampleFormControlFile1">Example file input</label>
              <input type="file" className="form-control-file" id="exampleFormControlFile1"/>
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
