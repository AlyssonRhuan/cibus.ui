import ModalConfirmation from '../../utils/ModalConfirmationUtils';
import PaymentDataTableConfig from './PaymentDataTableConfig';
import PageTitle from '../../components/PageTitle';
import React, { useState, useEffect } from 'react';
import ModalPayment from './ModalPayment';
import Table from '../../components/Table';
import Toast from '../../components/Toast';
import api from '../../services/api';
import Auth from '../../storage/Auth.storage';
import FilterPayment from './FilterPayment';

const rotasBreadcrumb =[
  { name: "Home", path: "/"},
  { name: "Formas de pagamento"}
]

const END_POINT = 'payment'
const PAGE_TITLE = 'Formas de pagamento'

function Payment() {
    const [payments, setPayments] = useState();
    const [paymentToAction, setPaymentToAction] = useState()
    const [modal, setModal] = useState(undefined)
    const [filters, setFilters] = useState({})

    useEffect(() => {
        getAllPayments();
    }, [])

    // FUNÇÕES PARA ABRIR MODAL

    function openModal(modal, dado) {
        setModal(modal);
        setPaymentToAction(dado);
    }

    function closeModal() {
        setModal(undefined);
        getAllPayments();
    }

    // FUNÇÕES 

    function onFilter(){
        getAllPayments();
    }

    async function getAllPayments(novaPagina, novaQtdElementos) {
        try{
            const response = await api.get(END_POINT + "?page=" + (novaPagina || 1)
            + "&quantity=" + (novaQtdElementos || 10)
            + "&payment=" + (filters.name || '')
            + "&description=" + (filters.description || '')
            + "&active=" + (filters.active || 'BOUTH')
            , await Auth.getAuthHeader());
            setPayments(response.data)
        }
        catch(e){
            error(e);
        }
    }

    async function addPayment(dados) {
        try{
            await api.post(`${END_POINT}`, dados, await Auth.getAuthHeader());
            Toast.success(`${PAGE_TITLE} adicionada!`)
        }
        catch(e){
            error(e);
        }   
    
        closeModal();          
    }

    async function editPayment(dados) {
        try{
            await api.put(`${END_POINT}/${paymentToAction.id}`, dados, await Auth.getAuthHeader());
            Toast.success(`${PAGE_TITLE} atualizada!`)
        }
        catch(e){
            error(e);
        }   
    
        closeModal();   
    }

    async function deletePayment(validacao) {
        try{
            if (validacao) {
                await api.delete(`${END_POINT}/${paymentToAction.id}`, await Auth.getAuthHeader());
                Toast.success(`${PAGE_TITLE} removida!`)
            }            
        }
        catch(e){
            error(e);
        }
    
        closeModal();
    }

    function error(e) {
        Toast.error(e.response ? e.response.data.message : e.message);
        console.error(e.response ? e.response.data.message : e.message);
    }

    // RENDER

    return (
        <main className="App col-12 pr-4 ml-1 pl-4">
            <section>

                {/* BARRA MENU INTERNO */}
                <div style={{ alignItems: 'center' }} className="col-12 row justify-content-between mx-0 px-0">
                    <PageTitle title={PAGE_TITLE} breadcrumb={rotasBreadcrumb} />
                    <button type="button" className="btn btn-success ml-2" onClick={() => openModal('ADD', undefined)}>
                        Adicionar forma de pagamento
                    </button>
                </div>

                <Table
                    data={payments}
                    columns={PaymentDataTableConfig}
                    onAction={openModal}     
                    filters={<FilterPayment filters={filters} onSetFilters={setFilters} onFilter={onFilter}/>}              
                    onGetAll={getAllPayments}
                    />

            </section>
            <section>

                {/* MODAIS */}
                {
                    modal && modal === 'ADD' && <ModalPayment
                        title="Adicionar forma de pagamento"
                        data={undefined}
                        onClose={closeModal}
                        onSave={addPayment}
                        isOpen={modal === 'ADD'} />
                }

                {
                    modal && modal === 'EDI' && <ModalPayment
                        title="Editar forma de pagamento"
                        data={paymentToAction}
                        onClose={closeModal}
                        onSave={editPayment}
                        isOpen={modal === 'EDI'} />
                }

                {
                    modal && modal === 'DEL' && <ModalConfirmation
                        title="Deletar forma de pagamento"
                        text={`Deseja deletar a forma de pagamento ${paymentToAction.payment}`}
                        onClose={closeModal}
                        onResponse={deletePayment}
                        isOpen={modal === 'DEL'} />
                }

            </section>
        </main>
    );
}

export default Payment;
