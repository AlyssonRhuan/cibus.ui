import React from 'react';

function Breadcrumb(props) {

  return (
    <main className="mt-4">
      <section>
        {/* BREADCRUMB */}
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            {
              props.routes && props.routes.map(
                route => <li className="breadcrumb-item"><a href={route.path}>{route.name}</a></li>
              )
            }
          </ol>
        </nav>
      </section>
    </main>
  );
}

export default Breadcrumb;
