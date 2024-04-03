import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from '../Assets/503.png';
import { HiOutlineBars3 } from "react-icons/hi2";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AppRoutes from "./AppRoutes";

const Navbar = () => {
  let Links = [
    { name: "HOME", link: "/" },
    { name: "DONATE", link: "/donate" },
    { name: "VERIFIER", link: "/verifier" },
    { name: "PROFILE", link: "/profile" },
    {name:"CONTACT",link:"/contact"}
  ];

  const menuOptions = [
    {
      text: "Home",
      icon: <HomeIcon />,
      link: "/",
    },
    {
      text: "About",
      icon: <InfoIcon />,
      link: "/about",
    },
    {
      text: "Contact",
      icon: <PhoneRoundedIcon />,
      link: "/contact",
    },
    {
      text: "Profile",
      icon: <AccountCircleIcon />,
      link: "/profile",
    },
    {
      text: "Verifier",
      icon: <CheckCircleIcon />,
      link: "/verifier",
    },
  ];

  const [openMenu, setOpenMenu] = useState(false);

  return (
    <nav>
      <div className="nav-logo-container">
        <img src={Logo} alt="" />
      </div>
      <div className="navbar-links-container">
        {Links.map((link) => (
          <Link key={link.name} to={link.link}>{link.name}</Link>
        ))}
      </div>
      <div className="navbar-menu-container">
        <HiOutlineBars3 onClick={() => setOpenMenu(true)} />
      </div>
      <Drawer open={openMenu} onClose={() => setOpenMenu(false)} anchor="right">
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => setOpenMenu(false)}
          onKeyDown={() => setOpenMenu(false)}
        >
          <List>
            {menuOptions.map((item) => (
              <ListItem key={item.text} disablePadding component={Link} to={item.link}>
                <ListItemButton>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Box>
      </Drawer>
      <AppRoutes/>
    </nav>
    
  );
};

export default Navbar;
