import React from 'react';
import { Button, Container } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const clientId = process.env.REACT_APP_CLIENT_ID;
const redirectUri = process.env.REACT_APP_REDIRECT_URI;

const loginWithGithub = () => {
  window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}`;
};

const Login = () => {
  return (
      <Container maxWidth="sm" sx={{ display: 'flex', height: 'calc(100vh - 64px)', alignItems: 'center', justifyContent: 'center' }}>
        <Box
            sx={{
              border: '1px solid #fff',
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              padding: 4,
              textAlign: 'center',
            }}
        >
          <Box>
            <Typography
                variant="h4"
                component="h1"
                gutterBottom
                sx={{
                  color: '#000',
                  display: 'inline-block',
                }}
            >
              Logged in to access the app
            </Typography>
          </Box>
          <Box mt={1}>
            <Button variant="contained" color="primary" onClick={loginWithGithub}>
              Login with GitHub
            </Button>
          </Box>
        </Box>
      </Container>
  );
};

export default Login;
