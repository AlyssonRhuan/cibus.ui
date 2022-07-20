import PageTitle from '../../components/PageTitle';
import React, { useState, useEffect } from 'react';
import Toast from '../../components/Toast';
import api from '../../services/api';
import Auth from '../../storage/Auth.storage';
import Loading from '../../components/Loading';

const rotasBreadcrumb =[
  { name: "Home",     path: "/"},
  { name: "Notificações"}
]

const END_POINT = 'notification'
const PAGE_TITLE = 'Notificações'

function Sale() {
    const [notifications, setNotifications] = useState([]);   
    const [quantityUnread, setQuantityUnread] = useState(0); 
    const [notificationsAsRead, setNotificationsAsRead] = useState([]);    
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getAll();
        getQuantityUnread();
    }, [])

    async function getAll() {
        try {
          const response = await api.get(END_POINT + "?userId=" + localStorage.getItem("AuthorizationId")
              , await Auth.getAuthHeader());

            setNotifications(response.data)
        }
        catch(e){
            error(e);
        }
    }

    async function getQuantityUnread() {
        try {
          const response = await api.get(END_POINT + "/" + localStorage.getItem("AuthorizationId")
              , await Auth.getAuthHeader());

            setQuantityUnread(response.data)
        }
        catch(e){
            error(e);
        }
    }

    async function markAllAsRead() {
        try {
            setIsLoading(true);
            const response = await api.put(END_POINT + "/" + localStorage.getItem("AuthorizationId")
                , await Auth.getAuthHeader());

            Toast.success(response);       
            getAll();
            getQuantityUnread();
            setNotificationsAsRead([]);
            setIsLoading(false);
        }
        catch(e){
            error(e);
        }
    }

    async function markSelectdsAsRead() {
        try {
            setIsLoading(true);
            const response = await api.put(END_POINT
                    , notificationsAsRead
                    , await Auth.getAuthHeader());

            Toast.success(response);            
            getAll();
            getQuantityUnread();
            setNotificationsAsRead([]);
            setIsLoading(false);
        }
        catch(e){
            error(e);
        }
    }

    function error(e) {
        Toast.error(e.response ? e.response.data.message : e.message);
        console.error(e.response ? e.response.data.message : e.message);
    }

    // RENDER

    return (
        <main className="App col-12 px-4">
            <section>

                {/* BARRA MENU INTERNO */}
                <div style={{ alignItems: 'center' }} className="col-12 row justify-content-between mx-0 px-0">
                    <PageTitle title={`${PAGE_TITLE} ${quantityUnread > 0 ? ( "(" + quantityUnread + ")" ) : ""}`} breadcrumb={rotasBreadcrumb} />
                    <div>
                        <button type="button" className="btn btn-primary ml-2" disabled={notificationsAsRead < 1} onClick={() => markSelectdsAsRead()}>
                            Marcar selecionados como lido
                        </button>
                        <button type="button" className="btn btn-primary ml-2" onClick={() => markAllAsRead()}>
                            Marcar todos como lido
                        </button>
                    </div>
                </div>


                <div style={{overflowY: 'auto', maxHeight: '80vh'}}>
                    {
                        isLoading
                            ? <Loading />
                            : notifications && notifications.map((notification, key) => {
                            return <div className="alert alert-primary" role="alert" style={{textAlign:'left'}} key={key}>
                                <input className="form-check-input ml-1" style={{width: '10px'}} key={key} type="checkbox" value="" id={key} onClick={() => setNotificationsAsRead([...notificationsAsRead, notification.id])}/>
                                <p className="py-0 my-0 ml-4">{notification.notification}</p>
                                <p className="py-0 my-0" style={{fontSize: '12px', textAlign:'right'}}>{((new Date(notification.date).getDate() )) + "/" + ((new Date(notification.date).getMonth() + 1)) + "/" + new Date(notification.date).getFullYear()}</p>
                            </div>
                        })
                    }
                </div>
            </section>
        </main>
    );
}

export default Sale;
