import React from 'react';

export default [
    {
      name: 'Usuário',
      selector: 'user',
      sortable: true,
    },
    {
      name: 'Descrição',
      selector: 'description',
      sortable: true,
    },
    {
      name: 'Data de abertura',
      selector: 'openDate',
      sortable: true,
      format: row => row.openDate && ((new Date(row.openDate).getDate() )) + "/" + ((new Date(row.openDate).getMonth() + 1)) + "/" + new Date(row.openDate).getFullYear()
    },
    {
      name: 'Valor de abertura',
      selector: 'startValue',
      sortable: true,
      format: row => row.startValue && `R$ ${row.startValue.toFixed(2)}`
    },
    {
      name: 'Data de fechamento',
      selector: 'closeDate',
      sortable: true,
      format: row => row.closeDate ? ((new Date(row.closeDate).getDate() )) + "/" + ((new Date(row.closeDate).getMonth() + 1)) + "/" + new Date(row.closeDate).getFullYear() : <b style={{color: 'green'}}>ABERTO</b>
    },
    {
      name: 'Valor',
      selector: 'currentValue',
      sortable: true,
      format: row => row.currentValue && `R$ ${row.currentValue.toFixed(2)}`
    },
];