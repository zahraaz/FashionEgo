
import { useState, useContext } from "react";
import { Link as RouterLink } from 'react-router-dom';
import { api } from "../Api/Axios"
import { AuthContext } from "../Context/authContext";
import { useHistory } from 'react-router-dom';
import {  Stack, Link, Box, Typography, Button, Divider } from '@mui/material';
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

const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [errors, setErrors] = useState();
    const authProvider = useContext(AuthContext);
    const history = useHistory();
    const [showPassword, setShowPassword] = useState(false);
    const [remember, setRemember] = useState(false);



    function handleSubmit(event) {
        event.preventDefault();
        console.log("submit");

        const errors = validationForm();
        if (errors?.length > 0) {
            setErrors(errors);
            console.log(errors)
            return
        }
        // console.log({ email, password })

        api.post('/login', {
            email,
            password
        }).then((res) => {

            authProvider.login(res.data)
            history.push('/');
            console.log(res.data);
        }).catch((err) => { 
            console.log(err);
        });
    };

    function validationForm() {
        const errors = [];
        if (email?.length === 0) {
            errors.push("email is require")
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
        <div>
                <ContentStyle >
                    <Box sx={{ mb: 5 }}>
                        <Typography variant="h4" gutterBottom
                          sx={{ color: "#d1855b " }}>
                            Sign in
                        </Typography>
                        <Typography sx={{ color: 'text.secondary' }}>Enter your details below.</Typography>
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



                    <form onSubmit={handleSubmit} >
                        <Stack spacing={3}>


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
                                    sx={{ color: "#d1855b " }}
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
                            Login
                        </Button>
                    </form>
                    {errors && <p style={{ color: "red" }}>{errors.join("\n")}</p>}
                    <Typography
                        variant="body2" align="center" sx={{ mt: 3 }}>
                        Don’t have an account?&nbsp;
                        <Link sx={{ color: "#d1855b " }} underline="none" variant="subtitle2" component={RouterLink} to="signup">
                            Get started
                        </Link>
                    </Typography>
                </ContentStyle>
                </div>
    );
}

export default Login;


