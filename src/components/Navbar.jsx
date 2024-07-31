import * as React from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Avatar, Button } from "@mui/material";
import axios from "axios";

const fetchProfileAvatar = async () => {
  const token = localStorage.getItem('access_token');
  if (!token) return '';

  try {
    const response = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `token ${token}`
      }
    });
    return response.data.avatar_url;
  } catch (error) {
    console.error('Error fetching profile:', error);
    return '';
  }
};

const navItems = ['Profile', 'Repositories', 'Other Users'];

export default function MenuAppBar() {
  const [auth, setAuth] = React.useState(localStorage.getItem('access_token'));
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [avatar, setAvatar] = React.useState('');

  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    if (auth) {
      fetchProfileAvatar().then(setAvatar);
    }
  }, [location.pathname, auth]);

  React.useEffect(() => {
    const handleStorageChange = () => {
      setAuth(localStorage.getItem('access_token'));
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  React.useEffect(() => {
    setAuth(localStorage.getItem('access_token'));
  }, []);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    setAuth(null);
    navigate('/');
  };

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
                    {navItems.map((item) => (
                        <Button
                            key={item}
                            onClick={() => navigate(`/${item.toLowerCase().replace(/\s+/g, '')}`)}
                            sx={{ color: '#fff' }}
                        >
                          {item}
                        </Button>
                    ))}
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
