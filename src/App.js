import './App.css';
import * as React from 'react';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {BrowserRouter, Link, Route, Routes} from 'react-router-dom';

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

import Home from './components/home';
import Customers from './components/customers';
import Trainings from './components/Trainings';

function App() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleClick}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={handleClose}>
                <Link to="/"><Button variant="text" color="primary">Home</Button></Link>{''}
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link to="/customers"><Button variant="text" color="primary">Customers</Button></Link>{''}
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link to="/trainings"><Button variant="text" color="primary">Trainings</Button></Link>{''}
              </MenuItem>
            </Menu>

            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              PersonalTrainer
            </Typography>
          </Toolbar>
        </AppBar>

      
        <Routes>
          <Route path="/" element ={ <Home /> } />
          <Route path="/customers" element ={ <Customers /> } />
          <Route path="/trainings" element ={ <Trainings /> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
