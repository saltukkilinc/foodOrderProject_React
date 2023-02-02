import { useContext } from "react";
import CardContext from "../../store/card-context";
import styles from "./HeaderCardButton.module.css";
import CardIcon from "../Card/CardIcon";

const HeaderCardButton = ({onShowCard}) => {
  // Consumer yerine hook kullanıyorum
  const cardCtx = useContext(CardContext);

  const numberOfCardItems = cardCtx.items.reduce((currentNum, item) => {
    return currentNum + item.amount
  }, 0)

  return (
    <button className={styles.button} onClick={() => onShowCard()}>
      <span className={styles.icon}>
        <CardIcon />
      </span>
      <span>Your Card</span>
      <span className={styles.badge}>{numberOfCardItems}</span>
    </button>
  );
};

export default HeaderCardButton;
