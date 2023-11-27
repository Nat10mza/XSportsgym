import {
  Box,
  Container,
  Flex,
  Heading,
  HStack,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/layout";
import { useColorModeValue, useToast } from "@chakra-ui/react";
import { MdEmail, MdFacebook, MdLocationOn, MdPhone } from "react-icons/md";
import { AiFillInstagram } from "react-icons/ai";
import { BsTwitter } from "react-icons/bs";
import { Button, IconButton } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Textarea } from "@chakra-ui/textarea";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { contactEmail } from "../redux/actions";

type Form = {
  name: string;
  email: string;
  location: string;
  message: string;
};

export default function ContactPage() {
  const toast = useToast();
  let dispatch: AppDispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Form>();

  let onSubmit = (data: any) => {
    reset();
    toast({
      title: "Tu consulta se realizo con exito.",
      status: "success",
      position: "top",
      duration: 9000,
      isClosable: true,
    });
    dispatch(contactEmail(data));
  };

  return (
    <>
      <Container maxW="full" mt={5} mb={5} centerContent>
        <Flex pt="25px" pb="25px">
          <Box
            bg={useColorModeValue("gray.50", "gray.800")}
            borderColor="black"
            borderRadius="lg"
            m={{ sm: 4, md: 16, lg: 10 }}
            p={{ sm: 5, md: 5, lg: 16 }}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box p={4}>
                <Wrap spacing={{ base: 20, sm: 3, md: 5, lg: 20 }}>
                  <WrapItem>
                    <Box>
                      <Heading>Contactanos</Heading>
                      <Box py={{ base: 5, sm: 5, md: 8, lg: 10 }}>
                        <VStack pl={0} spacing={3} alignItems="flex-start">
                          <Flex fontSize="md" height="48px" width="270px">
                            <MdPhone color="#E51009" size="20px" />
                            <Text ml={2} fontWeight="600">
                              +54 9 11 1235-6789
                            </Text>
                          </Flex>
                          <Flex fontSize="md" height="48px" width="270px">
                            <MdEmail color="#E51009" size="20px" />
                            <Text ml={2} fontWeight="600">
                              XsportsClub@.com.ar
                            </Text>
                          </Flex>
                          <Flex fontSize="md" height="48px" width="270px">
                            <MdLocationOn color="#E51009" size="20px" />
                            <Text ml={2} fontWeight="600">
                              Argentina - Buenos Aires - Cap. Fed.
                            </Text>
                          </Flex>
                        </VStack>
                      </Box>

                      <HStack
                        mt={{ lg: 10 }}
                        spacing={5}
                        px={5}
                        alignItems="flex-start"
                      >
                        <IconButton
                          aria-label="facebook"
                          size="md"
                          isRound={true}
                          _hover={{ bg: "#645f5f59" }}
                          icon={<MdFacebook size="28px" />}
                        />
                        <IconButton
                          aria-label="github"
                          size="md"
                          isRound={true}
                          _hover={{ bg: "#645f5f59" }}
                          icon={<BsTwitter size="28px" />}
                        />
                        <IconButton
                          aria-label="discord"
                          size="md"
                          isRound={true}
                          _hover={{ bg: "#645f5f59" }}
                          icon={<AiFillInstagram size="28px" />}
                        />
                      </HStack>
                    </Box>
                  </WrapItem>

                  <WrapItem mt={{ ms: 0 }}>
                    <Box
                      width="19rem"
                      bg={useColorModeValue("gray.800", "gray.50")}
                      color={useColorModeValue("gray.50", "gray.800")}
                      borderRadius="lg"
                    >
                      <Box m={8}>
                        <VStack spacing={5}>
                          <FormControl>
                            <FormLabel>Nombre</FormLabel>
                            <Input
                              {...register("name", {
                                required: true,
                              })}
                              focusBorderColor="#00000059"
                              autoComplete="none"
                              bg="#dfdfdf"
                              type="text"
                              size="md"
                              placeholder="Ingrese su nombre..."
                              _placeholder={{
                                color: useColorModeValue(
                                  "gray.800",
                                  "gray.800"
                                ),
                              }}
                              color={useColorModeValue("gray.800", "gray.800")}
                            />
                            {errors.name && (
                              <Text color="tomato">nombre requerido</Text>
                            )}
                          </FormControl>

                          <FormControl>
                            <FormLabel>Email</FormLabel>
                            <Input
                              {...register("email", {
                                required: true,
                                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
                              })}
                              focusBorderColor="#00000059"
                              autoComplete="none"
                              bg="#dfdfdf"
                              type="text"
                              size="md"
                              placeholder="Ingrese su Email..."
                              _placeholder={{
                                color: useColorModeValue(
                                  "gray.800",
                                  "gray.800"
                                ),
                              }}
                              color={useColorModeValue("gray.800", "gray.800")}
                            />
                            {errors.email?.type === "pattern" && (
                              <Text color="tomato">
                                El formato de Email es incorrecto
                              </Text>
                            )}
                            {errors.email?.type === "required" && (
                              <Text color="tomato">Email requerido</Text>
                            )}
                          </FormControl>

                          <FormControl>
                            <FormLabel>Localidad</FormLabel>
                            <Input
                              {...register("location", {
                                required: true,
                              })}
                              focusBorderColor="#00000059"
                              autoComplete="none"
                              bg="#dfdfdf"
                              type="text"
                              size="md"
                              placeholder="Ingrese su localidad..."
                              _placeholder={{
                                color: useColorModeValue(
                                  "gray.800",
                                  "gray.800"
                                ),
                              }}
                              color={useColorModeValue("gray.800", "gray.800")}
                            />
                            {errors.location && (
                              <Text color="tomato">nombre requerido</Text>
                            )}
                          </FormControl>

                          <FormControl>
                            <FormLabel>Mensaje</FormLabel>
                            <Textarea
                              {...register("message", {
                                required: true,
                              })}
                              bg="#dfdfdf"
                              focusBorderColor="#00000059"
                              borderColor="gray.300"
                              _active={{
                                borderRadius: "gray.300",
                              }}
                              placeholder="Ingrese aqui sus consultas... "
                              _placeholder={{
                                color: useColorModeValue(
                                  "gray.800",
                                  "gray.800"
                                ),
                              }}
                              color={useColorModeValue("gray.800", "gray.800")}
                            />
                            {errors.message && (
                              <Text color="tomato">nombre requerido</Text>
                            )}
                          </FormControl>

                          <FormControl>
                            <Button
                              type="submit"
                              variant="solid"
                              bg="#E51009"
                              color="white"
                              _hover={{ bg: "#c10700" }}
                              textAlign="center"
                            >
                              Enviar
                            </Button>
                          </FormControl>
                        </VStack>
                      </Box>
                    </Box>
                  </WrapItem>
                </Wrap>
              </Box>
            </form>
          </Box>
        </Flex>
      </Container>
    </>
  );
}
