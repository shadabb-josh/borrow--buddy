import Actions from "../components/landing/Actions";
import Benifits from "../components/landing/Benifits";
import Footer from "../components/landing/Footer";
import HeroSection from "../components/landing/HeroSection";
import HowItWorks from "../components/landing/HowItWorks";
import KeyFeatures from "../components/landing/KeyFeatures";
import Navbar from "../components/landing/Navbar";

function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
      <Navbar inContactOrAboutOrLearn={false} />
      <HeroSection />
      <KeyFeatures />
      <Benifits />
      <HowItWorks />
      <Actions />
      <Footer />
    </div>
  );
}

export default Home;
