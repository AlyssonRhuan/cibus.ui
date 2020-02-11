export default [
    {
      name: 'Nome',
      selector: 'nome',
      sortable: true,
    },
    {
      name: 'Preço',
      selector: 'preco',
      sortable: true,
      format: row => `R$ ${row.preco.toFixed(2)}`
    },
    {
      name: 'Estoque',
      selector: 'quantidadeEstoque',
      sortable: true
    },
    {
      name: 'Categorias',
      selector: 'categorias',
      sortable: true,
      format: row => row.categorias.length
    },
    {
      name: 'Visivel',
      selector: 'visivel',
      sortable: true,
      format: row => row.visivel ? "Sim" : "Não"
    }
];