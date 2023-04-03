import React, { useEffect, useState, useContext } from 'react';

import Modal from '../UI/Modal';
import RewardItem from './RewardItem';
import classes from './Cart.module.css';
import LoginContext from '../../store/login-context';

const Profile = (props) => {
  const [rewards, setRewards] = useState([]);
  let totalRewards = 0;
  const loginCtx = useContext(LoginContext);

  useEffect(()=>{
    fetch(`http://localhost:5001/food/${loginCtx.userDetails.Uid}/rewards`)
    .then(response => response.json())
    .then(rewards => setRewards(rewards));
  })


  const rewardItems = (
      <table>
        <tr>
          <th>OrderID</th>
          <th>Order Amount</th>
          <th>Reward Earned</th>
        </tr>
        {rewards.map((item) => {
        totalRewards = totalRewards + item.rewards;
        return (
        <RewardItem
        key = {item.oid}
        orderId = {item.oid}
        orderTotal = {item.ordertotal}
        rewardsEarned = {item.rewards}
        />
      )})}
      </table>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={props.onClose}>
        Close
      </button>
      <button className={classes.button} onClick={loginCtx.removeUser}>
        Logout
      </button>
    </div>
  );

  const cartModalContent = (
    <React.Fragment>
      <div className={classes.total}>
        <span>Total Rewards Earned</span>
        <span>{totalRewards}</span>
      </div>
      <h2> Last 5 Rewards Details</h2>
      {rewardItems}
      {modalActions}
    </React.Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      {cartModalContent}
    </Modal>
  );
};

export default Profile;
