import { useState } from "react";
import styles from "./Checkout.module.css";

const initalErrorState = {
  name: true,
  street: true,
  postal: true,
  city: true,
};

const initialOrderState = {
  name: "",
  street: "",
  postal: "",
  city: "",
};

const Checkout = ({ onHideCard, postDataToServer }) => {
  const [order, setOrder] = useState(initialOrderState);

  const [error, setError] = useState(initalErrorState);
  const [showError, setShowError] = useState(false);

  const changeHandler = (e) => {
    if (e.target.name === "postal" && e.target.value.length >= 5) {
      setError((prevError) => {
        return { ...prevError, postal: false };
      });
    }
    if (e.target.name === "postal" && e.target.value.length < 5) {
      setError((prevError) => {
        return { ...prevError, postal: true };
      });
    }
    if (e.target.name !== "postal" && e.target.value !== "") {
      setError((prevError) => {
        return { ...prevError, [e.target.name]: false };
      });
    }
    if (e.target.name !== "postal" && e.target.value === "") {
      setError((prevError) => {
        return { ...prevError, [e.target.name]: true };
      });
    }

    setOrder((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (
      order.name.trim() === "" ||
      order.street.trim() === "" ||
      order.postal.trim().length < 5 ||
      order.city.trim() === ""
    ) {
      setShowError(true);
      return;
    }

    
    postDataToServer(order);
    setOrder(initialOrderState);
  };

  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <div className={styles.control}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          name="name"
          onChange={changeHandler}
          value={order.name}
        />
        {error.name && showError && <p>Please type your name!</p>}
      </div>
      <div className={styles.control}>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          name="street"
          onChange={changeHandler}
          value={order.street}
        />
        {error.street && showError && <p>Please type your street!</p>}
      </div>
      <div className={styles.control}>
        <label htmlFor="postal">Postal Code</label>
        <input
          type="text"
          id="postal"
          name="postal"
          onChange={changeHandler}
          value={order.postal}
        />
        {error.postal && showError && <p>Please type your postal!</p>}
      </div>
      <div className={styles.control}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          name="city"
          onChange={changeHandler}
          value={order.city}
        />
        {error.city && showError && <p>Please type your city!</p>}
      </div>
      <div className={styles.actions}>
        <button type="button" onClick={onHideCard}>
          Cancel
        </button>
        <button className={styles.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
