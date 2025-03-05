import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  UserDetailsFormData,
  UserDetailsSubmitData,
} from "../../features/user/userTypes";
import { useUpdateMutation } from "../../features/user/userApi";
import { useEffect } from "react";
import { errorToast, infoToast, successToast } from "../../utils/toasts";

function UserDetailsForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UserDetailsFormData>();
  const navigate = useNavigate();
  const [update, { isLoading, isError, isSuccess, data, error }] =
    useUpdateMutation();

  const onSubmit = async (data: UserDetailsFormData) => {
    const submitData: UserDetailsSubmitData = {
      first_name: data.firstName,
      last_name: data.lastName,
      pan_number: data.pan,
      adhaar_number: data.aadhaar,
      account_number: data.accountNumber,
      ifsc: data.ifsc,
      pin: data.pin,
      balance: 100000.0,
      status: "active",
    };
    const userId = localStorage.getItem("userId");
    if (!userId) {
      errorToast("User ID not found");
      return;
    }

    await update({ userId, data: submitData });
  };

  useEffect(() => {
    if (isLoading) infoToast("Submitting details...");
    if (isSuccess && data)
      successToast("Submission successful! Redirecting...", () => {
        navigate("/login", { replace: true });
      });
    if (isError)
      errorToast(
        (error as any)?.data?.errors || "Submission failed. Try again."
      );
  }, [isLoading, isSuccess, isError, error, data]);

  // Common input class to ensure consistent width
  const inputClass = "w-full p-3 border rounded-lg";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      {/* Back Button */}
      <NavLink to="/">
        <button className="absolute top-6 left-6 px-3 py-2 bg-black text-white rounded-lg shadow-md hover:opacity-90 transition">
          &larr; Back
        </button>
      </NavLink>

      {/* Form Container */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="font-bold text-center text-gray-900">
          User Account Registration
        </h2>
        <p className="text-gray-600 text-center mt-2 text-sm">
          Fill in your details carefully to start lending and borrowing.
        </p>

        <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
          {/* First Row: First Name, Last Name, PAN */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 text-sm font-medium">
                First Name
              </label>
              <input
                {...register("firstName", {
                  required: "First Name is required",
                })}
                type="text"
                className={inputClass}
                placeholder="Enter your first name"
              />
              {errors.firstName && (
                <small className="text-red-500">
                  {(errors.firstName as any).message}
                </small>
              )}
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium">
                Last Name
              </label>
              <input
                {...register("lastName", { required: "Last Name is required" })}
                type="text"
                className={inputClass}
                placeholder="Enter your last name"
              />
              {errors.lastName && (
                <small className="text-red-500">
                  {(errors.lastName as any).message}
                </small>
              )}
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium">
                PAN Number
              </label>
              <input
                {...register("pan", {
                  required: "PAN is required",
                  pattern: {
                    value: /^[A-Z]{5}[0-9]{4}[A-Z]$/,
                    message: "Invalid PAN format",
                  },
                })}
                type="text"
                className={inputClass}
                placeholder="Enter PAN Number"
                maxLength={10}
              />
              {errors.pan && (
                <small className="text-red-500">
                  {(errors.pan as any).message}
                </small>
              )}
            </div>
          </div>

          {/* Second Row: PAN Confirm, AADHAAR, AADHAAR Confirm */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 text-sm font-medium">
                Confirm PAN Number
              </label>
              <input
                {...register("panConfirm", {
                  required: "Confirm PAN is required",
                  validate: (value) =>
                    value === watch("pan") || "PAN does not match",
                })}
                type="text"
                className={inputClass}
                maxLength={10}
                placeholder="Re-enter PAN Number"
              />
              {errors.panConfirm && (
                <small className="text-red-500">
                  {(errors.panConfirm as any).message}
                </small>
              )}
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium">
                AADHAAR Number
              </label>
              <input
                {...register("aadhaar", {
                  required: "Aadhaar is required",
                  pattern: {
                    value: /^[0-9]{12}$/,
                    message: "Aadhaar must be a 12-digit number",
                  },
                })}
                type="text"
                inputMode="numeric"
                maxLength={12}
                className="w-full p-3 border rounded-lg"
                placeholder="Enter Aadhaar Number"
              />

              {errors.aadhaar && (
                <small className="text-red-500">
                  {(errors.aadhaar as any).message}
                </small>
              )}
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium">
                Confirm AADHAAR Number
              </label>
              <input
                {...register("aadhaarConfirm", {
                  required: "Confirm AADHAAR is required",
                  validate: (value) =>
                    value === watch("aadhaar") || "AADHAAR does not match",
                })}
                type="text"
                className={inputClass}
                maxLength={12}
                placeholder="Re-enter AADHAAR Number"
              />
              {errors.aadhaarConfirm && (
                <small className="text-red-500">
                  {(errors.aadhaarConfirm as any).message}
                </small>
              )}
            </div>
          </div>

          {/* Third Row: Account Number, Account Confirm, IFSC */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 text-sm font-medium">
                Account Number
              </label>
              <input
                {...register("accountNumber", {
                  pattern: {
                    value: /^[0-9]{9,18}$/,
                    message: "Invalid Account Number",
                  },
                  required: "Account Number is required",
                })}
                type="text"
                className={inputClass}
                placeholder="Enter Account Number"
                minLength={9}
                maxLength={18}
              />
              {errors.accountNumber && (
                <small className="text-red-500">
                  {(errors.accountNumber as any).message}
                </small>
              )}
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium">
                Confirm Account Number
              </label>
              <input
                {...register("accountNumberConfirm", {
                  required: "Confirm Account Number is required",
                  validate: (value) =>
                    value === watch("accountNumber") ||
                    "Account Number does not match",
                })}
                type="text"
                className={inputClass}
                minLength={9}
                maxLength={18}
                placeholder="Re-enter Account Number"
              />
              {errors.accountNumberConfirm && (
                <small className="text-red-500">
                  {(errors.accountNumberConfirm as any).message}
                </small>
              )}
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium">
                IFSC Code
              </label>
              <input
                {...register("ifsc", {
                  required: "IFSC is required",
                  pattern: {
                    value: /^[A-Z]{4}0[A-Z0-9]{6}$/,
                    message: "Invalid IFSC format (e.g., SBIN0001234)",
                  },
                })}
                type="text"
                className="w-full p-3 border rounded-lg uppercase"
                placeholder="Enter IFSC Code"
                maxLength={11} // Restrict input to 11 characters
              />

              {errors.ifsc && (
                <small className="text-red-500">
                  {(errors.ifsc as any).message}
                </small>
              )}
            </div>
          </div>

          {/* Fourth Row: IFSC Confirm, PIN, PIN Confirm */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 text-sm font-medium">
                Confirm IFSC Code
              </label>
              <input
                {...register("ifscConfirm", {
                  required: "Confirm IFSC is required",
                  validate: (value) =>
                    value === watch("ifsc") || "IFSC does not match",
                })}
                type="text"
                className={inputClass}
                placeholder="Re-enter IFSC Code"
              />
              {errors.ifscConfirm && (
                <small className="text-red-500">
                  {(errors.ifscConfirm as any).message}
                </small>
              )}
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium">
                PIN
              </label>
              <input
                {...register("pin", {
                  required: "PIN is required",
                  minLength: {
                    value: 4,
                    message: "PIN must be at least 4 digits",
                  },
                })}
                type="password"
                className={inputClass}
                maxLength={4}
                placeholder="Set a secure PIN"
              />
              {errors.pin && (
                <small className="text-red-500">
                  {(errors.pin as any).message}
                </small>
              )}
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium">
                Confirm PIN
              </label>
              <input
                {...register("pinConfirm", {
                  required: "Confirm PIN is required",
                  validate: (value) =>
                    value === watch("pin") || "PINs do not match",
                })}
                type="password"
                className={inputClass}
                placeholder="Re-enter your PIN"
                maxLength={4}
              />
              {errors.pinConfirm && (
                <small className="text-red-500">
                  {(errors.pinConfirm as any).message}
                </small>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-4 px-6 py-3 bg-black text-white text-lg rounded-lg shadow-md hover:opacity-90 transition"
          >
            Submit Details
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserDetailsForm;
