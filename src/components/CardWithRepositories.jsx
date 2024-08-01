import React from "react";
import { Box, Card, CardContent, Typography, Link } from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";

const CardWithRepositories = ({ name, url, owner }) => {
  const cardStyle = {
    width: name !== 'Repositories not found' ? "auto" : "fit-content",
    minWidth: 200,
  }

  return (
      <Card sx={cardStyle}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: 2 }}>
          <Box display="flex" alignItems="center" mb={0.5}>
            <FolderIcon color="primary" />
            <Typography variant="h5" ml={0.5}>
              {name}
            </Typography>
          </Box>
          <Typography variant="body2" color="textSecondary" noWrap style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
            <Link href={url} target="_blank" rel="noopener noreferrer">{url}</Link>
          </Typography>
          {owner && (
              <Typography variant="body2" color="textSecondary" mt={0.25}>
                Owner: {owner}
              </Typography>
          )}
        </CardContent>
      </Card>
  );
}

export default CardWithRepositories;
