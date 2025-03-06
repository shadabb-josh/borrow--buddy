import { useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { errorToast, successToast } from "../../utils/toasts";
import { Eye, EyeOff } from "lucide-react";

type LoginFormInputs = {
  username: string;
  password: string;
};

function AdminLogin() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (formData: LoginFormInputs) => {
    setIsLoading(true);
    try {
      console.log(formData);
      const response = await fetch("http://127.0.0.1:3000/auth/admin-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        errorToast("Login Failed!");
        return;
      }

      localStorage.setItem("token", data.token);

      reset();
      successToast("Login Successful, redirecting...", () => {
        navigate("/admin-dashboard", { replace: true });
      });
    } catch (error: any) {
      errorToast(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-6">
      <NavLink to="/">
        <button className="absolute top-6 left-6 px-4 py-2 bg-black text-white rounded-lg shadow-md hover:opacity-90 transition">
          &larr; Back
        </button>
      </NavLink>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h4 className="text-2xl text-center text-gray-900">Admin Login</h4>
        <p className="text-gray-600 text-center mt-2">
          Access to BorrowBuddy Dashboard
        </p>

        <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Username Input */}
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              {...register("username", { required: "Username is required" })}
              className="w-full p-3 border rounded-lg focus:ring-black focus:border-black"
              placeholder="Enter your username"
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username.message}</p>
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
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
