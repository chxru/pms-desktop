import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';

const Sidebar: React.FC = () => {
  return (
    <Flex
      direction="column"
      h="100vh"
      w="350px"
      justify="space-between"
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
        <ul>
          <li>menu 1</li>
          <li>menu 2</li>
          <li>menu 3</li>
        </ul>
      </Box>

      <Box textAlign="center">
        <Text>pms-desktop</Text>
        <Text>alpha-1.0v</Text>
      </Box>
    </Flex>
  );
};

export default Sidebar;
