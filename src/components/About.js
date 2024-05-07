import React from "react";

const About = () => {
  return (
    <div className="bg-cover bg-center w-full h-screen" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=1912&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}>
      
      <div className="text-center mx-auto max-w-[50%] ">
  <p className="text-3xl font-bold mt-2 mb-4 font-sans">About Us</p>
  <h1 className="text-2xl mt-12 mb-4 font-sans">Empower Giving, Ensure Impact</h1>
  <p className="mb-12 font-sans">
    de-Caritas is a revolutionary platform dedicated to enhancing transparency and accountability in charitable donations through the power of blockchain technology. Our mission is to empower donors, NGOs, and beneficiaries alike by providing a secure and immutable platform for tracking donations every step of the way.
  </p>
  <p className="mb-4 font-sans">
    <h3 className="text-lg font-semibold mb-2 font-sans">Our Vision</h3>
    At de-Caritas, we envision a world where every donation is traceable, accountable, and impactful. By leveraging blockchain technology, we aim to revolutionize the way charitable giving is managed and perceived, fostering trust and transparency within the global philanthropic community.
  </p>
  <div>
    <button className="bg-orange-500 text-white px-4 py-2 rounded-md">Learn More</button>
  </div>
</div>

    </div>
  );
};

export default About;
