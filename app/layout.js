'use client';
import React, { useState } from 'react';
import { DefaultSnackbar, SnackbarContext } from './contexts/SnackbarContext/SnackbarContext'
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Snackbar, Alert } from '@mui/material';
import theme from '@/app/theme';

export default function RootLayout(props) {
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarDetails, setSnackbarDetails] = useState(DefaultSnackbar);

  // Pieces for the Snackbar Context
  const setSnackbar = (props) => {
    const { message, action, severity = 'success', duration = 7000 } = props;
    setSnackbarDetails({
      message: message,
      duration: duration,
      action: action,
      severity: severity,
    });
    setShowSnackbar(true);
  };

  const onDismissSnackBar = () => {
    setShowSnackbar(false);
    setSnackbarDetails(DefaultSnackbar);
  };

  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
        <SnackbarContext.Provider
          value={{ snackbar: snackbarDetails, setSnackbar }}
        >
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            {props.children}
            <Snackbar
              open={showSnackbar}
              onClose={onDismissSnackBar}
              message={snackbarDetails.message}
              action={snackbarDetails.action}
              autoHideDuration={snackbarDetails.duration}
              anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
            >
              <Alert onClose={onDismissSnackBar} severity={snackbarDetails.severity} sx={{ width: '100%' }}>
                {snackbarDetails.message}
              </Alert>
            </Snackbar>
          </SnackbarContext.Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}