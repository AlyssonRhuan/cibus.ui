import React from 'react';

export default [
  {
    name: 'Name',
    selector: 'name',
    sortable: true,
  },
  {
    name: 'Description',
    selector: 'description',
    sortable: true,
  },
  {
    name: 'Active',
    selector: 'active',
    sortable: true,
    format: row => row.active ? "Yes" : "No"
  }
];