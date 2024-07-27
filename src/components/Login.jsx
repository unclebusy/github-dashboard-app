import React from 'react';

const clientId = process.env.REACT_APP_CLIENT_ID;
const redirectUri = process.env.REACT_APP_REDIRECT_URI;

const loginWithGithub = () => {
  window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}`;
};

const Login = () => {
  return (
      <div>
        <button onClick={loginWithGithub}>Login with GitHub</button>
      </div>
  );
};

export default Login;
