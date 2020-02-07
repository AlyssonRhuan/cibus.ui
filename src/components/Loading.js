import React, { useState, useEffect } from 'react';
import IconsUtils from '../utils/IconsUtils'

function Loading() {
  return (
    <main className="Loading align-middle">
      <section>
      <div className="spinner-border text-primary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
      </section>
    </main>
  );
}

export default Loading;
