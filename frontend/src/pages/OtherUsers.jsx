import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  TextField, Button, Typography, Container, Box, Grid, Pagination,
} from '@mui/material';
import useAccessToken from '../hooks/useAccessToken';
import PaperWrapper from '../components/PaperWrapper';
import CardSearchUser from '../components/CardSearchUser';
import ProgressBar from '../components/ProgressBar';
import ModalSearchedReposUser from '../components/ModalSearchedReposUser';

function OtherUsers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [repos, setRepos] = useState([]);
  const [showUserRepos, setShowUserRepos] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 21;

  const accessToken = useAccessToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      navigate('/');
    }
  }, [accessToken, navigate]);

  const handleSearch = async (page = 1) => {
    if (!searchTerm.trim()) {
      // eslint-disable-next-line no-alert
      alert('Search query cannot be empty');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.get('https://api.github.com/search/users', {
        params: {
          q: searchTerm,
          per_page: itemsPerPage,
          page,
        },
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

  const fetchUserRepos = async (username) => {
    setLoading(true);

    try {
      const response = await axios.get(`https://api.github.com/users/${username}/repos`);
      setRepos(response.data);
      setShowUserRepos(true);
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

  const handleClose = () => {
    setShowUserRepos(false);
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
          InputProps={{ sx: { height: '100%', boxSizing: 'border-box' } }}
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
          <PaperWrapper padding="1rem" marginTop="1rem">
            <PaperWrapper padding="1rem" marginTop="0" marginBottom="1rem" bgColor="#1976D2">
              <Typography color="white" variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Found
                {' '}
                {totalCount}
                {' '}
                users
              </Typography>
            </PaperWrapper>
            <Box>
              <nav aria-label="Count of users found">
                <Grid container spacing={2}>
                  {users.map((user) => (
                    <Grid item xs={12} sm={4} key={user.id}>
                      <CardSearchUser
                        id={user.id}
                        login={user.login}
                        avatar={user.avatar_url}
                        fetchUserRepos={fetchUserRepos}
                      />
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
      ) : ''}
      <ModalSearchedReposUser
        showUserRepos={showUserRepos}
        handleClose={handleClose}
        repos={repos}
      />
    </Container>
  );
}

export default OtherUsers;
