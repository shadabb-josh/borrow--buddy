import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Contact from "../pages/Contact";
import SignUp from "../pages/SignUp";
import About from "../pages/About";
import LearnMore from "../pages/LearnMore";
import UserDetails from "../pages/UserDetails";
import UserDashboard from "../pages/UserDashboard";
import AccountInfo from "../components/user/AccountInfo";
import LoansBorrowed from "../components/user/LoansBorrowed";
import LoansLent from "../components/user/LoansLent";
import Transactions from "../components/user/Transactions";
import ChangePassoword from "../components/user/ChangePassoword";
import LoanList from "../components/user/LoanList";
import LoanDetails from "../components/user/LoanDetails";
import LoanApplicationForm from "../components/user/LoanApplicationForm";
import PinToSuccessForm from "../components/user/PinToSuccess";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "contact",
    element: <Contact />,
  },
  {
    path: "about",
    element: <About />,
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
    path: "learnmore",
    element: <LearnMore />,
  },
  {
    path: "user-details",
    element: <UserDetails />,
  },
  {
    path: "user-dashboard",
    element: <UserDashboard />,
    children: [
      {
        path: "",
        element: <AccountInfo />,
      },
      {
        path: "loans-borrowed",
        element: <LoansBorrowed />,
      },
      {
        path: "loans-lent",
        element: <LoansLent />,
      },
      {
        path: "transactions",
        element: <Transactions />,
      },
      {
        path: "change-password",
        element: <ChangePassoword />,
      },
      {
        path: "lend",
        element: <LoanList inMyLoanAppplication={false} />,
      },
      {
        path: "lend/loan-details",
        element: <LoanDetails />,
      },
      {
        path: "lend/loan-details/pin",
        element: <PinToSuccessForm />,
      },
      {
        path: "borrow",
        element: <LoanApplicationForm />,
      },
      {
        path: "my-loan-applications",
        element: <LoanList inMyLoanAppplication={true} />,
      }
    ],
  },
]);

export default router;
