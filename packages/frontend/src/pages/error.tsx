import { Box, Image, Text } from "@chakra-ui/react";
import imgError from "../assets/error.png";

export default function ErrorPage() {
  return (
    <Box height="100vh">
      <Text
        fontSize={{ base: "4xl", sm: "6xl", md: "7xl", lg: "8xl" }}
        m={{ base: "10", md: "12", lg: "12" }}
        fontWeight={600}
        fontFamily="monospace"
      >
        Sorry <br />
        about that!
      </Text>
      <Image
        src={imgError}
        margin="auto"
        h={{ base: "250px", sm: "400", md: "500", lg: "500" }}
      ></Image>
    </Box>
  );
}
