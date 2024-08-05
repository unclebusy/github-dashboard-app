import React from 'react';
import { Paper } from '@mui/material';

function PaperWrapper({
  children,
  bRadius = '4px',
  padding = '2rem',
  bgColor = '#f9f9f9',
  marginTop = '2rem',
  marginBottom = '0',
  textAlign = '',
  width = 'auto',
}) {
  return (
    <Paper
      elevation={3}
      sx={{
        borderRadius: bRadius,
        padding,
        backgroundColor: bgColor,
        marginTop,
        marginBottom,
        textAlign,
        width,
      }}
    >
      {children}
    </Paper>
  );
}

export default PaperWrapper;
