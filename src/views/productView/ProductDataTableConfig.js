export default [
    {
      name: 'Name',
      selector: 'name',
      sortable: true,
    },
    // {
    //   name: 'Price',
    //   selector: 'price',
    //   sortable: true,
    //   format: row => `R$ ${row.price.toFixed(2)}`
    // },
    {
      name: 'Digital',
      selector: 'prodcutDigital',
      sortable: true,
      format: row => row.prodcutDigital ? "Yes" : "No"
    },
    {
      name: 'Categorys',
      selector: 'categorys',
      sortable: true,
      format: row => row.categorys.length
    },
    {
      name: 'Visible',
      selector: 'visible',
      sortable: true,
      format: row => row.visible ? "Yes" : "No"
    }
];