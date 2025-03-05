import { RootState } from "../../app/store";
import { NavLink, useParams } from "react-router-dom";
import { useGetLoanByIdQuery } from "../../features/loan/loanApi";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setLoan } from "../../features/loan/loanSlice";

function LoanDetails() {
  const { id } = useParams();
  const token = localStorage.getItem("token");

  const { data, isLoading, isError } = useGetLoanByIdQuery({ id, token });
  const dispatch = useDispatch();

  const loan = useSelector((state: RootState) => state.loan.loan);

  useEffect(() => {
    if (data) {
      dispatch(setLoan(data));
    }
  }, [data]);

  if (isLoading) {
    return <p className="text-center mt-10">Loading loan details...</p>;
  }

  if (isError || !loan) {
    return (
      <p className="text-center mt-10 text-red-500">
        Error fetching loan details.
      </p>
    );
  }

  return (
    <div className="flex items-center justify-center mt-10">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header Banner */}
        <div className="bg-black text-white p-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Loan #{loan.id}</h1>
            <span className="px-3 py-1 bg-white text-black rounded-full text-sm font-medium">
              {loan.status}
            </span>
          </div>
          <p className="mt-1">{loan.purpose}</p>
        </div>

        {/* Key Metrics */}
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-sm text-gray-500">Loan Amount</p>
              <p className="text-3xl font-bold">
                ₹{loan.amount.toLocaleString()}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Interest Rate</p>
              <p className="text-3xl font-bold">{loan.interest}%</p>
            </div>
          </div>

          {/* Return Metrics */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <p className="text-xs text-gray-500">Expected Return</p>
              <p className="text-lg font-bold text-gray-600">
                ₹{loan.expected_return}
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <p className="text-xs text-gray-500">Platform Fee</p>
              <p className="text-lg font-bold text-red-700">
                ₹{loan.platform_fee}
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <p className="text-xs text-gray-500">Total Return</p>
              <p className="text-lg font-bold text-green-700">
                ₹{loan.total_return}
              </p>
            </div>
          </div>

          {/* Loan Details */}
          <div className="space-y-3 text-gray-800 text-sm mb-6">
            <h2 className="font-semibold text-gray-800 text-lg border-b pb-2">
              Loan Information
            </h2>
            {[
              { label: "Purpose", value: loan.purpose },
              { label: "Interest", value: `${loan.interest}%` },
              { label: "Repayment Deadline", value: loan.repayment_till },
            ].map((item, index) => (
              <div key={index} className="flex justify-between border-b pb-2">
                <span className="text-gray-500">{item.label}</span>
                <span className="font-semibold">{item.value}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-3">
            <div className="flex gap-3">
              <NavLink to="/user-dashboard/lend">
                <button
                  className="flex-1 px-4 py-3 border  font-medium 
              rounded-lg hover:bg-purple-50  htransition"
                >
                  Back
                </button>
              </NavLink>

              <NavLink to="/user-dashboard/lend/loan-details/pin">
                <button
                  className="flex-1 px-4 py-3 border bg-black text-white font-medium 
               rounded-lg hover:bg-gray-900 transition-shadow shadow-md w-96"
                >
                  Invest
                </button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoanDetails;
