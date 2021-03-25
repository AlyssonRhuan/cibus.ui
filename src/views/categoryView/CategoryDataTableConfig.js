import React from 'react';

export default [
  {
    name: 'Nome',
    selector: 'name',
    sortable: true,
  },
  {
    name: 'Descrição',
    selector: 'description',
    sortable: true,
  },
  {
    name: 'Ativo',
    selector: 'active',
    sortable: true,
    format: row => row.active ? "Sim" : "Não"
  }
];