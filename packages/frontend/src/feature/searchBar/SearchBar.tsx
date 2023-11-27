import { Button, Flex, Input, useColorModeValue } from "@chakra-ui/react";
import { GoSearch } from "react-icons/go";
import { AppDispatch } from "../../redux/store/index";
import { useDispatch } from "react-redux";
import { useState } from "react";
import * as actions from "../../redux/actions/index";

export const SearchBar = () => {
  let dispatch: AppDispatch = useDispatch();

  let [searchProduct, setSearchProduct] = useState("");

  let handleChange = (e: any) => {
    setSearchProduct(e.target.value);
  };

  let handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(actions.getSearch(searchProduct));

    setSearchProduct("");
  };

  return (
    <>
      <Flex justifyContent="center" mb={50}>
        <form onSubmit={handleSubmit}>
          <Flex
            align="center"
            border="1px"
            borderColor="black"
            borderRadius="17px"
            alignItems="center"
            pl={4}
            pr={2}
            bg="white"
          >
            <Input
              type="text"
              value={searchProduct}
              onChange={handleChange}
              focusBorderColor="transparent"
              borderColor="transparent"
              bgColor="transparent"
              p="0px"
              placeholder="¿Que deseas buscar?"
              _placeholder={{ opacity: 1, color: "gray.500" }}
              _hover={{ borderColor: "none" }}
              size={{ base: "lg" }}
              width={{ lg: "333px" }}
            />
            <Button
              type="submit"
              p="10px"
              background="transparent"
              color="black"
              borderRadius="99999px"
              _hover={{ bg: "gray.300" }}
              bg="gray.200"
            >
              <GoSearch />
            </Button>
          </Flex>
        </form>
      </Flex>
    </>
  );
};
