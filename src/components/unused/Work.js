import React from "react";
import PickMeals from '../Assets/12.png';
import ChooseMeals from '../Assets/11.jpg';
import DeliveryMeals from "../Assets/delivery-image.png";

const Work = () => {
  const workInfoData = [
    {
      image: PickMeals,
      title: "Our Commitment to Transparency",
      text: "Transparency is at the core of everything we do at de-Caritas. We believe that donors have the right to know exactly how their contributions are being utilized. Through our platform, users can access detailed reports and analytics on donation flows, ensuring full visibility into the impact of their support.",
    },
    {
      image: ChooseMeals,
      title: "Security and Privacy",
      text: "We understand the importance of safeguarding sensitive data in the digital age. That's why de-Caritas prioritizes security and privacy above all else. Our platform employs cutting-edge encryption protocols and decentralized storage mechanisms to ensure the confidentiality and integrity of user information at all times.",
    },
    
  ];
  return (
    <div className="work-section-wrapper">
      <div className="work-section-top">
        <p className="primary-subheading">Work</p>
        <h1 className="primary-heading">How It Works</h1>
        <p className="primary-text">
        de-Caritas utilizes blockchain technology to create a decentralized ledger that records every donation transaction in real-time. Each donation is assigned a unique cryptographic identifier, ensuring its integrity and transparency throughout its journey. Donors can track their contributions from inception to execution, gaining unparalleled insight into how their generosity is making a difference.
        </p>
      </div>
      <div className="work-section-bottom">
        {workInfoData.map((data) => (
          <div className="work-section-info" key={data.title}>
            <div className="info-boxes-img-container">
              <img src={data.image} alt="" />
            </div>
            <h2>{data.title}</h2>
            <p>{data.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Work;