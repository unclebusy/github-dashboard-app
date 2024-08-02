import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAccessToken from "../hooks/useAccessToken";
import { Container, Typography, Avatar, Link, Box, Button, Tooltip, CircularProgress } from '@mui/material';
import { Email as EmailIcon, Business as BusinessIcon, LocationOn as LocationOnIcon, AccountBox as AccountBoxIcon, Description as DescriptionIcon, Link as LinkIcon, EditNote as EditNoteIcon } from '@mui/icons-material';
import ModalEditProfile from "../components/ModalEditProfile";
import PaperWrapper from "../components/PaperWrapper";

const fetchProfile = async (accessToken) => {
  try {
    const response = await axios.get('https://api.github.com/user', {
      headers: { Authorization: `token ${accessToken}` }
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
  const [profile, setProfile] = useState(null);
  const [openEditor, setOpenEditor] = useState(false);
  const [editedProfile, setEditedProfile] = useState({});
  const accessToken = useAccessToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      navigate('/');
    } else {
      fetchProfile(accessToken).then(data => setProfile(data));
    }
  }, [accessToken, navigate]);

  const handleEditProfile = () => {
    setEditedProfile(profile);
    setOpenEditor(true);
  };

  const handleSaveProfile = () => {
    setProfile(editedProfile);
    setOpenEditor(false);
  };

  const handleClose = () => {
    setOpenEditor(false);
  };

  if (!profile) {
    return (
        <Container maxWidth="sm" sx={{ display: 'flex', height: 'calc(100vh - 64px)', alignItems: 'center', justifyContent: 'center' }}>
          <CircularProgress />
        </Container>
    );
  }

  return (
      <>
        <Container maxWidth="sm" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 'calc(100vh - 64px)' }}>
          <PaperWrapper textAlign="center" width="100%">
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
                <Box display="flex" justifyContent="flex-end" sx={{ marginTop: 2 }}>
                  <Tooltip title="Edit profile" placement="left-start">
                    <Button variant="contained" color="primary" onClick={handleEditProfile}>
                      <EditNoteIcon />
                    </Button>
                  </Tooltip>
                </Box>
              </Box>
            </Box>
          </PaperWrapper>
        </Container>

        <ModalEditProfile
            openEditor={openEditor}
            handleClose={handleClose}
            editedProfile={editedProfile}
            setEditedProfile={setEditedProfile}
            handleSaveProfile={handleSaveProfile}
        />
      </>
  );
};

export default Profile;
