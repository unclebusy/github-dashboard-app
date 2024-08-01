import React from "react";
import {Avatar, ListItemText, ListItem} from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";

const CardUser = ({ id, login, fetchUserRepos }) => {
  return (
      <ListItem disablePadding key={id} onClick={() => fetchUserRepos(login)}>
        <ListItemButton>
          <ListItemIcon>
            <Avatar/>
          </ListItemIcon>
          <ListItemText primary={login}/>
        </ListItemButton>
      </ListItem>
  );
}

export default CardUser;
