import React, { useState, useEffect } from 'react';

function Input(props) {
  return (
    <main>
    {/* {props.isInvalid && <small className="form-text text-muted">Invalid!</small>}
    {props.isValid && <small className="form-text text-muted">Look good!</small>} */}
      <input
        style={{ 
          border: props.isValid ? "1px solid green" : ( props.isInvalid ? "1px solid red" : "" ),
          borderRadius: '10px'
        }} 
        type={`${props.type ? props.type : 'text'}`}
        placeholder={`${props.placeholder ? props.placeholder : ''}`}
        required
      />   
    </main>
  );
}

export default Input;
