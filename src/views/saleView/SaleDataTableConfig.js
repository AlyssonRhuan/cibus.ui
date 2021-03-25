import React from 'react';

export default [  
  {
    name: 'Produto',
    selector: 'product.name',
    sortable: true,
  },
  {
    name: 'Quantidade',
    selector: 'quantity',
    sortable: true,
  },
  {
    name: 'Preço',
    selector: 'price',
    sortable: true,
    format: row => row.price && `R$ ${row.price.toFixed(2)}`
  },
  {
    name: 'Data',
    selector: 'saleDate',
    sortable: true,
    format: row => ((new Date(row.saleDate).getDate() )) + "/" + ((new Date(row.saleDate).getMonth() + 1)) + "/" + new Date(row.saleDate).getFullYear()
  },
  {
    name: 'Status',
    selector: 'saleStatus',
    sortable: true,
    format: row => row.saleStatus === 'PAID' ? 'Pago' : 'Pedido'
  }
];