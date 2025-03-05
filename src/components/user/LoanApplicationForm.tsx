import { useForm } from "react-hook-form";
import { useLoanApplicationMutation } from "../../features/loan/loanApi";
import { errorToast, successToast } from "../../utils/toasts";

interface LoanFormData {
  borrower_id: number;
  lender_id: number;
  amount: number;
  interest: number;
  purpose: string;
  repayment_till: string;
}

function LoanApplicationForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoanFormData>();

  const [loanApplication, { isLoading }] = useLoanApplicationMutation();

  const onSubmit = async (data: LoanFormData) => {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      const requestBody = {
        ...data,
        borrower_id: Number(userId),
      };

      await loanApplication({
        body: requestBody,
        token,
      }).unwrap();
      reset();
      successToast("Form submited successfully...");
    } catch (err) {
      errorToast("Something went wrong, Try Again...");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-4 py-4 mt-10">
      <div className="bg-white p-5 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-xl font-bold text-center text-gray-900">
          Loan Application
        </h2>
        <p className="text-gray-600 text-center mt-1 text-sm">
          Fill in the details below to apply for your loan.
        </p>

        <div className="mt-4 mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="text-md font-medium text-blue-800 mb-2">
            Important Notes:
          </h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Loan amount must be between ₹500 and ₹50,000</li>
            <li>• Interest rates range from 9% to 12% per annum</li>
            <li>• Please select the most relevant purpose for your loan</li>
            <li>
              • Ensure the repayment date is achievable for your financial
              situation
            </li>
          </ul>
        </div>

        <form className="mt-3" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="mb-3">
              <label className="block text-gray-700 text-xs font-medium mb-1">
                Loan Amount (₹)
              </label>
              <input
                type="number"
                {...register("amount", {
                  required: "Amount is required",
                  min: 500,
                  max: 50000,
                })}
                className="w-full p-2 border rounded-lg focus:ring-purple-500 focus:border-purple-500 text-sm"
                placeholder="₹500 - ₹50,000"
              />
              {errors.amount && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.amount.message}
                </p>
              )}
            </div>

            <div className="mb-3">
              <label className="block text-gray-700 text-xs font-medium mb-1">
                Interest Rate (% per annum)
              </label>
              <input
                type="number"
                {...register("interest", {
                  required: "Interest rate is required",
                  min: { value: 9, message: "Minimum interest rate is 9%" },
                  max: { value: 12, message: "Maximum interest rate is 12%" },
                  pattern: {
                    value: /^\d{1,2}$/, // Ensures only a one or two-digit number
                    message: "Only a one or two-digit number is allowed",
                  },
                })}
                className="w-full p-2 border rounded-lg focus:ring-purple-500 focus:border-purple-500 text-sm"
                placeholder="9% - 12%"
              />
              {errors.interest && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.interest.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="mb-3">
              <label className="block text-gray-700 text-xs font-medium mb-1">
                Loan Purpose
              </label>
              <select
                {...register("purpose", {
                  required: "Please select a purpose",
                })}
                className="w-full p-2 border rounded-lg focus:ring-purple-500 focus:border-purple-500 text-sm"
              >
                <option value="">Select purpose</option>
                <option value="Home Renovation">Home Renovation</option>
                <option value="Personal">Personal</option>
                <option value="Education">Education</option>
                <option value="Business">Business</option>
                <option value="Emergency">Emergency</option>
                <option value="Others">Others</option>
              </select>
              {errors.purpose && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.purpose.message}
                </p>
              )}
            </div>

            <div className="mb-3">
              <label className="block text-gray-700 text-xs font-medium mb-1">
                Repayment Until
              </label>
              <input
                type="date"
                {...register("repayment_till", {
                  required: "Repayment date is required",
                })}
                className="w-full p-2 border rounded-lg focus:ring-purple-500 focus:border-purple-500 text-sm"
                min={new Date().toISOString().split("T")[0]} // Prevent past dates
              />
              {errors.repayment_till && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.repayment_till.message}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-3 px-4 py-2 bg-black text-white font-bold text-sm rounded-lg shadow-md hover:opacity-90 transition"
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit Application"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoanApplicationForm;
