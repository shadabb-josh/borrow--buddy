import MobileLogoutButton from "./MobileLogoutButton";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";

function DashboardLayout() {

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col md:flex-row">
      <SideBar/>

      <div className="w-full md:w-3/4 p-4 md:p-10">
        <MobileLogoutButton />
        {/* {activeTab === "account" && <AccountInfo />}
        {activeTab === "borrowed" && <LoansBorrowed />}
        {activeTab === "lent" && <LoansLent />}
        {activeTab === "transactions" && <Transactions />}
        {activeTab === "password" && <ChangePassoword />}
        {activeTab === "Lend" && <LoanList />}
        {activeTab === "loanDetails" && <LoanDetails />} */}

        <Outlet/>
      </div>
    </div>
  );
}

export default DashboardLayout;
