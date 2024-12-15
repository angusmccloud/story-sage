import React from 'react';
import AppBar from '@/app/components/AppBar/AppBar';
import Container from '@/app/components/Container/Container';
import Toolbar from '@/app/components/Toolbar/Toolbar';
import Typography from '@/app/components/Typography/Typography';
import logoImage from '../../assets/images/sage-icon.jpg';

const PageHeader = ({ pageName }) => {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img src={logoImage.src} alt="Story Sage" style={{ height: 50, width: 50, borderRadius: 25, marginRight: 10 }} />
          <Typography variant="h6">{pageName}</Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default PageHeader;
