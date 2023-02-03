import Modal from "../UI/Modal";
import styles from "./Card.module.css";
import { useContext } from "react";
import CardContext from "../../store/card-context";
import CartItem from "./CartItem";

const Card = ({ onHideCard }) => {
  const ctx = useContext(CardContext);
  const totalAmount = `$${ctx.totalAmount.toFixed(2)}`;
  const hasItems = ctx.items.length > 0;

  const cardItemAddHandler = (item) => {
    ctx.addItem({...item, amount: 1})
  };

  const cardItemRemoveHandler = (id) => {
    ctx.deleteItem(id)
  };

  const cardItems = (
    <ul className={styles["card-items"]}>
      {ctx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cardItemRemoveHandler.bind(null,item.id)}
          onAdd={cardItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  return (
    <Modal onHideCard={onHideCard}>
      {cardItems}
      <div className={styles.total}>
        <span>Total</span>
        <span>{totalAmount}</span>
      </div>
      <div className={styles.actions}>
        <button className={styles.button} onClick={() => onHideCard()}>
          Close
        </button>
        {hasItems && <button className={styles["button-alt"]}>Order</button>}
      </div>
    </Modal>
  );
};

export default Card;
