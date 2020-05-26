import DataTable from 'react-data-table-component';
import IconsUtils from '../utils/IconsUtils'
import React, { useState } from 'react';
import Loading from './Loading'


// referencia https://www.npmjs.com/package/react-data-table-component#1626-header

function Table(props) {
    const [qtdElementos, setqtdElementos] = useState(10);
    const [pagina, setPagina] = useState(1);

    // FUNÇÕES PARA EVENTO TABLE

    function trocaPagina(novaPagina) {
        setPagina(novaPagina);
        props.onGetAll(novaPagina, qtdElementos);
    }

    function trocaQtdElementos(novaQtdElementos) {
        setqtdElementos(novaQtdElementos);
        props.onGetAll(pagina, novaQtdElementos);
    }

    //

    const actions = [
        {
          name: 'Actions',
          width: '150px',
          cell: row => <div className="actionsBar">
            <a onClick={() => props.onDetails ? props.onDetails(row) : props.onAction('EDI', row)} data-toggle="tooltip" title="Edit"><img className="buttonIcon" src={IconsUtils.Edit}/></a>
            <a onClick={() => props.onAction('DEL', row)} data-toggle="tooltip" title="Delete"><img className="buttonIcon" src={IconsUtils.Delete}/></a>
          </div>
        }
    ];

    return (
        <main className="App col-12 px-0">
            <section>                
                {
                    props.data
                    ? <DataTable
                        className="dataTable float-right"
                        style={{height:'70vh', overflowY:'hidden'}}    
                        columns={[...props.columns, ...actions]}                            //COLUNAS
                        data={props.data.content}                                           //VALORES
                        pagination={true}                                                   //HABILITA PAGINAÇÃO
                        striped={true}                                                      //LINHAS INTERVALADAS DE COR
                        noHeader={true}                                                     //RETIRAR O CABEÇALHO
                        fixedHeader={true}                                                  //DEIXA O CABEÇALHO FIXO
                        fixedHeaderScrollHeight='59vh'                                      //DEFINE ALTURA DO CORPO
                        paginationServer={true}                                             //PAGINAÇÃO NO BACK
                        paginationTotalRows={props.data.totalElements}                      //TOTAL LINHA NESTA PAGINA
                        paginationPerPage={props.data.numberOfElements}                     //TOTAL LINHA NESTA PAGINA
                        onChangePage={(pag) => trocaPagina(pag)}                            //EVENTO TROCA PAGINA
                        onChangeRowsPerPage={(qtd) => trocaQtdElementos(qtd)}               //EVENTO TROCA QTD LINHAS
                    />
                    : <Loading />
                }
            </section>
        </main>
    );
}

export default Table;