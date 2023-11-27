import { ReactNode } from "react";
import {
  Container,
  Stack,
  Flex,
  Box,
  Heading,
  Text,
  Button,
  Avatar,
  useColorModeValue,
  SimpleGrid,
  Image,
  StackDivider,
  Divider,
  HStack,
} from "@chakra-ui/react";

//NUESTRA HISTORIA
import { ReactElement } from "react";
import { Suscribe } from "./suscribe/Suscribe";

interface FeatureProps {
  text: string;
  iconBg: string;
  icon?: ReactElement;
}

const Feature = ({ text, icon, iconBg }: FeatureProps) => {
  return (
    <Stack direction={"row"} align={"center"}>
      <Flex
        w={8}
        h={8}
        align={"center"}
        justify={"center"}
        rounded={"full"}
        bg={iconBg}
      >
        {icon}
      </Flex>
      <Text fontWeight={600}>{text}</Text>
    </Stack>
  );
};
// COMENTARIOS - TESTIMONIOS:
const Testimonial = ({ children }: { children: ReactNode }) => {
  return <Box>{children}</Box>;
};

const TestimonialContent = ({ children }: { children: ReactNode }) => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      boxShadow={"lg"}
      p={8}
      rounded={"xl"}
      align={"center"}
      pos={"relative"}
      _after={{
        content: `""`,
        w: 0,
        h: 0,
        borderLeft: "solid transparent",
        borderLeftWidth: 16,
        borderRight: "solid transparent",
        borderRightWidth: 16,
        borderTop: "solid",
        borderTopWidth: 16,
        borderTopColor: useColorModeValue("white", "gray.800"),
        pos: "absolute",
        bottom: "-16px",
        left: "50%",
        transform: "translateX(-50%)",
      }}
    >
      {children}
    </Stack>
  );
};

const TestimonialHeading = ({ children }: { children: ReactNode }) => {
  return (
    <Heading as={"h3"} fontSize={"xl"}>
      {children}
    </Heading>
  );
};

const TestimonialText = ({ children }: { children: ReactNode }) => {
  return (
    <Text
      textAlign={"center"}
      color={useColorModeValue("gray.600", "gray.400")}
      fontSize={"sm"}
    >
      {children}
    </Text>
  );
};

const TestimonialAvatar = ({
  src,
  name,
  title,
}: {
  src: string;
  name: string;
  title: string;
}) => {
  return (
    <Flex align={"center"} mt={8} direction={"column"}>
      <Avatar src={src} name={name} mb={2} />
      <Stack spacing={-1} align={"center"}>
        <Text fontWeight={600}>{name}</Text>
        <Text fontSize={"sm"} color={useColorModeValue("gray.600", "gray.400")}>
          {title}
        </Text>
      </Stack>
    </Flex>
  );
};

//----------------------------------

