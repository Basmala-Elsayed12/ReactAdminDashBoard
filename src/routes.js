import ManageUser from "./pages/ManageUser/ManageUser";
import { Navigate, createBrowserRouter } from "react-router-dom";
import AddUser from "./pages/ManageUser/AddUser";
import UpdateUser from "./pages/ManageUser/UpdateUser";
import App from "./App";
import ManageLegend from "./pages/ManageLegend/ManageLegend";
import AddLegend from "./pages/ManageLegend/AddLegend";
import UpdateLegend from "./pages/ManageLegend/UpdateLegend";
import ManageGovernorate from "./pages/ManageGovernorate/ManageGovernorate";
import AddGovernorate from "./pages/ManageGovernorate/AddGovernorate";
import UpdateGovernorate from "./pages/ManageGovernorate/UpdateGovernorate";
import ManageTourismPlaces from "./pages/ManageTourismPlaces/ManageTourismPlaces";
import AddTourismPlaces from "./pages/ManageTourismPlaces/AddTourismPlaces";
import UpdateTourismPlaces from "./pages/ManageTourismPlaces/UpdateTourismPlaces";
import ManageOffers from "./pages/ManageOffers/ManageOffers";
import AddOffers from "./pages/ManageOffers/AddOffers";
import UpdateOffers from "./pages/ManageOffers/UpdateOffers";
import ManageTrips from "./pages/ManageTrips/ManageTrips";
import AddTrips from "./pages/ManageTrips/AddTrips";
import UpdateTrips from "./pages/ManageTrips/UpdateTrips";
import Login from "./pages/Auth/Login";
import ManageReviews from "./pages/ManageReviews/ManageReviews";
import Guest from "./middleware/Guest";
import Admin from "./middleware/Admin";
import ManageOrders from "./pages/ManageOrders/ManageOrders";
export const routes = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      {
        element: <Guest />,
        children: [
          {
            path: "/",
            element: <Login />,
          },
        ],
      },

      {
        element: <Admin />,
        children: [
          {
            path: "/manage-user",
            children: [
              {
                path: "",
                element: <ManageUser />,
              },
              {
                path: "add",
                element: <AddUser />,
              },
              {
                path: ":id",
                element: <UpdateUser />,
              },
            ],
          },
          {
            path: "/manage-legend",
            children: [
              {
                path: "",
                element: <ManageLegend />,
              },
              {
                path: "add",
                element: <AddLegend />,
              },
              {
                path: ":id",
                element: <UpdateLegend />,
              },
            ],
          },
          {
            path: "/manage-govern",
            children: [
              {
                path: "",
                element: <ManageGovernorate />,
              },
              {
                path: "add",
                element: <AddGovernorate />,
              },
              {
                path: ":id",
                element: <UpdateGovernorate />,
              },
            ],
          },
          {
            path: "/manage-tourism-places",
            children: [
              {
                path: "",
                element: <ManageTourismPlaces />,
              },
              {
                path: "add",
                element: <AddTourismPlaces />,
              },
              {
                path: ":id",
                element: <UpdateTourismPlaces />,
              },
            ],
          },
          {
            path: "/manage-offers",
            children: [
              {
                path: "",
                element: <ManageOffers />,
              },
              {
                path: "add",
                element: <AddOffers />,
              },
              {
                path: ":id",
                element: <UpdateOffers />,
              },
            ],
          },
          {
            path: "/manage-trips",
            children: [
              {
                path: "",
                element: <ManageTrips />,
              },
              {
                path: "add",
                element: <AddTrips />,
              },
              {
                path: ":id",
                element: <UpdateTrips />,
              },
            ],
          },
          {
            path: "/manage-review",
            element: <ManageReviews />,
          },
          {
            path: "/manage-order",
            element: <ManageOrders />,
          },
        ],
      },

      // {
      //   element: <Admin />,
      //   children: [
      //     {
      //       path: "/manage-user",
      //       children: [
      //         {
      //           path: "",
      //           element: <ManageUser />,
      //         },
      //         {
      //           path: "add",
      //           element: <AddUser />,
      //         },
      //         {
      //           path: ":id",
      //           element: <UpdateUser />,
      //         },
      //       ],
      //     },
      //     {
      //       path: "/manage-legend",
      //       children: [
      //         {
      //           path: "",
      //           element: <ManageLegend />,
      //         },
      //         {
      //           path: "add",
      //           element: <AddLegend />,
      //         },
      //         {
      //           path: ":id",
      //           element: <UpdateLegend />,
      //         },
      //       ],
      //     },
      //     {
      //       path: "/manage-govern",
      //       children: [
      //         {
      //           path: "",
      //           element: <ManageGovernorate />,
      //         },
      //         {
      //           path: "add",
      //           element: <AddGovernorate />,
      //         },
      //         {
      //           path: ":id",
      //           element: <UpdateGovernorate />,
      //         },
      //       ],
      //     },
      //     {
      //       path: "/manage-tourism-places",
      //       children: [
      //         {
      //           path: "",
      //           element: <ManageTourismPlaces />,
      //         },
      //         {
      //           path: "add",
      //           element: <AddTourismPlaces />,
      //         },
      //         {
      //           path: ":id",
      //           element: <UpdateTourismPlaces />,
      //         },
      //       ],
      //     },
      //     {
      //       path: "/manage-offers",
      //       children: [
      //         {
      //           path: "",
      //           element: <ManageOffers />,
      //         },
      //         {
      //           path: "add",
      //           element: <AddOffers />,
      //         },
      //         {
      //           path: ":id",
      //           element: <UpdateOffers />,
      //         },
      //       ],
      //     },
      //     {
      //       path: "/manage-trips",
      //       children: [
      //         {
      //           path: "",
      //           element: <ManageTrips />,
      //         },
      //         {
      //           path: "add",
      //           element: <AddTrips />,
      //         },
      //         {
      //           path: ":id",
      //           element: <UpdateTrips />,
      //         },
      //       ],
      //     },
      //     {
      //       path: "/manage-review",
      //       element: <ManageReviews />,
      //     },
      //   ],
      // },
      // {
      //   path: "/",
      //   element: <Login />,
      // },
    ],
  },

  {
    path: "*",
    element: <Navigate to={"/"} />, // deh 34an lw ktab path 8lt
  },
]);
