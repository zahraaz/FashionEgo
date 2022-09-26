// import { Container, Typography, Button, Grid } from '@mui/material';
// import Box from '@mui/material/Box';
// import Link from '@mui/material/Link';
// import { Link as RouterLink } from 'react-router-dom';
// import { useState } from "react"
// import { useCart } from "react-use-cart";
// // ------------------------------------------------


// const Bag = () => {
//     const {
//       isEmpty,
//       items,
//       updateItemQuantity,
//       removeItem,
//     } = useCart();
//     const { cartTotal } = useCart();
  
//     if (isEmpty) return <p>Your Bag is empty</p>;
  
//     return (
//       <>
//         <h1>Bag </h1>
  
//         <ul>
//           {items.map((item) => (
//             <li key={item.id}>
//               {item.quantity} x {item.name} &mdash;
//               <button
//                 onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
//               >
//                 -
//               </button>
//               <button
//                 onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
//               >
//                 +
//               </button>
//               <button onClick={() => removeItem(item.id)}>&times;</button>
//             </li>
//           ))}
//         </ul>
//     <div>
//       <Container>
      
   

//         <Button
//           fullWidth
//           size="large"
//           type="submit"
//           variant="contained"
//           style={{
//             backgroundColor: "#d1855b"
//           }}
//         >
//           Checkout
//         </Button>

//       </Container>
//     </div>
//     </>
//   );
// }

// export default Bag;





















// import React, {useContext} from 'react';
// import {CartContext} from './CartContext';

// export const Cart = () => {
//   const [cart, setCart] = useContext(CartContext);
//   const totalPrice = cart.reduce((acc, curr) => acc + curr.price, 0);

//   return (
//     <div>
//       <span>items in cart : {cart.length}</span>
//       <br />
//       <span>total price : {totalPrice}</span>
//     </div>
//   )
// }