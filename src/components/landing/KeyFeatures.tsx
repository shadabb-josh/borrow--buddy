import { Shield, Users, PieChart } from "lucide-react";

function KeyFeatures() {
  return (
    <>
     <section id="features" className="w-full py-24 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold">Key Features</h2>
          <div className="grid gap-12 mt-10 sm:grid-cols-3">
            <div className="flex flex-col items-center">
              <Shield className="h-12 w-12 text-indigo-600" />
              <h3 className="mt-4 text-xl font-semibold">
                Secure Transactions
              </h3>
              <p className="text-gray-600">
                Top-tier encryption ensures your investments remain safe.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <Users className="h-12 w-12 text-indigo-600" />
              <h3 className="mt-4 text-xl font-semibold">Diverse Lending</h3>
              <p className="text-gray-600">
                Choose from various borrowers and loan types.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <PieChart className="h-12 w-12 text-indigo-600" />
              <h3 className="mt-4 text-xl font-semibold">Transparent Fees</h3>
              <p className="text-gray-600">
                Clear and fair pricing with no hidden charges.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default KeyFeatures