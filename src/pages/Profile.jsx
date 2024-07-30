import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, Avatar, Link, Box, Paper, Button, Tooltip } from '@mui/material';
import { Email as EmailIcon, Business as BusinessIcon, LocationOn as LocationOnIcon, AccountBox as AccountBoxIcon, Description as DescriptionIcon, Link as LinkIcon, EditNote as EditNoteIcon } from '@mui/icons-material';
import ModalEditProfile from "../components/ModalEditProfile";

const fetchProfile = async () => {
  const token = localStorage.getItem('access_token');
  try {
    const response = await axios.get('https://api.github.com/user', {
      headers: { Authorization: `token ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching profile:', error);
  }
};

const InfoItem = ({ title, icon: Icon, value }) => (
    <Tooltip title={title} placement="left-start">
      <Box display="flex" alignItems="center" sx={{ marginBottom: 1 }}>
        <Icon sx={{ marginRight: 1, color: '#1976D2' }} />
        <Typography variant="body1">
          {value || "N/A"}
        </Typography>
      </Box>
    </Tooltip>
);

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [open, setOpen] = useState(false);
  const [editedProfile, setEditedProfile] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile().then(data => setProfile(data));
  }, []);

  const handleEditProfile = () => {
    setEditedProfile(profile);
    setOpen(true);
  };

  const handleSaveProfile = () => {
    setProfile(editedProfile);
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
      <>
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
                <InfoItem title="Login" icon={AccountBoxIcon} value={profile.login} />
                <InfoItem title="Email" icon={EmailIcon} value={profile.email} />
                <InfoItem title="Company" icon={BusinessIcon} value={profile.company} />
                <InfoItem title="Location" icon={LocationOnIcon} value={profile.location} />
                <InfoItem title="Bio" icon={DescriptionIcon} value={profile.bio} />
                <Tooltip title="Profile link" placement="left-start">
                  <Box display="flex" alignItems="center" sx={{ marginBottom: 3 }}>
                    <LinkIcon sx={{ marginRight: 1, color: '#1976D2' }} />
                    <Link href={profile.html_url} variant="body1" sx={{ color: '#1976D2' }}>
                      Profile on GitHub
                    </Link>
                  </Box>
                </Tooltip>
                <Box display="flex" alignItems="flex-end">
                  <Tooltip title="Edit account" placement="left-start">
                    <Button variant="contained" color="primary" onClick={handleEditProfile}>
                      <EditNoteIcon />
                    </Button>
                  </Tooltip>
                  <Button
                      variant="contained"
                      color="primary"
                      onClick={() => navigate('/repositories')}
                      sx={{ marginLeft: 'auto' }}
                  >
                    Repositories
                  </Button>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Container>

        <ModalEditProfile
            open={open}
            handleClose={handleClose}
            editedProfile={editedProfile}
            setEditedProfile={setEditedProfile}
            handleSaveProfile={handleSaveProfile}
        />
      </>
  );
};

export default Profile;
