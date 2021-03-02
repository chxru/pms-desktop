import React, { useContext, useState } from 'react';
import { Box, Button, Flex, Input, Text } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';

// icons
import { LogOut } from 'react-feather';

// context
import AuthContext from '../context/auth-context';

const Topbar: React.FC = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const [activeTab, setactiveTab] = useState<string>('dashboard');

  return (
    <Flex
      direction="row"
      h="54px"
      position="fixed"
      w="100%"
      boxShadow="sm"
      backgroundColor="white"
      justifyContent="space-evenly"
      alignItems="center"
    >
      {/* App name */}
      <Box>
        <Text>PMS</Text>
      </Box>

      {/* Navigation */}
      <Flex as="nav" height="full">
        <Flex
          as="span"
          alignItems="center"
          paddingX="3"
          cursor="pointer"
          height="full"
          borderBottom={activeTab === 'dashboard' ? '1px' : '0px'}
          borderColor="teal"
          onClick={() => {
            history.replace('/');
            setactiveTab('dashboard');
          }}
        >
          Dashboard
        </Flex>
        <Flex
          as="span"
          alignItems="center"
          paddingX="3"
          cursor="pointer"
          height="full"
          borderBottom={activeTab === 'browse' ? '1px' : '0px'}
          borderColor="teal"
          onClick={() => {
            // history.replace('/');
            setactiveTab('browse');
          }}
        >
          Browse
        </Flex>
      </Flex>

      {/* Search input with button */}
      <Flex>
        <Input placeholder="Search" marginX="3" />
        <Button
          paddingX="3"
          width="200px"
          colorScheme="teal"
          onClick={() => {
            history.push('/addPatient');
            setactiveTab('addPatient');
          }}
        >
          Add Patient
        </Button>
      </Flex>

      {/* Topbar-end buttons */}
      <Flex>
        <Box as="span">
          <LogOut
            cursor="pointer"
            onClick={() => {
              auth.SignOut();
            }}
          />
        </Box>
      </Flex>
    </Flex>
  );
};

export default Topbar;
