import {
  Flex,
  Circle,
  Box,
  Image,
  Badge,
  useColorModeValue,
  Icon,
  chakra,
  Tooltip,
  Container,
  useToast,
  Link,
} from "@chakra-ui/react";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { FiShoppingCart } from "react-icons/fi";
import { Link as RouterLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import * as actions from "../../redux/actions/index";

interface RatingProps {
  rating: number;
  numReviews: number;
}

function Rating({ rating, numReviews }: RatingProps) {
  return (
    <Box display="flex" alignItems="center">
      {Array(5)
        .fill("")
        .map((_, i) => {
          const roundedRating = Math.round(rating * 2) / 2;
          if (roundedRating - i >= 1) {
            return (
              <BsStarFill
                key={i}
                style={{ marginLeft: "1" }}
                color={i < rating ? "teal.500" : "gray.300"}
              />
            );
          }
          if (roundedRating - i === 0.5) {
            return <BsStarHalf key={i} style={{ marginLeft: "1" }} />;
          }
          return <BsStar key={i} style={{ marginLeft: "1" }} />;
        })}
      <Box as="span" ml="2" color="gray.600" fontSize="sm">
        {numReviews} review{numReviews > 1 && "s"}
      </Box>
    </Box>
  );
}

function Card({ product }: any) {
  const dispatch: AppDispatch = useDispatch();

  const toast = useToast();
  const onClickCart = () => {
    localStorage.setItem(product.name + "CartProduc", JSON.stringify(product));
    dispatch(actions.addProductotToCart(product.name));
    toast({
      title: "✔️",
      description: "Item agregado al carrito.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <Box margin={5} minW="320px" maxW="320px">
      <Box
        bg={useColorModeValue("white", "gray.800")}
        maxW="sm"
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
        position="relative"
      >
        {product.isNew && (
          <Circle
            size="10px"
            position="absolute"
            top={2}
            right={2}
            bg="red.200"
          />
        )}
        <Link as={RouterLink} to={`${product.id}`}>
          <Container boxSize="300px" centerContent>
            <Image
              src={product.imageUrl}
              alt={`Picture of ${product.name}`}
              roundedTop="lg"
              boxSize="10 0%"
              alignContent="center"
              justifyContent="center"
              objectFit="cover"
            />
          </Container>
        </Link>
        <Box p="6">
          <Box display="flex" alignItems="baseline">
            {product.isNew && (
              <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="red">
                New
              </Badge>
            )}
          </Box>
          <Flex mt="1" justifyContent="space-between" alignContent="center">
            <Link as={RouterLink} to={`${product.id}`}>
              <Box
                fontSize="2xl"
                fontWeight="semibold"
                as="h4"
                lineHeight="tight"
                isTruncated
              >
                {product.name}
              </Box>
            </Link>
            <Tooltip
              label="Add to cart"
              bg="white"
              placement={"top"}
              color={"gray.800"}
              fontSize={"1.2em"}
            >
              <chakra.button display={"flex"} onClick={onClickCart}>
                <Icon as={FiShoppingCart} h={7} w={7} alignSelf={"center"} />
              </chakra.button>
            </Tooltip>
          </Flex>
          <Flex justifyContent="space-between" alignContent="center">
            <Rating rating={product.rating} numReviews={product.numReviews} />
            <Box fontSize="2xl" color={useColorModeValue("gray.800", "white")}>
              <Box as="span" color={"gray.600"} fontSize="lg">
                $
              </Box>
              {Number(product.price).toFixed(2)}
            </Box>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
}

export default Card;
