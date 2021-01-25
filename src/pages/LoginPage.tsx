import React from 'react';
import {
  Box,
  Button,
  Center,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

interface LoginForm {
  username: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const { handleSubmit, errors, register } = useForm<LoginForm>();

  const onSubmit = (values: LoginForm) => {
    // eslint-disable-next-line no-console
    console.log(values);
  };

  return (
    <Center w="100vw" h="100vh">
      <Container width="350px">
        <Text>Login</Text>
        <Box backgroundColor="white">
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
            <Button type="submit">Login</Button>
          </form>
        </Box>
      </Container>
    </Center>
  );
};

export default LoginPage;
