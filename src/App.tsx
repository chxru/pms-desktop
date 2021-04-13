/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Box, ChakraProvider, extendTheme, Flex } from '@chakra-ui/react';
import { ipcRenderer } from 'electron';

import Topbar from './components/Topbar';

import AuthContext from './context/auth-context';

import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import AddPatientPage from './pages/AddPatient';
import ProfileView from './pages/Profile';
import SplashScreen from './pages/Splash';

const theme = extendTheme({
  colors: {
    primary: '#1C2340',
    secondry: '#FFFFFF',
    background: '#F2F6F9',
  },
  styles: {
    global: {
      body: {
        backgroundColor: '#F2F6F9',
        overflow: 'hidden',
      },
    },
  },
});

export default function App() {
  const [firstUser, setfirstUser] = useState<boolean | 'pending'>('pending');
  const [isLoggedIn, setisLoggedIn] = useState<boolean>(false);
  const signIn = () => setisLoggedIn(true);
  const signOut = () => setisLoggedIn(false);

  useEffect(() => {
    ipcRenderer.send('check-for-users');
    ipcRenderer.once(
      'check-for-users-res',
      (_, args: { res: boolean; error?: string }) => {
        setfirstUser(args.res);
      }
    );
  }, []);

  return (
    <Router>
      <ChakraProvider theme={theme}>
        <AuthContext.Provider
          value={{ AuthStatus: isLoggedIn, SignIn: signIn, SignOut: signOut }}
        >
          <Flex direction="row" width="100vw" h="100vh">
            {isLoggedIn ? (
              <Box overflowY="auto" w="full">
                <Topbar />
                <Box marginTop="60px">
                  <Switch>
                    <Route path="/profile/:id" component={ProfileView} />
                    <Route path="/addPatient" component={AddPatientPage} />
                    <Route path="/" component={HomePage} />
                  </Switch>
                </Box>
              </Box>
            ) : (
              <Box>
                <Switch>
                  {firstUser === 'pending' ? (
                    <Route path="/" component={SplashScreen} />
                  ) : firstUser ? (
                    <Route path="/" component={LoginPage} />
                  ) : (
                    <Route path="/" component={RegisterPage} />
                  )}
                </Switch>
              </Box>
            )}
          </Flex>
        </AuthContext.Provider>
      </ChakraProvider>
    </Router>
  );
}
