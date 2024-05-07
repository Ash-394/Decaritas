import BannerImage from '../Assets/202.png';
import { FiArrowRight } from "react-icons/fi";

const Home = () => {
    return (
      <div className="home-container bg-cover bg-center w-full h-screen"  style={{ backgroundImage: "url('https://images.pexels.com/photos/4321069/pexels-photo-4321069.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')" }}>
        
        <div className="home-banner-container">
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
