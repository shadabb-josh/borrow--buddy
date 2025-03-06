import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  DollarSign,
  CreditCard,
  Coins,
  Users,
  UserX,
  HandCoins,
  Banknote,
  FileText,
  Clock,
  CheckCircle2,
  BarChart3,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import TableComponent from "./Table";
import {
  useGetLoanDistributionQuery,
  useGetLoansQuery,
  useGetPlatformStatsQuery,
  useGetRepaymentsQuery,
  useGetTransactionsQuery,
  useGetUsersQuery,
} from "../../features/admin/adminApi";

type StatsConfigItem = {
  title: string;
  value: string | number | undefined;
  bgColor: string;
  textColor: string;
  icon: ReactNode;
};

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF7080"];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [stats, setStats] = useState({});
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const { data: users } = useGetUsersQuery(token);
  const { data: loans } = useGetLoansQuery(token);
  const { data: repayments } = useGetRepaymentsQuery(token);
  const { data: transactions } = useGetTransactionsQuery(token);
  const { data: platformStats } = useGetPlatformStatsQuery(token);
  const { data: loanDistribution } = useGetLoanDistributionQuery(token);

  useEffect(() => {
    setStats(platformStats);
  }, [platformStats, loans, repayments, transactions, loanDistribution]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin-login", { replace: true });
  };

  const loanDistributionData = [
    { name: "Personal", value: loanDistribution?.Personal },
    { name: "Education", value: loanDistribution?.Education },
    { name: "Business", value: loanDistribution?.Business },
    { name: "Emergency", value: loanDistribution?.Emergency },
    { name: "Others", value: loanDistribution?.Others },
  ];

  const statsConfig: StatsConfigItem[] = [
    {
      title: "Platform Revenue",
      value: `₹${stats?.platform_revenue}`,
      bgColor: "bg-gradient-to-br from-green-400 to-green-600",
      textColor: "text-white",
      icon: <DollarSign className="text-white w-6 h-6" />,
    },
    {
      title: "Total Transaction Amount",
      value: `₹${stats?.total_transaction_amount?.toFixed(2)}`,
      bgColor: "bg-gradient-to-br from-blue-400 to-blue-600",
      textColor: "text-white",
      icon: <CreditCard className="text-white w-6 h-6" />,
    },
    {
      title: "Average Loan Amount",
      value: `₹${stats?.average_loan_amount?.toFixed(2)}`,
      bgColor: "bg-gradient-to-br from-purple-400 to-purple-600",
      textColor: "text-white",
      icon: <Coins className="text-white w-6 h-6" />,
    },
    {
      title: "Active Users",
      value: stats?.active_users,
      bgColor: "bg-gradient-to-br from-teal-400 to-teal-600",
      textColor: "text-white",
      icon: <Users className="text-white w-6 h-6" />,
    },
    {
      title: "Inactive Users",
      value: stats?.in_active_users,
      bgColor: "bg-gradient-to-br from-gray-400 to-gray-600",
      textColor: "text-white",
      icon: <UserX className="text-white w-6 h-6" />,
    },
    {
      title: "Number of Borrowers",
      value: stats?.number_of_borrowers,
      bgColor: "bg-gradient-to-br from-orange-400 to-orange-600",
      textColor: "text-white",
      icon: <HandCoins className="text-white w-6 h-6" />,
    },
    {
      title: "Number of Lenders",
      value: stats?.number_of_lenders,
      bgColor: "bg-gradient-to-br from-indigo-400 to-indigo-600",
      textColor: "text-white",
      icon: <Banknote className="text-white w-6 h-6" />,
    },
    {
      title: "Loan Applications",
      value: stats?.number_of_loan_applications,
      bgColor: "bg-gradient-to-br from-pink-400 to-pink-600",
      textColor: "text-white",
      icon: <FileText className="text-white w-6 h-6" />,
    },
    {
      title: "Loans Funded",
      value: stats?.number_of_loan_funded,
      bgColor: "bg-gradient-to-br from-emerald-400 to-emerald-600",
      textColor: "text-white",
      icon: <Banknote className="text-white w-6 h-6" />,
    },
    {
      title: "Loans Pending",
      value: stats?.number_of_loan_pending,
      bgColor: "bg-gradient-to-br from-yellow-400 to-yellow-600",
      textColor: "text-white",
      icon: <Clock className="text-white w-6 h-6" />,
    },
    {
      title: "Loans Repaid",
      value: stats?.number_of_loan_repaid,
      bgColor: "bg-gradient-to-br from-cyan-400 to-cyan-600",
      textColor: "text-white",
      icon: <CheckCircle2 className="text-white w-6 h-6" />,
    },
    {
      title: "Number of Transactions",
      value: stats?.number_of_transactions,
      bgColor: "bg-gradient-to-br from-rose-400 to-rose-600",
      textColor: "text-white",
      icon: <BarChart3 className="text-white w-6 h-6" />,
    },
  ];
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-black text-white shadow-lg">
        <div className="p-6 border-b border-gray-800">
          <h1 className="text-xl font-bold">BorrowBuddy</h1>
          <p className="text-xs text-gray-400 mt-1">Admin Dashboard</p>
        </div>

        <nav className="mt-6 px-4">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`w-full flex items-center pl-4 py-3 mb-2 rounded ${
              activeTab === "dashboard"
                ? "bg-gray-800 border-l-4 border-white"
                : "hover:bg-gray-800"
            }`}
          >
            <i className="fas fa-chart-pie mr-3 text-blue-400"></i>
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab("users")}
            className={`w-full flex items-center pl-4 py-3 mb-2 rounded ${
              activeTab === "users"
                ? "bg-gray-800 border-l-4 border-white"
                : "hover:bg-gray-800"
            }`}
          >
            <i className="fas fa-users mr-3 text-green-400"></i>
            <span>Users</span>
          </button>

          <button
            onClick={() => setActiveTab("transactions")}
            className={`w-full flex items-center pl-4 py-3 mb-2 rounded ${
              activeTab === "transactions"
                ? "bg-gray-800 border-l-4 border-white"
                : "hover:bg-gray-800"
            }`}
          >
            <i className="fas fa-exchange-alt mr-3 text-yellow-400"></i>
            <span>Transactions</span>
          </button>

          <button
            onClick={() => setActiveTab("loans")}
            className={`w-full flex items-center pl-4 py-3 mb-2 rounded ${
              activeTab === "loans"
                ? "bg-gray-800 border-l-4 border-white"
                : "hover:bg-gray-800"
            }`}
          >
            <i className="fas fa-hand-holding-usd mr-3 text-purple-400"></i>
            <span>Loans</span>
          </button>

          <button
            onClick={() => setActiveTab("repayments")}
            className={`w-full flex items-center pl-4 py-3 mb-2 rounded ${
              activeTab === "repayments"
                ? "bg-gray-800 border-l-4 border-white"
                : "hover:bg-gray-800"
            }`}
          >
            <i className="fas fa-money-bill-wave mr-3 text-red-400"></i>
            <span>Repayments</span>
          </button>
        </nav>

        <div className="absolute bottom-0 w-64 p-4 border-t border-gray-800 bg-black">
          <div className="flex items-center">
            <div className="ml-3">
              <button
                className="bg-red-600 pr-18 pl-18 pt-3 pb-3 rounded"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">
            {activeTab === "dashboard" && "Dashboard Overview"}
            {activeTab === "users" && "Users Management"}
            {activeTab === "transactions" && "Transactions"}
            {activeTab === "loans" && "Loans Management"}
            {activeTab === "repayments" && "Repayments"}
          </h2>
          <div className="flex items-center">
            <div className="relative mr-4">
              <span className="text-gray-600">🔔</span>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                3
              </span>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="p-6">
          {/* Dashboard View */}
          {activeTab === "dashboard" && (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
                {statsConfig.map((stat, index) => (
                  <div
                    key={index}
                    className={`${stat.bgColor} ${stat.textColor} rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300`}
                  >
                    <div className="p-4 flex items-center justify-between">
                      <div>
                        <h3 className="text-sm opacity-80 mb-1">
                          {stat.title}
                        </h3>
                        <p className="text-lg font-bold">
                          {stat.value !== undefined ? stat.value : "N/A"}
                        </p>
                      </div>
                      <div className="opacity-70">{stat.icon}</div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-medium mb-4">
                    Loan Distribution
                  </h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={loanDistributionData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) =>
                            `${name} ${(percent * 100).toFixed(0)}%`
                          }
                        >
                          {loanDistributionData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(value) => [`${value}%`, "Percentage"]}
                        />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </>
          )}

          <div>
            {activeTab === "users" && (
              <TableComponent data={users} type={"Users"} />
            )}
            {activeTab === "transactions" && (
              <TableComponent data={transactions} type={"Transactions"} />
            )}
            {activeTab === "loans" && (
              <TableComponent data={loans} type={"Loans"} />
            )}
            {activeTab === "repayments" && (
              <TableComponent data={repayments} type={"Repayments"} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
