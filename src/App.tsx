import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Box, ChakraProvider, Flex } from '@chakra-ui/react';

import Sidebar from './components/Sidebar';

import HomePage from './pages/HomePage';

export default function App() {
  return (
    <Router>
      <ChakraProvider>
        <Flex direction="row" width="100vw" h="100vh">
          <Sidebar />
          <Box paddingLeft="240px" overflowY="auto" w="full" h="2000px">
            <Switch>
              <Route path="/" component={HomePage} />
            </Switch>
          </Box>
        </Flex>
      </ChakraProvider>
    </Router>
  );
}
