import React, { useState, useEffect } from 'react';

function Loading() {
  return (
    <main className="Loading align-middle" style={{ height: '10px' }}>
      <section>
        <div className="spinner-border text-primary">
        </div>
      </section>
    </main>
  );
}

export default Loading;
