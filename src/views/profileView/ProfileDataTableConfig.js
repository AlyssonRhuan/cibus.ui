import React from 'react';

export default [
  {
    name: 'Nome',
    selector: 'nome',
    sortable: true,
  },
  {
    name: 'Telas permitidas',
    selector: 'telas',
    sortable: true,
    format: row => row.telas.length
  }
];