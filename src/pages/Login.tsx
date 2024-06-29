import { Box, Button, FormControl, FormErrorMessage, FormLabel, Input, VStack, Heading } from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";

interface LoginFormInputs {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const { onApiLoginContext } = useAuth();
  const { handleSubmit, register, formState: { errors } } = useForm<LoginFormInputs>();

  const onSubmit = (data: LoginFormInputs) => {
    onApiLoginContext(data.username, data.password);
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <VStack
        as="form"
        spacing={4}
        w="full"
        maxW="md"
        p={6}
        borderWidth={1}
        borderRadius="md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Heading as="h1" size="lg" color='blue.500'>Login</Heading>
        <FormControl isInvalid={!!errors.username}>
          <FormLabel htmlFor="username">Username</FormLabel>
          <Input
            id="username"
            autoComplete="on"
            {...register('username', { required: 'Username is required' })}
          />
          <FormErrorMessage>{errors.username && errors.username.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.password}>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            id="password"
            type="password"
            autoComplete="on"
            {...register('password', { required: 'Password is required' })}
          />
          <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
        </FormControl>
        <Button mt={4} colorScheme="blue" type="submit">Login</Button>
      </VStack>
    </Box>
  );
};

export default Login;
