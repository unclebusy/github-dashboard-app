import React, { useState, useEffect } from "react";
import axios from "axios";
import {Typography, Grid, Container, Box, CircularProgress, Button} from "@mui/material";
import Pagination from '@mui/material/Pagination';
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import CardWithRepositories from "../components/CardWithRepositories";
import PaperWrapper from "../components/PaperWrapper";

const Repositories = () => {
  const [publicRepositories, setPublicRepositories] = useState([]);
  const [privateRepositories, setPrivateRepositories] = useState([]);
  const [totalPublicPages, setTotalPublicPages] = useState(1);
  const [totalPrivatePages, setTotalPrivatePages] = useState(1);
  const [repositoriesType, setRepositoriesType] = useState('Public');
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  const reposPerPage = 9;

  const fetchRepositories = async () => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      console.error('No access token found');
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    try {
      const { data: profile } = await axios.get('https://api.github.com/user', {
        headers: { Authorization: `token ${token}` }
      });
      const { data: repos } = await axios.get(profile.repos_url);
      const publicRepo = repos.filter(repo => !repo.private);
      const privateRepo = repos.filter(repo => repo.private);

      setPublicRepositories(publicRepo);
      setPrivateRepositories(privateRepo);
      setTotalPublicPages(Math.ceil(publicRepo.length / reposPerPage));
      setTotalPrivatePages(Math.ceil(privateRepo.length / reposPerPage));
    } catch (error) {
      console.error('Error fetching repositories:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRepositories();
  }, []);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleChangeRepositoriesType = (type) => {
    setRepositoriesType(type);
    setPage(1);
  };

  const displayedRepos = (repositoriesType === 'Public' ? publicRepositories : privateRepositories).slice((page - 1) * reposPerPage, page * reposPerPage);

  return (
      <Container sx={{ display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 64px)', padding: '2rem' }}>
        {isLoading ? (
            <Container maxWidth="sm" sx={{ display: 'flex', height: 'calc(100vh - 64px)', alignItems: 'center', justifyContent: 'center' }}>
              <CircularProgress />
            </Container>
        ) : (
            <>
              <Box sx={{ marginBottom: "2rem"}}>
                <AppBar position="static" sx={{ borderRadius: '4px' }}>
                  <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                      Repositories
                    </Typography>
                    <Button variant={repositoriesType === 'Public' ? "outlined" : "text"} color="inherit" onClick={() => handleChangeRepositoriesType('Public')}>Public</Button>
                    <Button variant={repositoriesType === 'Private' ? "outlined" : "text"} color="inherit" onClick={() => handleChangeRepositoriesType('Private')}>Private</Button>
                  </Toolbar>
                </AppBar>

                <PaperWrapper>
                  <Grid container spacing={3}>
                    {displayedRepos.length > 0 ? (
                        displayedRepos.map(repo => (
                            <Grid item xs={12} sm={6} md={4} key={repo.id}>
                              <CardWithRepositories name={repo.name} url={repo.html_url} owner={repo.owner.login} />
                            </Grid>
                        ))
                    ) : (
                        <Grid item xs={12}>
                          <CardWithRepositories name={'Repositories not found'} />
                        </Grid>
                    )}
                  </Grid>
                </PaperWrapper>
              </Box>
              <Box mt="auto" display="flex" justifyContent="center">
                <Pagination
                    count={repositoriesType === 'Public' ? totalPublicPages : totalPrivatePages}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                    sx={{ marginTop: '2rem' }}
                />
              </Box>
            </>
        )}
      </Container>
  );
}

export default Repositories;
