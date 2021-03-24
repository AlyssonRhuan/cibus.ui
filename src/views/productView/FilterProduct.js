import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

function FilterProduct(props) {

  return (
    <main>
      <div className="row">
        <div className="col-auto">
          <input type="text" className="form-control" id="Name" placeholder="Name"/>
        </div>
        <div className="col-auto">
          <select className="form-control" aria-label="Default select example">
            <option value="">Category</option>
            <option value="YES">Assado</option>
            <option value="NO">Sobremesa</option>
          </select>
        </div>
        <div className="col-auto">
          <select className="form-control" aria-label="Default select example">
            <option value="">Active</option>
            <option value="YES">Sim</option>
            <option value="NO">Não</option>
          </select>
        </div>
        <div className="col-auto pr-0">
          <button type="button" className="btn btn-primary">Buscar <AiOutlineSearch/></button>
        </div>
      </div>
    </main>
  );
}

export default FilterProduct;
