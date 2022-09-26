import Button from '@mui/material/Button';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import logo from '../assets/logo.png';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@mui/material';
import { AuthContext } from "../Context/authContext";
import { useContext , useState} from "react";
import PersonIcon from '@mui/icons-material/Person';
import DashboardIcon from '@mui/icons-material/Dashboard';

// ------------------------------------------------


const Header = () => {
  const [count, setCount] = useState(0);
  const { isAuth, user } = useContext(AuthContext);

  return (
    <>
      <div>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" style={{ backgroundColor: '#d1855b', color: '#FFFFFF' }}>
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <img src={logo} alt="logo" />
              </IconButton>
              <Typography variant="h6" component="div" sx={{
                flexGrow: 1,
                fontWeight: "bold",
                fontFamily: "Lucida Console"
              }}>
                FashionEgo
              </Typography>
              {!isAuth && (
                <div>
                  <Button ><Link style={{ color: '#fff7e7', textDecoration: "none", fontFamily: "Lucida Console" }} 
                  component={RouterLink} to="signup"> signUp</Link></Button>
                  <Button ><Link style={{ color: '#fff7e7', textDecoration: "none" }} component={RouterLink} to='login'>
                     Login</Link> </Button>
                </div>
              )}
              {isAuth && (
                <div>
                  <Button ><Link style={{ color: '#fff7e7', textDecoration: "none" }} component={RouterLink} to='logout'>
                     LogOut</Link> </Button>
                  <Button ><Link style={{ color: '#fff7e7' }} component={RouterLink} to='bag'>
                  <ShoppingBagIcon /> 
                  </Link></Button>
                </div>
              )}

             {!user.role == 1 && (
                <div>
                   <Button ><Link style={{ color: '#fff7e7' }} component={RouterLink} to='userprofile'> <PersonIcon /> </Link></Button>
                </div>
              )}
              {user.role == 1 && (
                <div>
                  <Button ><Link style={{ color: '#fff7e7' }} component={RouterLink} to='admin/dashboard'> <DashboardIcon /> </Link></Button>
                </div>
              )}

            </Toolbar>
          </AppBar>
        </Box>
      </div>
    </>
  );
}


export default Header;

