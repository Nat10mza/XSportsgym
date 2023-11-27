import {
  Button,
  Flex,
  FormControl,
  Container,
  FormLabel,
  Heading,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import * as actions from "../../redux/actions";

type Form = {
  email: string;
};

export let Suscribe = () => {
  const toast = useToast();
  let dispatch: AppDispatch = useDispatch();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Form>();

  let forReset = () => {
    onClose();
    reset();
  };

  let onSubmit = (data: any) => {
    forReset();
    toast({
      title: "Te suscribiste con exito.",
      description: "Recibiras un Email en tu bandeja de entrada.",
      status: "success",
      position: "top",
      duration: 9000,
      isClosable: true,
    });
    dispatch(actions.suscribeEmail(data.email));
  };

  return (
    <>
      <Button
        onClick={onOpen}
        rounded={"full"}
        color={useColorModeValue("gray.50", "gray.050")}
        size={"lg"}
        fontWeight={"normal"}
        px={8}
        colorScheme={"red.500"}
        bg={"red.400"}
        _hover={{ bg: "red.600" }}
      >
        Suscribirse
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <Flex
            align={"center"}
            justify={"center"}
            bg={useColorModeValue("gray.50", "gray.800")}
            borderRadius="10px"
          >
            <ModalCloseButton onClick={forReset} />
            <Container
              maxW={"lg"}
              bg={useColorModeValue("white", "whiteAlpha.100")}
              boxShadow={"xl"}
              rounded={"lg"}
              p={6}
            >
              <Heading
                as={"h2"}
                fontSize={{ base: "xl", sm: "2xl" }}
                textAlign={"center"}
                mb={5}
              >
                Suscríbete a XSports Club
              </Heading>
              <Stack
                direction={{ base: "column", md: "row" }}
                as={"form"}
                spacing={"12px"}
              >
                <FormControl>
                  <Input
                    {...register("email", {
                      required: true,
                      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
                    })}
                    variant={"solid"}
                    borderWidth={1}
                    _placeholder={{
                      color: "gray.400",
                    }}
                    borderColor={useColorModeValue("gray.300", "gray.700")}
                    color={useColorModeValue("black", "white")}
                    placeholder={"Email..."}
                  />
                  {errors.email?.type === "pattern" && (
                    <Text color="tomato">
                      El formato de Email es incorrecto
                    </Text>
                  )}
                  {errors.email?.type === "required" && (
                    <Text color="tomato">Tienes que poner un Email</Text>
                  )}
                </FormControl>
                <FormControl w={{ base: "100%", md: "40%" }}>
                  <Button
                    type="submit"
                    w="100%"
                    onClick={handleSubmit(onSubmit)}
                  >
                    Enviar
                  </Button>
                </FormControl>
              </Stack>
              <Text mt={2} textAlign={"center"}>
                No te pierdas la oportunidad única de recibir una sesión GRATIS.
              </Text>
            </Container>
          </Flex>
        </ModalContent>
      </Modal>
    </>
  );
};
