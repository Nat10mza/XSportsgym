import {
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Button,
  Flex,
  Box,
  TableContainer,
} from "@chakra-ui/react";
import React, { useMemo } from "react";
import { useTable } from "react-table";
import { Column } from "react-table";
interface Columna {
  nombre: string;
  componente?: any;
}

interface Accion {
  icon: React.ReactNode;
  onclick: (row: any) => void;
}

interface Props {
  data: any[];
  columnas?: Columna[];
  acciones: Accion[];
}

const tipicalActions = [
  {
    accion: "crear",
    color: "",
  },
];
export default function TablaDinamica({ data, columnas, acciones }: Props) {
  const tableData = useMemo(() => data, [data]);
  let columnasTabla: any;
  const columns: any = useMemo(() => {
    const keys = Object.keys(data[0]);
    if (columnas) {
      columnasTabla = columnas.map((columna) => ({
        Header: columna.nombre,
        accessor: columna.nombre,
        id: columna.nombre,
        Cell: columna.componente
          ? ({ row }: { row: any }) =>
              columna.componente({ id: row.original.item })
          : undefined,
      }));
    } else {
      columnasTabla = [];
    }

    const actionsColumn = {
      Header: "Actions",
      accessor: "actions",
      id: "actions",
      Cell: ({ row }: { row: any }) => (
        <Flex>
          {acciones.map(({ icon, onclick }, index) => {
            return (
              <Box
                p={0}
                m={2}
                key={index}
                onClick={() => onclick(row.original)}
              >
                {icon}
              </Box>
            );
          })}
        </Flex>
      ),
    };
    return [
      ...keys.map((key) => ({
        Header: key,
        accessor: key,
        id: key,
      })),
      ...columnasTabla,
      actionsColumn,
    ];
  }, [data, columnas, acciones]);

  const tableInstance = useTable({ columns: columns, data: tableData });

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
}
