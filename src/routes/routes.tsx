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
import ChangePassword from "../components/user/ChangePassoword";
import LoanList from "../components/user/LoanList";
import LoanDetails from "../components/user/LoanDetails";
import LoanApplicationForm from "../components/user/LoanApplicationForm";
import PinToSuccessForm from "../components/user/PinToSuccess";
import AuthGuard from "../components/HOC/AuthGuard";
import AdminDashboard from "../components/admin/AdminDashboard";
import AdminLogin from "../components/admin/AdminLogin";

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
    path: "admin-login",
    element: <AdminLogin />,
  },
  {
    path: "admin-dashboard",
    element: <AuthGuard />,
    children: [
      {
        path: "",
        element: <AdminDashboard />,
      },
    ],
  },
  {
    path: "user-dashboard",
    element: <AuthGuard />,
    children: [
      {
        path: "",
        element: <UserDashboard />,
        children: [
          { path: "", element: <AccountInfo /> },
          { path: "loans-borrowed", element: <LoansBorrowed /> },
          { path: "loans-lent", element: <LoansLent /> },
          { path: "transactions", element: <Transactions /> },
          { path: "change-password", element: <ChangePassword /> },
          { path: "lend", element: <LoanList inMyLoanApplication={false} /> },
          { path: "lend/loan-details/:id", element: <LoanDetails /> },
          {
            path: "lend/loan-details/pin",
            element: <PinToSuccessForm repayment={false} />,
          },
          {
            path: "loans-borrowed/:id/pin",
            element: <PinToSuccessForm repayment={true} />,
          },
          { path: "borrow", element: <LoanApplicationForm /> },
          {
            path: "my-loan-applications",
            element: <LoanList inMyLoanApplication={true} />,
          },
        ],
      },
    ],
  },
]);

export default router;
