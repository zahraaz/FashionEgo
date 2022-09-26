import { useState } from "react";
import { api } from "../Api/Axios"
import { useHistory } from 'react-router-dom';
import { Stack, Box, Typography, Button } from '@mui/material';
import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
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

const Order = () => {

    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [errors, setErrors] = useState();
    const history = useHistory();


    // ----------------------------------------------------------------------


    function handleSubmit(event) {
        event.preventDefault();
        console.log("submit");

        const errors = validationForm();
        if (errors?.length > 0) {
            setErrors(errors);
            console.log(errors)
            return
        }
        console.log({ city, address })
    }


    api.post('/products', {
        city,
        address
    })

        .then((res) => {
            history.push('/');
            console.log('Success:', res.data);
        })
        .catch((err) => {
            console.error('Error:', err);
        });



    function validationForm() {
        const errors = [];
        if (city?.length === 0) {
            errors.push("")
        }
        if (address?.length === 0) {
            errors.push("")
        }
        if (address?.length < 8) {
            errors.push("")
        }
        return errors;
    }


    return (
        <>
            <ContentStyle >
                <Box sx={{ mb: 5 }}>
                    <Typography variant="h4" gutterBottom
                        sx={{ color: "#d1855b " }}>
                        order now
                    </Typography>
                </Box>
                <form onSubmit={handleSubmit} >
                    <Stack spacing={3}>
                        <TextField
                            fullWidth
                            onChange={(event) => setCity(event.target.value)}
                            value={city}
                            type="text"
                            label='enter your city'
                            required

                        />
                        <TextField
                            fullWidth
                            onChange={(event) => setAddress(event.target.value)}
                            value={address}
                            type="text"
                            label="please enter your full address"
                            required
                        />
                    </Stack>
                    <Button
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                        style={{
                            top: "30px",
                            backgroundColor: "#d1855b"
                        }}
                    >
                        submit
                    </Button>
                </form>
                {errors && <p style={{ color: "red" }}>{errors.join("\n")}</p>}
            </ContentStyle>
        </>
    );
}
export default Order;