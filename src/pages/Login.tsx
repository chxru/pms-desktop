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
import { useHistory } from 'react-router-dom';
import { ipcRenderer } from 'electron';

import AuthContext from '../context/auth-context';

interface LoginForm {
  username: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const { handleSubmit, errors, register } = useForm<LoginForm>();

  // listen to ipc
  useEffect(() => {
    ipcRenderer.on(
      'check-uname-pwd-res',
      (_, args: { res: boolean; error?: string }) => {
        if (args.res) {
          auth.SignIn();
        }
      }
    );
    return () => {
      ipcRenderer.removeListener('check-uname-pwd-res', () => {});
    };
  }, [auth]);

  // form submit
  const onSubmit = (values: LoginForm) => {
    // eslint-disable-next-line no-console
    console.log(values);
    ipcRenderer.send('check-uname-pwd', values);
  };

  return (
    <Center w="100vw" h="100vh">
      <Container width="350px">
        <Text align="center" paddingY="2" fontSize="lg">
          Login
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
                Login
              </Button>
              <Button
                m="2"
                size="sm"
                onClick={() => {
                  history.push('/register');
                }}
              >
                Create an account
              </Button>
            </Flex>
          </form>
        </Box>
      </Container>
    </Center>
  );
};

export default LoginPage;
