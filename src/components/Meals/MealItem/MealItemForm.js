import React from 'react';
import styles from './MealItemForm.module.css';
import Input from '../../UI/Input';
import { useRef, useState } from 'react';

const MealItemForm = ({onAddToCard}) => {

  const [isValid, setIsValid] = useState(true)
  const amountInputRef  = useRef()

  const submitHandler = (e) => {
    e.preventDefault();

    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if(enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 5) {
      setIsValid(false)
      return;
    }

    onAddToCard(enteredAmountNumber);
  }

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <Input label='Amount' ref={amountInputRef} input={{
        type: 'number',
        id: 'amount',
        min: "1",
        max: "5",
        step: "1",
        defaultValue: "1"
      }} />
      <button>+ Add</button>
      {!isValid && <p>Please enter a valid amount!</p>}
    </form>
  )
}

export default MealItemForm
