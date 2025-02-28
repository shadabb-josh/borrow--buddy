import { NavLink } from "react-router-dom";

function HeroSection() {
  return (
    <>
      <section className="w-full py-24 text-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold leading-tight">
            Peer-to-Peer Lending Made Simple
          </h1>
          <p className="mt-4 text-lg">
            Invest in people, borrow from peers, and shape the future of
            finance.
          </p>
          <div className="mt-6 space-x-4">
            <NavLink to="/login">
              <button className="px-6 py-3 bg-white text-indigo-600 rounded-lg hover:bg-gray-200">
                Get Started
              </button>
            </NavLink>

            <NavLink
              className="px-6 py-3 border border-white rounded-lg hover:bg-white hover:text-indigo-600"
              to="learnmore"
            >
              Learn More
            </NavLink>
          </div>
        </div>
      </section>
    </>
  );
}

export default HeroSection;
