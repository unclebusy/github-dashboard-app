import React from "react";
import { Paper } from "@mui/material";

const PaperWrapper = ({ children, bRadius = '4px', padding = '2rem', bgColor = '#f9f9f9', marginTop = '2rem', marginBottom = '0', textAlign = '', width = "auto" }) => (
    <Paper
        elevation={3}
        sx={{
          borderRadius: bRadius,
          padding: padding,
          backgroundColor: bgColor,
          marginTop: marginTop,
          marginBottom: marginBottom,
          textAlign: textAlign,
          width: width,
        }}
    >
      {children}
    </Paper>
);

export default PaperWrapper;
