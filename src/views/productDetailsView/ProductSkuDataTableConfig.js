import React from 'react';

export default [
    {
      name: 'Image',
      sortable: true,
      format: row => row.image
    },
    {
      name: 'Price',
      selector: 'price',
      sortable: true,
      format: row => `R$ ${row.price.toFixed(2)}`
    },
    {
      name: 'Color',
      selector: 'color',
      sortable: true,
      format: row => <section>
        <div style={{backgroundColor:`rgba(${row.colorCode})`, height:'5px', width:'25px'}}></div>
        <div>{row.colorName}</div>
      </section>
    },
    {
      name: 'Size',
      selector: 'size',
      sortable: true
    },
    {
      name: 'Stock Quantity',
      selector: 'stockQuantity',
      sortable: true
    }
];