import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Box, ChakraProvider, extendTheme, Flex } from '@chakra-ui/react';

import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';

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
  const [isLoggedIn, setisLoggedIn] = useState<false>(false);

  return (
    <Router>
      <ChakraProvider theme={theme}>
        <Flex direction="row" width="100vw" h="100vh">
          {isLoggedIn ? (
            <Box>
              <Sidebar />
              <Box overflowY="auto" w="full">
                <Topbar />
                <Box marginTop="60px">
                  <Switch>
                    <Route path="/login" component={LoginPage} />
                    <Route exact path="/" component={HomePage} />
                  </Switch>
                </Box>
              </Box>
            </Box>
          ) : (
            <Box>
              <Switch>
                <Route path="/" component={LoginPage} />
              </Switch>
            </Box>
          )}
        </Flex>
      </ChakraProvider>
    </Router>
  );
}
