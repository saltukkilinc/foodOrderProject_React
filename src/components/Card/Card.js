import Modal from "../UI/Modal";
import styles from "./Card.module.css";
import { useContext, useState } from "react";
import CardContext from "../../store/card-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import axios from "axios";

const Card = ({ onHideCard }) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isOrderLoading, setIsOrderLoading] = useState(false);
  const [isOrderProcessFinished, setIsOrderProcessFinished] = useState(false);
  const ctx = useContext(CardContext);
  const totalAmount = `$${ctx.totalAmount.toFixed(2)}`;
  const hasItems = ctx.items.length > 0;

  const cardItemAddHandler = (item) => {
    ctx.addItem({ ...item, amount: 1 });
  };

  const cardItemRemoveHandler = (id) => {
    ctx.deleteItem(id);
  };

  const cardItems = (
    <ul className={styles["card-items"]}>
      {ctx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cardItemRemoveHandler.bind(null, item.id)}
          onAdd={cardItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const checkoutHandler = () => {
    setIsCheckout(true);
  };

  const postDataToServer = async (newOrder) => {
    setIsOrderLoading(true);
    setIsOrderProcessFinished(false);

    await axios.post(
      `https://react-udemy-http-7d115-default-rtdb.firebaseio.com/orders.json`,
      {
        user: newOrder,
        orderedItems: ctx.items,
      }
    );

    setIsOrderLoading(false);
    setIsOrderProcessFinished(true);
    ctx.clearCard();
  };

  return (
    <Modal onHideCard={onHideCard}>

      {!isOrderLoading && !isOrderProcessFinished &&(
        <>
          {cardItems}
          <div className={styles.total}>
            <span>Total</span>
            <span>{totalAmount}</span>
          </div>
          {isCheckout && (
            <Checkout
              onHideCard={onHideCard}
              postDataToServer={postDataToServer}
            />
          )}
          {!isCheckout && (
            <div className={styles.actions}>
              <button className={styles.button} onClick={() => onHideCard()}>
                Close
              </button>
              {hasItems && (
                <button
                  className={styles["button-alt"]}
                  onClick={checkoutHandler}
                >
                  Order
                </button>
              )}
            </div>
          )}
        </>
      )}

      {isOrderLoading && !isOrderProcessFinished && <p>Order is loading!</p>}
      
      {!isOrderLoading && isOrderProcessFinished && 
        <>
          <p>Order has completed</p>
          <div className={styles.actions}>
            <button className={styles.button} onClick={() => onHideCard()}>
                  Close
            </button>
          </div>
        </>
      }


    </Modal>
  );
};

export default Card;
