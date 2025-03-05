import Details from "../components/contact/Details";
import SocialMedia from "../components/contact/SocialMedia";
import Footer from "../components/landing/Footer";
import Navbar from "../components/landing/Navbar";
import ContactForm from "./../components/contact/ContactForm";

function Contact() {
  return (
    <>
      <Navbar inContactOrAboutOrLearn={true} />
      <div className="text-gray-900 relative">
        <ContactForm />
        <Details />
        <SocialMedia />
        <Footer />
      </div>
    </>
  );
}

export default Contact;
