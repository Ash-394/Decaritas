import React from "react";

const About = () => {
  return (
    <div className="about-section-container bg-cover bg-center w-full h-screen" style={{ backgroundImage: "url('https://images.pexels.com/photos/7135057/pexels-photo-7135057.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')" }}>
      <div className="about-background-image-container">

      </div>
      <div className="about-section-image-container">

      </div>
      <div className="about-section-text-container">
        <p className="primary-subheading">About</p>
        <h1 className="primary-heading">
          Empower Giving, Ensure Impact
        </h1>
        <p className="primary-text">
          de-Caritas is a revolutionary platform dedicated to enhancing transparency and accountability in charitable donations through the power of blockchain technology. Our mission is to empower donors, NGOs, and beneficiaries alike by providing a secure and immutable platform for tracking donations every step of the way.
        </p>
        <p className="primary-text">
          <h3>Our Vision</h3>
          At de-Caritas, we envision a world where every donation is traceable, accountable, and impactful. By leveraging blockchain technology, we aim to revolutionize the way charitable giving is managed and perceived, fostering trust and transparency within the global philanthropic community.
        </p>
        <div className="about-buttons-container">
          <button className="secondary-button">Learn More</button>
        </div>
      </div>
    </div>
  );
};

export default About;
