import HomePage from "../pages/Home/Home";
import NotFound from "../pages/NotFound/NotFound";
import Cart from "../pages/Cart/cart";
import Checkout from "../pages/Checkout/Checkout";
import Orders from "../pages/Orders/Orders";

import AdminLayout from "../pages/Admin/AdminLayout";
import AdminProducts from "../pages/Admin/AdminProducts";

import ProductDetails from '../pages/ProductDetail/ProductDetail';
const ProductRoute = {


  path: "/",
  children: [
    {
      index: true,
      element: <HomePage />,
    },
    {
      path: "/cart",
      element: <Cart/>
    },
    {
      path: "/checkout",
      element: <Checkout/>
    },
    {
      path: "/orders",
      element: <Orders/>
    },
    {

      path: "/admin",
      element: <AdminLayout/>,
      children: [
        {
          path: "products",
          element: <AdminProducts/>
        }
      ]
    },
    {
        path: "*",
        element:<NotFound/>
    },
    {
      path: "/product/:id",
      element: <ProductDetails/>

    }
  ],
};

export default ProductRoute;
