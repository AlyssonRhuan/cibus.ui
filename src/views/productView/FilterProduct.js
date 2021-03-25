import React, { useState, useEffect } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import Auth from '../../storage/Auth.storage';
import api from '../../services/api';

function FilterProduct(props) {
  const [listCategorys, setListCategorys] = useState();

  useEffect(() => {
    getListCategorys();
  }, [])

  async function getListCategorys() {
    const dados = await api.get(`category/valuelabel`, await Auth.getAuthHeader());
    setListCategorys(dados.data);
  }


  return (
    <main>
      <div className="row">
        <div className="col-auto">
          <input type="text" className="form-control" id="Name" placeholder="Nome"
          onChange={event => props.onSetFilters({...props.filters, name: event.target.value})} value={props.filters.name}/>
        </div>
        <div className="col-auto">
          <select className="form-control" aria-label="Default select example"
          onChange={event => props.onSetFilters({...props.filters, category: event.target.value})} value={props.filters.category}>
            <option value="">Categoria</option>
            {
              listCategorys && listCategorys.map( (category, key) => <option value={category.value} key={key}>{category.label}</option>)
            }
          </select>
        </div>
        <div className="col-auto">
          <select className="form-control" aria-label="Default select example"
            onChange={event => props.onSetFilters({...props.filters, active: event.target.value})}>
            <option value="BOUTH" selected={props.filters.active === 'BOUTH'}>Ativo</option>
            <option value="YES" selected={props.filters.active === 'YES'}>Sim</option>
            <option value="NO" selected={props.filters.active === 'NO'}>Não</option>
          </select>
        </div>
        <div className="col-auto pr-0">
          <button type="button" className="btn btn-primary" onClick={() => props.onFilter()}>Buscar <AiOutlineSearch/></button>
        </div>
      </div>
    </main>
  );
}

export default FilterProduct;
