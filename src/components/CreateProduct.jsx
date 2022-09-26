import { useState } from "react";
import { api } from "../Api/Axios"
import { useHistory } from 'react-router-dom';
import { Stack, Box, Typography, Button } from '@mui/material';
import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Input } from "@mui/material";
import LoadingBox from '../components/loadingbox';

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

const CreateProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [imagePath, setImagePath] = useState();
    const [description, setDescription] = useState();
    const [size, setSize] = useState();
    const [color, setColor] = useState();
    const [type, setType] = useState();
    const [fabric, setFabric] = useState();
    const [designer, setDesigner] = useState();
    const [quantity, setQuantity] = useState();
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
        console.log({ name, price, imagePath, description, size, color, type, fabric, designer, quantity })
        var formData = new FormData(); // Currently empty
        formData.append('name', name);
        formData.append("price", `${price}`);
        formData.append("imagepath", imagePath.name);
        formData.append("image", imagePath);
        formData.append("description", description);
        formData.append("size", size);
        formData.append("color", color);
        formData.append("type", type);
        formData.append("fabric", fabric);
        formData.append("designer", designer);
        formData.append("quantity", `${quantity}`);
        for (var p of formData) {
            console.log(p)
        }

        api({
            method: 'post',
            url: "/products",
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then((res) => {
                history.push('/');
                console.log('Success:', res.data);
            })
            .catch((err) => {
                console.error('Error:', err);
            });

    }



    function validationForm() {
        const errors = [];
        if (name?.length === 0) {
            errors.push("")
        }
        if (description?.length === 0) {
            errors.push("")
        }
        if (description?.length < 8) {
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
                        create product
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>Enter your product details below.</Typography>
                </Box>

                <form onSubmit={handleSubmit} >
                    <Stack spacing={3}>


                        <TextField
                            fullWidth
                            onChange={(event) => setName(event.target.value)}
                            value={name}
                            type="text"
                            label="product name"
                            required
                        />
                        <TextField
                            fullWidth
                            onChange={(event) => setPrice(event.target.value)}
                            value={price}
                            type="number"
                            label="product price"
                            required

                        />
                        {/* <TextField
                            fullWidth
                            onChange={(event) => setImage(event.target.file)}
                            type="file"
                            required

                        /> */}
                        {/* <input type="file"  fullWidth
                            onChange={(event) => setImage(event.target.file)}
                            required
                            /> */}
                        {/* <Button
                            variant="contained"
                            component="label"
                        >
                            Upload File
                            <input
                                type="file"
                                onChange={(event) => setImage(event.target.file)}
                                hidden
                            />
                        </Button> */}
                        {/* <label htmlFor="contained-button-file">
                            <Input accept="image/*" id="contained-button-file" multiple type="file" />
                            <Button variant="contained" component="span">
                                Upload
                            </Button>
                        </label> */}
                        <label htmlFor="contained-button-file">
                            <Input id="contained-button-file" type="file"
                                onChange={(event) => { console.log(event.target.files[0]); setImagePath(event.target.files[0]) }} />
                            <Button variant="contained" component="span">
                                Upload
                            </Button>
                        </label>


                        <TextField
                            fullWidth
                            onChange={(event) => setDescription(event.target.value)}
                            value={description}
                            type="text"
                            label="product description"
                            required
                        />

                        <TextField
                            fullWidth
                            onChange={(event) => setSize(event.target.value)}
                            value={size}
                            type="text"
                            label="product size"
                            required
                        />

                        <TextField
                            fullWidth
                            onChange={(event) => setColor(event.target.value)}
                            value={color}
                            type="text"
                            label="product color"
                            required
                        />

                        <TextField
                            fullWidth
                            onChange={(event) => setType(event.target.value)}
                            value={type}
                            type="text"
                            label="product type"
                            required
                        />

                        <TextField
                            fullWidth
                            onChange={(event) => setFabric(event.target.value)}
                            value={fabric}
                            type="text"
                            label="product fabric"
                            required
                        />

                        <TextField
                            fullWidth
                            onChange={(event) => setDesigner(event.target.value)}
                            value={designer}
                            type="text"
                            label="product designer"
                            required
                        />

                        <TextField
                            fullWidth
                            onChange={(event) => setQuantity(event.target.value)}
                            value={quantity}
                            type="number"
                            label="product quantity"
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
                        Create Product
                    </Button>
                </form>
                {errors && <p style={{ color: "red" }}>{errors.join("\n")}<LoadingBox /></p>}
            </ContentStyle>

        </>
    );
}

export default CreateProduct;
