import Modal from '../UI/Modal'; 
import styles from './Card.module.css';

const Card = ({onHideCard}) => {
  const cardItems = <ul className={styles["card-items"]}>{ [{
    id: 'm1',
    name: 'Sushi',
    description: 'Finest fish and veggies',
    price: 22.99,
  }].map(item => <li key={item.id}>{item.name}</li>) }</ul>

  return (
    <Modal onHideCard={onHideCard} >
      {cardItems}
      <div className={styles.total}>
        <span>Total</span>
        <span>35.62</span>
      </div>
      <div className={styles.actions}>
        <button className={styles['button-alt']}>Order</button>
        <button className={styles.button} onClick={() => onHideCard()}>Close</button>
      </div>
    </Modal>
  )
}

export default Card;