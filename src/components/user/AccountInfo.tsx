import {
  ArrowDownRight,
  ArrowUpRight,
  CheckCircle,
  CreditCard,
  DollarSign,
  Mail,
  User,
  Wallet,
  FileText,
} from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetUserQuery } from "../../features/user/userApi";
import { RootState } from "../../app/store";
import { setUser } from "../../features/user/userSlice";
import { UserState } from "../../features/user/userTypes";
import {
  useGetBorrowedLoansQuery,
  useGetLendedLoansQuery,
} from "../../features/loan/loanApi";
import {
  setBorrowedLoans,
  setLendedLoans,
} from "../../features/loan/loanSlice";

interface UserInfo {
  name: string | null;
  email: string | null;
  status: string | null;
  pan_number: string | null;
  adhaar_number: string | null;
}
const userIcons: Record<keyof UserInfo, React.ReactNode> = {
  name: <User size={18} />,
  email: <Mail size={18} />,
  status: <CheckCircle size={18} />,
  pan_number: <FileText size={18} />,
  adhaar_number: <FileText size={18} />,
};

function AccountInfo() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const loans = useSelector((state: RootState) => state.loan);

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const { data, isLoading, isError } = useGetUserQuery({
    id: userId as string,
    token: token as string,
  });

  const {
    data: borrowedLoansData,
    isError: isBorrowedLoansError,
    refetch: borrowRefetch,
  } = useGetBorrowedLoansQuery({
    id: userId as string,
    token: token as string,
  });

  const {
    data: lendedLoansData,
    isError: isLendedLoansError,
    refetch: lenderRefetch,
  } = useGetLendedLoansQuery({
    id: userId as string,
    token: token as string,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      borrowRefetch();
      lenderRefetch();
    }, 1000);

    return () => clearInterval(interval);
  }, [lenderRefetch, borrowRefetch]);

  useEffect(() => {
    if (data) {
      const formattedObj: UserState = {
        id: data.id || null,
        name: `${data.first_name || ""} ${data.last_name || ""}`.trim() || null,
        email: data.email || null,
        pan_number: data.pan_number || null,
        adhaar_number: data.adhaar_number || null,
        status: data.status || null,
      };
      dispatch(setUser(formattedObj));
    }

    if (borrowedLoansData) {
      dispatch(setBorrowedLoans(borrowedLoansData));
    }

    if (lendedLoansData) {
      dispatch(setLendedLoans(lendedLoansData));
    }
  }, [data, borrowedLoansData, lendedLoansData, dispatch, userId, token]);

  const borrowedTotalAmount = loans.borrowedLoans
    .filter((loan) => loan.status !== "repaid" && loan.status !== "pending")
    .reduce((total, loan) => total + Number(loan.amount), 0);

  const totalRemainingAmount = loans.borrowedLoans
    .filter((loan) => loan.status !== "repaid" && loan.status !== "pending")
    .reduce((total, loan) => total + Number(loan.total_return), 0);

  const lendedTotalAmount = loans.lendedLoans
    .filter((loan) => loan.status !== "repaid" && loan.status !== "pending")
    .reduce((total, loan) => total + Number(loan.amount), 0);

  const lendedTotalExpectedReturn = loans.lendedLoans
    .filter((loan) => loan.status !== "repaid" && loan.status !== "pending")
    .reduce((total, loan) => total + Number(loan.expected_return), 0);

  const lendedGrowth = lendedTotalAmount
    ? (lendedTotalExpectedReturn / lendedTotalAmount) * 100
    : 0;

  return (
    <div className="bg-white p-4 md:p-8 rounded-lg shadow-lg">
      <h3 className="text-lg md:text-xl text-black mb-4 md:mb-6 flex items-center gap-2">
        <User size={22} /> Account Information
      </h3>

      {isLoading ? (
        <p className="text-gray-600">Loading...</p>
      ) : isError ? (
        <p className="text-red-600">Error fetching user data.</p>
      ) : (
        <>
          <div className="space-y-4 text-gray-800 text-sm md:text-base">
            {!isLendedLoansError &&
              !isBorrowedLoansError &&
              Object.entries(user)
                .filter(
                  ([key]) =>
                    key !== "first_name" &&
                    key !== "last_name" &&
                    key !== "id" &&
                    key !== "transactions"
                )
                .map(([key, value]) => (
                  <div key={key} className="flex justify-between border-b pb-3">
                    <span className="text-gray-500 capitalize flex items-center gap-2">
                      {userIcons[key as keyof UserInfo]}
                      {key.replace("_", " ")}
                    </span>
                    <span className="text-right">{value || "N/A"}</span>
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
                count: loans.borrowedLoans.filter(
                  (loan) =>
                    loan.status !== "repaid" && loan.status !== "pending"
                ).length,
                total: borrowedTotalAmount,
                extraLabel: "Remaining Payable",
                extraValue: `₹${totalRemainingAmount.toLocaleString()}`,
                icon: <CreditCard size={20} />,
              },
              {
                label: "Loans Lent",
                count: loans.lendedLoans.filter(
                  (loan) => loan.status !== "repaid"
                ).length,
                total: lendedTotalAmount,
                extraLabel: "Growth",
                extraValue:
                  lendedGrowth >= 0
                    ? `+${lendedGrowth.toFixed(2)}%`
                    : `${lendedGrowth.toFixed(2)}%`,
                icon: <Wallet size={20} />,
                growthPositive: lendedGrowth >= 0,
              },
            ].map((item, index) => (
              <div
                key={index}
                className="p-4 md:p-5 bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition"
              >
                {/* Header */}
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm md:text-base text-gray-600 flex items-center gap-2">
                    {item.icon} {item.label}
                  </p>
                  <span className="text-xs md:text-sm bg-gray-200 px-2 py-1 rounded-full">
                    {item.count} loans
                  </span>
                </div>

                {/* Total Amount */}
                <p className="text-lg md:text-xl font-semibold text-black">
                  ₹{item.total.toLocaleString()}
                </p>

                {/* Extra Info */}
                <p
                  className={`text-xs md:text-sm mt-1 flex items-center gap-1 ${
                    item.growthPositive !== undefined
                      ? item.growthPositive
                        ? "text-green-600"
                        : "text-red-600"
                      : "text-gray-600"
                  }`}
                >
                  {item.growthPositive !== undefined ? (
                    item.growthPositive ? (
                      <ArrowUpRight size={16} />
                    ) : (
                      <ArrowDownRight size={16} />
                    )
                  ) : null}
                  {item.extraLabel}: {item.extraValue}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default AccountInfo;
