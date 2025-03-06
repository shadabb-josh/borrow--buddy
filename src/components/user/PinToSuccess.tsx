import { useState, useRef, useEffect } from "react";
import { CheckCircle, Lock } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  useDoPaymentMutation,
  useGetLoanByIdQuery,
  useUpdateLoanStatusMutation,
} from "../../features/loan/loanApi";
import { RootState } from "../../app/store";
import { errorToast } from "../../utils/toasts";
import { setLoan } from "../../features/loan/loanSlice";

interface PinToSuccessFormProps {
  repayment: boolean;
}

export default function PinToSuccessForm({ repayment }: PinToSuccessFormProps) {
  const [pin, setPin] = useState<string[]>(["", "", "", ""]);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const { id } = useParams();
  console.log("ID : " + id);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const dispatch = useDispatch();

  const loan = useSelector((state: RootState) => state.loan.loan);

  // Fetch Loan Data if repayment is true
  const { data, isError } = useGetLoanByIdQuery(
    { id, token },
    { skip: !repayment }
  );
  useEffect(() => {
    if (data) {
      dispatch(setLoan(data));
    }
  }, [data, dispatch]);

  // Handle API Error
  useEffect(() => {
    if (isError) {
      errorToast("Failed to fetch loan details!");
    }
  }, [isError]);

  const [doPayment, { error }] = useDoPaymentMutation();
  const [updateLoanStatus] = useUpdateLoanStatusMutation();

  useEffect(() => {
    if (error) {
      errorToast((error as any)?.data?.errors || "Something went wrong!");
      setPin(["", "", "", ""]);
    }
  }, [error]);

  const handleChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;

    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    if (value !== "" && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }

    if (newPin.every((digit) => digit !== "")) {
      handlePayment(newPin.join(""));
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && pin[index] === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePayment = async (finalPin: string) => {
    if (finalPin.length !== 4 || !loan) return;
    let amount = loan.amount + loan.expected_return + loan.platform_fee;

    const paymentBody = {
      sender_id: Number(userId),
      receiver_id: repayment ? loan.lender_id : loan.borrower_id,
      loan_id: loan.id,
      amount: repayment ? amount : loan.amount,
      entered_pin: finalPin,
    };

    const updateLoan = repayment
      ? { status: "repaid" }
      : {
          lender_id: userId,
          status: "funded",
        };

    const loanId = repayment ? id : loan.id;

    setIsVerifying(true);
    try {
      await doPayment({ body: paymentBody, token }).unwrap();
      await updateLoanStatus({ id: loanId, body: updateLoan, token });
      setIsSuccess(true);
    } catch (error) {
      console.log(error);
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center mt-20">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-500">
        <div
          className={`${
            isSuccess ? "bg-green-600" : "bg-black"
          } text-white p-6`}
        >
          {isSuccess ? (
            <>
              <CheckCircle size={48} className="mx-auto" />
              <h1 className="text-2xl text-center font-semibold">
                Payment Successful
              </h1>
              <p className="mt-1 text-sm text-center">
                Transaction completed securely
              </p>
            </>
          ) : (
            <>
              <Lock size={24} className="mx-auto" />
              <h1 className="text-2xl text-center">Secure Verification</h1>
              <p className="mt-1 text-sm text-center">
                Please enter your 4-digit PIN
              </p>
            </>
          )}
        </div>

        <div className="p-8 min-h-64">
          {isSuccess ? (
            <div className="animate-fadeIn">
              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-500">Amount Paid</span>
                  <span className="text-2xl font-bold">
                    ₹
                    {repayment
                      ? (
                          loan?.amount +
                          loan?.expected_return +
                          loan?.platform_fee
                        ).toFixed(2)
                      : loan?.amount}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-500">Date</span>
                  <span className="text-gray-800">
                    {new Date().toLocaleDateString()}
                  </span>
                </div>
                <div className="h-px bg-gray-200 my-4"></div>
                <div className="bg-green-50 p-4 rounded-lg flex items-center">
                  <CheckCircle className="text-green-500 mr-3" size={20} />
                  <p className="text-green-700 text-sm">
                    Your payment has been processed successfully
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="flex justify-center mb-6 gap-3">
                {pin.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="password"
                    className="w-14 h-16 text-center text-2xl border-2 rounded-lg bg-gray-50 focus:ring-2 focus:border-black outline-none"
                    maxLength={1}
                    inputMode="numeric"
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    disabled={isVerifying}
                  />
                ))}
              </div>
              <button
                disabled={isVerifying}
                className={`w-full px-4 py-3 text-white font-medium rounded-lg shadow-md flex items-center justify-center ${
                  isVerifying
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-black hover:bg-gray-800"
                }`}
              >
                {isVerifying ? "Processing..." : "Verify PIN"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
