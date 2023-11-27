import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Icon,
  IconButton,
  LayoutProps,
  Link,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { MdConveyorBelt } from "react-icons/md";
import { Link as RouterLink } from "react-router-dom";

export interface NavbarProps {
  height: LayoutProps["height"];
}

const DRAWER_ITEMS = [
  {
    label: "Administrar Productos",
    icon: MdConveyorBelt,
    to: "/admin/products",
  },
  { label: "Crear Producto", icon: MdConveyorBelt, to: "/admin/createProduct" },
  { label: "Administrar usuarios", icon: MdConveyorBelt, to: "/admin/users" },
  { label: "Ordenes de compra", icon: MdConveyorBelt, to: "/admin/orders" },
];

export default function Navbar(props: NavbarProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Flex
        as="header"
        alignItems="center"
        height={props.height}
        justifyContent="space-between"
        position="fixed"
        width="full"
        px="2"
        boxShadow="sm"
        gap="4"
      >
        <IconButton
          _hover={{ backgroundColor: "rgba(0, 0, 0, 0.03)" }}
          _active={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
          variant="ghost"
          borderRadius="full"
          aria-label="Abrir menú"
          icon={<HamburgerIcon />}
          onClick={onOpen}
        />
        <Text fontSize="lg" pt="0.5" flex={1}>
          Panel de Administrador
        </Text>
      </Flex>
      <Drawer size="xs" placement="left" isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader
            paddingX="5"
            paddingY="2.5"
            borderBottomWidth="1px"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Text mt="1.5">Menú</Text>
            <DrawerCloseButton position="unset" borderRadius="full" />
          </DrawerHeader>
          <Flex flexDirection="column">
            {DRAWER_ITEMS.map((value, index) => (
              <Link
                key={value.label}
                paddingX="6"
                paddingY="3"
                display="flex"
                alignItems="center"
                gap="6"
                _hover={{ backgroundColor: "rgba(0, 0, 0, 0.03)" }}
                _active={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
                as={RouterLink}
                to={value.to}
                onClick={onClose}
              >
                <Icon as={value.icon} width="6" height="6" mb="0.5" />
                {value.label}
              </Link>
            ))}
          </Flex>
        </DrawerContent>
      </Drawer>
    </>
  );
}
