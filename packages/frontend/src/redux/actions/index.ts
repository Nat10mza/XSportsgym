import { apiUrl, appUrl } from "../../config";
import axios from "../../libs/axios";
import { AppDispatch } from "../store/index";

// Aca deben declarar las variables donde tengan el action types.
export const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS";
export const GET_ALL_PRODUCTS_ADMIN = "GET_ALL_PRODUCTS_ADMIN";
export const GET_ALL_BRANDS = "GET_ALL_BRANDS";
export const GET_ALL_CATEGORIES = "GET_ALL_CATEGORIES";
export const GET_PRODUCT_DETAILS = "GET_PRODUCT_DETAILS";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const SEARCH_PRODUCT = "SEARCH_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_REVIEW = "CREATE_REVIEW";
export const GET_PRODUCT_REVIEWS = "GET_PRODUCT_REVIEWS";
export const ADD_USER = "ADD_USER";
export const EDITED_PRODUCT = "EDITED_PRODUCT";
export const GET_USERS_REVIEWS = "GET_USERS_REVIEWS";
export const CREATE_BRAND = "CREATE_BRAND";
export const CREATE_CATEGORIES = "CREATE_CATEGORIES";
export const GET_ALL_USERS = "GET_ALL_USERS";
export const EDITED_USER = "EDITED_USER";
export const BUY_CART = "BUY_CART";
export const SET_PRODUCT_TO_CART = "SET_PRODUCT_TO_CART";
export const DELETE_PRODUCT_OF_CART = "DELETE_PRODUCT_OF_CART";
export const CLEAR_CART = "CLEAR_CART";

export const getAllProducts =
  (
    orderBy: string,
    alphaOrder: string,
    currentPage: string,
    brandFilter: number,
    categoryFilter: number,
    search: string
  ) =>
  async (dispatch: AppDispatch) => {
    if (categoryFilter === 0 && brandFilter === 0 && search === "") {
      await axios
        .get(
          `products?column=${orderBy}&order=${alphaOrder}&page=${currentPage}&isTrashed=false`
        )
        .then((res) => dispatch({ type: GET_ALL_PRODUCTS, payload: res.data }));
    } else if (categoryFilter !== 0 && brandFilter !== 0 && search === "") {
      await axios
        .get(
          `products?column=${orderBy}&order=${alphaOrder}&page=${currentPage}&categoryId=${categoryFilter}&brandId=${brandFilter}&isTrashed=false`
        )
        .then((res) => dispatch({ type: GET_ALL_PRODUCTS, payload: res.data }));
    } else if (categoryFilter === 0 && brandFilter !== 0 && search === "") {
      await axios
        .get(
          `products?column=${orderBy}&order=${alphaOrder}&page=${currentPage}&brandId=${brandFilter}&isTrashed=false`
        )
        .then((res) => dispatch({ type: GET_ALL_PRODUCTS, payload: res.data }));
    } else if (categoryFilter !== 0 && brandFilter === 0 && search === "") {
      await axios
        .get(
          `products?column=${orderBy}&order=${alphaOrder}&page=${currentPage}&categoryId=${categoryFilter}&isTrashed=false`
        )
        .then((res) => dispatch({ type: GET_ALL_PRODUCTS, payload: res.data }));
    } else if (categoryFilter === 0 && brandFilter === 0 && search !== "") {
      await axios
        .get(
          `products?column=${orderBy}&order=${alphaOrder}&page=${currentPage}&&search=${search}`
        )
        .then((res) => dispatch({ type: GET_ALL_PRODUCTS, payload: res.data }));
    } else if (categoryFilter !== 0 && brandFilter !== 0 && search !== "") {
      await axios
        .get(
          `products?column=${orderBy}&order=${alphaOrder}&page=${currentPage}&categoryId=${categoryFilter}&brandId=${brandFilter}&&search=${search}`
        )
        .then((res) => dispatch({ type: GET_ALL_PRODUCTS, payload: res.data }));
    } else if (categoryFilter === 0 && brandFilter !== 0 && search !== "") {
      await axios
        .get(
          `products?column=${orderBy}&order=${alphaOrder}&page=${currentPage}&brandId=${brandFilter}&&search=${search}`
        )
        .then((res) => dispatch({ type: GET_ALL_PRODUCTS, payload: res.data }));
    } else if (categoryFilter !== 0 && brandFilter === 0 && search !== "") {
      await axios
        .get(
          `products?column=${orderBy}&order=${alphaOrder}&page=${currentPage}&categoryId=${categoryFilter}&&search=${search}`
        )
        .then((res) => dispatch({ type: GET_ALL_PRODUCTS, payload: res.data }));
    }
  };

