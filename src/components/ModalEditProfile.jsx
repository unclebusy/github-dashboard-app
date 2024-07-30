import React from 'react';
import { Box, Typography, Modal, TextField, Button } from '@mui/material';

const ModalEditProfile = ({ open, handleClose, editedProfile, setEditedProfile, handleSaveProfile }) => {
  return (
      <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Profile
          </Typography>
          <TextField
              margin="normal"
              fullWidth
              label="Name"
              value={editedProfile.name || ''}
              onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
          />
          <TextField
              margin="normal"
              fullWidth
              label="Email"
              value={editedProfile.email || ''}
              onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
          />
          <TextField
              margin="normal"
              fullWidth
              label="Company"
              value={editedProfile.company || ''}
              onChange={(e) => setEditedProfile({ ...editedProfile, company: e.target.value })}
          />
          <TextField
              margin="normal"
              fullWidth
              label="Location"
              value={editedProfile.location || ''}
              onChange={(e) => setEditedProfile({ ...editedProfile, location: e.target.value })}
          />
          <TextField
              margin="normal"
              fullWidth
              label="Bio"
              value={editedProfile.bio || ''}
              onChange={(e) => setEditedProfile({ ...editedProfile, bio: e.target.value })}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
            <Button variant="contained" color="primary" onClick={handleSaveProfile}>
              Save
            </Button>
            <Button variant="outlined" color="error" onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
  );
};

export default ModalEditProfile;
