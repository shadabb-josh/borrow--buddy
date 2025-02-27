function JoinCommunity() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <h3 className="text-xl font-semibold text-gray-900 mb-3">
        Join the Community
      </h3>
      <p className="text-gray-600 mb-4">
        Ready to start your P2P lending journey? Join thousands of users already
        benefiting from our platform.
      </p>
      <div className="space-y-3">
        <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 px-4 rounded-md hover:from-indigo-700 hover:to-purple-700 transition-colors duration-300 font-medium">
          Create an Account
        </button>
      </div>
    </div>
  );
}

export default JoinCommunity;
