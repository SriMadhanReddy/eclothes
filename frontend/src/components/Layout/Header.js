import { Fragment } from 'react';

import HeaderCartButton from './HeaderCartButton';
import ProfileButton from './ProfileButton';
import mealsImage from '../../assets/meals.jpg';
import classes from './Header.module.css';

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1 className={classes.title}>FoodFactory</h1>
        <HeaderCartButton onClick={props.onShowCart} />
        <ProfileButton onClick={props.onShowProfile}/>
      </header>
      <div className={classes['main-image']}>
        <img src={mealsImage} alt='A table full of delicious food!' />
      </div>
    </Fragment>
  );
};

export default Header;
