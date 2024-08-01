import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, List, ListItem, ListItemText, Typography, Container, Link, CircularProgress, Box } from '@mui/material';
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";

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
        per_page: 10
      }
    });
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
              sx={{ marginRight: '1rem', marginTop: '1rem', marginBottom: '1rem' }}
          />

          <Button variant="contained" color="primary" onClick={handleSearch}>
            Search
          </Button>
        </Box>
        {loading && <CircularProgress />}
            {totalCount ?
                <AppBar  position="static" sx={{ borderRadius: '4px' }}>
                  <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                      Found {totalCount} users
                    </Typography>
                  </Toolbar>
                </AppBar>
                :
                ''}

          <List>
            {users.map(user => (
                <ListItem key={user.id} onClick={() => fetchUserRepos(user.login)}>
                  <ListItemText primary={user.login} />
                </ListItem>
            ))}
          </List>
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

