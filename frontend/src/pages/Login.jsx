import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button, Container, Box, Typography,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import useAccessToken from '../hooks/useAccessToken';

const clientId = process.env.REACT_APP_CLIENT_ID;
const redirectUri = process.env.REACT_APP_REDIRECT_URI;

const loginWithGithub = () => {
  window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}`;
};

function LoginBox() {
  return (
    <Box
      sx={{
        border: '1px solid #fff',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        padding: 4,
        textAlign: 'center',
      }}
    >
      <Box display="flex" alignItems="center" marginBottom="1rem">
        <AccountCircleIcon color="primary" fontSize="large" />
        <Typography variant="h5" sx={{ color: '#000', display: 'inline-block', marginLeft: 1 }}>
          Account Login
        </Typography>
      </Box>
      <Box mt={1}>
        <Button variant="contained" color="primary" onClick={loginWithGithub}>
          With GitHub
        </Button>
      </Box>
    </Box>
  );
}

function Login() {
  const navigate = useNavigate();
  const accessToken = useAccessToken();

  useEffect(() => {
    if (accessToken) {
      navigate('/profile');
    }
  }, [accessToken, navigate]);

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex', height: 'calc(100vh - 64px)', alignItems: 'center', justifyContent: 'center',
      }}
    >
      <LoginBox />
    </Container>
  );
}

export default Login;
