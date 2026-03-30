import HomePage from "../pages/Home/home";
import NotFound from "../pages/NotFound/NotFound";
import Cart from "../pages/Cart/cart";

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
