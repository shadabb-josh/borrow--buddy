function MissonVisionValues() {
  return (
    <>
      <section className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold text-gray-900">
            Our Principles
          </h2>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              {
                title: "Our Mission",
                text: "Creating a secure and seamless platform for peer-to-peer lending.",
              },
              {
                title: "Our Vision",
                text: "Enabling financial opportunities for all with transparency.",
              },
              {
                title: "Our Values",
                text: "Integrity, transparency, and innovation drive us forward.",
              },
            ].map((item, index) => (
              <div key={index} className="bg-gray-100 p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-medium text-gray-800">
                  {item.title}
                </h3>
                <p className="text-gray-700 mt-2">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default MissonVisionValues;
