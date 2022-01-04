import PageTitle from '../../components/PageTitle';
import React, { useState, useEffect } from 'react';
import Loading from '../../components/Loading';
import Auth from '../../storage/Auth.storage';
import Toast from '../../components/Toast';
import api from '../../services/api';
import IconsUtils from '../../utils/IconsUtils';
import Categories from './Categories';

const END_POINT = 'me'

function ReportSales(props) {
  const [me, setMe] = useState();
  const [isMeChanged, setIsMeChanged] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMe();
  }, [])

  // FUNÇÕES 

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

  async function saveChanges() {
    try {
      setLoading(true)
      const userId = await localStorage.getItem("AuthorizationId");
      const response = await api.put(`${END_POINT}/${userId}`, me, await Auth.getAuthHeader());
      setMe(response.data)
      setLoading(false)
    }
    catch (e) {
      error(e);
    }
  }

  function changeMe(newMe) {
    setIsMeChanged(true);
    setMe(newMe)
  }

  function error(e) {
    Toast.error(e.response ? e.response.data.message : e.message);
    console.error(e.response ? e.response.data.message : e.message);
  }

  return (
    <main className="App col-12 pr-4 ml-1 pl-4">
      <form>
        {
          loading && !me
            ? <Loading />
            : <section className="col-12 row">
              <div className="d-flex flex-row flex-wrap w-100">
                <div className="mb-3 col-12 row">
                  <label for="userName" className="col-sm-2 col-form-label">Nome</label>
                  <div className="col-sm-10">
                    <input type="text" className="pl-3 form-control-plaintext" id="userName" value="email@example.com"
                      onChange={event => changeMe({ ...me, name: event.target.value })} value={me.name} />
                  </div>
                </div>
                <div className="mb-3 col-12 row">
                  <label for="userEmail" className="col-sm-2 col-form-label">Email</label>
                  <div className="col-sm-10">
                    <input type="text" className="pl-3 form-control-plaintext" id="userEmail" value="email@example.com"
                      onChange={event => changeMe({ ...me, email: event.target.value })} value={me.email} />
                  </div>
                </div>
              </div>
            </section>
        }
        <button className="btn btn-success" onClick={saveChanges} disabled={isMeChanged != true}>
          Salvar
        </button>
      </form>
    </main>
  );
}

export default ReportSales;