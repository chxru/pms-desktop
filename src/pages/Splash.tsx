import React from 'react';
import { Flex, Text } from '@chakra-ui/react';

const SplashScreen: React.FC = () => {
  return (
    <Flex w="100vw" h="full" justifyContent="center" alignItems="Center">
      <Text align="center" paddingY="2" fontSize="lg">
        Loading
      </Text>
    </Flex>
  );
};

export default SplashScreen;
