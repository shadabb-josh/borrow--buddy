import Footer from "../components/landing/Footer";
import Navbar from "../components/landing/Navbar";
import LearnMoreLayout from "../components/learnMore/LearnMoreLayout";

function LearnMore() {
  return (
    <>
      <Navbar inContactOrAboutOrLearn={true} />
      <LearnMoreLayout />
      <Footer />
    </>
  );
}

export default LearnMore;
