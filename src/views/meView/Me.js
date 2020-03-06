import ModalConfirmation from '../../utils/ModalConfirmationUtils';
import Breadcrumb from '../../components/Breadcrumb';
import React, { useState, useEffect } from 'react';
import Loading from '../../components/Loading';
import Table from '../../components/Table';
import Toast from '../../components/Toast';
import api from '../../services/api';
import UploadImage from '../../components/UploadImage'

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
    const [me, setMe] = useState();
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true)

    const [isUploadImage, setIsUploadImage] = useState(false);

    const [cardProfileAdmin, setCardProfileAdmin] = useState(false)
    const [cardProfileSalesman, setCardProfileSalesman] = useState(false)

    useEffect(() => {
        getMe();
    }, [])

    // FUNÇÕES 

    async function getMe() {
        try{             
            const userId = await localStorage.getItem("AuthorizationId"); 
            const response = await api.get(`${END_POINT}/${userId}`);
            setMe(response.data)            

            response.data.profiles.map(
                (profile, key) => {
                profile === "ADMIN" && setCardProfileAdmin(true);
                profile === "SALESMAN" && setCardProfileSalesman(true);
            })

            setLoading(false)
        }
        catch(e){
            error(e);
        }
    }

    function error(e) {
        Toast.error(e.response ? e.response.data.message : e.message);
        console.error(e.response ? e.response.data.message : e.message);
    }

    function saveImage(newImage){
        setLoading(true)
        console.log({...me, iamge:newImage})
        setMe({...me, image:newImage});
        setLoading(false)
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

                {
                    loading && !me
                    ? <Loading/>
                    : <section className="pt-4">
                        
                        <Tabs defaultActiveKey="home" transition={false} id="noanim-tab-example" activeKey={key} onSelect={k => setKey(k)}>

                            <Tab eventKey="aboutYou" title="About you">
                                <section className="col-12 mt-5 row">
                                    <div className="col-4">
                                        <img  className='figure-img img-fluid img-thumbnail' style={{width:"70%"}} src={me.image}/>
                                        <UploadImage onSave={saveImage}/>
                                    </div>
                                    <div className="col-8 row">                                        
                                        <div className="form-group col-6">
                                            <label htmlFor='userName'>Name</label>
                                            <input type='text' className="form-control" id='userName' placeholder='User name'
                                            onChange={event => setMe({...me, name:event.target.value})} value={me.name}/>
                                        </div>   
                                        <div className="form-group col-6">
                                            <label htmlFor='userLogin'>Login</label>
                                            <input type='text' className="form-control" id='userLogin' placeholder='User login'
                                            onChange={event => setMe({...me, login:event.target.value})} value={me.login}/>
                                        </div>      
                                        <div className="form-group col-12">
                                            <label htmlFor='userEmail'>Email</label>
                                            <input type='text' className="form-control" id='userEmail' placeholder='User email'
                                            onChange={event => setMe({...me, email:event.target.value})} value={me.email}/>
                                        </div>   
                                    </div>
                                </section>
                            </Tab>
                            
                            <Tab eventKey="settings" title="Settings">
                                <section className="col-12 mt-5">
                                    <div>
                                        Soon
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