import React, { useState, useEffect } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

function FilterProduct(props) {
  return (
    <main>
      <div className="row">
        <div className="col-auto">
          <input type="text" className="form-control" id="user" placeholder="Usuario"
          onChange={event => props.onSetFilters({...props.filters, user: event.target.value})} value={props.filters.user}/>
        </div>
        <div className="col-auto">
          <input type="text" className="form-control" id="description" placeholder="Descrição"
          onChange={event => props.onSetFilters({...props.filters, description: event.target.value})} value={props.filters.description}/>
        </div>
        <div className="col-auto">
          <input type="text" className="form-control" id="openDate" placeholder="Data de abertura"
          onChange={event => props.onSetFilters({...props.filters, openDate: event.target.value})} value={props.filters.openDate}/>
        </div>
        <div className="col-auto">
          <input type="text" className="form-control" id="closeDate" placeholder="Data de fechamento"
          onChange={event => props.onSetFilters({...props.filters, closeDate: event.target.value})} value={props.filters.closeDate}/>
        </div>
        <div className="col-auto pr-0">
          <button type="button" className="btn btn-primary" onClick={() => props.onFilter()}>Buscar <AiOutlineSearch/></button>
        </div>
      </div>
    </main>
  );
}

export default FilterProduct;
