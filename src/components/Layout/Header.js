import { Fragment } from 'react';
import headerIMG from '../../assets/meals.jpg';
import styles from './Header.module.css';
import HeaderCardButton from './HeaderCartButton';

const Header = () => {
  return (
    <Fragment>
      <header className={styles.header}>
        <h1>Meals</h1>
        <HeaderCardButton />
      </header>
      <div className={styles['main-image']}>
        <img src={headerIMG} alt='Lots of delicious foods'/>

      </div>
    </Fragment>
  )
}

export default Header;