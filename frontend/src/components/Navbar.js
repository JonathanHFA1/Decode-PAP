import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import HouseIcon from '@mui/icons-material/House';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { userLogoutAction } from '../redux/actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
import Logo from '../assets/Logo.png';

import { createTheme } from '@mui/material/styles';

const pages = ['Home', 'Log In'];

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.signIn);

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // log out user
  const logOutUser = () => {
    dispatch(userLogoutAction());
    window.location.reload(true);
    setTimeout(() => {
      navigate('/');
    }, 500);
  };

  return (
    <AppBar position="static" color="transparent">
      <Container>
        {/* principal Menu */}
        <Toolbar disableGutters>
          <div
            className="hidden cursor-pointer items-center font-[Poppins] text-2xl font-bold  text-gray-800 mr-10 md:flex">
            <a href={'/'}>
              <img src={Logo} alt={'Decode Logo'} className="h-[33px] w-[65px]" />
            </a>
          </div>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleOpenNavMenu} color="inherit">
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <HouseIcon sx={{ display: { xs: 'flex', md: 'none', justifyContent: 'center' }, mr: 1 }} />
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {/* menu desktop */}

            <Typography onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block', mr: 2 }}>
              <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
                Home
              </Link>
            </Typography>

            <Typography onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block', mr: 2 }}>
              <Link to="/register" style={{ color: 'white', textDecoration: 'none' }}>
                Sing In
              </Link>
            </Typography>

            

            <Typography onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block', mr: 2 }}>
              <Link to="/livrosloja" style={{ color: 'white', textDecoration: 'none' }}>
                Livros
              </Link>
            </Typography>

            <Typography onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block', mr: 2 }}>
              <Link to="/AboutUs" style={{ color: 'white', textDecoration: 'none' }}>
                About Us
              </Link>
            </Typography>
            <Typography onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block', mr: 2 }}>
              <Link to="../UserChat" style={{ color: 'white', textDecoration: 'none' }}>
                Chat
              </Link>
            </Typography>
          </Box>


          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="" />
              </IconButton>
            </Tooltip>
            <Menu
              PaperProps={{
                sx: {
                  '& 	.MuiMenu-list': {
                    bgcolor: '#252525',
                    color: 'black',
                  },
                },
              }}
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center" color="white">
                  <Link style={{ textDecoration: 'none' }} to="/admin/dashboard">
                    Admin{' '}
                  </Link>
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center" color="white" className='text-black md:text-white'>
                  <Link style={{ textDecoration: 'none' }} to="/user/dashboard">
                    User{' '}
                  </Link>
                </Typography>
              </MenuItem>
              {userInfo ? (
                <MenuItem onClick={logOutUser}>
                  <Typography textAlign="center" color="#8e67b2">
                    Log Out{' '}
                  </Typography>
                </MenuItem>
              ) : (
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center" color="white">
                    <Link style={{ textDecoration: 'none' }} to="/login">
                      Login{' '}
                    </Link>
                  </Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
