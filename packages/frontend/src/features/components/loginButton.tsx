import {
  Button,
  Menu,
  MenuButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Avatar,
  MenuList,
  MenuItem,
  Box,
  useColorModeValue,
  Flex,
} from "@chakra-ui/react";
import { logoutUser } from "../../redux/actions";
import { AiOutlineUserAdd, AiOutlineUser } from "react-icons/ai";
import { LoginPage, RegisterPage } from "./LoginRegisterForm";
import { RootState, AppDispatch } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { IoLogIn } from "react-icons/io5";
import { useBreakpointValue } from "@chakra-ui/react";

interface user {
  name: string;
  email: string;
  state: string;
}
const LoginButton = () => {
  //para session
  const [LogIsOpen, setLogIsOpen] = useState(false);

  const onLogClose = () => setLogIsOpen(false);
  const onLogOpen = () => setLogIsOpen(true);
  // para registro
  const [RegIsOpen, setRegIsOpen] = useState(false);

  const onRegClose = () => setRegIsOpen(false);
  const onRegOpen = () => setRegIsOpen(true);

  return (
    <>
      <Button
        onClick={onLogOpen}
        fontWeight={"bold"}
        fontSize={"0.8em"}
        my="4"
        m={3}
      >
        Iniciar sesión
      </Button>
      <Button
        onClick={onRegOpen}
        fontWeight={"bold"}
        colorScheme="red"
        bg="red.400"
        color={useColorModeValue("gray.50", "gray.050")}
        fontSize={"0.8em"}
        m={3}
        my="4"
        _hover={{
          bg: "red.600",
        }}
      >
        Registrate
      </Button>
      <Modal isOpen={LogIsOpen} onClose={onLogClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <LoginPage SuddenCLose={() => setLogIsOpen(false)} />
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal isOpen={RegIsOpen} onClose={onRegClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <RegisterPage SuddenCLose={() => setRegIsOpen(false)} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

function LoggedButton(user: user) {
  const dispatch: AppDispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutUser());
  };
  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<i className="fas fa-caret-down"></i>}
        variant="link"
        fontSize="sm"
        fontWeight="medium"
        borderRadius="md"
        py="1"
        my="4"
      >
        <Avatar name={user.name} size="sm" />
      </MenuButton>
      <MenuList>
        <MenuItem>
          <i className="fas fa-sign-out-alt mr-2"></i>
          {user.name}
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <i className="fas fa-sign-out-alt mr-2"></i>
          Desconectar
        </MenuItem>
      </MenuList>
    </Menu>
  );
}

function MiniUserButton() {
  const dispatch: AppDispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutUser());
  };
  //para session
  const [LogIsOpen, setLogIsOpen] = useState(false);

  const onLogClose = () => setLogIsOpen(false);
  const onLogOpen = () => setLogIsOpen(true);
  // para registro
  const [RegIsOpen, setRegIsOpen] = useState(false);

  const onRegClose = () => setRegIsOpen(false);
  const onRegOpen = () => setRegIsOpen(true);
  return (
    <>
      <Flex alignItems="center" height={"100vh"}>
        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<i className="fas fa-caret-down"></i>}
            variant="link"
            fontSize="lg"
            fontWeight="medium"
            borderRadius="md"
            my="4"
          >
            <AiOutlineUser />
          </MenuButton>
          <MenuList>
            <MenuItem onClick={onLogOpen}>
              <IoLogIn />
              Inicia sesión
            </MenuItem>
            <MenuItem onClick={onRegOpen}>
              <AiOutlineUserAdd />
              Registrate
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>

      <Modal isOpen={LogIsOpen} onClose={onLogClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <LoginPage SuddenCLose={() => setLogIsOpen(false)} />
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal isOpen={RegIsOpen} onClose={onRegClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <RegisterPage SuddenCLose={() => setRegIsOpen(false)} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
function UserMenu() {
  const [isUser, setIsUser] = useState(false);
  const user = useSelector((state: RootState) => state.user);
  const isSmallScreen = useBreakpointValue({
    base: true,
    sm: true,
    md: false,
    lg: false,
    xl: false,
  });
  useEffect(() => {
    if (user.name) {
      setIsUser(true);
    }
  }, []);

  useEffect(() => {
    if (user.name) {
      setIsUser(true);
    } else {
      setIsUser(false);
    }
  }, [user]);

  return (
    <>
      <Box
        visibility={isUser || isSmallScreen ? "hidden" : "visible"}
        display={isUser || isSmallScreen ? "none" : "block"}
      >
        {LoginButton()}
      </Box>
      <Box
        visibility={isUser || !isSmallScreen ? "hidden" : "visible"}
        display={isUser || !isSmallScreen ? "none" : "block"}
      >
        {MiniUserButton()}
      </Box>

      <Box visibility={isUser ? "visible" : "hidden"}>{LoggedButton(user)}</Box>
    </>
  );
}

export default UserMenu;
