import React, { useContext, useEffect } from 'react';
import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { ipcRenderer } from 'electron';

import AuthContext from '../context/auth-context';

interface RegisterForm {
  username: string;
  password: string;
}

const RegisterPage: React.FC = () => {
  const auth = useContext(AuthContext);
  const { handleSubmit, errors, register } = useForm<RegisterForm>();

  // listen to ipc
  useEffect(() => {
    ipcRenderer.on(
      'register-new-user-res',
      (_, args: { res: boolean; error?: string }) => {
        if (args.res) {
          auth.SignIn();
        }
      }
    );
    return () => {
      ipcRenderer.removeListener('register-new-user-res', () => {});
    };
  }, [auth]);

  const onSubmit = (values: RegisterForm) => {
    ipcRenderer.send('register-new-user', values);
  };

  return (
    <Center w="100vw" h="100vh">
      <Container width="350px">
        <Text align="center" paddingY="2" fontSize="lg">
          Register
        </Text>
        <Box
          backgroundColor="white"
          paddingY="2"
          paddingX="4"
          boxShadow="lg"
          rounded="lg"
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
              <FormLabel htmlFor="username">Username</FormLabel>
              <Input
                name="username"
                placeholder="username"
                ref={register({ required: true })}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                name="password"
                placeholder="password"
                type="password"
                ref={register({ required: true })}
              />
            </FormControl>
            <FormErrorMessage>
              {errors.username && errors.username.message}
              {errors.password && errors.password.message}
            </FormErrorMessage>

            <Flex direction="column">
              <Button type="submit" m="2" colorScheme="teal">
                Register
              </Button>
            </Flex>
          </form>
        </Box>
      </Container>
    </Center>
  );
};

export default RegisterPage;