export const getSearch = (name: string) => async (dispatch: AppDispatch) => {
  const search: string = name;

  dispatch({ type: SEARCH_PRODUCT, payload: search });
};

export const getProductDetail =
  (id: string) => async (dispatch: AppDispatch) => {
    const res = await axios.get(`products/${id}`);
    dispatch({ type: GET_PRODUCT_DETAILS, payload: res.data });
  };

export const createProduct = (data: any) => async (dispatch: AppDispatch) => {
  const res = await axios
    .post(`products`, {
      name: data.name,
      description: data.description,
      imageUrl: data.imageUrl,
      price: data.price,
      stock: data.stock,
      brandId: data.brandId,
      categoryId: data.categoryId,
    })
    .then((res) => res.data);
  dispatch({ type: CREATE_PRODUCT, payload: res });
};

export const getAllBrands = () => async (dispatch: AppDispatch) => {
  const res = await axios.get("brands");

  dispatch({ type: GET_ALL_BRANDS, payload: res.data });
};

export const getAllCategories = () => async (dispatch: AppDispatch) => {
  const res = await axios.get("categories");
  dispatch({ type: GET_ALL_CATEGORIES, payload: res.data });
};

export const getProductsPerPage =
  (page: number) => async (dispatch: AppDispatch) => {
    const res = await axios.get(`products?page=${page}`);
    dispatch({ type: GET_ALL_PRODUCTS_ADMIN, payload: res.data });
  };

export const deleteProduct = (data: any) => async (dispatch: AppDispatch) => {
  const res = await axios.patch(`products/${data.id}`, {
    ...data,
    isTrashed: true,
  });
  dispatch({ type: DELETE_PRODUCT, payload: res.data.id });
};

export const patchProduct =
  (data: any, idProduct: number, newAndOthers: any) =>
  async (dispatch: AppDispatch) => {
    let result = await axios.patch(`products/${idProduct}`, data);
    dispatch({ type: EDITED_PRODUCT, payload: newAndOthers });
    // console.log("NEW DATA",result.data);
  };

export const createReview = (data: any) => async (dispatch: AppDispatch) => {
  const res = await axios
    .post(`reviews`, {
      comments: data.comment,
      score: Number(data.score),
      productId: Number(data.productId),
      userId: 1,
    })
    .then((res) => res.data);
  dispatch({ type: CREATE_PRODUCT, payload: res });
};

export const getProductReviews =
  (productId: string) => async (dispatch: AppDispatch) => {
    const res = await axios.get(`reviews/${productId}`);
    dispatch({ type: GET_PRODUCT_REVIEWS, payload: res.data });
  };

export const addUserFromFb = () => async (dispatch: AppDispatch) => {
  const width = 600;
  const height = 400;
  const left = window.screenX + (window.innerWidth - width) / 2;
  const top = window.screenY + (window.innerHeight - height) / 2;
  const authWindow = window.open(
    new URL("/api/auth/facebook", appUrl),
    "facebook-login",
    `width=${width},height=${height},left=${left},top=${top}`
  );
  if (authWindow == null) {
    throw Error("no se puede llamar al login");
  }
  const handleAuthResponse = (event: any) => {
    if (event.origin !== appUrl) return;
    if (event.data.isAuthenticated) {
      dispatch({ type: ADD_USER, payload: event.data.user });
    }
  };
  window.addEventListener("message", handleAuthResponse);
  const intervalId = setInterval(() => {
    if (authWindow.closed) {
      clearInterval(intervalId);
      window.removeEventListener("message", handleAuthResponse);
    }
  }, 1000);
};

