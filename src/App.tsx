import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { Box, ChakraProvider, extendTheme, Flex } from '@chakra-ui/react';

import Topbar from './components/Topbar';

import AuthContext from './context/auth-context';

import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import AddPatientPage from './pages/AddPatient';
import Profileview from './pages/Profileview';

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
  const [isLoggedIn, setisLoggedIn] = useState<boolean>(false);
  const signIn = () => setisLoggedIn(true);
  const signOut = () => setisLoggedIn(false);

  return (
    <Router>
      <ChakraProvider theme={theme}>
        <AuthContext.Provider
          value={{ AuthStatus: isLoggedIn, SignIn: signIn, SignOut: signOut }}
        >
          <Flex direction="row" width="100vw" h="100vh">
            {isLoggedIn ? (
              <>
                <Box overflowY="auto" w="full">
                  <Topbar />
                  <Box marginTop="60px">
                    <Switch>
                      <Route path="/profileview" component={Profileview} />
                      <Route path="/addPatient" component={AddPatientPage} />
                      <Route path="/" component={HomePage} />
                    </Switch>
                  </Box>
                </Box>
              </>
            ) : (
              <Box>
                <Switch>
                  <Route path="/register" component={RegisterPage} />
                  <Route path="/" component={LoginPage} />
                  <Route exact path="/">
                    <Redirect to="/login" />
                  </Route>
                </Switch>
              </Box>
            )}
          </Flex>
        </AuthContext.Provider>
      </ChakraProvider>
    </Router>
  );
}
