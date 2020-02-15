import React from 'react';

function MenuOverlay(props) {

  return (
    <main className="col-12"
      style={{
        zIndex: '1',
        position: "absolute",
        height: `${props.ativo ? '100vh' : '0vh'}`,
        width:`${props.ativo ? '100vw' : '0vw'}`,
        left: '0',
        top: '0',
        backgroundColor: 'rgba(0, 0, 0, .8)'
      }}
      onClick={() => props.onClick(false)}>
      <section>
      </section>
    </main>
  );
}

export default MenuOverlay;
