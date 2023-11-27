import { Box, Heading, Text, Button, Flex } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { RootState, AppDispatch } from "../../redux/store/index";
import { useDispatch, useSelector } from "react-redux";
import ShoppingCard from "./shoppingCard";
import * as actions from "../../redux/actions/index";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import BuyForm from "./BuyForm";

// const MP_TOKEN: string = process.env.PRUEBA_ACCESS_TOKEN || "nostring";

initMercadoPago("TEST-29506e64-e7c2-4fe6-91c6-91222c440d55");

export default function ShoppingCart() {
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalProducts, setTotalProducts] = useState<any[]>([]);
  const [buyProducts, setBuyProducts] = useState<any>({ buyedProducts: [] });
  const [showForm, setShowForm] = useState(false);
  const [productsIdTotal, setProductsIdTotal] = useState<any>([]);

  const mercadoRes = useSelector((state: RootState) => state.mercadoRes);
  const user = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch<AppDispatch>();

  const [isCartEmpty, setIsCartEmpty] = useState(false);

  var storage: Array<any> = [];

  for (var i = 0; i < localStorage.length; i++) {
    if (localStorage.key(i)?.includes("CartProduc") === true) {
      storage.push(localStorage.key(i));
    }
  }

  var products = storage.map((e) => {
    let prod = localStorage.getItem(e);
    if (prod !== null) {
      return JSON.parse(prod);
    } else return null;
  });

  const onBuy = (data: any) => {
    const aux = { ...buyProducts, payer: data };
    dispatch(actions.buyCart(aux));
    localStorage.clear();
  };

  const onReady = () => {
    const aux = { ...buyProducts, total: totalPrice };
    setBuyProducts(aux);
    setShowForm(true);
  };

  const handleTotal = () => {
    if (Object.keys(productsIdTotal).length === 0) {
      const result = products.reduce((obj, product) => {
        obj[product.id] = Number(product.price);
        return obj;
      }, {});
      setProductsIdTotal(result);
      let sum: any = Object.values(result).reduce(
        (acc: any, val: any) => acc + val,
        0
      );
      setTotalPrice(sum);
    }
  };

  const setQuantity = (i: number, rest: boolean) => {
    if (buyProducts.buyedProducts.length === 0) return;
    let provitional;

    rest === true
      ? (provitional = --buyProducts.buyedProducts[i].quantity)
      : (provitional = ++buyProducts.buyedProducts[i].quantity);

    let auxArray = buyProducts.buyedProducts;

    auxArray[i].quantity = provitional;

    setBuyProducts({
      ...buyProducts,
      buyedProducts: auxArray,
    });
  };

  const onClose = (name: string, id: number, price: number) => {
    localStorage.removeItem(name + "CartProduc");
    dispatch(actions.removeProductofCart(name));
    products = products?.filter((e) => e.id !== id);
    totalCards = products.map((e, i) => {
      return (
        <ShoppingCard
          key={i}
          id={i}
          product={e}
          setProductsIdTotal={setProductsIdTotal}
          onClose={onClose}
          setQuantity={setQuantity}
        />
      );
    });

    if (Object.keys(productsIdTotal).length !== 0) {
      const result = products.reduce((obj, product) => {
        obj[product.id] = Number(product.price);
        return obj;
      }, {});
      setProductsIdTotal(result);
      let sum: any = Object.values(result).reduce(
        (acc: any, val: any) => acc + val,
        0
      );
      setTotalPrice(sum);
    }
    setTotalProducts(totalCards);
    const buyedProducts = products.map((e) => {
      return {
        name: e.name,
        price: e.price,
        productId: e.id,
        quantity: 1,
      };
    });
    setBuyProducts({ ...buyProducts, buyedProducts: buyedProducts });
  };

  var totalCards = products.map((e, i) => {
    return (
      <ShoppingCard
        key={i}
        id={i}
        product={e}
        setProductsIdTotal={setProductsIdTotal}
        onClose={onClose}
        setQuantity={setQuantity}
      />
    );
  });

  useEffect(() => {
    handleTotal();
    let sum: any = Object.values(productsIdTotal).reduce(
      (acc: any, val: any) => acc + val,
      0
    );
    setTotalPrice(sum);

    var init: number = 0;
    if (totalPrice === 0) {
      setTotalProducts(totalCards);
      products.forEach((e) => {
        init += Number(e.price);
      });

      const buyedProducts = products.map((e) => {
        return {
          name: e.name,
          price: e.price,
          productId: e.id,
          quantity: 1,
        };
      });
      const initBuy = {
        userId: user?.id,
        total: Number(init),
        buyedProducts,
      };
      setBuyProducts(initBuy);

      if (totalProducts.length !== 0) {
        dispatch(actions.addProductotToCart("something"));
        setIsCartEmpty(false);
      }

      if (totalProducts.length === 0) {
        setIsCartEmpty(true);
        if (!isCartEmpty) dispatch(actions.clearCart());
      }
    }
  }, [
    totalPrice,
    products,
    totalCards,
    user.id,
    productsIdTotal,
    buyProducts,
    handleTotal,
    totalProducts.length,
    dispatch,
  ]);

  return (
    <Box p="10px" mt="-10px" minH="100vh" m="auto" maxW={"800px"}>
      <Flex direction={"column"}>
        {showForm === false ? (
          <>
            <Heading>Carrito:</Heading>
            {totalProducts.length !== 0 ? (
              totalProducts
            ) : (
              <Text
                display={"flex"}
                alignItems="center"
                justifyContent={"center"}
                fontStyle="bold"
              >
                {" "}
                El Carrito está vacío
              </Text>
            )}
            <Text fontSize={"xl"} my="20px" fontWeight={600}>
              Total: ${totalPrice.toFixed(2)}
            </Text>
            <Button
              size={"md"}
              variant="solid"
              onClick={onReady}
              colorScheme="red"
              minW="10rem"
              width={"40%"}
              m="auto"
            >
              Comprar
            </Button>
          </>
        ) : (
          <BuyForm onBuy={onBuy} />
        )}
        {mercadoRes.global !== "" && (
          <Wallet initialization={{ preferenceId: mercadoRes.global }} />
        )}
      </Flex>
    </Box>
  );
}
