function SafetyMeasures() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
    <h3 className="text-xl font-semibold text-gray-900 mb-3">
      Our Safety Measures
    </h3>
    <div className="space-y-4">
      <div className="flex items-start">
        <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 text-indigo-600 rounded-md flex items-center justify-center">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            ></path>
          </svg>
        </div>
        <div className="ml-4">
          <h4 className="text-md font-medium text-gray-900">
            Identity Verification
          </h4>
          <p className="text-sm text-gray-500">
            All users undergo strict verification to prevent fraud
          </p>
        </div>
      </div>
      <div className="flex items-start">
        <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 text-indigo-600 rounded-md flex items-center justify-center">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            ></path>
          </svg>
        </div>
        <div className="ml-4">
          <h4 className="text-md font-medium text-gray-900">
            Secure Transactions
          </h4>
          <p className="text-sm text-gray-500">
            Bank-level encryption for all financial operations
          </p>
        </div>
      </div>
      <div className="flex items-start">
        <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 text-indigo-600 rounded-md flex items-center justify-center">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
            ></path>
          </svg>
        </div>
        <div className="ml-4">
          <h4 className="text-md font-medium text-gray-900">
            Legal Compliance
          </h4>
          <p className="text-sm text-gray-500">
            All transactions adhere to financial regulations
          </p>
        </div>
      </div>
    </div>
  </div>
  )
}

export default SafetyMeasures