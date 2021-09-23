import React from 'react';

export default [
  {
    name: 'Pagamento',
    selector: 'payment.payment',
    sortable: true,
  },
  {
    name: 'Preço total',
    selector: 'price',
    sortable: true,
    format: row => row.saleProducts && `R$ ${row.saleProducts.reduce((result, saleProduct) => result + ( saleProduct.price * saleProduct.quantity ), 0 ).toFixed(2)}`
  },
  {
    name: 'Data',
    selector: 'saleDate',
    sortable: true,
    format: row => ((new Date(row.saleDate).getDate())) + "/" + ((new Date(row.saleDate).getMonth() + 1)) + "/" + new Date(row.saleDate).getFullYear()
  },
  {
    name: 'Status',
    selector: 'saleStatus',
    sortable: true,
    format: row => row.saleStatus === 'PAID' ? 'Pago' : 'Pedido'
  }
];