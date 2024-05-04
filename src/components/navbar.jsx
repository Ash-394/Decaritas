import React, { useState } from 'react'
import { BrowserRouter as Router} from 'react-router-dom';
import AppRoutes from './AppRoutes';

const Nav = () => {
  let Links = [
    { name: "HOME", link: "/" },
    {name:"ABOUT",link:"/about"},
    { name: "PROFILE", link: "/profile" },
    {name:"CONTACT",link:"/contact"}
    

  ];
  let [open, setOpen] = useState(false);

  return (


    <div className='shadow-md h-[80px] w-full top-0 bg-white '>
  <div className='md:flex items-center justify-between bg-white py-4 md:px-10 px-7'>

    <div className='font-bold text-2xl cursor-pointer flex items-center font-[Poppins] text-black'>

      <span className='text-3xl text-black mr-1 pt-2 '>
        <ion-icon name="logo-ionic"></ion-icon>
      </span>
      de-caritas
    </div>

    <div onClick={() => setOpen(!open)} className='text-3xl absolute right-8 top-6 cursor-pointer md:hidden'>
      <ion-icon name={open ? 'close' : 'menu'}></ion-icon>
    </div>

    <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-20 ' : 'top-[-490px]'}`}>
      {
        Links.map((link) => (
          <li key={link.name} className='md:ml-8 text-xl md:my-0 my-7'>
            <a href={link.link} className='text-black font-mono hover:text-gray-400 duration-500'>{link.name}</a>
          </li>
        ))
      }

    </ul>
  </div>

      <Router>
        <AppRoutes/>
      </Router>
      
    </div>

  )
}

export default Nav