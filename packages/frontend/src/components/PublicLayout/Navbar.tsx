import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  DrawerFooter,
  Flex,
  Icon,
  IconButton,
  Button,
  Box,
  LayoutProps,
  Link,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

import styles from "./CartRedCirlce.module.css";

import {
  MdAlternateEmail,
  MdHome,
  MdPerson,
  MdShoppingBag,
  MdShoppingCart,
} from "react-icons/md";
import { Link as RouterLink } from "react-router-dom";
import ToggleColorMode from "../../feature/ToggleColorMode";
import UserMenu from "../../features/components/loginButton";
import { RootState, AppDispatch } from "../../redux/store/index";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export interface NavbarProps {
  height: LayoutProps["height"];
}

const DRAWER_ITEMS = [
  { label: "Home", icon: MdHome, to: "/home" },
  { label: "Sobre Nosotros", icon: MdPerson, to: "/about" },
  { label: "Productos", icon: MdShoppingBag, to: "/products" },
  { label: "Contacto", icon: MdAlternateEmail, to: "/contact" },
];

var storage: Array<any> = [];

for (var i = 0; i < localStorage.length; i++) {
  console.log(localStorage.key(i));
  if (localStorage.key(i)?.includes("CartProduc") === true) {
    storage.push(localStorage.key(i));
  }
  console.log(storage);
}

export default function Navbar(props: NavbarProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cartButton = useSelector((state: RootState) => state.productsOnCart);

  return (
    <>
      <Flex
        display={{ base: "flex", md: "flex", lg: "none" }}
        as="header"
        alignItems="center"
        height={props.height}
        // position="fixed"
        width="full"
        justifyContent="space-between"
        px="2"
        backdropFilter="blur(8px)"
        boxShadow="sm"
        zIndex="999"
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
        <Flex alignItems="center" justifyContent="flex-end">
          <Link href="/products/shoppingcart">
            <IconButton
              _hover={{ backgroundColor: "rgba(0, 0, 0, 0.03)" }}
              _active={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
              variant="ghost"
              borderRadius="full"
              aria-label="Ver carrito de compras"
              icon={
                <>
                  {!cartButton.length ? null : (
                    <div className={styles.redCircle}></div>
                  )}

                  <MdShoppingCart />
                </>
              }
            />
          </Link>
          <Flex justifyContent="flex-end" marginLeft="auto">
            <UserMenu />
          </Flex>
        </Flex>
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
                paddingX="8"
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
          <DrawerFooter>
            <Button
              marginRight="auto"
              backgroundColor="transparent"
              variant="unstyled"
              my="-3"
            >
              <ToggleColorMode />
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
