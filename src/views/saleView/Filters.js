import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

function Filters(props) {

  return (
    <main>
      <div className="row">
        <div className="col-auto">
          <input type="text" className="form-control" id="Product" placeholder="Product"/>
        </div>
        <div className="col-auto">
          <input type="text" className="form-control" id="Category" placeholder="Category"/>
        </div>
        <div className="col-auto">
          <input type="text" className="form-control" id="Date" placeholder="Date"/>
        </div>
        <div className="col-auto">
          <select className="form-control" aria-label="Default select example">
            <option selected>Status</option>
            <option value="PAID">Pago</option>
            <option value="ORDER">Pedido</option>
          </select>
        </div>
        <div className="col-auto">
          <button type="button" className="btn btn-primary"><AiOutlineSearch/></button>
        </div>
      </div>
    </main>
  );
}

export default Filters;
