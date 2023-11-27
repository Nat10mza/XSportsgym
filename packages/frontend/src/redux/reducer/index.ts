import {
  GET_ALL_PRODUCTS,
  GET_PRODUCT_DETAILS,
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  GET_ALL_BRANDS,
  GET_ALL_CATEGORIES,
  SEARCH_PRODUCT,
  CREATE_REVIEW,
  GET_PRODUCT_REVIEWS,
  ADD_USER,
  GET_USERS_REVIEWS,
  GET_ALL_PRODUCTS_ADMIN,
  EDITED_PRODUCT,
  CREATE_BRAND,
  CREATE_CATEGORIES,
  GET_ALL_USERS,
  EDITED_USER,
  BUY_CART,
  SET_PRODUCT_TO_CART,
  DELETE_PRODUCT_OF_CART,
  CLEAR_CART,
} from "../actions/index";

interface sliceState {
  user: any;
  products: Array<any>;
  adminProducts: Array<any>;
  brands: any;
  categories: any;
  productDetail: any;
  productsOnCart: any;
  totalItems: any;
  cardsForPages: any;
  search: string;
  reviews: Array<any>;
  productReviews: Array<any>;
  reviewUsers: Array<any>;
  users: Array<any>;
  userEdited: any;
  mercadoRes: { global: string };
}

const initialState: sliceState = {
  user: {},
  products: [],
  adminProducts: [],
  brands: [],
  categories: [],
  productDetail: {},
  productsOnCart: [],
  totalItems: 0,
  cardsForPages: 0,
  search: "",
  reviews: [],
  productReviews: [],
  reviewUsers: [],
  users: [],
  userEdited: {},
  mercadoRes: { global: "" },
};

const rootReducer = (state = initialState, action: any) => {
  switch (action.type) {
    // Acá va tu código:
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        products: action.payload.products,
        totalItems: action.payload.totalItems,
        cardsForPages: action.payload.pageSize,
      };
    case GET_ALL_PRODUCTS_ADMIN:
      return {
        ...state,
        adminProducts: action.payload.products,
        totalItems: action.payload.totalItems,
        cardsForPages: action.payload.pageSize,
      };

    case SEARCH_PRODUCT:
      return { ...state, search: action.payload };

    case GET_ALL_CATEGORIES:
      return { ...state, categories: action.payload };

    case GET_ALL_BRANDS:
      return { ...state, brands: action.payload };

    case CREATE_PRODUCT:
      return { ...state, products: [...state.products, action.payload] };

    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter((e: any) => e.id !== action.payload),
      };

    case GET_PRODUCT_DETAILS:
      return { ...state, productDetail: action.payload };
    default:
      return state;

    case EDITED_PRODUCT:
      return { ...state, adminProducts: action.payload };

    case CREATE_REVIEW:
      return { ...state, reviews: [...state.products, action.payload] };

    case GET_PRODUCT_REVIEWS:
      return { ...state, productReviews: action.payload };

    case GET_USERS_REVIEWS:
      return { ...state, reviewUsers: action.payload };

    case ADD_USER:
      return { ...state, user: action.payload };

    case CREATE_BRAND:
      return { ...state, brands: [...state.brands, action.payload] };

    case CREATE_CATEGORIES:
      return { ...state, categories: [...state.categories, action.payload] };

    case GET_ALL_USERS:
      return { ...state, users: action.payload };

    case EDITED_USER:
      return { ...state, userEdited: action.payload };

    case BUY_CART:
      return { ...state, mercadoRes: action.payload };
    case SET_PRODUCT_TO_CART:
      return {
        ...state,
        productsOnCart: [...state.productsOnCart, action.payload],
      };
    case DELETE_PRODUCT_OF_CART:
      const algo = action.payload;

      const filteredData = state.productsOnCart.filter(
        (e: string) => e !== algo
      );

      return {
        ...state,
        productsOnCart: filteredData,
      };
    case CLEAR_CART:
      return {
        ...state,
        productsOnCart: [],
      };
  }
};

export default rootReducer;
