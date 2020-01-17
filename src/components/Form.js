import React from 'react';
import './Form.css';

const Form = ({ value, onChange, onCreate, onKeyPress }) => {
  return (
    <div className="form">
      <div className="create-button" onClick={onCreate}>
        +
      </div>
    </div>
  );
};

export default Form;