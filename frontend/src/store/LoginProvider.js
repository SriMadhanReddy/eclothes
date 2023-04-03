import { useReducer } from 'react';

import LoginContext from './login-context';

const defaultLoginState = {
    isLoggedIn: false,
    userDetails: {}
};

const loginReducer = (state, action) => {
  if (action.type === 'LOGIN') {
    console.log(state.isLoggedIn);
    return {
      isLoggedIn: true,
      userDetails: action.user,
    };
  }

  if (action.type === 'LOGOUT') {
    return defaultLoginState;
  }

  return defaultLoginState;
};

const LoginProvider = (props) => {
  const [loginState, dispatchLoginAction] = useReducer(
    loginReducer,
    defaultLoginState
  );

  const addUserHandler = (user) => {
    dispatchLoginAction({ type: 'LOGIN', user: user });
  };

  const removeUserHandler = () => {
    dispatchLoginAction({type: 'LOGOUT'});
  };

  const loginContext = {
    isLoggedIn: loginState.isLoggedIn,
    userDetails: loginState.userDetails,
    addUser: addUserHandler,
    removeUser: removeUserHandler
  };

  return (
    <LoginContext.Provider value={loginContext}>
      {props.children}
    </LoginContext.Provider>
  );
};

export default LoginProvider;
