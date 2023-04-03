import { useEffect, useState, useContext } from 'react';

import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import CartContext from '../../store/cart-context';
import LoginContext from '../../store/login-context';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();
  const cartCtx = useContext(CartContext);
  const loginCtx = useContext(LoginContext);

  useEffect(() => {
    const fetchMeals = async () => {
      const foodresponse = await fetch(
        'https://03hxw8p1xl.execute-api.us-east-1.amazonaws.com/test_get'
      );
//https://03hxw8p1xl.execute-api.us-east-1.amazonaws.com/test_get
      const cartresponse = await fetch(
        `http://localhost:5000/food/${loginCtx.userDetails.Uid}/carts`
      )

      if (!foodresponse.ok) {
        throw new Error('Something went wrong!');
      }

      const responseData = await foodresponse.json();
      const cartData = await cartresponse.json();

      for (const key in cartData){
        const item = {
          cartid: cartData[key].cid,
          id: cartData[key].pid,
          name: responseData[cartData[key].pid].name,
          amount: cartData[key].quantity,
          price: responseData[cartData[key].pid].price
        }
        cartCtx.fetchCartItems(item);
      }

      const loadedMeals = [];

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      
      setMeals(loadedMeals);
      setIsLoading(false);
    };

    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={classes.MealsError}>
        <p>{httpError}</p>
      </section>
    );
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
