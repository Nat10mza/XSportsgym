import {
  Container,
  Text,
  Button,
  NumberInput,
  NumberInputStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Card,
  Image,
  Box,
} from "@chakra-ui/react";
import { useState } from "react";

export default function ShoppingCard(props: any) {
  const [totalProduct, setTotalProduct] = useState(props.product.price);
  const price = Number(props.product.price);

  const handleNumChange = (e: any) => {
    if (e * price <= totalProduct) {
      props.setQuantity(props.id, true);
    } else {
      props.setQuantity(props.id, false);
    }
    setTotalProduct(e * props.product.price);
    props.setProductsIdTotal((prev: any) => {
      return { ...prev, [props.product.id]: e * props.product.price };
    });
  };

  return (
    <Card
      mb="20px"
      mt="20px"
      mx="auto"
      p="10px"
      key={props.product.id}
      maxW={"1000px"}
      display="flex"
      direction={"row"}
    >
      <Box m="auto">
        <Image src={props.product.imageUrl} boxSize="100px" mr="30px"></Image>
      </Box>
      <Box>
        <Box ml="0" pl="0" mr="0" mb="0" position={"absolute"} right={"2"}>
          <Button
            colorScheme="red"
            size={"sm"}
            w={"1"}
            onClick={() =>
              props.onClose(props.product.name, props.product.id, totalProduct)
            }
          >
            X
          </Button>
        </Box>
        <Text>Nombre: {props.product.name}</Text>
        <Text>Stock: {props.product.stock}</Text>
        <Text>Precio por unidad: ${props.product.price}</Text>
        <Container
          ml="0"
          pl="0"
          display="flex"
          flexDirection="row"
          centerContent
        >
          <Text mr="5%">Cantidad:</Text>
          <NumberInput
            size="md"
            w="50%"
            step={1}
            defaultValue={1}
            min={1}
            max={props.product.stock}
            onChange={(e) => handleNumChange(e)}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Container>
        <Container
          ml="0"
          pl="0"
          display="flex"
          flexDirection="row"
          justifyContent={"space-between"}
          centerContent
        >
          <Text>Total: ${Number(totalProduct).toFixed(2)}</Text>
        </Container>
      </Box>
    </Card>
  );
}
