import React from "react";

const Contact = () => {
  return (
    <div className="container mx-auto px-4 py-4 bg-cover bg-center w-full h-screen flex flex-col justify-center items-center " style={{ backgroundImage: "url('https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=1912&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}>
     <h1 className="text-black text-3xl font-bold mb-4">Have Questions In Mind?</h1>
      <h1 className="text-black text-2xl font-bold mb-8">Let Us Help You</h1>
      <div className="flex items-center bg-white px-4 py-2 mr-2 rounded-full">
        <input className="border-2 border-white px-4 py-2 mr-2 rounded-md focus:outline-none" type="text" placeholder="yourmail@gmail.com" />
        <button className="bg-orange-500 hover:bg-orange-300 text-black px-8 py-2 rounded-full">Submit</button>
      </div>
    </div>
  );
};

export default Contact;