import { Flex, Center, Text, Image, Box } from "@chakra-ui/react";
import girl from "../assets/girl.png";

export default function NotFoundPage() {
  return (
    <Flex
      alignItems="center"
      direction="column"
      justifyItems="center"
      height="100%"
    >
      <Text fontWeight={600} fontSize="9xl" lineHeight={"110%"} mt="30">
        404
      </Text>
      <Box boxSize="sm">
        <Image src={girl} alt="Dan Abramov" />
      </Box>
      <Center fontSize="x-large" fontWeight={400} textAlign="center">
        No hemos encontrado lo que buscas...
      </Center>
    </Flex>
  );
}
