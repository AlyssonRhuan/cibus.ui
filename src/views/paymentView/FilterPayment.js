import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

function FilterCategory(props) {

  return (
    <main>
      <div className="row">
        <div className="col-auto">
          <input type="text" className="form-control" id="name" placeholder="Pagamento" 
          onChange={event => props.onSetFilters({...props.filters, name: event.target.value})} value={props.filters.name}/>
        </div>
        <div className="col-auto">
          <input type="text" className="form-control" id="description" placeholder="Descrição"
          onChange={event => props.onSetFilters({...props.filters, description: event.target.value})} value={props.filters.description}/>
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

export default FilterCategory;