export const addUserFromGoogle = () => async (dispatch: AppDispatch) => {
  const width = 600;
  const height = 400;
  const left = window.screenX + (window.innerWidth - width) / 2;
  const top = window.screenY + (window.innerHeight - height) / 2;
  const authWindow = window.open(
    new URL("/api/auth/google", appUrl),
    "google-login",
    `width=${width},height=${height},left=${left},top=${top}`
  );
  if (authWindow == null) {
    throw Error("no se puede llamar al login");
  }
  const handleAuthResponse = (event: any) => {
    if (event.origin !== appUrl) return;
    if (event.data.isAuthenticated) {
      dispatch({ type: ADD_USER, payload: event.data.user });
      dispatch(sendLoginEmail(event.data.user));
    }
  };
  window.addEventListener("message", handleAuthResponse);
  const intervalId = setInterval(() => {
    if (authWindow.closed) {
      clearInterval(intervalId);
      window.removeEventListener("message", handleAuthResponse);
    }
  }, 1000);
};

export const addUserFromLocal =
  (data: any) => async (dispatch: AppDispatch) => {
    let msg = null;
    try {
      const response = await axios.post(
        "localLogin",
        {
          email: data.email,
          password: data.password,
        },
        {
          withCredentials: true, // permite recibir cookies del servidor
        }
      );
      const { state, user } = response.data;
      if (state === "success") {
        // La autenticación fue exitosa, hacer algo con los datos del usuario

        //el modal se cierra
        dispatch({ type: ADD_USER, payload: user });
      } else {
        // La autenticación falló, hacer algo en consecuencia

        return (msg = "la autenticacion falló , datos incorrectos");
      }
    } catch (error: any) {
      let problema = error.response?.data;

      if (error.response?.data?.errors) {
        let mensaje = "";
        problema.errors.forEach((el: any) => {
          mensaje = mensaje + "*" + el.message + "\n";
        });
        return (msg = mensaje);
      } else {
        console.log(error);
        return (msg = " Ocurrió un error al procesar la solicitud");
      }
    }
  };

export const sendEmail = (data: any) => async (dispatch: AppDispatch) => {
  await axios.post("/mail", {
    to: data.email,
    name: data.name,
  });
  return console.log("enviado");
};

export const contactEmail = (data: any) => async (dispatch: AppDispatch) => {
  await axios.post("/sendContact", {
    name: data.name,
    email: data.email,
    location: data.location,
    message: data.message,
  });
  return console.log("enviado");
};

export const suscribeEmail = (data: any) => async (dispatch: AppDispatch) => {
  console.log(data);
  await axios.post("/sendSuscription", {
    to: data,
  });
  return console.log("enviado");
};

export const sendLoginEmail = (data: any) => async (dispatch: AppDispatch) => {
  await axios.post("/loginMail", {
    to: data.email,
    name: data.name,
  });
  return console.log("enviado");
};

export const sendEmailUpdate = (data: any) => async (dispatch: AppDispatch) => {
  await axios.post("/sendEmailUpdate", {
    to: data.email,
    name: data.name,
    state: data.state,
    role: data.role,
  });
  return console.log("Se envió el MAIL al usuario");
};

export const registerUser = (data: any) => async (dispatch: AppDispatch) => {
  const userData = {
    name: data.name,
    email: data.email,
    password: data.password,
    role: "USER", //por defecto
    state: "active", // por defecto por ahora
  };
  try {
    const response = await axios.post("users", userData);
    if (response.data.state === "success") {
      // alert("Bienvenido, nuevo usuario");
      dispatch(addUserFromLocal(data));
      dispatch(sendEmail(data));
    }
  } catch (error: any) {
    let problema = error.response?.data;
    let msg = null;

    if (problema.message === "Unique constraint was provided") {
      return (msg = " Este email ya está registrado");
    } else {
      if (error.response?.data?.errors) {
        let lista = error.response?.data?.errors;
        let mensaje = "La contraseña debe ";
        lista.forEach((el: any) => {
          mensaje = mensaje + el.message + "\n";
        });
        return (msg = mensaje);
      } else {
        return (msg = " Ocurrió un error al procesar la solicitud");
      }
    }
  }
};

