import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { RootState } from "../../app/store";
import { useGetAllLoansQuery } from "../../features/loan/loanApi";
import { setAllLoans } from "../../features/loan/loanSlice";

interface LoanListProps {
  inMyLoanApplication: boolean;
}

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
      return "bg-gray-100 text-gray-800";
  }
};

export default function LoanList({ inMyLoanApplication }: LoanListProps) {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const dispatch = useDispatch();
  const loans = useSelector((state: RootState) => state.loan);

  const { data, isLoading, isError, refetch } = useGetAllLoansQuery(token);

  const filteredLoans = inMyLoanApplication
    ? loans.allLoans.filter((loan) => loan.borrower_id === Number(userId))
    : loans.allLoans.filter(
        (loan) =>
          loan.borrower_id !== Number(userId) && loan.status !== "repaid"
      );

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 1000);

    return () => clearInterval(interval);
  }, [refetch]);

  useEffect(() => {
    if (data) {
      dispatch(setAllLoans([...data]));
    }
  }, [data, dispatch]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-gray-600 text-sm">Loading loan data...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-red-600 text-sm">Failed to load loan data.</p>
      </div>
    );
  }

  if (!loans.allLoans.length) {
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-gray-500 text-sm">
          {inMyLoanApplication
            ? "You have not applied for any loans yet."
            : "No loan applications available."}
        </p>
      </div>
    );
  }

  return (
    <div className="px-4 py-4">
      <h2 className="text-2xl font-bold text-gray-900 pb-2">
        {inMyLoanApplication ? "Your Loan Applications" : "Loan Applications"}
      </h2>

      {/* Scrollable container with fixed height */}
      <div className="overflow-y-auto max-h-[calc(100vh-150px)] pr-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredLoans
            .filter((loan) => loan.status !== "funded")
            .map((loan, index) => (
              <div
                key={`${loan.id}-${index}`}
                className="bg-white p-4 rounded-lg shadow-md border-l-4"
              >
                {/* Loan Header */}
                <div className="flex justify-between items-center">
                  <h3 className="text-base font-semibold text-gray-900 truncate">
                    {loan.purpose}
                  </h3>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${getTransactionStatusColor(
                      loan.status
                    )}`}
                  >
                    {loan.status}
                  </span>
                </div>

                {/* Loan Details */}
                <div className="mt-2 text-gray-700 text-xs">
                  <div className="grid grid-cols-1 gap-1">
                    <p className="font-medium">
                      Amount: ₹{loan.amount.toLocaleString()}
                    </p>
                    <p className="font-medium">
                      Tenure: {formatDate(loan.repayment_till)} month
                    </p>
                    <p className="font-medium">Interest: {loan.interest}%</p>
                  </div>
                </div>

                {/* Action Button */}
                {!inMyLoanApplication && (
                  <div className="mt-3">
                    <NavLink
                      to={`/user-dashboard/lend/loan-details/${loan.id}`}
                    >
                      <button className="w-full px-3 py-1.5 text-xs font-medium border rounded-lg hover:bg-purple-50 transition">
                        View Details
                      </button>
                    </NavLink>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
