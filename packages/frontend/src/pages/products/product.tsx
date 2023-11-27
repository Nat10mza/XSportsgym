import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Stack,
  Heading,
  Text,
  Divider,
  ButtonGroup,
  Button,
  Container,
  Box,
  Textarea,
  Select,
  useToast,
  Flex,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { RootState, AppDispatch } from "../../redux/store/index";
import * as actions from "../../redux/actions/index";

export default function ProductPage() {
  const { productId } = useParams();

  const dispatch: AppDispatch = useDispatch();

  const reviews = useSelector((state: RootState) => state.productReviews);
  const prod = useSelector((state: RootState) => state.productDetail);
  const usersReviews = useSelector((state: RootState) => state.reviewUsers);

  const [comments, setComments] = useState<any[]>([]);
  const [text, setText] = useState("");
  const [num, setNum] = useState(0);

  const toast = useToast();

  useEffect(() => {
    if (productId) {
      dispatch(actions.getProductDetail(productId));
      dispatch(actions.getProductReviews(productId));
    }
  }, [dispatch, productId]);

  const handleTextChange = (e: any) => {
    let inputValue = e.target.value;
    setText(inputValue);
  };

  const handleNumChange = (e: any) => {
    let inputValue = e.target.value;
    setNum(inputValue);
  };

  const onClickCart = () => {
    localStorage.setItem(prod.name + "CartProduc", JSON.stringify(prod));
    dispatch(actions.addProductotToCart(prod.name));
    toast({
      title: "✔️",
      description: "Item agregado al carrito.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  const onClickComent = () => {
    let rev = { comment: text, score: num, productId: productId };
    setComments([rev]);
    dispatch(actions.createReview(rev));
  };

  const comentarios = reviews ? (
    reviews.map((element: any, i: number) => {
      return (
        <Text
          key={i}
          color="white"
          bg={"gray"}
          m="2"
          p="2"
          borderRadius="10px"
          marginInlineStart="20px"
        >
          {element.comments}
        </Text>
      );
    })
  ) : (
    <Text key={1} color="white">
      No hay comentarios que mostrar
    </Text>
  );

  const reviewCount = reviews ? reviews.length + comments?.length : 0;

  var votation = 0;

  for (var i = 0; i < reviews?.length; i++) {
    votation += Number(reviews[i]?.score);
  }
  if (comments?.length) {
    votation += comments[0]?.score;
  }

  var rating = votation / reviewCount;

  interface RatingProps {
    ratinge: number;
  }

  function Rating({ ratinge }: RatingProps) {
    return (
      <Box display="flex" alignItems="center">
        {Array(5)
          .fill("")
          .map((_, i) => {
            const roundedRating = Math.round(ratinge * 2) / 2;
            if (roundedRating - i >= 1) {
              return (
                <BsStarFill
                  key={i}
                  style={{ marginLeft: "1" }}
                  color={i < rating ? "yellow" : "gray.300"}
                />
              );
            }
            if (roundedRating - i === 0.5) {
              return (
                <BsStarHalf
                  key={i}
                  style={{ marginLeft: "1" }}
                  color="yellow"
                />
              );
            }
            return <BsStar key={i} style={{ marginLeft: "1" }} color="gray" />;
          })}
      </Box>
    );
  }

  return (
    <Flex
      minH="100vh"
      padding="5px"
      wrap="wrap"
      justifyContent={"space-evenly"}
    >
      <Card m="20px" maxH="500px">
        <Container boxSize="70%" centerContent>
          <Image src={prod.imageUrl} borderRadius="lg" />
        </Container>
      </Card>
      <Flex
        direction={"column"}
        minW={{ base: "320px", md: "500px", lg: "50%" }}
      >
        <Box mb="20px">
          <Stack my="6" spacing="3">
            <Heading size="lg">{prod.name}</Heading>
            <Text>{prod.description}</Text>
            <Text>Stock: {prod.stock}</Text>
            <Text color="red" fontSize="2xl">
              ${prod.price}
            </Text>
          </Stack>
          <Divider mb="30px" />
          <ButtonGroup spacing="1">
            {/* <Button variant="solid" colorScheme="red">
              Comprar
            </Button> */}
            <Button variant="solid" colorScheme="red" onClick={onClickCart}>
              Añadir al carrito
            </Button>
          </ButtonGroup>
        </Box>
        <Box>
          <Box display="flex" mt="2" alignItems="center">
            <Flex justifyContent="space-between" alignContent="center">
              <Rating ratinge={rating} />
            </Flex>
            <Box as="span" ml="10%" fontSize="sm">
              <Text fontSize="15px">{reviewCount} reviews</Text>
            </Box>
          </Box>
          <Box>
            <Text mt="20px" mb="20px" fontStyle="bold">
              Comentarios:
            </Text>
            {comentarios}
            {comments &&
              comments.map((element: any, i: number) => {
                return (
                  <Text
                    key={i}
                    bg={"gray"}
                    m="2"
                    p="2"
                    borderRadius="10px"
                    marginInlineStart="20px"
                  >
                    {element.comment}
                  </Text>
                );
              })}
          </Box>
          <Box mt="10">
            <Textarea
              value={text}
              onChange={handleTextChange}
              placeholder="Escriba su reseña aquí."
              mb="2"
            />
            <Select
              placeholder="Seleccione Puntuacion"
              onChange={handleNumChange}
              variant="filled"
              color="black"
              bg="white"
              colorScheme="blackAlpha"
              borderColor="red"
              mb="2"
            >
              <option value={0}>0</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </Select>
            <Button
              variant="solid"
              colorScheme="red"
              width="100%"
              onClick={onClickComent}
            >
              Comentar
            </Button>
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
}
