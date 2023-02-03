import { useContext, useEffect, useState } from "react";
import CardContext from "../../store/card-context";
import styles from "./HeaderCardButton.module.css";
import CardIcon from "../Card/CardIcon";

const HeaderCardButton = ({onShowCard}) => {
  const [isBtnHighlighted, setIsBtnHighlighted] = useState(false)
  // Consumer yerine hook kullanıyorum
  const cardCtx = useContext(CardContext);

  const numberOfCardItems = cardCtx.items.reduce((currentNum, item) => {
    return currentNum + item.amount
  }, 0)


  const btnStyles = `${styles.button} ${isBtnHighlighted ? styles.bump : ''}`;

  const { items } = cardCtx;

  useEffect(() => {
    if(items.length === 0) {
      return;
    };
    setIsBtnHighlighted(true);

    const timer = setTimeout(() => {
      setIsBtnHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    }

  }, [items])

  return (
    <button className={btnStyles} onClick={() => onShowCard()}>
      <span className={styles.icon}>
        <CardIcon />
      </span>
      <span>Your Card</span>
      <span className={styles.badge}>{numberOfCardItems}</span>
    </button>
  );
};

export default HeaderCardButton;
