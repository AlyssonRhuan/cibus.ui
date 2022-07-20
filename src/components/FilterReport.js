import React, { useState, useEffect } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

function FilterReport({ onSelected, filterSelected }) {

  return (
    <main>
      <div className="row mt-2">
        <div className="col-auto">
          <select className="form-control" aria-label="Default select example" onChange={event => onSelected(event.target.value)}>
            <option value="DAY" selected={filterSelected === 'DAY'}>Dia</option>
            <option value="WEEK" selected={filterSelected === 'WEEK'}>Semana</option>
            <option value="MOUNTH" selected={filterSelected === 'MOUNTH'}>Mês</option>
          </select>
        </div>
      </div>
    </main>
  );
}

export default FilterReport;
