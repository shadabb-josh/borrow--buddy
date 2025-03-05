import { NavLink } from "react-router-dom";

function UserDetailsForm() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      {/* Back Button */}
      <NavLink to="/">
        <button className="absolute top-6 left-6 px-3 py-2 bg-black text-white rounded-lg shadow-md hover:opacity-90 transition">
          &larr; Back
        </button>
      </NavLink>

      {/* Form Container */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
        <h2 className="text-2xl font-bold text-center text-gray-900">
          User Account Registration
        </h2>
        <p className="text-gray-600 text-center mt-2 text-sm">
          Fill in your details carefully to start lending and borrowing.
        </p>

        <form className="mt-6">
          {/* First & Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 text-sm font-medium">
                First Name
              </label>
              <input
                type="text"
                className="w-full p-3 border rounded-lg focus:ring-purple-500 focus:border-purple-500 text-base"
                placeholder="Enter your first name"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium">
                Last Name
              </label>
              <input
                type="text"
                className="w-full p-3 border rounded-lg focus:ring-purple-500 focus:border-purple-500 text-base"
                placeholder="Enter your last name"
                required
              />
            </div>
          </div>

          {/* PAN & Aadhaar Number with Confirmation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 text-sm font-medium">
                PAN Number
              </label>
              <input
                type="text"
                className="w-full p-3 border rounded-lg focus:ring-purple-500 focus:border-purple-500 text-base"
                placeholder="Enter PAN Number"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium">
                Confirm PAN Number
              </label>
              <input
                type="text"
                className="w-full p-3 border rounded-lg focus:ring-purple-500 focus:border-purple-500 text-base"
                placeholder="Re-enter PAN Number"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 text-sm font-medium">
                Aadhaar Number
              </label>
              <input
                type="text"
                className="w-full p-3 border rounded-lg focus:ring-purple-500 focus:border-purple-500 text-base"
                placeholder="Enter Aadhaar Number"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium">
                Confirm Aadhaar Number
              </label>
              <input
                type="text"
                className="w-full p-3 border rounded-lg focus:ring-purple-500 focus:border-purple-500 text-base"
                placeholder="Re-enter Aadhaar Number"
                required
              />
            </div>
          </div>

          {/* Account Number & IFSC with Confirmation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 text-sm font-medium">
                Account Number
              </label>
              <input
                type="text"
                className="w-full p-3 border rounded-lg focus:ring-purple-500 focus:border-purple-500 text-base"
                placeholder="Enter Account Number"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium">
                Confirm Account Number
              </label>
              <input
                type="text"
                className="w-full p-3 border rounded-lg focus:ring-purple-500 focus:border-purple-500 text-base"
                placeholder="Re-enter Account Number"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 text-sm font-medium">
                IFSC Code
              </label>
              <input
                type="text"
                className="w-full p-3 border rounded-lg focus:ring-purple-500 focus:border-purple-500 text-base"
                placeholder="Enter IFSC Code"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium">
                Confirm IFSC Code
              </label>
              <input
                type="text"
                className="w-full p-3 border rounded-lg focus:ring-purple-500 focus:border-purple-500 text-base"
                placeholder="Re-enter IFSC Code"
                required
              />
            </div>
          </div>

          {/* PIN & Re-PIN */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 text-sm font-medium">
                PIN
              </label>
              <input
                type="password"
                className="w-full p-3 border rounded-lg focus:ring-purple-500 focus:border-purple-500 text-base"
                placeholder="Set a secure PIN"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium">
                Confirm PIN
              </label>
              <input
                type="password"
                className="w-full p-3 border rounded-lg focus:ring-purple-500 focus:border-purple-500 text-base"
                placeholder="Re-enter your PIN"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-4 px-6 py-3 bg-black text-white font-bold text-lg rounded-lg shadow-md hover:opacity-90 transition"
          >
            Submit Details
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserDetailsForm;
