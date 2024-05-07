import React from "react";

const Contact = () => {
  return (
    <div className="contact-page-wrapper bg-cover bg-center w-full h-screen" style={{ backgroundImage: "url('https://images.pexels.com/photos/4321069/pexels-photo-4321069.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')" }}>
      <h1 className="primary-heading">Have Question In Mind?</h1>
      <h1 className="primary-heading">Let Us Help You</h1>
      <div className="contact-form-container">
        <input type="text" placeholder="yourmail@gmail.com" />
        <button className="secondary-button">Submit</button>
      </div>
    </div>
  );
};

export default Contact;