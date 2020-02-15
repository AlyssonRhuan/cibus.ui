import React from 'react';

function Breadcrumb(props) {

  return (
    <main className="mt-4">
      <section>
        {/* BREADCRUMB */}
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            {
              props.rotas && props.rotas.map(
                rota => <li className="breadcrumb-item"><a href={rota.path}>{rota.name}</a></li>
              )
            }
          </ol>
        </nav>
      </section>
    </main>
  );
}

export default Breadcrumb;
