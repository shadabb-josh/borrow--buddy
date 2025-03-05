function HowOurPlatformWorks() {
  return (
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-3">How Our Platform Works</h3>
      <ol className="space-y-4">
        <li className="flex">
          <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 bg-white text-indigo-600 rounded-full font-bold mr-3">
            1
          </span>
          <div>
            <p className="font-medium">Create an account</p>
            <p className="text-indigo-100 text-sm">
              Simple verification process to protect all users
            </p>
          </div>
        </li>
        <li className="flex">
          <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 bg-white text-indigo-600 rounded-full font-bold mr-3">
            2
          </span>
          <div>
            <p className="font-medium">
              Lenders browse loan requests or borrowers create loan listings
            </p>
            <p className="text-indigo-100 text-sm">
              Customized search filters to find ideal matches
            </p>
          </div>
        </li>
        <li className="flex">
          <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 bg-white text-indigo-600 rounded-full font-bold mr-3">
            3
          </span>
          <div>
            <p className="font-medium">Secure funding and agreements</p>
            <p className="text-indigo-100 text-sm">
              All transactions protected by bank-level security
            </p>
          </div>
        </li>
        <li className="flex">
          <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 bg-white text-indigo-600 rounded-full font-bold mr-3">
            4
          </span>
          <div>
            <p className="font-medium">Repayments and tracking</p>
            <p className="text-indigo-100 text-sm">
              Easy-to-use dashboard monitors all activity
            </p>
          </div>
        </li>
      </ol>
    </div>
  );
}

export default HowOurPlatformWorks;
