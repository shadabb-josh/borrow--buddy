import {
  ArrowDownRight,
  ArrowUpRight,
  Calendar,
  CheckCircle,
  CreditCard,
  DollarSign,
  Mail,
  MapPin,
  Phone,
  User,
  Wallet,
} from "lucide-react";
interface UserInfo {
  name: string;
  email: string;
  phone: string;
  location: string;
  joined: string;
  status: string;
}
interface LoanItemProps {
  label: string;
  count: number;
  total: number;
  growth: number;
  icon: React.ReactNode;
}
const userIcons: Record<keyof UserInfo, React.ReactNode> = {
  name: <User size={18} />,
  email: <Mail size={18} />,
  phone: <Phone size={18} />,
  location: <MapPin size={18} />,
  joined: <Calendar size={18} />,
  status: <CheckCircle size={18} />,
};
interface LoanStatistics {
  borrowed: number;
  borrowedTotal: number;
  borrowedGrowth: number;
  lent: number;
  lentTotal: number;
  lentGrowth: number;
}

function AccountInfo() {
  const user: UserInfo = {
    name: "Shadab Shikalgar",
    email: "shadab@example.com",
    phone: "+91 98765 43210",
    location: "Pune, India",
    joined: "March 2024",
    status: "Verified",
  };

  const loanStats: LoanStatistics = {
    borrowed: 2,
    borrowedTotal: 125000,
    borrowedGrowth: 8, // 8% increase
    lent: 2,
    lentTotal: 90000,
    lentGrowth: 12, // 12% increase
  };

  return (
    <div className="bg-white p-4 md:p-8 rounded-lg shadow-lg">
      <h3 className="text-lg md:text-xl text-black mb-4 md:mb-6 flex items-center gap-2">
        <User size={22} /> Account Information
      </h3>
      <div className="space-y-4 text-gray-800 text-sm md:text-base">
        {Object.entries(user).map(([key, value], index) => (
          <div key={index} className="flex justify-between border-b pb-3">
            <span className="text-gray-500 capitalize flex items-center gap-2">
              {userIcons[key as keyof UserInfo]}
              {key}
            </span>
            <span className="text-right">{value}</span>
          </div>
        ))}
      </div>

      <h3 className="text-base md:text-lg text-black mt-6 md:mt-8 flex items-center gap-2">
        <DollarSign size={20} /> Loan Statistics
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mt-4">
        {[
          {
            label: "Loans Borrowed",
            count: loanStats.borrowed,
            total: loanStats.borrowedTotal,
            growth: loanStats.borrowedGrowth,
            icon: <CreditCard size={20} />,
          },
          {
            label: "Loans Lent",
            count: loanStats.lent,
            total: loanStats.lentTotal,
            growth: loanStats.lentGrowth,
            icon: <Wallet size={20} />,
          },
        ].map((item: LoanItemProps, index: number) => (
          <div
            key={index}
            className="p-4 md:p-5 bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition"
          >
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm md:text-base text-gray-600 flex items-center gap-2">
                {item.icon} {item.label}
              </p>
              <span className="text-xs md:text-sm bg-gray-200 px-2 py-1 rounded-full">
                {item.count} loans
              </span>
            </div>
            <p className="text-lg md:text-xl font-semibold text-black">
              ₹{item.total.toLocaleString()}
            </p>
            <p
              className={`text-xs md:text-sm mt-1 flex items-center gap-1 ${
                item.growth >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {item.growth >= 0 ? (
                <ArrowUpRight size={16} />
              ) : (
                <ArrowDownRight size={16} />
              )}
              {item.growth >= 0
                ? `+${item.growth}% Growth`
                : `${item.growth}% Decline`}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AccountInfo;
