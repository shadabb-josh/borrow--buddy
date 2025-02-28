import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Contact from "../pages/Contact";
import SignUp from "../pages/SignUp";
import About from "../pages/About";
import LearnMore from "../pages/LearnMore";
import UserDetails from "../pages/UserDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "contact",
    element: <Contact />,
  },
  {
    path: "about",
    element: <About/>
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "signup",
    element: <SignUp />,
  },
  {
    path:"learnmore",
    element: <LearnMore/>
  },
  {
    path:"user-details",
    element: <UserDetails/>
  }
]);

export default router;
