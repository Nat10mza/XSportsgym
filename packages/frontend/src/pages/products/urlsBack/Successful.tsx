import { Box, Heading, Text } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

export default function Successful() {
  return (
    <Box textAlign="center" py={10} px={6}>
      <CheckCircleIcon boxSize={"50px"} color={"green.500"} />
      <Heading as="h2" size="xl" mt={6} mb={2}>
        Su compra se ha realizado con éxito.
      </Heading>
      <Text color={"gray.500"}>
        Usted recibira un correo electronico con los detalles de su compra.
        <Link to="/products">
          <Text color="green">volver a los productos</Text>
        </Link>
      </Text>
    </Box>
  );
}
