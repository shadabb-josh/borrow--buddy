import { CreditCard, DollarSign } from "lucide-react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { RootState } from "../../app/store";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const getTransactionStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "failed":
      return "bg-red-100 text-red-800";
    default:
      return "bg-green-100 text-gray-800";
  }
};

function LoansBorrowed() {
  const loans = useSelector((state: RootState) => state.loan);

  const totalBorrowedAmount = loans.borrowedLoans
    .filter((loan) => loan.status !== "repaid" && loan.status !== "pending")
    .reduce((total, loan) => total + Number(loan.amount), 0);

  return (
    <div className="bg-white p-4 md:p-8 rounded-lg shadow-md hover:shadow-lg transition">
      <h3 className="text-lg md:text-xl text-black mb-3 md:mb-4 flex items-center gap-2">
        <CreditCard size={22} /> Loans Borrowed
      </h3>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0 mb-4 md:mb-6">
        <div>
          <p className="text-base md:text-lg text-gray-700 flex items-center gap-2">
            <DollarSign size={18} /> Total Borrowed: ₹{totalBorrowedAmount}
          </p>
        </div>
        <div className="bg-black text-white px-3 md:px-4 py-1 md:py-2 rounded-lg text-sm">
          Active Loans:{" "}
          {
            loans.borrowedLoans.filter(
              (loan) => loan.status !== "repaid" && loan.status !== "pending"
            ).length
          }
        </div>
      </div>

      <div className="overflow-y-auto max-h-[calc(80vh-150px)] grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
        {loans.borrowedLoans
          .filter((loan) => loan.status !== "pending")
          .map((loan) => (
            <div
              key={loan.id}
              className="border p-3 md:p-4 rounded-lg hover:shadow-md transition"
            >
              {/* Header Section */}
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs md:text-sm text-gray-500">
                  Repayment Till: {formatDate(loan.repayment_till)}
                </span>
                <span
                  className={`text-xs px-2 py-0.5 md:py-1 rounded-full ${getTransactionStatusColor(
                    loan.status
                  )}`}
                >
                  {loan.status}
                </span>
              </div>

              {/* Amount Details */}
              <p className="text-base md:text-lg font-medium">
                Loan Amount: ₹{Number(loan.amount).toLocaleString()}
              </p>

              {/* Loan Purpose */}
              <p className="text-xs md:text-sm text-gray-600">
                Purpose: {loan.purpose}
              </p>

              {/* Interest Rate */}
              <p className="text-xs md:text-sm text-gray-600">
                Interest: {loan.interest}%
              </p>

              {/* Expected & Total Return */}
              <p className="text-xs md:text-sm text-gray-600">
                Total Interest: ₹{Number(loan.expected_return).toLocaleString()}
              </p>
              <p className="text-xs md:text-sm text-gray-600">
                Total Payable Amount: ₹
                {(Number(loan.amount) + Number(loan.expected_return)).toFixed(
                  2
                )}
              </p>

              {loan.status === "repaid" ? (
                <button className="w-full bg-gray-400 mt-3 text-white font-medium py-2 rounded-lg cursor-not-allowed">
                  Loan Repaid
                </button>
              ) : (
                <NavLink to={`${loan.id}/pin`}>
                  <button className="w-full bg-green-500 mt-3 text-white font-medium py-2 rounded-lg transition hover:bg-green-600 active:bg-green-700">
                    Repay Loan
                  </button>
                </NavLink>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}

export default LoansBorrowed;
