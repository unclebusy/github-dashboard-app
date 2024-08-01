import React, { useState } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
  Container,
  Link,
  CircularProgress,
  Box,
  Avatar
} from '@mui/material';
import PaperWrapper from "../components/PaperWrapper";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import InboxIcon from "@mui/icons-material/Inbox";
import CardUser from "../components/CardUser";

const UserSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    const response = await axios.get('https://api.github.com/search/users', {
      params: {
        q: searchTerm,
        per_page: 27
      }
    });
    console.log(response.data.items)
    setUsers(response.data.items);
    setTotalCount(response.data.total_count);
    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const fetchUserRepos = async (username) => {
    setLoading(true);
    const response = await axios.get(`https://api.github.com/users/${username}/repos`);
    setRepos(response.data);
    setLoading(false);
  };

  return (
      <Container>
        <Box display="flex" alignItems="center" mb={2}>
          <TextField
              fullWidth
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search users..."
              onKeyDown={handleKeyPress}
              sx={{ marginRight: '1rem', marginTop: '1rem', }}
          />

          <Button variant="contained" color="primary" onClick={handleSearch}>
            Search
          </Button>
        </Box>
        {loading ? <CircularProgress /> : (
            totalCount ? (
                <Box>
                  <PaperWrapper padding='1rem' marginTop="1rem">
                    <PaperWrapper padding="1rem" marginTop="0" bgColor="#1976D2">
                      <Typography color="white" variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Found {totalCount} users
                      </Typography>
                    </PaperWrapper>
                    <Box>
                      <nav aria-label="Count of users found">
                        <List>
                          {users.map(user => (
                              <CardUser key={user.id} id={user.id} login={user.login} fetchUserRepos={fetchUserRepos}/>
                          ))}
                        </List>
                      </nav>
                    </Box>
                  </PaperWrapper>
                </Box>
            ) : ''
        )}

        <Typography variant="h6">Repositories:</Typography>
        <List>
          {repos.map(repo => (
              <ListItem key={repo.id}>
                <Link href={repo.html_url} target="_blank" rel="noopener">
                  {repo.name}
                </Link>
              </ListItem>
          ))}
        </List>
      </Container>
  );
};

export default UserSearch;
