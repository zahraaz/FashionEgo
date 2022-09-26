import { useEffect, useState } from 'react';
import { api } from '../Api/Axios';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
// import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
// import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';


// ----------------------------------------------------------------------

// const Item = styled(Paper)(({ theme }) => ({
//     ...theme.typography.body2,
//     padding: theme.spacing(1),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
// }));

// ----------------------------------------------------------------------


const Product = (props) => {
 const[bag , setBag] = useState([]);
    const { id: productId } = useParams();
    const [product, setProduct] = useState({});
    
    // const productId = props.match.params.productId;
    //   const [quantity,setQuantity]= useState(1);

   
    useEffect(() => {

        api.get(`/products/${productId}`)
            .then((res) => {
                console.log(productId);
                setProduct(res.data)
                console.log(res.data);
      
            })

            .catch((err) => {
                console.log(err);
            });
    }, [productId]);
 
   const AddToBag =(product)=>{
        setBag([...bag ,product]);
           console.log("submit");
       }










    return (

        <Box sx={{ width: '100%' }}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
                <Grid item xs={6}>
                    <item>
                        <Box m={2} pt={3}>
                            <img src={'http://localhost:8000/images/' + `${product.imagePath}`.split('\\')[2]}
                                alt='product image'
                                padding='60px'
                                margin='1000px 0'
                                height='600px'
                                width='400px'
                                sx={{
                                    objectFit: 'cover',
                                }} />
                        </Box>
                    </item>
                </Grid>
               



                <Grid item xs={6} >
                    <Box m={2} pt={3}>
                        <Typography variant="h4"
                            style={{
                                fontFamily: "Lucida Console",
                                fontWeight: 'bold',
                            }}
                        >
                            {product.name}
                        </Typography>
                        <Typography

                            style={{
                                fontFamily: "Lucida Console",
                                fontWeight: 'bold',
                                marginBottom: '10px',
                                marginTop: '10px',
                            }}>
                            price: $ {product.price}
                        </Typography>

                        <Typography
                            variant='caption' display="block"
                            style={{
                                fontFamily: "Lucida Console",
                                marginBottom: '10px',
                                marginTop: '10px',

                            }}>
                            {product.description}
                        </Typography>

                        <Typography
                            style={{
                                fontFamily: "Lucida Console",
                                fontWeight: 'bold',
                                marginBottom: '10px',
                                marginTop: '10px',
                            }}>
                            Size : {product.size}
                        </Typography>
                        <Typography
                            style={{
                                fontFamily: "Lucida Console",
                                fontWeight: 'bold',
                                marginBottom: '10px',
                                marginTop: '10px',
                            }}>
                            Color : {product.color}
                        </Typography>

                        <Typography
                            style={{
                                fontFamily: "Lucida Console",
                                fontWeight: 'bold',
                                marginBottom: '10px',
                                marginTop: '10px',
                            }} >
                            Designer : {product.designer}
                        </Typography>


                        <Typography
                            style={{
                                fontFamily: "Lucida Console",
                                fontWeight: 'bold',
                                marginBottom: '10px',
                                marginTop: '10px',
                            }}>

                            Type:{product.type}
                        </Typography>
                        <Typography
                            style={{
                                fontFamily: "Lucida Console",
                                fontWeight: 'bold',
                                marginBottom: '10px',
                                marginTop: '10px',
                            }}>
                            Fabric:{product.fabric}
                        </Typography>

                        <Button
                            size='large'
                            variant='contained'
                            style={{ backgroundColor: "#d1855b" }}
                            onClick={()=>AddToBag(product)} 
                           >
                            Add To The Bag
                        </Button>
                    </Box>
                </Grid>
                console.log(product.id);
                        

            </Grid>
        </Box>

    )
                        }
export default Product;