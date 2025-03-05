interface Team {
  name: string;
  designation: string;
}

function Team() {
  const team: Array<Team> = [
    { name: "Shadab Shikalgar", designation: "Intern" },
    { name: "Shubham Nagpure", designation: "Software Engineer" },
    { name: "Shivprasad Bhele", designation: "Software Engineer" },
  ];
  return (
    <>
      <section className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold text-gray-900">
            Meet Our Team
          </h2>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-gray-100 p-6 rounded-xl shadow-lg">
                <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto">
                  <img src="https://randomuser.me/api/portraits/men/1.jpg" className="rounded-full" alt="" />
                </div>
                <h3 className="mt-4 text-xl font-medium text-gray-800">
                  {member.name}
                </h3>
                <p className="text-gray-600">{member.designation}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Team;
