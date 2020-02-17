import React from 'react';

export default [
  {
    name: 'Name',
    selector: 'name',
    sortable: true,
  },
  {
    name: 'Allowed views',
    selector: 'views',
    sortable: true,
    format: row => row.views.length
  }
];