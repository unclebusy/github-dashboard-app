import React, {useState} from "react";
import {Grid, Modal, Pagination, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import PaperWrapper from "./PaperWrapper";
import CardWithRepositories from "./CardWithRepositories";

const ModalSearchedReposUser = ({showUserRepos, handleClose, repos}) => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 12;

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const displayedRepos = repos.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
      <Modal
          open={showUserRepos}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          bgcolor: 'background.paper',
          border: '1px solid #000',
          borderRadius: "4px",
          boxShadow: 24,
          p: 4,
        }}>
          <PaperWrapper padding='1rem' marginTop="1rem">
            <PaperWrapper padding="1rem" marginTop="0" marginBottom="1rem" bgColor="#1976D2" >
              <Typography color="white" variant="h6" component="div" sx={{flexGrow: 1}}>
                Repositories found: {repos.length}
              </Typography>
            </PaperWrapper>
            <Grid container spacing={3}>
              {displayedRepos.length > 0 ? (
                  displayedRepos.map(repo => (
                      <Grid item xs={12} sm={6} md={4} key={repo.id}>
                        <CardWithRepositories name={repo.name} url={repo.html_url} />
                      </Grid>
                  ))
              ) : (
                  <Grid item xs={12}>
                    <CardWithRepositories name={'Repositories not found'} />
                  </Grid>
              )}
            </Grid>
          </PaperWrapper>
          <Box mt="auto" display="flex" justifyContent="center">
            <Pagination
                count={Math.ceil(repos.length / itemsPerPage)}
                page={page}
                onChange={handlePageChange}
                color="primary"
                sx={{ marginTop: '2rem' }}
            />
          </Box>
        </Box>
      </Modal>
  )
}

export default ModalSearchedReposUser;

