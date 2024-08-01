import React from "react";
import { Box, Card, CardContent, Typography, Link } from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";

const CardWithUsers = ({ name, key, onClick }) => {
  return (
      <Card onClick={() => onClick} key={key} sx={{marginBottom: "0.5rem"}}>
        <CardContent>
          <Box display="flex" alignItems="center" mb={0.5}>
            <FolderIcon color="primary" />
            <Typography variant="h5" ml={0.5}>
              {name}
            </Typography>
          </Box>
        </CardContent>
      </Card>
  );
}

export default CardWithUsers;
