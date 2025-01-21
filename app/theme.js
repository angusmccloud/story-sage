'use client';
import { Roboto, Libre_Caslon_Text, Libre_Caslon_Display } from 'next/font/google';
import localFont from 'next/font/local'
import { createTheme } from '@mui/material/styles';

const mossGreen = '#9ba770';
const darkMossGreen = '#14231B';
const darkSlateGreen = '#384D48';
const roseTaupe = '#86615c';
const ghostWhite = '#E8E9F3';
const paperWhite = '#F7F7F7';
const nonPhotoBlue = '#B1E5F2';
const deepPlum = '#301e2c';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const libreCaslonDisplay = Libre_Caslon_Display({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
})

const libreCaslonText = Libre_Caslon_Text({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
})

const inLivingColor = localFont({
  src: './fonts/inlivingcolorregular-rpj8m-webfont.woff2',
  display: 'swap',
})

const kidTShirt = localFont({
  src: './fonts/kidstshirt-lgzaz-webfont.woff2',
  display: 'swap',
})

const vestardia = localFont({
  src: './fonts/vestardiaregular-wobjp-webfont.woff2',
  display: 'swap',
})

const lifesavers = localFont({
  src: [
    {
      path: './fonts/lifesavers-regular-webfont.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/lifesavers-bold-webfont.woff2',
      weight: '700',
      style: 'normal',
    }
  ]
})

const theme = createTheme({
  cssVariables: true,
  palette: {
    mode: 'light',
    primary: {
      main: mossGreen,
      dark: darkMossGreen,
      highlight: mossGreen
    },
    secondary: {
      main: darkMossGreen,
      light: mossGreen,
      dark: mossGreen
    },
    error: {
      main: roseTaupe,
    },
    background: {
      default: "#ffffff",
      paper: paperWhite
    },
    success: {
      main: darkSlateGreen,
    }
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
    letterSpacing: '0.02em',
    pageTitle: {
      fontFamily: inLivingColor.style.fontFamily,
      fontSize: '2rem',
      fontWeight: 500,
      // Optional additional styling
      lineHeight: 1.2,
      letterSpacing: '0.02em'
    },
    introMessage: {
      fontFamily: lifesavers.style.fontFamily,
      fontSize: '1.2rem',
      fontWeight: 700,
      // Optional additional styling
      lineHeight: 1.2,
      letterSpacing: '0.02em'
    },
    pageAccent: {
      fontFamily: kidTShirt.style.fontFamily,
      // Optional additional styling
      lineHeight: 1.2,
      letterSpacing: '0.02em'
    },
    inputLabel: {
      fontFamily: kidTShirt.style.fontFamily,
      // Optional additional styling
      fontSize: '2rem',
      lineHeight: 1.2,
      letterSpacing: '0.02em'
    },
    currentLabel: {
      fontFamily: kidTShirt.style.fontFamily,
      // Optional additional styling
      fontSize: '2rem',
      lineHeight: 1.2,
      letterSpacing: '0.02em'
    },
    botMessage: {
      fontFamily: libreCaslonText.style.fontFamily,
      fontSize: '1rem',
      lineHeight: 1.2,
      letterSpacing: '0.02em'
    },
    userMessage: {
      fontFamily: roboto.style.fontFamily,
      fontSize: '1rem',
      lineHeight: 1.2,
      letterSpacing: '0.0em'
    }
  },
});

export default theme;