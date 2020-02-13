import React, { useState, useEffect } from 'react';
import GlobablConfig from '../../configs/Global'

function Home() {
  return (
    <main className="App col-12 pt-5">
      <section>
        <h1 className="display-4">Welcome to {GlobablConfig.AppName}</h1>
      </section>
    </main>
  );
}

export default Home;
