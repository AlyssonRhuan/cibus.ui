import React, { useState, useEffect } from 'react';

function LoadingPaginaInteira() {
  return (
    <main className="Loading align-middle" style={{
      backgroundColor: 'black',
      position: 'absolute',
      left: '0',
      width: '100%'
    }}>
      <section>
        <div className="text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </section>
    </main>
  );
}

export default LoadingPaginaInteira;
