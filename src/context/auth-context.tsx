import React from 'react';

const AuthContext = React.createContext<{
  AuthStatus: boolean;
  SignIn: () => void;
  SignOut: () => void;
}>({
  AuthStatus: false,
  SignIn: () => {},
  SignOut: () => {},
});

export default AuthContext;
