import React from 'react';
import {
  Avatar,
  ListItemText,
  ListItem,
  Tooltip,
  ListItemButton,
  ListItemIcon,
} from '@mui/material';

function CardSearchUser({ id, login, avatar, fetchUserRepos }) {
  return (
    <Tooltip title="Click to view repositories" placement="top-start">
      <ListItem disablePadding key={id} onClick={() => fetchUserRepos(login)}>
        <ListItemButton>
          <ListItemIcon>
            <Avatar alt={login} src={avatar} />
          </ListItemIcon>
          <ListItemText primary={login} />
        </ListItemButton>
      </ListItem>
    </Tooltip>
  );
}

export default CardSearchUser;
