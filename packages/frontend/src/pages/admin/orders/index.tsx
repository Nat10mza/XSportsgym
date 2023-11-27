import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "../../../libs/axios";
import OrderTable from "./orderTable";
import { SearchBar } from "./searchBar";

interface Data {
  totalItems: number;
  pageSize: number;
  orders: Array<any>;
}

export const Orders = () => {
  const [data, setData] = useState<Data>({
    totalItems: 0,
    pageSize: 0,
    orders: [],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [Pages, setPages] = useState(0);

  const getOrders = async (page: number) => {
    const res = await axios.get(`/orders?page=${page}`);
    setData(res.data);
    setPages(Math.ceil(res.data.totalItems / res.data.pageSize));
  };
  useEffect(() => {
    getOrders(currentPage);
  }, [currentPage]);

  const nextPage = () => {
    let num = currentPage + 1;
    if (num <= Pages) setCurrentPage(() => num);
  };
  const backPage = () => {
    let num = currentPage - 1;
    if (num > 0) {
      setCurrentPage(() => num);
    }
  };
  const onSubmit = async (e: any) => {
    e.preventDefault();
    const userName = e.target[0].value;
    const res = await axios.get(`/orders?userName=${userName}`);
    setData(res.data);
    setPages(Math.ceil(res.data.totalItems / res.data.pageSize));
  };
  return (
    <>
      <Flex direction="column" alignItems="center" mx="10">
        <SearchBar onSubmit={onSubmit} />
        <OrderTable orders={data.orders} />
        <Box display="flex" alignItems="baseline" justifyContent="space-around">
          <Button m="5" onClick={backPage}>
            Anterior
          </Button>
          <Text m="5">{currentPage}</Text>
          <Button m="5" onClick={nextPage}>
            siguiente
          </Button>
        </Box>
      </Flex>
    </>
  );
};
