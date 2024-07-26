import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const fetchAccessToken = async (code, navigate) => {
  try {
    const response = await axios.get('http://localhost:5000/auth/github', {
      params: { code },
      headers: {
        'Accept': 'application/json',
      },
    });

    const token = response.data.access_token;
    localStorage.setItem('access_token', token);
    navigate('/profile');
  } catch (error) {
    console.error('Error fetching access token:', error);
    // Добавьте обработку ошибок для уведомления пользователя
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

