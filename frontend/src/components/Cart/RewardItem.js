

const RewardItem = (props) => {

  return (
      <tr>
          <td>{props.orderId}</td>
          <td>{props.orderTotal}</td>
          <td>{props.rewardsEarned}</td>
      </tr>
  );
};

export default RewardItem;
