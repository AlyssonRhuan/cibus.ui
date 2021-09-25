import React, { useState, useEffect } from 'react';
import Loading from '../../components/Loading';
import Auth from '../../storage/Auth.storage';
import Toast from '../../components/Toast';
import api from '../../services/api';

const END_POINT = 'me'

function MeMoney(props) {
  const [me, setMe] = useState();
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
                  <label for="value" className="col-sm-2 col-form-label">Saldo</label>
                  <div className="col-sm-10">
                    <input type="text" className="pl-3 form-control-plaintext" id="value" value='R$ 2,00' />
                  </div>
                </div>
              </div>
            </section>
        }
      </form>
    </main>
  );
}

export default MeMoney;