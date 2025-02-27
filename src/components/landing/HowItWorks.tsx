import { DollarSign, PieChart, Shield } from "lucide-react"

function HowItWorks() {
  return (
    <>
     <section id="how-it-works" className="w-full py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold">How It Works</h2>
          <div className="grid gap-12 mt-10 sm:grid-cols-3">
            <div className="flex flex-col items-center">
              <DollarSign className="h-12 w-12 text-indigo-600" />
              <h3 className="mt-4 text-xl font-semibold">Create an Account</h3>
              <p className="text-gray-600">
                Sign up, complete your profile, and start lending or borrowing.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <Shield className="h-12 w-12 text-indigo-600" />
              <h3 className="mt-4 text-xl font-semibold">Choose Your Role</h3>
              <p className="text-gray-600">
                Lend funds to earn returns or borrow for personal or business needs.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <PieChart className="h-12 w-12 text-indigo-600" />
              <h3 className="mt-4 text-xl font-semibold">Start Transactions</h3>
              <p className="text-gray-600">
                Securely send and receive funds with full transparency.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default HowItWorks