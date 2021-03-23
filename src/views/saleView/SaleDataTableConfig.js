import React from 'react';

export default [  
  {
    name: 'Product',
    selector: 'product.name',
    sortable: true,
  },
  {
    name: 'Quantity',
    selector: 'quantity',
    sortable: true,
  },
  {
    name: 'Price',
    selector: 'price',
    sortable: true,
    format: row => row.price && `R$ ${row.price.toFixed(2)}`
  },
  {
    name: 'Sale Date',
    selector: 'saleDate',
    sortable: true,
    format: row => ((new Date(row.saleDate).getDate() )) + "/" + ((new Date(row.saleDate).getMonth() + 1)) + "/" + new Date(row.saleDate).getFullYear()
  },
  {
    name: 'Sale Status',
    selector: 'saleStatus',
    sortable: true,
    format: row => row.saleStatus === 'PAID' ? 'Pago' : 'Pedido'
  }
];