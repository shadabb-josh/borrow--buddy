import { NavLink } from "react-router-dom";

function LoginForm() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-6">
      {/* Back Button */}
      <NavLink to="/">
        <button className="absolute top-6 left-6 px-4 py-2 bg-black text-white rounded-lg shadow-md hover:opacity-90 transition">
          &larr; Back
        </button>
      </NavLink>

      {/* Form Container */}
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h4 className="text-2xl text-center text-gray-900">
          Login to Your Account
        </h4>
        <p className="text-gray-600 text-center mt-2">
          Access your lending and borrowing dashboard.
        </p>

        <form className="mt-6">
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-3 border rounded-lg focus:ring-black focus:border-black"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-3 border rounded-lg focus:ring-black focus:border-black"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="flex justify-between items-center mb-4">
            <a href="#" className="text-black hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full mt-4 px-6 py-3 bg-black text-white text-lg rounded-lg shadow-md hover:opacity-90 transition"
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
