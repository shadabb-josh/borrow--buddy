function InfoCard() {
  return (
    <div>
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          What is Peer-to-Peer Lending?
        </h3>
        <p className="text-gray-600">
          Peer-to-peer lending removes traditional financial intermediaries like
          banks, allowing individuals to borrow and lend money directly to each
          other. This creates a more efficient marketplace with better rates for
          both parties.
        </p>
        <div className="mt-4 p-4 bg-indigo-50 rounded-md border border-indigo-100">
          <p className="text-gray-700 font-medium">
            Our platform has facilitated over ₹70 crore in loans since
            launching, helping thousands of people achieve their financial
            goals.
          </p>
        </div>
      </div>
    </div>
  );
}

export default InfoCard;
