'use client';
import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

const mossGreen = '#9ba770';
const darkSlateGreen = '#384D48';
const roseTaupe = '#86615c';
const ghostWhite = '#E8E9F3';
const nonPhotoBlue = '#B1E5F2';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
  cssVariables: true,
  palette: {
    mode: 'light',
    primary: {
      main: mossGreen,
    },
    secondary: {
      main: darkSlateGreen,
    },
    error: {
      main: roseTaupe,
    },
    background: {
      default: ghostWhite,
    },
    success: {
      main: darkSlateGreen,
    }
    // text: {
    //   primary: darkSlateGreen,
    //   secondary: nonPhotoBlue,
    // },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
});

export default theme;