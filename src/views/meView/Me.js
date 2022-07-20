import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import Auth from '../../storage/Auth.storage';
import Toast from '../../components/Toast';
import Loading from '../../components/Loading';

const rotasBreadcrumb = [
  { name: "Home", path: "/" },
  { name: "Eu" }
]
const PAGE_TITLE = 'Eu'
const END_POINT = 'me'

function User(props) {
  const [isOpen, setIsOpen] = useState(false)
  const [categoryId, setCategoryId] = useState(1);
  const [me, setMe] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsOpen(props.isOpen);
    getMe();
  }, [])

  function onChangeCategory(id) {
    setCategoryId(id);
  }

  function closeModal() {
    setIsOpen(!isOpen)
    props.onClose(false)
  }

  function saveModal() {
    props.onSave()
    setIsOpen(!isOpen)
  }

  async function getMe() {
    try {
      const userId = await localStorage.getItem("AuthorizationId");
      await api.get(`${END_POINT}/${userId}`, await Auth.getAuthHeader())
        .then(response => {
          setMe(response.data)
          setLoading(false)
        }
        );
    }
    catch (e) {
      error(e);
    }
  }

  function error(e) {
    Toast.error(e.response ? e.response.data.message : e.message);
    console.error(e.response ? e.response.data.message : e.message);
  }

  return (
    <main>
      <section>
        <Modal size="lg" isOpen={isOpen}>

          <ModalHeader>
            {props.title}
          </ModalHeader>

          <ModalBody className="row">
            {
              loading && !me
                ? <Loading />
                : <div className="col-12 row pr-0">

                  <div className="form-group col-12 pr-0">
                    <label htmlFor='userName'>Nome</label>
                    <input type='text' className="form-control" id='userName' value={me.name} disabled />
                  </div>

                  <div className="form-group col-12 pr-0">
                    <label htmlFor='userLogin'>Usuário</label>
                    <input type='text' className="form-control" id='userLogin' value={me.login} disabled />
                  </div>

                  <div className="form-group col-12 pr-0">
                    <label htmlFor='userBalance'>Saldo</label>
                    <input type='text' className="form-control" id='userBalance' value={`R$ ${me.id.toFixed(2)}`} disabled />
                  </div>

{/* 
                  <div className="form-group col-12 pr-0">
                    <button className="btn btn-success" style={{ float: 'right' }}>
                      Redefinir a senha
                    </button>
                  </div> */}

                </div>
            }
          </ModalBody>

          <ModalFooter>
            <button type="button" onClick={() => closeModal()} className="btn btn-light">Cancelar</button>
          </ModalFooter>

        </Modal>
      </section>
    </main>
  );
}

export default User;