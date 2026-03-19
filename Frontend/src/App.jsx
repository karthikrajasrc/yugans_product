import { createBrowserRouter, RouterProvider } from "react-router"
import Navbar from "./Components/Navbar"
import Home from "./Pages/Home"
import Product from "./Pages/Product"
import { Toaster } from "react-hot-toast";
import LoggedHome from "./Pages/LoggedHome";
import LoggedCart from "./Pages/LoggedCart";
import LoggedOrders from "./Pages/LoggedOrders";
import LoggedProducts from "./Pages/LoggedProducts";
import ProtectedRoute from "./Routes/protectedRoutes";

const App = () => {

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Navbar />, 
            children: [
                {
                    index: true,
                    element: <Home /> 
                }, {
                    path: "products",
                    element: <Product />
                }, {
                    path: "home",
                    element: (<ProtectedRoute> <LoggedHome /> </ProtectedRoute>) 
                }, {
                    path: "cart",
                    element: (<ProtectedRoute> <LoggedCart /> </ProtectedRoute>)
                }, {
                    path: "product",
                    element: (<ProtectedRoute> <LoggedProducts /> </ProtectedRoute>)
                }, {
                    path: "orders",
                    element: (<ProtectedRoute> <LoggedOrders /> </ProtectedRoute>)
                }
            ]

        }
    ])

  return (
      <>
          <Toaster position="top-center" reverseOrder={false} />
          <RouterProvider router={router} />
      </>
  )
}

export default App
