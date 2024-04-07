import { useState } from "react";
import React from "react"; // Add this line to import React
import {  RouterProvider, createBrowserRouter } from "react-router-dom";
import Cart from "./assets/pages/Cart";
import Home from "./assets/pages/Home";
import {Provider} from "react-redux";
import store from "./assets/store/store.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element:<Home/>
  },
  {
    path: "cart",
    element: <Cart/>,
  },
]);

function App() {
  return (
    <>
      <Provider store={store}>
      <RouterProvider router={router} />
      </Provider>
    </>
  );
}

export default App;
