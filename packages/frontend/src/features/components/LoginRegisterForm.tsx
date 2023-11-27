import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Input,
  useToast,
} from "@chakra-ui/react";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import {
  addUserFromFb,
  addUserFromGoogle,
  addUserFromLocal,
  registerUser,
  sendLoginEmail,
} from "../../redux/actions";
import { RootState, AppDispatch } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

const LoginPage = ({ SuddenCLose }: { SuddenCLose: () => void }) => {
  const dispatch: AppDispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const user = useSelector((state: RootState) => state.user);
  const toast = useToast();

  const onSubmit = async (values: any) => {
    const res = await dispatch(addUserFromLocal(values));
    const msg = res.toString();

    if (res.length > 0) {
      toast({
        title: "Error",
        description: msg,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
    dispatch(sendLoginEmail(values));
  };
  useEffect(() => {
    if (user.name) {
      SuddenCLose();
      toast({
        title: "Felicidades",
        description: "Ha iniciado sesión.",
        status: "success",
        position: "top",
        duration: 4000,
        isClosable: true,
      });
    }
  }, [user]);
  function loginWithFacebook() {
    dispatch(addUserFromFb());
  }
  function loginWithGoogle() {
    dispatch(addUserFromGoogle());
  }

  return (
    <Box p={4} h="100%">
      <Box m="7%">
        <Heading as="h2" size="lg" mb={4}></Heading>
        <Heading as="h2" size="lg" mb={4}>
          Iniciar Sesión
        </Heading>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              {...register("email", {
                required: "required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "EL valor ingresado no es un email válido",
                },
              })}
              placeholder="tu@email.com"
            />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Contraseña</FormLabel>
            <Input
              type="password"
              {...register("password", {
                required: true,
                minLength: {
                  value: 8,
                  message: "min length is 8",
                },
              })}
              placeholder="contraseña"
            />
          </FormControl>
          <Button
            type="submit"
            _hover={{
              bg: "#8B0000",
            }}
            display={"block"}
            mx={"auto"}
            my={4}
            colorScheme="red"
          >
            Iniciar Sesión
          </Button>
        </form>
        <HStack flexDirection={"column"}>
          <Box flex="1" w={"100%"}>
            <Button
              onClick={loginWithFacebook}
              w="100%"
              my={"3%"}
              colorScheme="facebook"
              leftIcon={<FaFacebook />}
            >
              Inicia sesion con Facebook
            </Button>
          </Box>
          <Box flex="1" w={"100%"}>
            <Button
              onClick={loginWithGoogle}
              w="100%"
              my={"3%"}
              colorScheme="red"
              leftIcon={<FaGoogle />}
            >
              Inicia sesión con Google
            </Button>
          </Box>
        </HStack>
      </Box>
    </Box>
  );
};

const RegisterPage = ({ SuddenCLose }: { SuddenCLose: () => void }) => {
  const dispatch: AppDispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const user = useSelector((state: RootState) => state.user);
  const toast = useToast();

  const onSubmit = async (values: any) => {
    const res = await dispatch(registerUser(values));
    const msg = res.toString();

    if (res.length > 0) {
      toast({
        title: "Error",
        description: msg,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };
  useEffect(() => {
    if (user.name) {
      SuddenCLose();
      toast({
        title: "Felicidades",
        description: "Su usuario ha sido creado. Revise su email.",
        position: "top",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    }
  }, [user]);
  function loginWithFacebook() {
    dispatch(addUserFromFb());
  }
  function loginWithGoogle() {
    dispatch(addUserFromGoogle());
  }

  return (
    <Box p={4} h="100%">
      <Box m="7%">
        <Heading as="h2" size="lg" mb={4}>
          Registrate
        </Heading>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <FormControl id="name" isRequired>
            <FormLabel>Nombre Completo</FormLabel>
            <Input
              type="text"
              {...register("name", {
                required: true,
                minLength: {
                  value: 4,
                  message: "min length is 8",
                },
              })}
              placeholder="Name"
            />
          </FormControl>
          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              {...register("email", {
                required: "required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "EL valor ingresado no es un email válido",
                },
              })}
              placeholder="tu@email.com"
            />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Contraseña</FormLabel>
            <Input
              type="password"
              {...register("password", {
                required: true,
                // minLength: {
                //   value: 8,
                //   message: "min length is 8",
                // },
              })}
              placeholder="contraseña"
            />
          </FormControl>
          <Button
            type="submit"
            _hover={{
              bg: "#8B0000",
            }}
            display={"block"}
            mx={"auto"}
            my={4}
            colorScheme="red"
          >
            Registrarse
          </Button>
        </form>
        <HStack flexDirection={"column"}>
          <Box flex="1" w={"100%"}>
            <Button
              onClick={loginWithFacebook}
              w="100%"
              my={"3%"}
              colorScheme="facebook"
              leftIcon={<FaFacebook />}
            >
              Inicia sesion con Facebook
            </Button>
          </Box>
          <Box flex="1" w={"100%"}>
            <Button
              onClick={loginWithGoogle}
              w="100%"
              my={"3%"}
              colorScheme="red"
              leftIcon={<FaGoogle />}
            >
              Inicia sesión con Google
            </Button>
          </Box>
        </HStack>
      </Box>
    </Box>
  );
};

export { LoginPage, RegisterPage };
