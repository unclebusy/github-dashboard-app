import React from 'react';
import { CircularProgress, Container } from '@mui/material';

function ProgressBar() {
  return (
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        height: 'calc(100vh - 64px)',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CircularProgress />
    </Container>
  );
}

export default ProgressBar;
