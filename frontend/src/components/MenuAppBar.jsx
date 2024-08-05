import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import {
  AppBar, Box, Toolbar, Typography, IconButton, MenuItem, Menu, Avatar, Button,
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import { selectAccessToken, setAccessToken } from '../store/slices/authSlice';

const navItems = ['Profile', 'Repositories', 'Other Users'];

const fetchProfileAvatar = async (token) => {
  if (!token) return '';

  try {
    const response = await axios.get('https://api.github.com/user', {
      headers: { Authorization: `token ${token}` },
    });
    return response.data.avatar_url;
  } catch (error) {
    console.error('Error fetching profile:', error);
    return '';
  }
};

export default function MenuAppBar() {
  const dispatch = useDispatch();
  const auth = useSelector(selectAccessToken);
  const [anchorEl, setAnchorEl] = useState(null);
  const [avatar, setAvatar] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const locationPathname = location.pathname;

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    dispatch(setAccessToken(null));
    navigate('/');
  };

  useEffect(() => {
    if (auth) {
      fetchProfileAvatar(auth).then(setAvatar);
    }
  }, [location.pathname, auth]);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      dispatch(setAccessToken(token));
    }
  }, [dispatch]);

  return (
    <Box sx={{ flexGrow: 1, height: '100%' }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 0 }}
            onClick={() => navigate('/')}
          >
            <GitHubIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            GitHub Dashboard
          </Typography>
          {auth && (
            <>
              <Box sx={{ display: { xs: 'none', sm: 'block' }, marginRight: '1rem' }}>
                {navItems.map((item) => {
                  const itemPathname = `/${item.toLowerCase().replace(/\s+/g, '')}`;

                  return (
                    <Button
                      key={item}
                      variant={locationPathname === itemPathname ? 'contained' : 'text'}
                      color={locationPathname === itemPathname ? 'primary' : 'inherit'}
                      onClick={() => navigate(itemPathname)}
                    >
                      {item}
                    </Button>
                  );
                })}
              </Box>
              <Avatar
                alt="Avatar"
                src={avatar}
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                sx={{ cursor: 'pointer' }}
              />
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                sx={{ marginTop: '2.5rem' }}
              >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
