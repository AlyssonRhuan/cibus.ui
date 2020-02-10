import React from 'react';

export default [
  {
    name: 'Nome',
    selector: 'nome',
    sortable: true,
  },
  {
    name: 'Descrição',
    selector: 'descricao',
    sortable: true,
  },
  {
    name: 'Ativo',
    selector: 'ativo',
    sortable: true,
    format: row => row.ativo ? "Sim" : "Não"
  }
];