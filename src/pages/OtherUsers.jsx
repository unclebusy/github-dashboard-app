import React, { useState } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  List,
  ListItem,
  Typography,
  Container,
  Link,
  Box, Grid, Pagination
} from '@mui/material';
import PaperWrapper from "../components/PaperWrapper";
import CardSearchUser from "../components/CardSearchUser";
import ProgressBar from "../components/ProgressBar";

const UserSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 21;

  const handleSearch = async (page = 1) => {
    if (!searchTerm.trim()) {
      alert('Search query cannot be empty');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.get('https://api.github.com/search/users', {
        params: {
          q: searchTerm,
          per_page: itemsPerPage,
          page
        }
      });
      setUsers(response.data.items);
      setTotalCount(response.data.total_count);
      setCurrentPage(page);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const fetchUserRepos = async (username) => {
    setLoading(true);

    try {
      const response = await axios.get(`https://api.github.com/users/${username}/repos`);
      setRepos(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (event, value) => {
    handleSearch(value);
  };

  return (
      <Container sx={{ height: 'calc(100vh - 64px)' }}>
        <Box display="flex" alignItems="flex-end" mb={2}>
          <TextField
              fullWidth
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search users..."
              onKeyDown={handleKeyPress}
              sx={{ marginRight: '1rem', marginTop: '1rem', height: '40px' }}
              InputProps={{sx: { height: '100%', boxSizing: 'border-box' },}}
          />
          <Button
              variant="contained"
              color="primary"
              onClick={() => handleSearch()}
              sx={{ height: '40px' }}
          >
            Search
          </Button>
        </Box>

        {loading && <ProgressBar />}
        {totalCount ? (
            <Box>
              <PaperWrapper padding='1rem' marginTop="1rem">
                <PaperWrapper padding="1rem" marginTop="0" marginBottom="1rem" bgColor="#1976D2" >
                  <Typography color="white" variant="h6" component="div" sx={{flexGrow: 1}}>
                    Found {totalCount} users
                  </Typography>
                </PaperWrapper>
                <Box>
                  <nav aria-label="Count of users found">
                    <Grid container spacing={2}>
                      {users.map(user => (
                          <Grid item xs={12} sm={4} key={user.id}>
                            <CardSearchUser id={user.id} login={user.login} avatar={user.avatar_url} fetchUserRepos={fetchUserRepos} />
                          </Grid>
                      ))}
                    </Grid>
                  </nav>
                </Box>
              </PaperWrapper>
              <Box mt="auto" display="flex" justifyContent="center">
                <Pagination
                    count={Math.ceil(totalCount / itemsPerPage)}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                    sx={{ marginTop: '2rem' }}
                />
              </Box>
            </Box>
        ) : ''
        }

        {repos.length > 0 ?
            (<>
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
            </>) : ''}
      </Container>
  );
};

export default UserSearch;
