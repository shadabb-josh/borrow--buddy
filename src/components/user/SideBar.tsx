import {
  CreditCard,
  History,
  LockKeyhole,
  LogOut,
  User,
  Wallet,
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

interface TabItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
}

function SideBar() {
  const location = useLocation();

  const tabs: TabItem[] = [
    {
      id: "account",
      label: "Account Info",
      icon: <User size={18} />,
      path: "/user-dashboard",
    },
    {
      id: "borrowed",
      label: "Loans Borrowed",
      icon: <CreditCard size={18} />,
      path: "/user-dashboard/loans-borrowed",
    },
    {
      id: "lent",
      label: "Loans Lent",
      icon: <Wallet size={18} />,
      path: "/user-dashboard/loans-lent",
    },

    {
      id: "lend",
      label: "Lend",
      icon: <Wallet size={18} />,
      path: "/user-dashboard/lend",
    },
    {
      id: "borrow",
      label: "Borrow",
      icon: <CreditCard size={18} />,
      path: "/user-dashboard/borrow"
    },

    {
      id: "transactions",
      label: "Transactions",
      icon: <History size={18} />,
      path: "/user-dashboard/transactions",
    },
    {
      id: "yourApplications",
      label: "Your Applications",
      icon: <CreditCard size={18} />,
      path: "/user-dashboard/my-loan-applications",
    },
    {
      id: "password",
      label: "Change Password",
      icon: <LockKeyhole size={18} />,
      path: "/user-dashboard/change-password",
    },

    // { id: "loanDetails", label: "Loan Details", icon: <CreditCard size={18} />, path: "/user-dashboard/lend/loan-details" },
  ];

  return (
    <aside className="w-full md:w-1/4 bg-white shadow-xl p-4 md:p-6 flex flex-col justify-between rounded-t-lg md:rounded-t-none md:rounded-r-lg">
      <div>
        <h2 className="text-xl md:text-2xl text-black mb-4 md:mb-6 text-center flex items-center justify-center gap-2">
          Shadabb's Dashboard
        </h2>
        <div className="flex md:block overflow-x-auto md:overflow-visible pb-2 md:pb-0">
          {tabs.map((tab) => (
            <NavLink
              key={tab.id}
              to={tab.path}
              className={`whitespace-nowrap md:whitespace-normal md:block w-auto md:w-full text-left px-3 md:px-6 py-2 md:py-3 rounded-lg text-sm md:text-base transition flex items-center gap-2 md:gap-3 mr-2 md:mr-0 md:mb-2 ${
                location.pathname === tab.path
                  ? "bg-black text-white shadow-lg"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span className="flex items-center gap-2 md:gap-3">
                {tab.icon}
                <span>{tab.label}</span>
              </span>
            </NavLink>
          ))}
        </div>
      </div>
      <NavLink to="/logout">
        <button className="hidden md:flex mt-6 w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition items-center justify-center gap-2">
          <LogOut size={18} /> Logout
        </button>
      </NavLink>
    </aside>
  );
}

export default SideBar;
