import React from 'react';
import { Box, Card, CardContent, Typography, Link } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';

function CardWithRepositories({ name, url, owner }) {
  const cardStyle = {
    width: name !== 'Repositories not found' ? 'auto' : 'fit-content',
    minWidth: 200,
  };

  return (
    <Card sx={cardStyle}>
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          padding: 2,
        }}
      >
        <Box display="flex" alignItems="center" mb={0.5} width="100%">
          <FolderIcon color="primary" />
          <Typography
            variant="h5"
            ml={0.5}
            noWrap
            sx={{ overflow: 'hidden', textOverflow: 'ellipsis', flexGrow: 1 }}
          >
            {name}
          </Typography>
        </Box>
        <Typography
          variant="body2"
          color="textSecondary"
          noWrap
          sx={{ overflow: 'hidden', textOverflow: 'ellipsis', width: '100%' }}
        >
          <Link
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              display: 'block',
              width: '100%',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {url}
          </Link>
        </Typography>
        {owner && (
          <Typography
            variant="body2"
            color="textSecondary"
            mt={0.25}
            noWrap
            sx={{ overflow: 'hidden', textOverflow: 'ellipsis', width: '100%' }}
          >
            Owner: {owner}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}

export default CardWithRepositories;
