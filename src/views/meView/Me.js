import UploadImage from '../../components/UploadImage';
import PageTitle from '../../components/PageTitle';
import React, { useState, useEffect } from 'react';
import Loading from '../../components/Loading';
import Auth from '../../storage/Auth.storage';
import Table from '../../components/Table';
import Toast from '../../components/Toast';
import api from '../../services/api';
import IconsUtils from '../../utils/IconsUtils';

import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

const rotasBreadcrumb = [
    { name: "Home", path: "/" },
    { name: "Eu" }
]

const END_POINT = 'me'
const PAGE_TITLE = 'Eu'

function User(props) {
    const [key, setKey] = useState('aboutYou');
    const [me, setMe] = useState();
    const [image, setImage] = useState();
    const [isMeChanged, setIsMeChanged]  = useState(false);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getMe();
    }, [])

    // FUNÇÕES 

    async function getMe() {
        try {
            const userId = await localStorage.getItem("AuthorizationId");
            await api.get(`${END_POINT}/${userId}`, await Auth.getAuthHeader())
            .then(response =>
                {
                    setMe(response.data)
                    setLoading(false)
                }
            );

            await api.get(`${END_POINT}/${userId}/image`, await Auth.getAuthHeader())
            .then(response =>
                {
                    setImage(response.data)
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

    function saveImage(newImage) {
        setLoading(true)
        setMe({ ...me, image: newImage });
        setLoading(false)
    }

    function changeMe(newMe) {
        setIsMeChanged(true);
        setMe(newMe)
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

    // RENDER

    return (
        <main className="App col-12 pr-4 ml-1 pl-4">
            <section>

                {/* BARRA MENU INTERNO */}
                <div style={{ alignItems: 'center' }} className="col-12 row justify-content-between mx-0 px-0">
                    <PageTitle title={PAGE_TITLE} breadcrumb={rotasBreadcrumb} />
                </div>

                {
                    loading && !me
                        ? <Loading />
                        : <section className="pt-4">

                            <Tabs defaultActiveKey="home" transition={false} id="noanim-tab-example" activeKey={key} onSelect={k => setKey(k)}>

                                <Tab eventKey="aboutYou" title="Sombre mim">

                                    <form>
                                        <section className="col-12 mt-5 row">
                                            <div className="d-flex flex-row flex-wrap w-100">

                                                <div className="col-4">
                                                    <img className='figure-img img-fluid img-thumbnail' style={{ width: "70%" }} src={image ? image : IconsUtils.Logo} />
                                                    <UploadImage onSave={saveImage} />
                                                </div>

                                                <div className="col-8 row align-self-start">
                                                    <div className="form-group col-12">
                                                        <label htmlFor='userName'>Nome</label>
                                                        <input type='text' className="form-control" id='userName' placeholder='Nome'
                                                            onChange={event => changeMe({ ...me, name: event.target.value })} value={me.name} />
                                                    </div>
                                                    <div className="form-group col-12">
                                                        <label htmlFor='userEmail'>Email</label>
                                                        <input type='text' className="form-control" id='userEmail' placeholder='Email'
                                                            onChange={event => changeMe({ ...me, email: event.target.value })} value={me.email} />
                                                    </div>
                                                </div>
                                            </div>
                                        </section>

                                        <button
                                            className="btn btn-success"
                                            onClick={saveChanges}
                                            disabled={!isMeChanged}
                                        >
                                            Salvar
                                    </button>
                                    </form>
                                </Tab>

                                <Tab eventKey="settings" title="Configurações">
                                    <section className="col-12 mt-5">
                                        <div>
                                            Em breve
                                    </div>
                                    </section>
                                </Tab>

                            </Tabs>

                        </section>
                }
            </section>
        </main>
    );
}

export default User;