import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {CircularProgress, Container} from "@mui/material";

const clientId = process.env.REACT_APP_CLIENT_ID;
const redirectUri = process.env.REACT_APP_REDIRECT_URI;

const fetchAccessToken = async (code, navigate) => {
  try {
    const response = await fetch('http://localhost:4000/authenticate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ code })
    });

    if (!response.ok) {
      throw new Error('Error fetching access token');
    }

    const data = await response.json();
    localStorage.setItem('access_token', data.access_token);
    navigate('/profile');
  } catch (error) {
    console.error('Error fetching access token: ', error);
  }
};

const OAuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code');
    if (code) {
      fetchAccessToken(code, navigate);
    } else {
      window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user`;
    }
  }, [navigate]);


  return (
      <Container maxWidth="sm" sx={{ display: 'flex', height: 'calc(100vh - 64px)', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
      );
};

export default OAuthCallback;
