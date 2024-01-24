import { useState, createContext } from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";
import Signup from "./components/Signup";
import Login from "./components/Login";
import TextEditor from "./components/WYSIWYGEditor";
import WYSIWYGEditor from "./components/WYSIWYGEditor";

export const authContext = createContext();

function App() {
  const [user, setUser] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <WYSIWYGEditor/> ,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return (
    <authContext.Provider value={{user, isLoggedIn, setUser, setIsLoggedIn}
}>
      <RouterProvider router={router} />
    </authContext.Provider>
  );
}

export default App;
