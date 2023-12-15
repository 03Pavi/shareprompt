// components/NavBar.js
"use client"
import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import { Button } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useRouter } from 'next/navigation'
import { FaBookmark } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { MdAddBox } from "react-icons/md";
import { IoPeopleSharp } from "react-icons/io5";
import { FaUserEdit } from "react-icons/fa";
import { Typography } from '@mui/material';
import { UserButton } from '@clerk/nextjs';
const NavBar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  //userouter for naviagtion 
  const router = useRouter()
  // Function to toggle the mobile drawer
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  //menu items
  const menuItems = [
    { icon: <AiFillHome />, text: 'Home' },
    { icon: <IoPeopleSharp />, text: 'People' },
    { icon: <MdAddBox />, text: 'Create' },
    { icon: <FaBookmark />, text: 'Saved' },
    { icon: <FaUserEdit />, text: 'Edit Profile' },
  ];
  return (
    <div>
      {/* Desktop AppBar - Displayed on medium and larger screens, hidden on small screens */}
      <AppBar position="static" sx={{ display: { sm: 'block', md: 'block' }, bgcolor: "white", color: 'black', boxShadow: "none" }}>
        <Toolbar sx={{ display: "flex" }}>

          <img src="/assets/icons/favicon.ico" style={{ width: "40px", marginRight: "10px" }} /><Typography variant="h5" component="h1" sx={{ marginTop: "8px", fontWeight: "500" }} gutterBottom><code>Prompts</code></Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ padding: "2px", border: "3px solid white", borderRadius: "100%" }}>
          </Box>
          {/* <Box sx={{ flexGrow: 1 }} /> */}
          {/* <IconButton edge="start" color="inherit" sx={{ display: { sm: 'block', md: 'none' } }}>
          <MenuIcon onClick={toggleDrawer} sx={{ fontSize: "30px" }} />
          </IconButton> */}
          <Button variant="outlined" color="warning" sx={{ marginRight: "10px" }} onClick={() => router.push('/create')}>Create</Button>
          <UserButton afterSignOutUrl='/' />
        </Toolbar>
      </AppBar>

      {/* Dektop Drawer */}
      <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer} variant="temporary" sx={{ display: { sm: 'none', md: 'block' } }}>
        <List style={{ width: "200px", justifyContent: "center" }}>
          {menuItems.map((item, index) => (
            <ListItem sx={{ display: "flex", fontSize: "20px" }} key={index} button>
              {item.icon} <ListItemText sx={{ fontWeight: 800, marginTop: '5px', marginLeft: "30px" }} primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>


    </div>
  );
};

export default NavBar;
