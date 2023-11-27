import {
  Container,
  Button,
  Box,
  Flex,
  Wrap,
  WrapItem,
  VStack,
  HStack,
  FormControl,
  FormLabel,
  Input,
  Text,
  Heading,
  useColorModeValue,
  Center,
} from "@chakra-ui/react";

import { useForm } from "react-hook-form";
type Form = {
  name: string;
  surname: string;
  adress: {
    street_number: number;
    street_name: string;
  };
  email: string;
  zip_code: number;
};

let BuyForm = (props: any) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Form>();

  let onSubmit = (data: any) => {
    console.log(data);
    props.onBuy(data);
    reset();
  };

  return (
    <Center>
      <Box>
        <Container
          maxW="full"
          mt={0}
          centerContent
          overflow="hidden"
          bg={useColorModeValue("gray.50", "gray.800")}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Flex>
              <Box
                color="white"
                borderRadius="lg"
                m={{ sm: 4, md: 16, lg: 10 }}
                p={{ sm: 5, md: 5, lg: 16 }}
              >
                <Box
                  bg={useColorModeValue("gray.50", "gray.800")}
                  color={useColorModeValue("gray.800", "gray.50")}
                >
                  <Heading fontSize={"3xl"}>
                    ¡Llena el formulario para inicializar tu compra!
                  </Heading>

                  <Wrap>
                    <WrapItem>
                      <Box borderRadius="lg" pt="5">
                        <Box m={8}>
                          <VStack spacing={5}>
                            <HStack>
                              <FormControl>
                                <FormLabel>Nombres:</FormLabel>
                                <Input
                                  borderColor={useColorModeValue(
                                    "gray.800",
                                    "red.400"
                                  )}
                                  {...register("name", { required: true })}
                                />
                                {errors.name && (
                                  <Text color="tomato">Requiere nombre</Text>
                                )}
                              </FormControl>

                              <FormControl>
                                <FormLabel>Apellido:</FormLabel>
                                <Input
                                  borderColor={useColorModeValue(
                                    "gray.800",
                                    "red.400"
                                  )}
                                  {...register("surname", { required: true })}
                                />
                                {errors.surname && (
                                  <Text color="tomato">
                                    Requiere que ingrese apellido
                                  </Text>
                                )}
                              </FormControl>
                            </HStack>

                            <FormControl>
                              <FormLabel>Direccion</FormLabel>
                              <Input
                                borderColor={useColorModeValue(
                                  "gray.800",
                                  "red.400"
                                )}
                                {...register("adress.street_name", {
                                  required: true,
                                })}
                              />
                              {errors.adress?.street_name && (
                                <Text color="tomato">
                                  Ingrese la calle de su domicilio
                                </Text>
                              )}
                            </FormControl>

                            <FormControl>
                              <FormLabel>Numero (direccion)</FormLabel>
                              <Input
                                borderColor={useColorModeValue(
                                  "gray.800",
                                  "red.400"
                                )}
                                {...register("adress.street_number", {
                                  required: true,
                                })}
                              />
                              {errors.adress?.street_number && (
                                <Text color="tomato">
                                  Ingrese altura de calle
                                </Text>
                              )}
                            </FormControl>

                            <FormControl>
                              <FormLabel>Correo Electronico:</FormLabel>
                              <Input
                                borderColor={useColorModeValue(
                                  "gray.800",
                                  "red.400"
                                )}
                                {...register("email", { required: true })}
                              />
                              {errors.email && (
                                <Text color="tomato">
                                  Ingrese su correo electrónico
                                </Text>
                              )}
                            </FormControl>

                            <FormControl>
                              <FormLabel>C.P.</FormLabel>
                              <Input
                                borderColor={useColorModeValue(
                                  "gray.800",
                                  "red.400"
                                )}
                                {...register("zip_code", { required: true })}
                              />
                              {errors.zip_code && (
                                <Text color="tomato">
                                  Por favor, increse su código postal
                                </Text>
                              )}
                            </FormControl>

                            <FormControl float="right">
                              <Button
                                variant="solid"
                                bg="#0D74FF"
                                color="white"
                                type="submit"
                              >
                                Solicitar Pago
                              </Button>
                            </FormControl>
                          </VStack>
                        </Box>
                      </Box>
                    </WrapItem>
                  </Wrap>
                </Box>
              </Box>
            </Flex>
          </form>
        </Container>
      </Box>
    </Center>
  );
};

export default BuyForm;
