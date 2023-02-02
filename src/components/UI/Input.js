import React from 'react';
import classes from './Input.module.css';

const Input = ({input, label}) => {
  return (
    <div className={classes.input}>
      <label htmlFor={input.id}>{label}</label>
      <input {...input}/>
    </div>
  )
}

export default Input;



/* Buradaki {...input} spread operatörüyle bir propsu bütün key-value çiftlerini attribute olarak tanımlamammı sağlar 

örnek: {             
type: 'text';      <input type="text" id: '11111' />
id: '1111'
}

*/