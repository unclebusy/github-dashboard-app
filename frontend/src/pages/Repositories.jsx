import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Typography, Grid, Container, Box, Button,
} from '@mui/material';
import Pagination from '@mui/material/Pagination';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import { useNavigate } from 'react-router-dom';
import CardWithRepositories from '../components/CardWithRepositories';
import PaperWrapper from '../components/PaperWrapper';
import ProgressBar from '../components/ProgressBar';
import useAccessToken from '../hooks/useAccessToken';

const fetchRepositories = async (
  accessToken,
  setPublicRepositories,
  setPrivateRepositories,
  setTotalPublicPages,
  setTotalPrivatePages,
  setIsLoading,
) => {
  if (!accessToken) {
    console.error('No access token found');
    setIsLoading(false);
    return;
  }

  setIsLoading(true);

  try {
    const { data: profile } = await axios.get('https://api.github.com/user', {
      headers: { Authorization: `token ${accessToken}` },
    });
    const { data: repos } = await axios.get(profile.repos_url);
    const publicRepo = repos.filter((repo) => !repo.private);
    const privateRepo = repos.filter((repo) => repo.private);

    setPublicRepositories(publicRepo);
    setPrivateRepositories(privateRepo);
    setTotalPublicPages(Math.ceil(publicRepo.length / 12));
    setTotalPrivatePages(Math.ceil(privateRepo.length / 12));
  } catch (error) {
    console.error('Error fetching repositories:', error);
  } finally {
    setIsLoading(false);
  }
};

function Repositories() {
  const [publicRepositories, setPublicRepositories] = useState([]);
  const [privateRepositories, setPrivateRepositories] = useState([]);
  const [totalPublicPages, setTotalPublicPages] = useState(1);
  const [totalPrivatePages, setTotalPrivatePages] = useState(1);
  const [repositoriesType, setRepositoriesType] = useState('Public');
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  const accessToken = useAccessToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      navigate('/');
    } else {
      fetchRepositories(
        accessToken,
        setPublicRepositories,
        setPrivateRepositories,
        setTotalPublicPages,
        setTotalPrivatePages,
        setIsLoading,
      );
    }
  }, [accessToken, navigate]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleChangeRepositoriesType = (type) => {
    setRepositoriesType(type);
    setPage(1);
  };

  const displayedRepos = (
    repositoriesType === 'Public'
      ? publicRepositories
      : privateRepositories
  ).slice((page - 1) * 12, page * 12);

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: 'calc(100vh - 64px)',
        maxHeight: 'calc(100vh - 64px)',
        padding: '0.5rem',
      }}
    >
      {isLoading ? (
        <ProgressBar />
      ) : (
        <>
          <PaperWrapper marginTop="1rem" padding="1rem">
            <AppBar
              color="primary"
              position="static"
              sx={{ borderRadius: '4px', marginBottom: '1rem' }}
            >
              <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  Repositories
                </Typography>
                <Button
                  variant={repositoriesType === 'Public' ? 'outlined' : 'text'}
                  color="inherit"
                  onClick={() => handleChangeRepositoriesType('Public')}
                >
                  Public
                </Button>
                <Button
                  variant={repositoriesType === 'Private' ? 'outlined' : 'text'}
                  color="inherit"
                  onClick={() => handleChangeRepositoriesType('Private')}
                >
                  Private
                </Button>
              </Toolbar>
            </AppBar>

            <Grid container spacing={3}>
              {displayedRepos.length > 0 ? (
                displayedRepos.map((repo) => (
                  <Grid item xs={12} sm={6} md={4} key={repo.id}>
                    <CardWithRepositories
                      name={repo.name}
                      url={repo.html_url}
                      owner={repo.owner.login}
                    />
                  </Grid>
                ))
              ) : (
                <Grid item xs={12}>
                  <CardWithRepositories name="Repositories not found" />
                </Grid>
              )}
            </Grid>
          </PaperWrapper>
          <Box mt="auto" display="flex" justifyContent="center">
            <Pagination
              count={repositoriesType === 'Public' ? totalPublicPages : totalPrivatePages}
              page={page}
              onChange={handlePageChange}
              color="primary"
              sx={{ marginBottom: '1rem' }}
            />
          </Box>
        </>
      )}
    </Container>
  );
}

export default Repositories;
