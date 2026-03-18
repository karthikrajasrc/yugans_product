import { createBrowserRouter, RouterProvider } from "react-router"
import Navbar from "./Components/Navbar"
import Home from "./Pages/Home"
import Product from "./Pages/Product"
import { Toaster } from "react-hot-toast";

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
