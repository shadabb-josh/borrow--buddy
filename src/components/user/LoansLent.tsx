import { RootState } from "../../app/store";
import { ArrowDownRight, ArrowUpRight, DollarSign, Wallet } from "lucide-react";
import { useSelector } from "react-redux";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

function LoansLent() {
  const loans = useSelector((state: RootState) => state.loan);

  const lendedTotalAmount = loans.lendedLoans
    .filter((loan) => loan.status !== "repaid" && loan.status !== "pending")
    .reduce((total, loan) => total + Number(loan.amount), 0);

  const lendedTotalExpectedReturn = loans.lendedLoans.reduce(
    (total, loan) => total + Number(loan.expected_return),
    0
  );

  const lendedGrowth = lendedTotalAmount
    ? (lendedTotalExpectedReturn / lendedTotalAmount) * 100
    : 0;

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition h-full flex flex-col">
      <div className="p-4 md:p-8 pb-0">
        <h3 className="text-lg md:text-xl text-black mb-3 md:mb-4 flex items-center gap-2">
          <Wallet size={22} /> Loans Lent
        </h3>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0 mb-4 md:mb-6">
          <div>
            <p className="text-base md:text-lg text-gray-700 flex items-center gap-2">
              <DollarSign size={18} /> Total Lent: ₹{lendedTotalAmount}
            </p>
            <p
              className={`text-xs md:text-sm mt-1 flex items-center gap-1 ${
                lendedGrowth >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {lendedGrowth >= 0 ? (
                <ArrowUpRight size={16} />
              ) : (
                <ArrowDownRight size={16} />
              )}
              {lendedGrowth >= 0
                ? `+${lendedGrowth.toFixed(2)}% Growth`
                : `${lendedGrowth.toFixed(2)}% Decline`}
            </p>
          </div>
          <div className="bg-black text-white px-3 md:px-4 py-1 md:py-2 rounded-lg text-sm">
            Active Loans:{" "}
            {
              loans.lendedLoans.filter((loan) => loan.status !== "repaid")
                .length
            }
          </div>
        </div>
      </div>

      {/* Scrollable container */}
      <div className="overflow-y-auto max-h-[calc(80vh-150px)] flex-grow md:px-8 pb-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          {loans.lendedLoans.map((loan) => (
            <div
              key={loan.id}
              className="border p-3 md:p-4 rounded-lg hover:shadow-md transition"
            >
              {/* Header Section */}
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs md:text-sm text-gray-500">
                  Repayment Till: {formatDate(loan.repayment_till)}
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
                Platform fee: ₹{Number(loan.platform_fee).toLocaleString()}
              </p>
              <p className="text-xs md:text-sm text-gray-600">
                Amount Receivable (after platform fee): ₹{" "}
                {loan.total_return.toFixed(2)}
              </p>

              {loan.status === "repaid" && (
                <p className="mt-2 text-sm font-semibold text-green-600 bg-green-100 px-3 py-1 rounded-lg inline-block">
                  Loan Repaid
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LoansLent;
