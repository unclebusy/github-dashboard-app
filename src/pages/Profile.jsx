import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Avatar, Link, Box, Paper, Button } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import BusinessIcon from '@mui/icons-material/Business';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import DescriptionIcon from '@mui/icons-material/Description';
import LinkIcon from '@mui/icons-material/Link';
import {useNavigate} from "react-router-dom";

const fetchProfile = async () => {
  const token = localStorage.getItem('access_token');
  try {
    const response = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `token ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching profile:', error);
  }
};

const Profile = () => {
  const [profile, setProfile] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile().then(r => setProfile(r));
  }, []);

  return (
      <Container maxWidth="sm" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 'calc(100vh - 64px)' }}>
        <Paper
            elevation={3}
            sx={{
              borderRadius: '8px',
              padding: 4,
              textAlign: 'center',
              backgroundColor: '#f9f9f9',
              width: '100%',
            }}
        >
          <Box display="flex" flexDirection="column" alignItems="center">
            <Avatar src={profile.avatar_url || "https://www.gravatar.com/avatar"} alt="avatar" sx={{ width: 150, height: 150, marginBottom: 2 }} />
            <Typography variant="h4" component="h1" gutterBottom>
              {profile.name}
            </Typography>
            <Box sx={{ width: '80%', textAlign: 'left' }}>
              <Box display="flex" alignItems="center" sx={{ marginBottom: 1 }}>
                <AccountBoxIcon sx={{ marginRight: 1, color: '#1976D2' }} />
                <Typography variant="body1">
                  {profile.login}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" sx={{ marginBottom: 1 }}>
                <EmailIcon sx={{ marginRight: 1, color: '#1976D2' }} />
                <Typography variant="body1">
                  {profile.email ? profile.email : "N/A"}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" sx={{ marginBottom: 1 }}>
                <BusinessIcon sx={{ marginRight: 1, color: '#1976D2' }} />
                <Typography variant="body1">
                  {profile.company ? profile.company : "N/A"}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" sx={{ marginBottom: 1 }}>
                <LocationOnIcon sx={{ marginRight: 1, color: '#1976D2' }} />
                <Typography variant="body1">
                  {profile.location ? profile.location : "N/A"}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" sx={{ marginBottom: 1 }}>
                <DescriptionIcon sx={{ marginRight: 1, color: '#1976D2' }} />
                <Typography variant="body1">
                  {profile.bio ? profile.bio : "N/A"}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" sx={{ marginBottom: 3 }}>
                <LinkIcon sx={{ marginRight: 1, color: '#1976D2' }} />
                <Link href={profile.html_url} variant="body1" sx={{ color: '#1976D2' }}>
                  Profile on GitHub
                </Link>
              </Box>
            </Box>
            <Box sx={{ width: '80%', textAlign: 'right', marginBottom: 1 }}>
              <Button variant="contained" color="primary" onClick={() => navigate('/repositories')}>
                Repositories
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
  );
};

export default Profile;


