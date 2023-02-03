import React from 'react';
import classes from './Input.module.css';

const Input = React.forwardRef (({input, label}, ref) => {
  return (
    <div className={classes.input}>
      <label htmlFor={input.id}>{label}</label>
      <input {...input} ref={ref} />
    </div>
  )
});

export default Input;



/* Buradaki {...input} spread operatörüyle bir propsu bütün key-value çiftlerini attribute olarak tanımlamammı sağlar 

örnek: {             
type: 'text';      <input type="text" id: '11111' />
id: '1111'
}

*/