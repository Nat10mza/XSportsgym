import { Container } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { verifyUser } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { useEffect } from "react";
const NAVBAR_HEIGHT = "48px";

export default function AdminLayout() {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(verifyUser());
  }, []);

  return (
    <>
      <Navbar height={NAVBAR_HEIGHT} />
      <Container
        maxW={"100%"}
        px="3"
        pb="3"
        pt={`calc(${NAVBAR_HEIGHT} + var(--chakra-sizes-3))`}
      >
        <Outlet />
      </Container>
    </>
  );
}
