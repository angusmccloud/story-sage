import React from 'react';
import AppBar from '@/app/components/AppBar/AppBar';
import Container from '@/app/components/Container/Container';
import Toolbar from '@/app/components/Toolbar/Toolbar';
import Typography from '@/app/components/Typography/Typography';
import logoImage from '../../assets/images/sage-icon.jpg';
import Box from '@/app/components/Box/Box';
import { useTheme, useMediaQuery } from '@mui/material';
import MainMenu from '@/app/components/MainMenu/MainMenu';
import { PaddingRounded } from '@mui/icons-material';


const PageHeader = ({ pageName }) => {
  const theme = useTheme();
  const isXL = useMediaQuery(theme.breakpoints.up('xl'));
  const isL = useMediaQuery(theme.breakpoints.up('lg'));
  const isM = useMediaQuery(theme.breakpoints.up('md'));
  const isS = useMediaQuery(theme.breakpoints.up('sm'));
  return (
    <Box
      sx={{
        backgroundColor: 'primary.dark',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          maxWidth: '80rem',
          margin: '0 auto',
          color: 'white',
          alignItems: 'center',
          gap: 0,  // reduced from 2 to 1
          paddingLeft: 2,   // add left padding
          paddingRight: 2,   // add right padding
          paddingTop: 1,
          paddingBottom: 1
        }}
      >
        <MainMenu />
        <Typography 
          variant="h6" 
          sx={{ 
            flexGrow: 1,
            fontFamily: 'Cookie, cursive',
            fontSize: '2.2rem'  // slightly reduced from 2rem
          }}
        >
          {pageName}
        </Typography>
        <img src={logoImage.src} alt="Story Sage" style={{ height: 50, width: 50, borderRadius: 20 }} />
      </Box>
    </Box>
  );
};

export default PageHeader;
