import react from "react";
import BannerBackground from "../Assets/900.png";
import BannerImage from '../Assets/202.png';
import { FiArrowRight } from "react-icons/fi";

const Home = () => {
    return (
      <div className="home-container">
        <div className="home-banner-container">
          <div className="home-bannerImage-container">
          <img src={BannerBackground} alt=""  className="background-repeat" />

          </div>
          <div className="home-text-section">
            <h1 className="primary-heading">
              de-Caritas
            </h1>
            <p className="primary-text">
              A blockchain based donation traceability framework
            </p>
            <button className="secondary-button">
              Get Started <FiArrowRight />{" "}
            </button>
          </div>
          <div className="home-image-section">
            <img src={BannerImage} alt="" />
          </div>
        </div>
      </div>
    );
  };
  
export default Home
