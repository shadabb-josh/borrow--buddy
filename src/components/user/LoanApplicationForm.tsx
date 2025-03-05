import React from "react";

function LoanApplicationForm() {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-4 mt-10">
      {/* Form Container - made more compact */}
      <div className="bg-white p-5 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-xl font-bold text-center text-gray-900">
          Loan Application
        </h2>
        <p className="text-gray-600 text-center mt-1 text-sm">
          Fill in the details below to apply for your loan.
        </p>

        {/* Notes Box - made more compact */}
        <div className="mt-4 mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="text-md font-medium text-blue-800 mb-2">Important Notes:</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Loan amount must be between ₹500 and ₹50,000</li>
            <li>• Interest rates range from 9% to 12% per annum</li>
            <li>• Please select the most relevant purpose for your loan</li>
            <li>• Ensure the repayment date is achievable for your financial situation</li>
          </ul>
        </div>

        <form className="mt-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Loan Amount */}
            <div className="mb-3">
              <label className="block text-gray-700 text-xs font-medium mb-1">
                Loan Amount (₹)
              </label>
              <input
                type="number"
                min="500"
                max="50000"
                className="w-full p-2 border rounded-lg focus:ring-purple-500 focus:border-purple-500 text-sm"
                placeholder="₹500 - ₹50,000"
                defaultValue={25000}
                required
              />
            </div>

            {/* Interest Rate */}
            <div className="mb-3">
              <label className="block text-gray-700 text-xs font-medium mb-1">
                Interest Rate (% per annum)
              </label>
              <input
                type="number"
                step="0.1"
                min="9"
                max="12"
                className="w-full p-2 border rounded-lg focus:ring-purple-500 focus:border-purple-500 text-sm"
                placeholder="9% - 12%"
                defaultValue={9}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Loan Purpose */}
            <div className="mb-3">
              <label className="block text-gray-700 text-xs font-medium mb-1">
                Loan Purpose
              </label>
              <select
                className="w-full p-2 border rounded-lg focus:ring-purple-500 focus:border-purple-500 text-sm"
                required
              >
                <option value="">Select purpose</option>
                <option value="personal">Personal</option>
                <option value="education">Education</option>
                <option value="business">Business</option>
                <option value="emergency">Emergency</option>
                <option value="others">Others</option>
              </select>
            </div>

            {/* Repayment Date */}
            <div className="mb-3">
              <label className="block text-gray-700 text-xs font-medium mb-1">
                Repayment Until
              </label>
              <input
                type="date"
                className="w-full p-2 border rounded-lg focus:ring-purple-500 focus:border-purple-500 text-sm"
                defaultValue="2025-12-31"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-3 px-4 py-2 bg-black text-white font-bold text-sm rounded-lg shadow-md hover:opacity-90 transition"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoanApplicationForm;