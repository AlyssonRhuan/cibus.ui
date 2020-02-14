import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import React, { useState, useEffect } from 'react';
import InputMask from 'react-input-mask';
import api from '../../services/api'
import Select from 'react-select'

function ModalComponent(props) {
  const [isOpen, setIsOpen] = useState(false)
  const [product, setProduct] = useState({})

  // VARIAVEIS UTILIZAVEIS NO MODAL
  const [listCategorys, setListCategorys] = useState();
    
  useEffect(() => {
    getListCategorys();
    setIsOpen(props.isOpen);
    onEditModal();
  }, [])

  async function getListCategorys() {
      const dados = await api.get(`categoria/valuelabel`);
      setListCategorys(dados.data);
  }

  function onEditModal(){
    if(props.data !== undefined){
      setProduct(props.data)
    }
  }

  function closeModal(){      
    setIsOpen(!isOpen)
    props.onClose(false)
  }

  function saveModal(){ 
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
                  <div className="form-group col-12">
                    <label htmlFor='nomeProduto'>Nome</label>   
                    <input type='text' className="form-control" id='nomeProduto' placeholder='Nome do produto'
                      onChange={event => setProduct({...product, nome:event.target.value})} value={product.nome}/>
                  </div>   

                  <div className="form-group col-4">
                    <label htmlFor='precoProduto'>Preço</label>
                    <input type='number' className="form-control" id='precoProduto' placeholder='Preço'
                      onChange={event => setProduct({...product, preco:event.target.value})} value={product.preco}/>
                  </div> 

                  <div className="form-group col-4">
                    <label htmlFor='estoqueMinimoProduto'>Estoque mínimo</label>
                    <input type='number' className="form-control" id='estoqueMinimoProduto' placeholder='Estoque min'
                      onChange={event => setProduct({...product, estoqueMinimo:event.target.value})} value={product.estoqueMinimo}/>
                  </div> 

                  <div className="form-group col-4">
                    <label htmlFor='estoqueProduto'>Estoque</label>
                    <input type='number' className="form-control" id='estoqueProduto' placeholder='Estoque'
                      onChange={event => setProduct({...product, quantidadeEstoque:event.target.value})} value={product.quantidadeEstoque}/>
                  </div>  

                  <div className="form-group col-12">
                    <label htmlFor='imagemProduto'>Imagem</label> 
                    <div className="custom-file">
                      <input type="file" className="custom-file-input" id="validatedCustomFile" required/>
                      <label className="custom-file-label" htmlFor="validatedCustomFile">Escolha uma imagem...</label>
                      <div className="invalid-feedback">Example invalid custom file feedback</div>
                    </div>
                  </div>  

                  <div className="form-group col-12">
                    <label htmlFor="productCategory">Categoria</label>
                    <Select isMulti className="basic-multi-select" classNamePrefix="select" 
                      onChange={event => setProduct({...product, categorias:event})}
                      options={listCategorys && listCategorys} value={product.categorias}/>
                  </div>  
                                                               
                  <div className="form-group col-12">
                    <div className="custom-control custom-switch">
                      <input type="checkbox" className="custom-control-input" id="switchVisivel"  checked={product.visivel}
                        onChange={event => setProduct({...product, visivel:event.target.checked})} />
                      <label className="custom-control-label" htmlFor="switchVisivel">Produto {product.visivel ? "visível" : "invisível"}</label>
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
