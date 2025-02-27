import { NavLink } from "react-router-dom";

interface NavbarProps {
  inContactOrAboutOrLearn: boolean;
}

function Navbar({ inContactOrAboutOrLearn }: NavbarProps) {
  return (
    <>
      <header className="px-6 lg:px-12 h-20 flex items-center justify-between bg-white shadow-md">
        <NavLink
          className="flex items-center text-2xl font-bold text-indigo-600"
          to="/"
        >
          <span className="ml-2">BorrowBuddy</span>
        </NavLink>

        <nav className="hidden md:flex space-x-6">
          {inContactOrAboutOrLearn ? (
            <>
              <NavLink className="hover:text-indigo-600" to="/">
                Home
              </NavLink>
              <NavLink className="hover:text-indigo-600" to="/about">
                About Us
              </NavLink>
              <NavLink className="hover:text-indigo-600" to="/contact">
                Contact Us
              </NavLink>
            </>
          ) : (
            <>
              <NavLink className="hover:text-indigo-600" to="/about">
                About Us
              </NavLink>
              <NavLink className="hover:text-indigo-600" to="/contact">
                Contact Us
              </NavLink>
              <a className="hover:text-indigo-600" href="#features">
                Features
              </a>
              <a className="hover:text-indigo-600" href="#benefits">
                Benefits
              </a>
              <a className="hover:text-indigo-600" href="#how-it-works">
                How It Works
              </a>
            </>
          )}
        </nav>
        <button className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-white-600">
          Get Started
        </button>
      </header>
    </>
  );
}

export default Navbar;
