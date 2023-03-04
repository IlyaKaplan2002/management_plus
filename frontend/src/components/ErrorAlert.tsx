import { Alert, AlertTitle, Snackbar } from '@mui/material';
import React from 'react';

interface ErrorAlert {
  error: string;
  open: boolean;
  setOpen: (value: boolean) => void;
}

const ErrorAlert = ({ error, open, setOpen }) => (
  <Snackbar
    open={Boolean(error) && open}
    autoHideDuration={6000}
    onClose={() => setOpen(false)}
  >
    <Alert severity="error" onClose={() => setOpen(false)}>
      <AlertTitle>Error</AlertTitle>
      {error}
    </Alert>
  </Snackbar>
);

export default ErrorAlert;
