import { NavLink } from "react-router-dom";

interface LoanListProps {
  inMyLoanAppplication: boolean;
}

export default function LoanList({ inMyLoanAppplication }: LoanListProps) {
  // Dummy loan data
  const loans = [
    {
      id: 1,
      borrowerName: "Rahul Sharma",
      amount: 75000,
      tenure: 24,
      interest: 12,
      status: "Pending",
    },
    {
      id: 2,
      borrowerName: "Ananya Verma",
      amount: 50000,
      tenure: 18,
      interest: 10,
      status: "Approved",
    },
    {
      id: 3,
      borrowerName: "Vikram Singh",
      amount: 100000,
      tenure: 36,
      interest: 14,
      status: "Rejected",
    },
    {
      id: 1,
      borrowerName: "Rahul Sharma",
      amount: 75000,
      tenure: 24,
      interest: 12,
      status: "Pending",
    },
    {
      id: 2,
      borrowerName: "Ananya Verma",
      amount: 50000,
      tenure: 18,
      interest: 10,
      status: "Approved",
    },
    {
      id: 3,
      borrowerName: "Vikram Singh",
      amount: 100000,
      tenure: 36,
      interest: 14,
      status: "Rejected",
    },
    {
      id: 1,
      borrowerName: "Rahul Sharma",
      amount: 75000,
      tenure: 24,
      interest: 12,
      status: "Pending",
    },
    {
      id: 2,
      borrowerName: "Ananya Verma",
      amount: 50000,
      tenure: 18,
      interest: 10,
      status: "Approved",
    },
    {
      id: 3,
      borrowerName: "Vikram Singh",
      amount: 100000,
      tenure: 36,
      interest: 14,
      status: "Rejected",
    },
    {
      id: 1,
      borrowerName: "Rahul Sharma",
      amount: 75000,
      tenure: 24,
      interest: 12,
      status: "Pending",
    },
    {
      id: 2,
      borrowerName: "Ananya Verma",
      amount: 50000,
      tenure: 18,
      interest: 10,
      status: "Approved",
    },
    {
      id: 3,
      borrowerName: "Vikram Singh",
      amount: 100000,
      tenure: 36,
      interest: 14,
      status: "Rejected",
    },
    {
      id: 1,
      borrowerName: "Rahul Sharma",
      amount: 75000,
      tenure: 24,
      interest: 12,
      status: "Pending",
    },
    {
      id: 2,
      borrowerName: "Ananya Verma",
      amount: 50000,
      tenure: 18,
      interest: 10,
      status: "Approved",
    },
    {
      id: 3,
      borrowerName: "Vikram Singh",
      amount: 100000,
      tenure: 36,
      interest: 14,
      status: "Rejected",
    },
    {
      id: 1,
      borrowerName: "Rahul Sharma",
      amount: 75000,
      tenure: 24,
      interest: 12,
      status: "Pending",
    },
    {
      id: 2,
      borrowerName: "Ananya Verma",
      amount: 50000,
      tenure: 18,
      interest: 10,
      status: "Approved",
    },
    {
      id: 3,
      borrowerName: "Vikram Singh",
      amount: 100000,
      tenure: 36,
      interest: 14,
      status: "Rejected",
    },
  ];

  return (
    <div className="px-4 py-4">
      {!inMyLoanAppplication && (
        <h2 className="text-2xl font-bold text-gray-900 pb-2">
          Loan Applications
        </h2>
      )}

      {inMyLoanAppplication && (
        <h2 className="text-2xl font-bold text-gray-900 pb-2">
          Your Loan Applications
        </h2>
      )}

      {/* Scrollable container with fixed height */}
      <div className="overflow-y-auto max-h-[calc(100vh-150px)] pr-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {loans.map((loan, index) => (
            <div
              key={`${loan.id}-${index}`}
              className="bg-white p-4 rounded-lg shadow-md border-l-4"
            >
              {/* Loan Header */}
              <div className="flex justify-between items-center">
                <h3 className="text-base font-semibold text-gray-900 truncate">
                  {loan.borrowerName}
                </h3>
                <span
                  className={`px-2 py-1 text-xs rounded-full 
                  ${
                    loan.status === "Pending"
                      ? "bg-yellow-100 text-yellow-600"
                      : loan.status === "Approved"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {loan.status}
                </span>
              </div>

              {/* Loan Details - more compact */}
              <div className="mt-2 text-gray-700 text-xs">
                <div className="grid grid-cols-1 gap-1">
                  <p className="font-medium">
                    Amount: ₹{loan.amount.toLocaleString()}
                  </p>
                  <p className="font-medium">Tenure: {loan.tenure} month</p>
                  <p className="font-medium"> Interest:{loan.interest}%</p>
                </div>
              </div>

              {/* Action Button - simplified */}
              {!inMyLoanAppplication && (
                <div className="mt-3">
                  <NavLink to="/user-dashboard/lend/loan-details">
                    <button
                      className="w-full px-3 py-1.5 text-xs font-medium border rounded-lg hover:bg-purple-50 transition"
                    >
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
