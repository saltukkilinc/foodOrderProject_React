import React, { useContext } from 'react';
import styles from './MealItem.module.css';
import MealItemForm from './MealItemForm';
import CardContext from '../../../store/card-context';

const MealItem = ({meal}) => {

  const ctx = useContext(CardContext)

  const addToCardHandler = amount => {
    ctx.addItem({
      id: meal.id,
      name: meal.name,
      amount: amount, // amount burdan değil MealItemForm>Input' dan ref ile çekiyoruz
      price: meal.price
    })
  }

  const price = `$${meal.price.toFixed(2)}`
  
  return (
    <li className={styles.meal}>
      <div>
        <h3>{meal.name}</h3>
        <div className={styles.description}>{meal.description}</div>
        <div className={styles.price}>{price}</div>
      </div>
      <div>
        <MealItemForm onAddToCard={addToCardHandler}/>
      </div>
    </li>
  )
}

export default MealItem
