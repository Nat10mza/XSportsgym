import { Button, Flex, Input } from "@chakra-ui/react";

export const SearchBar = ({ onSubmit }: any) => {
  return (
    <form onSubmit={onSubmit}>
      <Flex>
        <Input mr="5" name="search" placeholder="Nombre de usuario"></Input>
        <Button type="submit">Buscar</Button>
      </Flex>
    </form>
  );
};
