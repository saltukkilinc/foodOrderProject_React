import styles from "./HeaderCardButton.module.css";
import CardIcon from "../Card/CardIcon";

const HeaderCardButton = () => {
  return (
    <button className={styles.button}>
      <span className={styles.icon}>
        <CardIcon />
      </span>
      <span>Your Card</span>
      <span className={styles.badge}>5</span>
    </button>
  );
};

export default HeaderCardButton;
