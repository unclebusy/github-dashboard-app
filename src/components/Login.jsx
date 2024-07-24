import React from 'react';
import { Button, Container, Typography, Box } from '@mui/material';

const Login = () => {
  const clientId = 'Ov23liNCaE4oo7EGfH0D';
  const redirectUri = 'http://localhost:3000/oauth/callback';

  const loginWithGitHub = () => {
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user,repo`;
  };

  return (
      <Container maxWidth="sm" style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
        <Box
            sx={{
              border: '1px solid #fff',
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              padding: 4,
              textAlign: 'center',
            }}
        >
          <Typography
              variant="h4"
              component="h1"
              gutterBottom
              sx={{
                color: '#1C2128',
                padding: '4px 16px',
                borderRadius: '4px',
                display: 'inline-block'
              }}
          >
            GitHub Dashboard
          </Typography>
          <Box mt={1}>
            <Button variant="contained" color="primary" onClick={loginWithGitHub}>
              Login with GitHub
            </Button>
          </Box>
        </Box>
      </Container>
  );
};

export default Login;