import { Flex, Image, Spinner, Text } from "@chakra-ui/react";
import loading from "../assets/loading.png";

export const Loading = () => {
  return (
    <>
      <Flex flexDirection="column" alignItems="center">
        <Image
          w={{ lg: 370, sm: 270, md: 350 }}
          h={{ lg: 300, sm: 270, md: 280 }}
          src={loading}
          alt="loading..."
        />

        <Flex flexDirection="column" align="center">
          <Spinner size="xl" mt={54} />
          <Text fontSize="3xl">Cargando...</Text>
        </Flex>
      </Flex>
    </>
  );
};
