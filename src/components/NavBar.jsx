import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Device issues
          </Typography>
          <Link to="/formpage"style={{ textDecoration: 'none', color: 'inherit' }}>
          <IconButton color="inherit" >
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Add a new device
          </Typography>
            <AddIcon></AddIcon>
          </IconButton>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}