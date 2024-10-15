import React, { useState } from 'react';
import { Navigate, Outlet, Route, useNavigate } from 'react-router-dom';
import '../Style/DashboardContainer.css';
import { AppBar, Toolbar, IconButton, Typography, Avatar, Drawer, List, ListItem, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import ViewStreamIcon from '@mui/icons-material/ViewStream';
import SettingsIcon from '@mui/icons-material/Settings';
import AppsIcon from '@mui/icons-material/Apps';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import LabelOutlinedIcon from '@mui/icons-material/LabelOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

function DashboardContainer() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const userName=localStorage.getItem('userName');
  const email = localStorage.getItem('email');

  const toggleDrawer = (openState) => {
    setDrawerOpen(openState);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('email');
    navigate('/login');
  };

  const drawerItems = [
    { text: 'Notes', icon: <LightbulbOutlinedIcon />, route: "notes" },
    { text: 'Reminders', icon: <NotificationsOutlinedIcon /> },
    { text: 'Edit labels', icon: <LabelOutlinedIcon /> },
    { text: 'Archive', icon: <ArchiveOutlinedIcon />, route: "archive" },
    { text: 'Trash', icon: <DeleteOutlineOutlinedIcon />, route: "trash" },
  ];

  const handleViewChange = (route) => {
    navigate(route);
    toggleDrawer(false);
  };

  const drawerList = () => (
    <List>
      {drawerItems.map((item, index) => (
        <ListItem button key={index} onClick={() => handleViewChange(item.route)}>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.text} />
        </ListItem>
      ))}
    </List>
  );

  return (
    <div className="dashboard-container">
      <AppBar className="appbar" position="static" color="default" elevation={5} sx={{ height: '70px', zIndex:1200 }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={() => toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <img src="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png" alt="Keep logo" className="header-logo" />
          <Typography variant="h6" noWrap component="div">
            Fundoo Notes
          </Typography>
          <div className="search-bar">
            <div className="search-bar-icon">
              <SearchIcon />
            </div>
            <input className="search-bar-input" placeholder="Search" aria-label="search" />
          </div>
          <IconButton color="inherit">
            <RefreshIcon />
          </IconButton>
          <IconButton color="inherit">
            <ViewStreamIcon />
          </IconButton>
          <IconButton color="inherit">
            <SettingsIcon />
          </IconButton>
          <IconButton color="inherit">
            <AppsIcon />
          </IconButton>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <Avatar sx={{ bgcolor: '#8E24AA' }}>A</Avatar>
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem>
              {userName}
            </MenuItem>
            <MenuItem>
              {email}
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <ExitToAppIcon sx={{ mr: 1 }} />
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="persistent"
        anchor="left"
        open={drawerOpen}
        sx={{
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            top: '70px',
            zIndex: 1100,
          },
        }}
      >
        {drawerList()}
      </Drawer>

      <div className="notes-container-wrapper" style={{ marginLeft: drawerOpen ? '240px' : '0', transition: 'margin 0.3s' }}>
        <div className="drawer-icons" style={{ position: 'fixed', left: '20px', top: '30%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column' }}>
          {drawerItems.map((item, index) => (
            <IconButton key={index} onClick={() => handleViewChange(item.route)} style={{ margin: '5px 0' }}>
              {item.icon}
            </IconButton>
          ))}
        </div>
        <Outlet />
      </div>
    </div>
  );
};
export default DashboardContainer;
