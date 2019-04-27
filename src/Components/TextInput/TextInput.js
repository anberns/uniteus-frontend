import React from 'react'
import '../Form/Form.css';

function TextInput(props) {
  return (
    <div>
      <input 
        className={props.inputClass} 
        required 
        type="text" 
        id={props.inputId}
        name={props.inputName} 
        value={props.inputValue} 
        onChange={props.onchange} 
        placeholder={props.placeholder}
      />
      <div 
        className={props.valClass} 
        id={props.valId}
      >
        required
      </div>
    </div>
  );
}

export default TextInput;