function Benifits() {
  return (
    <>
      <section id="benefits" className="w-full py-24 bg-gray-100">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center">Benefits</h2>
          <div className="grid gap-12 mt-10 sm:grid-cols-2">
            <div>
              <h3 className="text-2xl font-bold text-indigo-600">
                For Lenders
              </h3>
              <ul className="mt-4 space-y-2 text-gray-700">
                <li>✔ Higher returns than traditional savings</li>
                <li>✔ Diversify your investments</li>
                <li>✔ Support individuals and small businesses</li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-indigo-600">
                For Borrowers
              </h3>
              <ul className="mt-4 space-y-2 text-gray-700">
                <li>✔ Competitive interest rates</li>
                <li>✔ Quick and easy application</li>
                <li>✔ Flexible loan terms</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Benifits;
