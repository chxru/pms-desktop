import React from 'react';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const history = useHistory();
  return (
    <Flex
      direction="column"
      h="100vh"
      w="350px"
      justify="space-between"
      alignItems="center"
      backgroundColor="primary"
      color="white"
      paddingTop="35px"
      paddingX="35px"
    >
      <Box>
        <Text fontSize="2xl">Hospital Name</Text>
        <Text align="justify">Patient Management System</Text>
      </Box>

      <Box>
        <Button
          colorScheme="teal"
          onClick={() => {
            history.push('/addPatient');
          }}
        >
          Add Patient
        </Button>
      </Box>

      <Box textAlign="center">
        <Text>pms-desktop</Text>
        <Text>alpha-1.0v</Text>
      </Box>
    </Flex>
  );
};

export default Sidebar;
