import React from "react";
import Login from "./Components/Login";
import Register from "./Components/Register";
import {
  Outlet,
  RouterProvider,
  createBrowserRouter,
  useNavigate,
} from "react-router-dom";
import ArchiveContainer from "./Components/ArchiveContainer";
import TrashContainer from "./Components/TrashContainer";
import DashboardContainer from "./Components/DashboardContainer";
import NotesContainer from "./Components/NotesContainer";


function RoutingModule() {
  const appRoutes = createBrowserRouter([
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path:'/',
      element:<DashboardContainer/>,
      children: [
        {
          path:"notes",
          element:<NotesContainer/>

        },
        {
          path:'archive',
          element:<ArchiveContainer/>
        },
        {
          path:"trash",
          element:<TrashContainer/>

        }
      ]
    }
  ]);
  return <RouterProvider router={appRoutes} />;
}

export default RoutingModule;
