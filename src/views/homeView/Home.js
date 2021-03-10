import React, { useState, useEffect } from 'react';
import Loading from '../../components/Loading';
import Breadcrumb from '../../components/Breadcrumb';

const rotasBreadcrumb = [
  { name: "Home", path: "/" },
  { name: "Product" }
]

const END_POINT = 'product'
const PAGE_TITLE = 'Product'

function Home() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {   
    
  }, [])

  return (
    <main className="App col-12 pr-4 ml-1 pl-4">
      {isLoading
        ? <Loading />
        : <section>
          <Breadcrumb routes={rotasBreadcrumb} />

          {/* BARRA MENU INTERNO */}
          <div style={{ alignItems: 'center' }} className="col-12 row justify-content-between mx-0 px-0">
            <span>
              <h1 className="display-4">{PAGE_TITLE}</h1>
            </span>
            <span>
              <button type="button" className="btn btn-success ml-2">
                Add Product
              </button>
            </span>
          </div>

          {/* {
            products && <Table
              data={products}
              columns={ProductDataTableConfig}
              onAction={openModal}
              onGetAll={getAllProducts}
            />
          } */}

        </section>
      }
    </main>
  );
}

export default Home;
