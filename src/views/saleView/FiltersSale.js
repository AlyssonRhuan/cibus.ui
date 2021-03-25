import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

function FiltersSale(props) {
  return (
    <main>
      <div className="row">
        <div className="col-auto">
          <input type="text" className="form-control" id="product" placeholder="Produto"
          onChange={event => props.onSetFilters({...props.filters, product: event.target.value})} value={props.filters.product}/>
        </div>
        <div className="col-auto">
          <input type="text" className="form-control" id="date" placeholder="Data"
          onChange={event => props.onSetFilters({...props.filters, date: event.target.value})} value={props.filters.date}/>
        </div>
        <div className="col-auto">
          <select className="form-control" aria-label="Default select example"
            onChange={event => props.onSetFilters({...props.filters, status: event.target.value})}>
            <option value="BOUTH" selected={props.filters.status === 'BOUTH'}>Status</option>
            <option value="PAID" selected={props.filters.status === 'PAID'}>Pago</option>
            <option value="ORDER" selected={props.filters.status === 'ORDER'}>Pedido</option>
          </select>
        </div>
        <div className="col-auto pr-0">
          <button type="button" className="btn btn-primary" onClick={() => props.onFilter()}>Buscar <AiOutlineSearch/></button>
        </div>
      </div>
    </main>
  );
}

export default FiltersSale;
