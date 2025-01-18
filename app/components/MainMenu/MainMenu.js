import React, { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

const MainMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        edge="start"
        sx={{ 
          color: 'white',
          marginRight: 0.5
        }}
        aria-label="menu"
        onClick={handleMenuOpen}
      >
        <MenuIcon sx={{ fontSize: 38 }} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        sx={{
          zIndex: 1200
        }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleMenuClose}>📖 Story Snacks</MenuItem>
        <MenuItem onClick={handleMenuClose}>🎭 Character Chat</MenuItem>
        <MenuItem onClick={handleMenuClose}>📑 Quick Quote Quest</MenuItem>
        <MenuItem onClick={handleMenuClose}>⏰ Timeline Tracker</MenuItem>
        <MenuItem onClick={handleMenuClose}>🗺️ Plot Plotter</MenuItem>


      </Menu>
    </>
  );
};

export default MainMenu;

/*

📚 Bookworm's Buffet
🔮 Plot Predictor
🦉 Wisdom Whisperer
📖 Story Snacks
🪶 Quill Quest
🎭 Character Chat
☕️ Chapter & Chill
🌙 Bedtime Bytes
☕️ Chapter & Chill
📑 Quick Quote Quest
📚 Series Seeker
🎭 Character Compass
🗺️ Plot Plotter
⏰ Timeline Tracker
🎬 Scene Scanner
*/