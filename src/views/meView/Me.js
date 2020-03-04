import ModalConfirmation from '../../utils/ModalConfirmationUtils';
import Breadcrumb from '../../components/Breadcrumb';
import React, { useState, useEffect } from 'react';
import Table from '../../components/Table';
import Toast from '../../components/Toast';
import api from '../../services/api';
import ModalMe from './ModalMe';

import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

const rotasBreadcrumb =[
  { name: "Home",     path: "/"},
  { name: "Me"}
]

const END_POINT = 'me'
const PAGE_TITLE = 'Me'

function User() {
    const [key, setKey] = useState('aboutYou');

    useEffect(() => {
    }, [])

    function error(e) {
        Toast.error(e.response ? e.response.data.message : e.message);
        console.error(e.response ? e.response.data.message : e.message);
    }

    // RENDER

    return (
        <main className="App col-12 pr-4 ml-1 pl-4">
            <section>
                <Breadcrumb routes={rotasBreadcrumb}/>

                {/* BARRA MENU INTERNO */}
                <div style={{ alignItems: 'center' }} className="col-12 row justify-content-between mx-0 px-0">
                    <span>
                        <h1 className="display-4">{PAGE_TITLE}</h1>
                    </span>
                </div>

                <section className="pt-4">

                    <Tabs defaultActiveKey="home" transition={false} id="noanim-tab-example" activeKey={key} onSelect={k => setKey(k)}>
                        <Tab eventKey="aboutYou" title="About you">
                            <section className="col-12">
                                <div className="col-4">
                                    foto
                                </div>
                                <div className="col-8">
                                    form
                                </div>
                            </section>
                        </Tab>
                        <Tab eventKey="accountDetails" title="Account details">
                            <section className="col-12">
                                <div>
                                    detalhes
                                </div>
                            </section>
                        </Tab>
                        <Tab eventKey="settings" title="Settings">
                            <section className="col-12">
                                <div>
                                    settings
                                </div>
                            </section>
                        </Tab>
                    </Tabs>

                </section>
                
            </section>
        </main>
    );
}

export default User;