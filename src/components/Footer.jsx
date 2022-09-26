import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

// ------------------------------------------------


const Footer = () => {
  const Year = new Date().getFullYear();
  return (
    <div>
       <hr/>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{ backgroundColor: '#282c34' }}>
          <Toolbar>
            <Typography
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <Button> <a href="https://www.instagram.com/zahraa__mahmod/"><InstagramIcon style={{ color: '#fff7e7' }} /></a> </Button>
              <Button> <a href="https://www.facebook.com/"><FacebookIcon style={{ color: '#fff7e7' }} /></a> </Button>
              <Button color="inherit"> <a href=" https://twitter.com/"> <TwitterIcon style={{ color: '#fff7e7' }} /></a></Button>
            </Typography>
           
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>


           
              <p> ⓒ {Year} FASHIONEGO All Rights Reserverd.</p>
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>

    </div>
  );
}

export default Footer;