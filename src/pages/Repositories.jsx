import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {Card, CardContent, Typography, Grid, Container, Box, CircularProgress, Button} from "@mui/material";
import Pagination from '@mui/material/Pagination';
import FolderIcon from '@mui/icons-material/Folder';
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";

const Repositories = () => {
  const [repositories, setRepositories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();

  const reposPerPage = 9;
  const displayedRepos = repositories.slice((page - 1) * reposPerPage, page * reposPerPage);

  const fetchRepositories = async () => {
    const token = localStorage.getItem('access_token');
    try {
      const response = await axios.get('https://api.github.com/user', {
        headers: { Authorization: `token ${token}` }
      });
      const profile = response.data;
      const reposResponse = await axios.get(profile.repos_url);
      setRepositories(reposResponse.data);
      setTotalPages(Math.ceil(reposResponse.data.length / reposPerPage));
    } catch (error) {
      console.error('Error fetching repositories:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleGoToPublicRepositories = () => {
    navigate('/repositories')
  }

  useEffect(() => {
    fetchRepositories();
  }, []);

  return (
      <Container style={{ display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 64px)', padding: '2rem'}}>
        {isLoading ?
            <Container maxWidth="sm" sx={{ display: 'flex', height: 'calc(100vh - 64px)', alignItems: 'center', justifyContent: 'center' }}>
              <CircularProgress />
            </Container>
            :
            (
              <>
                <Box sx={{marginBottom: "2rem"}}>
                  <AppBar position="static">
                    <Toolbar>
                      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Repositories
                      </Typography>
                      <Button color="inherit" onClick={handleGoToPublicRepositories}>Public</Button>
                      <Button color="inherit">Private</Button>
                    </Toolbar>
                  </AppBar>
                </Box>
                <Grid container spacing={3}>
                  {displayedRepos.map(repo => (
                      <Grid item xs={12} sm={6} md={4} key={repo.id}>
                        <Card>
                          <CardContent>
                            <Box  display='flex' alignItems='center' sx={{marginBottom: "0.5rem"}}>
                              <FolderIcon color="primary"/>
                              <Typography variant="h5" sx={{marginLeft: '0.5rem'}}>
                                {repo.name}
                              </Typography>
                            </Box>
                            <Typography variant="body2" color="textSecondary" noWrap style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              <a href={repo.html_url} target="_blank" rel="noopener noreferrer">{repo.html_url}</a>
                            </Typography>
                            <Typography variant="body2" color="textSecondary" sx={{marginTop: "0.25rem"}}>
                              Owner: {repo.owner.login}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                  ))}
                </Grid>
                <Box mt="auto" display="flex" justifyContent="center" width="calc(100% - 64px)">
                  <Pagination
                      count={totalPages}
                      page={page}
                      onChange={handlePageChange}
                      color="primary"
                      style={{ marginTop: '20px', marginBottom: "20px" }}
                  />
                </Box>
              </>
          )}
        </Container>
    );
}

export default Repositories;
