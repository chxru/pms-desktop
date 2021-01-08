import React from 'react';
import { Box, Flex } from '@chakra-ui/react';

const Sidebar: React.FC = () => {
  return (
    <Flex
      direction="column"
      h="100vh"
      w="240px"
      justify="space-between"
      align="center"
      zIndex="20"
      pos="absolute"
    >
      <p>PMS</p>
      <Box>
        <ul>
          <li>menu 1</li>
          <li>menu 2</li>
          <li>menu 3</li>
        </ul>
      </Box>
      <p>footer</p>
    </Flex>
  );
};

export default Sidebar;