export const logoutUser = () => async (dispatch: AppDispatch) => {
  const res = await axios.get(`logout`, {
    withCredentials: true,
  });
  // verificamos si se deslogueo correctamente
  dispatch({ type: ADD_USER, payload: {} });
};

export const verifyUser = () => async (dispatch: AppDispatch) => {
  try {
    const res = await axios.get("privateUsers", {
      withCredentials: true,
    });
    //consulta si esta logueado para obtener el usuario
    dispatch({ type: ADD_USER, payload: res.data.user });
  } catch (error) {
    //console.log(error);
    dispatch({ type: ADD_USER, payload: {} });
  }
};

export const getUsersReviews =
  (usersIds: any) => async (dispatch: AppDispatch) => {
    console.log(usersIds);
    const data = usersIds.map(async (id: any) => {
      const res = await axios.get(`users/${id}`).then((data) => data.data);
      return res;
    });
    dispatch({ type: GET_USERS_REVIEWS, payload: data });
  };

export const createBrands = (data: any) => async (dispatch: AppDispatch) => {
  let res = await axios.post("brands", data);
  dispatch({ type: CREATE_BRAND, payload: res.data });
  console.log(res.data);
};

export const createCategories =
  (data: any) => async (dispatch: AppDispatch) => {
    let res = await axios.post("categories", data);
    dispatch({ type: CREATE_CATEGORIES, payload: res.data });
    console.log(res.data);
  };

export const getAllUsers = (data: any) => async (dispatch: AppDispatch) => {
  const name = data?.name ?? "";
  const email = data?.email ?? "";
  const role = data?.role ?? "";
  const search = data?.search ?? "";
  const state = data?.state ?? "";
  const page = data?.page ?? "";
  const order = data?.order ?? "asc";
  const column = data?.column ?? "";
  const size = data?.size ?? "";

  const res = await axios.get(
    `users?name=${name}&email=${email}&role=${role}&search=${search}&state=${state}&page=${page}&order=${order}&column=${column}&size=${size}`
  );
  //console.log(res.data);
  dispatch({ type: GET_ALL_USERS, payload: res.data.users });
};

export const patchUser = (data: any) => async (dispatch: AppDispatch) => {
  let result = await axios.patch(`users/${data.id}`, data);
  dispatch({ type: EDITED_USER, payload: result.data });
  console.log("NEW DATA", result.data);
};

//solo uso a edited_user como una forma de verificar que se borró el usuario
export const deleteUser = (data: any) => async (dispatch: AppDispatch) => {
  const res = await axios.delete(`users/${data.id}`);
  dispatch({ type: EDITED_USER, payload: res.data });
};

export const addProductotToCart =
  (itemInstorage: string) => (dispatch: AppDispatch) => {
    return dispatch({ type: SET_PRODUCT_TO_CART, payload: itemInstorage });
  };

export const removeProductofCart =
  (itemInstorage: string) => (dispatch: AppDispatch) => {
    return dispatch({ type: DELETE_PRODUCT_OF_CART, payload: itemInstorage });
  };

export const clearCart = () => (dispatch: AppDispatch) => {
  return dispatch({ type: CLEAR_CART, payload: null });
};

export const buyCart = (data: any) => async (dispatch: AppDispatch) => {
  // console.log(data);
  try {
    const res = await axios
      .post(`orders`, {
        userId: data?.userId,
        total: data?.total,
        products: data?.buyedProducts?.map((e: any) => {
          return {
            productId: e?.productId,
            quantity: e?.quantity,
            name: e?.name,
            price: e?.price,
          };
        }),
        payer: {
          name: data.payer.name,
          surname: data.payer.surname,
          adress: {
            street_name: data.payer.adress.street_name,
            street_number: Number(data.payer.adress.street_number),
          },
          email: data.payer.email,
          zip_code: Number(data.payer.zip_code),
        },
      })
      .then((res) => res.data);
    console.dir(res);
    dispatch({ type: BUY_CART, payload: res });
  } catch {
    const newError = new Error("¡Hubo un error al procesar la solicitud!");

    console.error(newError);
  }
};
