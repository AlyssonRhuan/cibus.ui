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
    }
];