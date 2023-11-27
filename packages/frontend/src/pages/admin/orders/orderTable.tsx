import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { useMemo } from "react";
import { Column, useTable } from "react-table";

interface Order {
  id: number;
  total: string;
  userId: number;
  products: Product[];
  user: User;
}

interface Product {
  productId: number;
  orderId: number;
  name: string;
  price: string;
  quantity: number;
}

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  state: string;
}

interface OrderTableProps {
  orders: Order[];
}

function OrderTable({ orders }: OrderTableProps) {
  const columns: Column<Order>[] = useMemo(
    () => [
      {
        Header: "Id",
        accessor: "id",
      },
      {
        Header: "Nombre de usuario",
        accessor: (order: Order) => order.user.name,
      },
      {
        Header: "Productos",
        accessor: (order: Order) =>
          order.products
            .map((product) => `${product.name} (${product.quantity})`)
            .join(", "),
      },
      {
        Header: "Total",
        accessor: "total",
      },
    ],
    []
  );

  const data = useMemo(() => (Array.isArray(orders) ? orders : []), [orders]);

  const tableInstance = useTable({ columns, data });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <Table {...getTableProps()}>
      <Thead>
        {headerGroups.map((headerGroup) => (
          <Tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <Th {...column.getHeaderProps()}>{column.render("Header")}</Th>
            ))}
          </Tr>
        ))}
      </Thead>
      <Tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <Tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
              ))}
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
}

export default OrderTable;
