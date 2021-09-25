import PageTitle from '../../components/PageTitle';
import React, { useState, useEffect } from 'react';
import Categories from './Categories';
import MeProfile from './MeProfile';
import MePassword from './MePassword';
import MeMoney from './MeMoney';
import MeSettings from './MeSettings';

const rotasBreadcrumb = [
  { name: "Home", path: "/" },
  { name: "Eu" }
]
const PAGE_TITLE = 'Eu'

function User(props) {
  const [categoryId, setCategoryId] = useState(1);

  function onChangeCategory(id){
    setCategoryId(id);
  }

  return (
    <main className="App col-12 pr-4 ml-1 pl-4">
      <section>

        {/* BARRA MENU INTERNO */}
        <div style={{ alignItems: 'center' }} className="col-12 row justify-content-between mx-0 px-0">
          <PageTitle title={PAGE_TITLE} breadcrumb={rotasBreadcrumb} />
        </div>
        <section className="pt-4">
          <div className="col-12 row">
            <div className="col-2 px-0">
              <Categories onChangeCategory={onChangeCategory} />
            </div>
            <div className="col-10">
              { categoryId === 1 && <MeProfile /> }
              { categoryId === 2 && <MePassword /> }
              { categoryId === 3 && <MeMoney /> }
              { categoryId === 0 && <MeSettings /> }
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}

export default User;