import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Slider from '../components/slider';
import { api } from "../Api/Axios"
//  import MessageBox from '../components/messagebox';
// import LoadingBox from '../components/loadingbox';

// ----------------------------------------------------------------------

const Home = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        api.get('/products')
            .then((res) => {
                console.log(res.data);
                setProducts(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    console.log([],products)
    return (
        <>
            <div>
                <Slider /> 

                <Box
                    margin='20px 50px'
                    sx={{
                        display: 'flex', flexWrap: 'wrap', '& > :not(style)': {
                            m: 1,
                            width: 330,
                            height: 428,
                            justifyContent: 'center',
                            alignItems: 'center',

                        },
                    }}>
                    {
                        products.map((product) => (
                            <Paper elevation={12} >

                                <Link
                                    sx={{ color: "#d1855b " }}
                                    underline="none" variant="subtitle2"
                                    component={RouterLink} to={`/product/${product.id}`}>

                                    <img src={`http://localhost:8000/images/${product.imagePath.split('\\')[2]}`} alt={product.name}

                                        height='330' width='330'
                                        style={{
                                            top: 0,
                                            objectFit: 'cover',
                                        }}
                                    />
                                </Link>
                                <Link
                                    underline="none" variant="subtitle2"
                                    component={RouterLink} to={`/product/${product.id}`}>
                                    <Typography gutterBottom variant="h5" component="div"
                                        style={{
                                            color: '#d1855b',
                                            fontWeight: 'bold',
                                        }} >
                                        {product.name}
                                    </Typography>

                                    <Typography variant="h6" color="text.secondary">
                                        ${product.price}
                                    </Typography>
                                </Link>
                            </Paper>
                        ))}
                </Box>
            </div >
        </>
    );
}
export default Home;
