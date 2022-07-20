import React from 'react';

export default [
    {
      name: 'Nome',
      selector: 'name',
      sortable: true,
    },
    {
      name: 'Primeiro acesso',
      selector: 'firstLogin',
      sortable: true,
      format: row => row.visible ? "Sim" : "Não"
    },
    {
      name: 'Login',
      selector: 'login',
      sortable: true,
    },
    {
      name: 'Perfil',
      selector: 'profile',
      sortable: true,
      format: row => {
        if(row.profile === "ROLE_ADMIN"){
          return "Administrador";
        }
        
        if(row.profile === "ROLE_SELLER"){
          return "Vendedor";
        }
        
        if(row.profile === "ROLE_CLIENT"){
          return "Cliente";
        }
      }
    },
];