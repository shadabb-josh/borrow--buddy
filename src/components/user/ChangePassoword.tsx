import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { CheckCircle, LockKeyhole, Eye, EyeOff } from "lucide-react";
import { useChangePasswordMutation } from "../../features/user/userApi";
import { errorToast, successToast } from "../../utils/toasts";

interface PasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

function ChangePassword() {
  const [changePassword, { isLoading, isError, error, isSuccess }] =
    useChangePasswordMutation();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<PasswordForm>();

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const togglePasswordVisibility = (field: "current" | "new" | "confirm") => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const onSubmit = async (data: PasswordForm) => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    try {
      await changePassword({
        id: Number(userId),
        token: token,
        body: {
          old_password: data.currentPassword,
          new_password: data.newPassword,
        },
      }).unwrap();
      successToast("Password Changed Successfully");
      reset();
    } catch (err: any) {}
  };

  useEffect(() => {
    if (isError && error?.data?.errors) {
      errorToast(error.data.errors);
      reset();
    }
  }, [isError, error]);

  return (
    <div className="bg-white p-4 md:p-8 rounded-lg shadow-md hover:shadow-lg transition">
      <h3 className="text-lg md:text-xl text-black mb-4 flex items-center gap-2">
        <LockKeyhole size={22} /> Change Password
      </h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Current Password */}
        <div className="relative">
          <span className="absolute left-3 top-2.5 text-gray-500">
            <LockKeyhole size={18} />
          </span>
          <input
            type={showPassword.current ? "text" : "password"}
            placeholder="Current Password"
            className="w-full pl-10 pr-10 px-4 py-2 border rounded-lg text-sm"
            {...register("currentPassword", {
              required: "Current password is required",
            })}
          />
          <button
            type="button"
            className="absolute right-3 top-2.5 text-gray-500"
            onClick={() => togglePasswordVisibility("current")}
          >
            {showPassword.current ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
          {errors.currentPassword && (
            <p className="text-red-500 text-xs mt-1">
              {errors.currentPassword.message}
            </p>
          )}
        </div>

        {/* New Password */}
        <div className="relative">
          <span className="absolute left-3 top-2.5 text-gray-500">
            <LockKeyhole size={18} />
          </span>
          <input
            type={showPassword.new ? "text" : "password"}
            placeholder="New Password"
            className="w-full pl-10 pr-10 px-4 py-2 border rounded-lg text-sm"
            {...register("newPassword", {
              required: "New password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          <button
            type="button"
            className="absolute right-3 top-2.5 text-gray-500"
            onClick={() => togglePasswordVisibility("new")}
          >
            {showPassword.new ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
          {errors.newPassword && (
            <p className="text-red-500 text-xs mt-1">
              {errors.newPassword.message}
            </p>
          )}
        </div>

        {/* Confirm New Password */}
        <div className="relative">
          <span className="absolute left-3 top-2.5 text-gray-500">
            <LockKeyhole size={18} />
          </span>
          <input
            type={showPassword.confirm ? "text" : "password"}
            placeholder="Confirm New Password"
            className="w-full pl-10 pr-10 px-4 py-2 border rounded-lg text-sm"
            {...register("confirmPassword", {
              required: "Please confirm your new password",
              validate: (value) =>
                value === watch("newPassword") || "Passwords do not match",
            })}
          />
          <button
            type="button"
            className="absolute right-3 top-2.5 text-gray-500"
            onClick={() => togglePasswordVisibility("confirm")}
          >
            {showPassword.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition flex items-center justify-center gap-2 text-sm disabled:opacity-50"
          disabled={isLoading}
        >
          <CheckCircle size={18} />
          {isLoading ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
}

export default ChangePassword;
