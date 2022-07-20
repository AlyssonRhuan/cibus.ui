import { Modal, ModalHeader, ModalBody, ModalFooter, Toast } from 'reactstrap';
import React, { useState, useEffect } from 'react';
import Auth from '../../storage/Auth.storage';
import api from '../../services/api';
import Select from 'react-select';

function ModalComponent(props) {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState({})
  const [confirmPassword, setConfirmPassword] = useState()
  const [passwordValid, setPasswordValid] = useState(true)

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
      setUser(props.data)
    }
  }

  function closeModal() {
    setIsOpen(!isOpen)
    props.onClose(false)
  }

  function saveModal() {
    if (confirmPassword === user.pass) {
      setPasswordValid(true)
      props.onSave(user)
      setIsOpen(!isOpen)
    }
    else {
      setPasswordValid(false)
    }
  }

  return (
    <main>
      <section>
        <Modal size="lg" isOpen={isOpen}>

          <ModalHeader>
            {props.title}
          </ModalHeader>

          <ModalBody className="row">
            <div className="form-group col-12">
              <label htmlFor='name'>Name</label>
              <input type='text' className="form-control" id='name' placeholder='Nome do usuário'
                onChange={event => setUser({ ...user, name: event.target.value })} value={user.name} />
            </div>

            <div className="form-group col-6">
              <label htmlFor='login'>Login</label>
              <input type='text' className="form-control" id='login' placeholder='Login do usuário'
                onChange={event => setUser({ ...user, login: event.target.value })} value={user.login} />
            </div>

            <div className="form-group col-6">
              <label htmlFor='login'>Perfil</label>
              <select className="form-control" aria-label="Default select example"
                onChange={event => setUser({ ...user, profile: event.target.value })}>
                <option value="ROLE_CLIENT" selected={user.profile === 'ROLE_CLIENT'}>Cliente</option>
                <option value="ROLE_SELLER" selected={user.profile === 'ROLE_SELLER'}>Vendedor</option>
              </select>
            </div>

            <div className="form-group col-6">
              <label htmlFor='password'>Senha</label>
              <input type='text' className={`form-control ${!passwordValid && "is-invalid"}`} id='password' placeholder='Senha'
                onChange={event => setUser({ ...user, pass: event.target.value })} />
              {
                !passwordValid && <div id="validationServer03Feedback" class="invalid-feedback">
                  As senhas são diferentes.
                </div>
              }
            </div>

            <div className="form-group col-6">
              <label htmlFor='confirmPassword'>Confirmar senha</label>
              <input type='text' className={`form-control ${!passwordValid && "is-invalid"}`} id='confirmPassword' placeholder='Confirmar senha'
                onChange={event => setConfirmPassword(event.target.value)} />
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
