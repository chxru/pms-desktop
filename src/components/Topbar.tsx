import React from 'react';
import { Flex, Text } from '@chakra-ui/react';

const Topbar: React.FC = () => {
  return (
    <Flex
      direction="row"
      h="54px"
      position="fixed"
      w="100%"
      boxShadow="sm"
      backgroundColor="white"
    >
      <Text>Topbar</Text>
    </Flex>
  );
};

export default Topbar;
