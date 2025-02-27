import Action from "../components/about/Action";
import HeroSection from "../components/about/HeroSection";
import MissonVisionValues from "../components/about/MissonVisionValues";
import Team from "../components/about/Team";
import Footer from "../components/landing/Footer";
import Navbar from "./../components/landing/Navbar";

function About() {
  return (
    <div className="bg-gray-50 text-gray-800">
      <Navbar inContactOrAboutOrLearn={true} />
      <HeroSection />
      <MissonVisionValues />
      <Team />
      <Action />
      <Footer />
    </div>
  );
}

export default About;
