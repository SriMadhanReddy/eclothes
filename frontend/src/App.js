import { useState, useContext, useEffect } from 'react';

import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import Profile from './components/Cart/Profile';
import CartProvider from './store/CartProvider';
import LoginContext from './store/login-context';
import { useNavigate } from "react-router-dom";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const [profileIsShown, setProfileIsShown] = useState(false);
  const loginCtx = useContext(LoginContext);
  const navigate = useNavigate();

  useEffect(()=>{
    if(!loginCtx.isLoggedIn){
      navigate('/');
    }
  });

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  const showProfileHandler = () => {
    setProfileIsShown(true);
  };

  const hideProfileHandler = () => {
    setProfileIsShown(false);
  };
  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      {profileIsShown && <Profile onClose={hideProfileHandler} />}
      <Header onShowCart={showCartHandler} onShowProfile={showProfileHandler}/>
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
