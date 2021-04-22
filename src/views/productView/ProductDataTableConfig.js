import React from 'react';

export default [
    {
      name: 'Nome',
      selector: 'name',
      sortable: true,
    },
    {
      name: 'Preço',
      selector: 'price',
      sortable: true,
      format: row => row.price && `R$ ${row.price.toFixed(2)}`
    },
    {
      name: 'Categorias',
      selector: 'categorys',
      sortable: true,
      format: row => row.categorys.map( (category, key) => {
        return category.label + ( key + 1 !== row.categorys.length ? ' - ' : '' )
      })
    },
    {
      name: 'Visivel',
      selector: 'visible',
      sortable: true,
      format: row => row.visible ? "Sim" : "Não"
    },
    {
      name: 'Estoque atual',
      selector: 'stockQuantity',
      sortable: true,
      format: row => row.stockQuantity < row.minimumStock  ? <div style={{color: 'red'}}>{row.stockQuantity}</div> : row.stockQuantity
    },
    {
      name: 'Estoque minimo',
      selector: 'minimumStock',
      sortable: true,
    }
];