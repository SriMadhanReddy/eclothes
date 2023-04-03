import React from 'react';

const LoginContext = React.createContext({
  isLoggedIn: false,
  userDetails: {},
  addUser: (user) => {},
  removeUser: () => {},
});

export default LoginContext;