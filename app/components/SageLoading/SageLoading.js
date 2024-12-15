import React from 'react';
import { CircularProgress, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Image from 'next/image';
import sageIcon from '../../assets/images/sage-icon.jpg';

const SageLoading = () => {
  const theme = useTheme();

  return (
    <Box sx={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
      <Image
        src={sageIcon}
        alt="Sage Icon"
        style={{ height: 90, width: 90, borderRadius: 50 }}
      />
      <CircularProgress
        size={100}
        sx={{
          color: theme.palette.primary.main,
          position: 'absolute',
        }}
      />
    </Box>
  );
};

export default SageLoading;
