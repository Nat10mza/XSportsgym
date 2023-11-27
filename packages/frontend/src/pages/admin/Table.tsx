import React, { useMemo } from "react";
import { useTable } from "react-table";
import { Column } from "react-table";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Flex,
  TableContainer,
} from "@chakra-ui/react";

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  stock: string;
  isTrashed: boolean;
  brand: Brand;
  category: Category;
}

interface Brand {
  id: number;
  name: string;
  description: string;
}

interface Category {
  id: number;
  name: string;
  description: string;
}

const Tabla = ({
  data,
  handleEdit,
  handleDelete,
}: {
  data: Product[];
  handleEdit: any;
  handleDelete: any;
}) => {
  const columns: Column<Product>[] = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Description",
        accessor: "description",
      },

      {
        Header: "Price",
        accessor: "price",
      },
      {
        Header: "Stock",
        accessor: "stock",
      },
      {
        Header: "Delete",
        accessor: (row: Product) => (row.isTrashed ? "Deleted" : "Active"),
      },
      {
        Header: "Brand",
        accessor: (row: Product) => row.brand.name,
      },
      {
        Header: "Category",
        accessor: (row: Product) => row.category.name,
      },
      {
        Header: "Actions",
        accessor: (row: Product) => {
          return { id: row.id, isTrashed: row.isTrashed };
        },
        Cell: ({ value }: { value: { id: number; isTrashed: boolean } }) => (
          <Flex>
            <Button
              onClick={() => handleEdit(value.id)}
              bg="yellow.300"
              mr="5px"
            >
              Edit
            </Button>

            {value.isTrashed ? (
              <Button
                onClick={() => handleDelete(value)}
                bg="green.500"
                color="white"
              >
                Restore
              </Button>
            ) : (
              <Button
                onClick={() => handleDelete(value)}
                bg="red.500"
                color="white"
              >
                Delete
              </Button>
            )}
          </Flex>
        ),
      },
    ],
    [handleEdit, handleDelete]
  );

  const tableData = useMemo(() => data, [data]);

  const tableInstance = useTable({ columns, data: tableData });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <TableContainer>
      <Table variant="simple" {...getTableProps()}>
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
    </TableContainer>
  );
};

export default Tabla;
