import { ReactComponent as YourSvg } from '../../assets/profile-svgrepo-com.svg';
import classes from './ProfileButton.module.css'

const ProfileButton = (props) => {
    return <button className={classes.button} onClick={props.onClick}>
    <span className={classes.icon}>
      <YourSvg />
    </span>
  </button>
}

export default ProfileButton;