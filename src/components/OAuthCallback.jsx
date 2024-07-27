import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const oAuthUrl = 'http://localhost:4000/authenticate';

const fetchAccessToken = async (code, navigate) => {
  try {
    const response = await axios.post(oAuthUrl, { code });
    localStorage.setItem('access_token', response.data.access_token);
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
    }
  }, [navigate]);

  return <div>Loading...</div>;
};

export default OAuthCallback;
