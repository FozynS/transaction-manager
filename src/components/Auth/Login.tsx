import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";

interface LoginFormInputs {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const { login } = useAuth();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit = (data: LoginFormInputs) => {
    login(data.username, data.password);
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={!!errors.username}>
          <FormLabel htmlFor="username">Username</FormLabel>
          <Input
            id="username"
            autoComplete="on"
            {...register("username", { required: "Username is required" })}
          />
          {errors.username && (
            <FormErrorMessage>{errors.username.message}</FormErrorMessage>
          )}
        </FormControl>
        <FormControl isInvalid={!!errors.password}>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            id="password"
            type="password"
            autoComplete="on"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <FormErrorMessage>{errors.password.message}</FormErrorMessage>
          )}
        </FormControl>
        <Button mt={4} colorScheme="teal" type="submit">
          Login
        </Button>
      </form>
    </Box>
  );
};

export default Login;
