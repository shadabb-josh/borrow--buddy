import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { useLoginMutation } from "./../../features/auth/authApi";
import { errorToast, infoToast, successToast } from "../../utils/toasts";
import { Eye, EyeOff } from "lucide-react";

type LoginFormInputs = {
  email: string;
  password: string;
};

function LoginForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const [login, { isLoading, isError, error, isSuccess, data }] =
    useLoginMutation();

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const onSubmit = async (formData: LoginFormInputs) => {
    await login(formData);
    reset();
  };

  useEffect(() => {
    if (isLoading) {
      infoToast("Please Wait....");
    }
  }, [isLoading]);

  useEffect(() => {
    if (isSuccess && data) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", String(data.id));
      successToast("Login Success, redirecting.....", () => {
        navigate("/user-dashboard", { replace: true });
      });
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError) {
      errorToast((error as any).data?.error);
    }
  }, [isError]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-6">
      <NavLink to="/">
        <button className="absolute top-6 left-6 px-4 py-2 bg-black text-white rounded-lg shadow-md hover:opacity-90 transition">
          &larr; Back
        </button>
      </NavLink>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h4 className="text-2xl text-center text-gray-900">
          Login to Your Account
        </h4>
        <p className="text-gray-600 text-center mt-2">
          Access your lending and borrowing dashboard.
        </p>

        <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Email Input */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email", { required: "Email is required" })}
              className="w-full p-3 border rounded-lg focus:ring-black focus:border-black"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password Input with Toggle */}
          <div className="mb-4 relative">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                {...register("password", { required: "Password is required" })}
                className="w-full p-3 border rounded-lg focus:ring-black focus:border-black pr-10"
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="absolute top-3 right-3 text-gray-500 hover:text-black"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full mt-4 px-6 py-3 bg-black text-white text-lg rounded-lg shadow-md hover:opacity-90 transition"
            disabled={isLoading}
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Don't have an account?{" "}
          <NavLink to="/signup" className="text-black hover:underline">
            Register
          </NavLink>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
