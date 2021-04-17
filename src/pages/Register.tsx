import React, { useContext } from 'react';
import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Text,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { ipcRenderer } from 'electron';

import AuthContext from '../context/auth-context';
import NotifyContext from '../context/notify-context';

interface RegisterForm {
  username: string;
  password: string;
}

const RegisterPage: React.FC = () => {
  const auth = useContext(AuthContext);
  const notify = useContext(NotifyContext);

  const { handleSubmit, errors, register } = useForm<RegisterForm>();

  const onSubmit = (values: RegisterForm) => {
    ipcRenderer.send('register-new-user', values);
    ipcRenderer.once(
      'register-new-user-res',
      (_, args: { res: boolean; error?: string }) => {
        if (args.res) {
          notify.NewAlert({
            msg: 'User created successfully!',
            status: 'success',
          });
          auth.SignIn();
        } else {
          notify.NewAlert({
            msg: 'User creation failed',
            status: 'error',
            description: args.error,
          });
        }
      }
    );
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
            <FormControl isRequired marginY="14px">
              <FormLabel htmlFor="username">Username</FormLabel>
              <Input
                name="username"
                placeholder="username"
                ref={register({ required: true })}
              />
              {errors.username && (
                <FormHelperText>This field is required</FormHelperText>
              )}
            </FormControl>
            <FormControl isRequired marginY="14px">
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                name="password"
                placeholder="password"
                type="password"
                ref={register({ required: true })}
              />
              {errors.password && (
                <FormHelperText>This field is required</FormHelperText>
              )}
            </FormControl>

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
