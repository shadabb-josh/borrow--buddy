function ContactForm() {
  return (
    <>
      <section className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-8">
        {/* Left Side - Big Contact Us Text */}
        <div>
          <h1 className="text-6xl font-extrabold text-black leading-tight">
            Contact Us
          </h1>
          <p className="text-lg text-gray-600 mt-4">
            We'd love to hear from you! Whether you have a question, feedback,
            or just want to say hello, reach out to us.
          </p>
        </div>

        {/* Right Side - Form */}
        <div className="bg-white p-8 rounded-xl shadow-xl border border-gray-200">
          <h2 className="text-2xl font-semibold text-black text-center">
            Send Us a Message
          </h2>
          <form className="mt-6">
            <div className="mb-4">
              <label className="block text-gray-800 font-medium">Name</label>
              <input
                type="text"
                className="w-full mt-2 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:outline-none"
                placeholder="Your Name"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-800 font-medium">Email</label>
              <input
                type="email"
                className="w-full mt-2 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:outline-none"
                placeholder="Your Email"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-800 font-medium">Message</label>
              <textarea
                className="w-full mt-2 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:outline-none"
                rows="4"
                placeholder="Your Message"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition duration-300 shadow-md flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
              Send Message
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

export default ContactForm;
