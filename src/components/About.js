import React from "react";
import AboutBackground from "../Assets/about-background.png";
import AboutBackgroundImage from '../Assets/203.png';
import { BsFillPlayCircleFill } from "react-icons/bs";

const About = () => {
  return (
    <div className="about-section-container">
      <div className="about-background-image-container">
        <img src={AboutBackground} alt="" />
      </div>
      <div className="about-section-image-container">
        <img src={AboutBackgroundImage} alt="" />
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