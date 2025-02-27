import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Contact from "../pages/Contact";
import SignUp from "../pages/SignUp";
import About from "../pages/About";
import LearnMore from "../pages/LearnMore";

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
    path:"learnMore",
    element: <LearnMore/>
  }
]);

export default router;
