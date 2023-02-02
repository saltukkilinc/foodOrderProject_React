import styles from "./HeaderCardButton.module.css";
import CardIcon from "../Card/CardIcon";

const HeaderCardButton = ({onShowCard}) => {
  return (
    <button className={styles.button} onClick={() => onShowCard()}>
      <span className={styles.icon}>
        <CardIcon />
      </span>
      <span>Your Card</span>
      <span className={styles.badge}>5</span>
    </button>
  );
};

export default HeaderCardButton;
