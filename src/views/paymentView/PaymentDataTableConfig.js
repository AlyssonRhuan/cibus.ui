import React from 'react';

export default [
  {
    name: 'Pagamento',
    selector: 'payment',
    sortable: true,
  },
  {
    name: 'Descrição',
    selector: 'description',
    sortable: true,
  },
  {
    name: 'Movimenta o caixa',
    selector: 'isCashMoviment',
    sortable: true,
    format: row => row.isCashMoviment == true ? 'Sim' : 'Não'
  },
  {
    name: 'Visivel',
    selector: 'visible',
    sortable: true,
    format: row => row.visible == true ? 'Sim' : 'Não'
  }
];