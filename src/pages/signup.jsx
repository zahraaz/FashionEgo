import { useState, useContext } from "react";
import { Link as RouterLink } from 'react-router-dom';
import { api } from "../Api/Axios"
import { AuthContext } from "../Context/authContext";
import { useHistory } from 'react-router-dom';
import { Stack, Link, Container, Typography, Button, Divider, Box } from '@mui/material';
import { Checkbox, TextField, IconButton, InputAdornment, FormControlLabel } from '@mui/material';
import { styled } from '@mui/material/styles';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Icon } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';

// ----------------------------------------------------------------------


const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------


const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const authProvider = useContext(AuthContext);
  const history = useHistory();

  // ----------------------------------------------------------------------

  function handleSubmit(event) {
    event.preventDefault();
    console.log("submit");
    const errors = validationForm();
    if (errors.length > 0) {
      setErrors(errors);
      return
    }
    console.log({ name, email, password })

    api.post('/signup', {
      name,
      email,
      password
    }).then((res) => {
     
      authProvider.login(res.data)
      history.push('/');
      console.log(res.data);
      console.log("result", res.data)
    }).catch((err) => {
      console.log(err);
     });
  };

  function validationForm() {
    const errors = [];
    if (name?.length === 0) {
      errors.push("name is require")
    }
    if (name?.length === 3) {
      errors.push("Too Short!")
    }
    if (email?.length === 0) {
      errors.push("Email is require")
    }
    if (password?.length === 0) {
      errors.push("Password is require")
    }
    if (password?.length < 8) {
      errors.push("Password must be at least 8 char")
    }
    return errors;
  }

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleChange = (event) => {
    setRemember(event.target.value);
  };

  return (
    <>
      <div>
        <Container>
          <ContentStyle>
            <Box sx={{ mb: 5 }}>
              <Typography variant="h4" gutterBottom
             sx={{ color: "#d1855b " }} >
                Get started absolutely free.
              </Typography>
            </Box>

            <Stack direction="row" spacing={2}>
              <Button fullWidth size="large" color="inherit" variant="outlined">
                <GoogleIcon color="#DF3E30" height={24} />
              </Button>

              <Button fullWidth size="large" color="inherit" variant="outlined">
                <FacebookOutlinedIcon color="#1877F2" height={24} />
              </Button>

              <Button fullWidth size="large" color="inherit" variant="outlined">
                <TwitterIcon color="#1C9CEA" height={24} />
              </Button>
            </Stack>

            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                OR
              </Typography>
            </Divider>



            <Typography variant="body2" align="center" sx={{ color: 'text.secondary', mt: 3 }}>
              By registering, I agree to FashionEgo&nbsp;
              <Link sx={{ color: "#d1855b " }} underline="none">
                Terms of Service
              </Link>
              &nbsp;and&nbsp;
              <Link sx={{ color: "#d1855b " }} underline="none">
                Privacy Policy
              </Link>

            </Typography>
            <form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Stack spacing={3}>


                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField
                    fullWidth
                    label="Name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    type="text"
                  />
                </Stack>

                <TextField
                  fullWidth
                  onChange={(event) => setEmail(event.target.value)}
                  value={email}
                  type="email"
                  label="Email address"

                />

                <TextField
                  fullWidth
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="current-password"
                  type={showPassword ? 'text' : 'password'}
                  label="Password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleShowPassword} edge="end">
                          <Icon icon={showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />} />
                        </IconButton>
                      </InputAdornment>
                    )
                  }} />

              </Stack>

              <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
                <FormControlLabel
                  control={<Checkbox
                    checked={remember}
                    onChange={handleChange} />}
                  label="Remember me"
                />

                <Link sx={{ color: "#d1855b " }} underline="none" component={RouterLink} variant="subtitle2" to="#">
                  Forgot password?
                </Link>
              </Stack>

              <Button
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                style={{

                  backgroundColor: "#d1855b"
                }}

              >
                Sign up
              </Button>

            </form>
            {errors && <p style={{ color: "red" }}>{errors.join("\n")}</p>}
            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
              Already have an account?&nbsp;
              <Link sx={{ color: "#d1855b " }} underline="none" variant="subtitle2" component={RouterLink} to="login">
                Get started
              </Link>
            </Typography>


          </ContentStyle>
        </Container>



      </div>
    </>
  );
}
export default Signup;
