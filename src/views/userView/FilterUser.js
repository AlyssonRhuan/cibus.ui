import React, { useState, useEffect } from 'react';
import { AiOutlineSearch, AiOutlineClear } from 'react-icons/ai';

function FilterProduct(props) {
  return (
    <main>
      <div className="row">
        <div className="col-auto">
          <input type="text" className="form-control" id="Name" placeholder="Nome"
            onChange={event => props.onSetFilters({ ...props.filters, name: event.target.value })} value={props.filters.name} />
        </div>
        <div className="col-auto">
          <input type="text" className="form-control" id="Login" placeholder="Login"
            onChange={event => props.onSetFilters({ ...props.filters, login: event.target.value })} value={props.filters.login} />
        </div>
        <div className="col-auto pr-0">
          <button type="button" className="btn btn-primary" onClick={() => props.onFilter()}>Buscar <AiOutlineSearch /></button>
        </div>
      </div>
    </main>
  );
}

export default FilterProduct;
