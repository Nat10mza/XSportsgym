import { Container } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Navbar2 from "./Navbar2";

import { verifyUser } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { useEffect } from "react";
const NAVBAR_HEIGHT = "48px";

export default function PublicLayout() {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(verifyUser());
  }, []);
  return (
    <>
      <Navbar height={NAVBAR_HEIGHT} />
      <Navbar2 />
      <Container
        size="sm"
        px="3"
        pb="3"
        pt={`calc(${NAVBAR_HEIGHT} + var(--chakra-sizes-3))`}
      ></Container>
      <Outlet />
      <Footer />
    </>
  );
}