export default function HomePage() {
  return (
    <>
      <Container maxW={"7xl"}>
        <Stack
          align={"center"}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 2, md: 1 }}
          direction={{ base: "column", md: "row" }}
        >
          <Stack flex={1} spacing={{ base: 5, md: 10 }}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}
            >
              <Text
                as={"span"}
                position={"relative"}
                _after={{
                  content: "''",
                  width: "full",
                  height: "30%",
                  position: "absolute",
                  bottom: 1,
                  left: 0,
                }}
              >
                XSports Club
              </Text>
              <br />
              <Text as={"span"} color={"red.400"}>
                El Mejor Gimnasio del Universo
              </Text>
            </Heading>
            <Text color={"gray.500"}>
              ¡Únete a nuestro gimnasio y comienza a transformar tu vida hoy
              mismo! Inscríbete ahora y recibe una sesión gratis de
              entrenamiento personalizado!
            </Text>
            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction={{ base: "column", sm: "row" }}
            >
              <Suscribe />
            </Stack>
          </Stack>
          <Flex
            flex={1}
            justify={"center"}
            align={"center"}
            position={"relative"}
            w={"full"}
          >
            <Image
              rounded={"md"}
              alt={"feature image"}
              src={
                "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1075&q=80"
              }
              objectFit={"cover"}
            />
          </Flex>
        </Stack>
      </Container>

      <Divider mt={20} />

      <Container maxW={"5xl"} py={12}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
          <Flex>
            <Image
              rounded={"md"}
              alt={"feature image"}
              src={
                "https://images.pexels.com/photos/3076509/pexels-photo-3076509.jpeg"
              }
              objectFit={"cover"}
            />
          </Flex>
          <Stack spacing={4}>
            <HStack spacing={4}>
              <Text
                textTransform={"uppercase"}
                color={useColorModeValue("gray.50", "gray.100")}
                fontWeight={600}
                fontSize={"sm"}
                bg={useColorModeValue("red.500", "red.600")}
                p={2}
                alignSelf={"flex-start"}
                rounded={"md"}
              >
                Salud
              </Text>
              <Text
                textTransform={"uppercase"}
                color={useColorModeValue("gray.50", "gray.100")}
                fontWeight={600}
                fontSize={"sm"}
                bg={useColorModeValue("red.500", "red.600")}
                p={2}
                alignSelf={"flex-start"}
                rounded={"md"}
              >
                Fitness
              </Text>
              <Text
                textTransform={"uppercase"}
                color={useColorModeValue("gray.50", "gray.100")}
                fontWeight={600}
                fontSize={"sm"}
                bg={useColorModeValue("red.500", "red.600")}
                p={2}
                alignSelf={"flex-start"}
                rounded={"md"}
              >
                Nutrición
              </Text>
              <Text
                textTransform={"uppercase"}
                color={useColorModeValue("gray.50", "gray.100")}
                fontWeight={600}
                fontSize={"sm"}
                bg={useColorModeValue("red.500", "red.600")}
                p={2}
                alignSelf={"flex-start"}
                rounded={"md"}
              >
                Ejercicio
              </Text>
            </HStack>

            <Heading>
              Consigue el cuerpo que siempre has querido con nuestro gimnasio.
            </Heading>
            <Text color={"gray.500"} fontSize={"lg"}>
              En nuestro gimnasio encontrarás todo lo que necesitas para ponerte
              en forma. Contamos con un amplio espacio para entrenar, una gran
              variedad de máquinas de última generación, clases en grupo para
              todos los niveles, entrenadores personales expertos y mucho más.
            </Text>
            <Stack
              spacing={4}
              divider={
                <StackDivider
                  borderColor={useColorModeValue("gray.100", "gray.700")}
                />
              }
            ></Stack>
          </Stack>
        </SimpleGrid>
      </Container>

      <Box bg={useColorModeValue("gray.100", "gray.700")}>
        <Container maxW={"7xl"} py={16} as={Stack} spacing={12}>
          <Stack spacing={0} align={"center"}>
            <Heading>
              "Esto es lo que dicen algunos de nuestros clientes satisfechos."
            </Heading>
            <Text>
              Nuestros clientes han experimentado una transformación en su vida
              gracias a nuestro gimnasio. Aquí algunos testimonios:
            </Text>
          </Stack>
          <Stack
            direction={{ base: "column", md: "row" }}
            spacing={{ base: 10, md: 4, lg: 10 }}
          >
            <Testimonial>
              <TestimonialContent>
                <TestimonialHeading>
                  Predispuestos a ayudarte
                </TestimonialHeading>
                <TestimonialText>
                  "El equipo del gimnasio es excepcional, siempre estan
                  predispuestos a ayudarte. Encuentro el gym siempre limpio y
                  funcionando correctamente"
                </TestimonialText>
              </TestimonialContent>
              <TestimonialAvatar
                src={
                  "https://images.unsplash.com/photo-1520810627419-35e362c5dc07?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
                }
                name={"Moni Drexler"}
                title={"Cliente de hace 2 años"}
              />
            </Testimonial>
            <Testimonial>
              <TestimonialContent>
                <TestimonialHeading>
                  Amplia variedad de equipos
                </TestimonialHeading>
                <TestimonialText>
                  "El gimnasio ofrece una amplia variedad de equipos y servicios
                  que me permiten personalizar mi entrenamiento según mis
                  necesidades y objetivos"
                </TestimonialText>
              </TestimonialContent>
              <TestimonialAvatar
                src={
                  "https://www.dzoom.org.es/wp-content/uploads/2020/02/portada-foto-perfil-redes-sociales-consejos-1024x682.jpg"
                }
                name={"Juana Perez"}
                title={"Nuevo cliente"}
              />
            </Testimonial>
            <Testimonial>
              <TestimonialContent>
                <TestimonialHeading>
                  Siempre me siento bienvenido
                </TestimonialHeading>
                <TestimonialText>
                  "El ambiente del gimnasio es increíble. Todos son amables y
                  serviciales, y siempre me siento bienvenido. No puedo imaginar
                  ir a otro lugar para mi entrenamiento diario"
                </TestimonialText>
              </TestimonialContent>
              <TestimonialAvatar
                src={
                  "https://modayjoyas.com/wp-content/uploads/2022/11/que-es-una-cara-hegemonica.jpg"
                }
                name={"Leandro Chilo"}
                title={"Cliente de hace 3 años"}
              />
            </Testimonial>
          </Stack>
        </Container>
      </Box>
    </>
  );
}
