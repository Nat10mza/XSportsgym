import { ChakraProvider } from "@chakra-ui/react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import AdminLayout from "./components/AdminLayout";
import PublicLayout from "./components/PublicLayout";
import CreateProductForm from "./features/components/CreateProductForm";
import AboutPage from "./pages/about";
import { Orders } from "./pages/admin/orders";
import ProductsAdminPage from "./pages/admin/products";
import ContactPage from "./pages/contact";
import ErrorPage from "./pages/error";
import HomePage from "./pages/home";
import NotFoundPage from "./pages/notfound";
import ProductsPage from "./pages/products";
import ProductPage from "./pages/products/product";
import ShoppingCart from "./pages/products/shoppingcart";
import TableUsers from "./pages/admin/users/tableUsers";
import Successful from "./pages/products/urlsBack/Successful";
import Pending from "./pages/products/urlsBack/Pending";
import Failed from "./pages/products/urlsBack/Failed";

const routes = createBrowserRouter(
  createRoutesFromElements([
    <Route errorElement={<ErrorPage />}>
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<Navigate to="/home" />} />
        <Route path="home" element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="products/:productId" element={<ProductPage />} />
        <Route path="products/shoppingcart" element={<ShoppingCart />} />
        <Route
          path="products/shoppingcart/successful"
          element={<Successful />}
        />
        <Route path="products/shoppingcart/pending" element={<Pending />} />
        <Route path="products/shoppingcart/failed" element={<Failed />} />
      </Route>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="products" />} />
        <Route path="products" element={<ProductsAdminPage />} />
        <Route path="createProduct" element={<CreateProductForm />} />
        <Route path="orders" element={<Orders />} />
        <Route path="users" element={<TableUsers />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Route>,
  ])
);

export default function App() {
  return (
    <ChakraProvider>
      <RouterProvider router={routes} />
    </ChakraProvider>
  );
}
