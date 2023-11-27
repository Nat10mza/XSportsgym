import {
  Box,
  Flex,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

import { Link as RouterLink } from "react-router-dom";

import UserMenu from "../../features/components/loginButton";
import ToggleColorMode from "../../feature/ToggleColorMode";

import styles from "./CartRedCirlce.module.css";

import {
  MdAlternateEmail,
  MdHome,
  MdPerson,
  MdShoppingBag,
  MdShoppingCart,
} from "react-icons/md";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const DRAWER_ITEMS = [
  { label: "Home", icon: MdHome, to: "/home" },
  { label: "Sobre Nosotros", icon: MdPerson, to: "/about" },
  { label: "Productos", icon: MdShoppingBag, to: "/products" },
  { label: "Contacto", icon: MdAlternateEmail, to: "/contact" },
];

export default function WithSubnavigation() {
  const { isOpen, onToggle } = useDisclosure();
  const cartButton = useSelector((state: RootState) => state.productsOnCart);

  return (
    <Box display={{ base: "none", md: "none", lg: "flex" }}>
      <Flex
        bg={useColorModeValue("blur(8px)", "blur(8px)")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
        width="full"
        position="fixed"
        backdropFilter="blur(8px)"
        zIndex="999"
      >
        <Flex
          ml={{ base: -2 }}
          display={{ base: "flex", md: "flex", lg: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex
          flex={{ base: 1 }}
          alignItems="center"
          justify={{ base: "center", md: "start" }}
        >
          {/* <Text
              textAlign={useBreakpointValue({ base: "center", md: "left" })}
              fontFamily={"heading"}
              color={useColorModeValue("gray.800", "white")}
            >
              Logo
            </Text> */}
          <Flex display={{ base: "none", md: "none", lg: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          <Button
            backgroundColor="transparent"
            variant="unstyled"
            // my="-3"
            mx="-8"
            mt="0"
          >
            <ToggleColorMode />
          </Button>
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
        </Stack>
        <Flex my="-1000" mx="-3" direction={"row"} marginLeft="auto">
          <UserMenu />
        </Flex>
      </Flex>
      <Box>
        <Collapse in={isOpen} animateOpacity>
          <MobileNav />
        </Collapse>
      </Box>
    </Box>
  );
}

const DesktopNav = () => {
  const { onClose } = useDisclosure();

  return (
    <Stack direction={"row"} spacing={4}>
      {DRAWER_ITEMS.map((value, index) => (
        <Box key={value.label} alignItems="center">
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Link
                paddingX="8"
                paddingY="3"
                display="flex"
                alignItems="center"
                gap="6"
                _hover={{
                  borderBottom: "2px solid #E38588",
                  marginBottom: "1px",
                }}
                //  _hover={{ backgroundColor: "rgba(0, 0, 0, 0.03)" }}
                //   _hover={{ textDecoration: "underline" }}
                _active={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
                as={RouterLink}
                to={value.to}
                onClick={onClose}
                //   _hover={{
                //     textDecoration: "none",
                //     color: linkHoverColor,
                //   }}
              >
                {value.label}
              </Link>
            </PopoverTrigger>
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const MobileNav = () => {
  const { onClose } = useDisclosure();
  return (
    <Flex flexDirection="column" mt="16">
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
  );
};
