import Navbar from "./Components/Navbar/Navbar.jsx";
import Login from "./Components/Login/Login";
import {
  createBrowserRouter,
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./Components/Home/Home.jsx";
import Layout from "./Components/Layout/Layout";
import Register from "./Components/Register/Register.jsx";
import AllGames from "./Components/AllGames/AllGames";
import Platform from "./Components/Platform/Platform";
import SortBy from "./Components/sort by/SortBy";
import Categories from "./Components/Categories/Categories";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute.jsx";
import ErrorPage from "./Components/ErrorPage/ErrorPage";

function App() {
  const Routers = createHashRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/allgames",
          element: (
            <ProtectedRoute>
              <AllGames />
            </ProtectedRoute>
          ),
        },
        {
          path: "/platform/:p",
          element: (
            <ProtectedRoute>
              <Platform />
            </ProtectedRoute>
          ),
        },
        {
          path: "/sortby/:sort",
          element: (
            <ProtectedRoute>
              <SortBy />
            </ProtectedRoute>
          ),
        },
        {
          path: "/category/:cat",
          element: (
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          ),
        },
      ],
    },
    { path: "*", element: <ErrorPage /> },
  ]);

  return <RouterProvider router={Routers} />;
}

export default App;
