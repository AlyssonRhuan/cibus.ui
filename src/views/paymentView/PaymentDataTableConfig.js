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
    name: 'Visivel',
    selector: 'visible',
    sortable: true,
    format: row => row.visible == true ? 'Sim' : 'Não'
  }
];