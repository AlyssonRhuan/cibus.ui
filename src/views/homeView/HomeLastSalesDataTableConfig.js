export default [
    {
      name: 'Name',
      selector: 'name',
      sortable: true,
    },
    {
      name: 'Price',
      selector: 'price',
      sortable: true,
      format: row => row.price && `R$ ${row.price.toFixed(2)}`
    }
];