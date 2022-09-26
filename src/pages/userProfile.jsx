// import Avatar from '@mui/material/Avatar';
// import {Card , CardMedia ,CardContent, Typography} from '@mui/material';
// import { styled } from '@mui/material/styles';
// import {useState , useEffect} from 'react';
// import { api } from "../Api/Axios"

// // ----------------------------------------------------------------------

// const ContentStyle = styled('div')(({ theme }) => ({
//     maxWidth: 480,
//     margin: 'auto',
//     display: 'flex',
//     minHeight: '100vh',
//     flexDirection: 'column',
//     justifyContent: 'center',
//     padding: theme.spacing(2, 0)
// }));

// // ----------------------------------------------------------------------



// const UserProfile = () => {
// const [users , setUsers] = useState('');
//   useEffect(() => {
//     api.get('/users`/${userId}`')
//         .then((res) => {
//             console.log(res.data);
//             setUser(res.data);
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// }, []);
//  return(
//      <div>
//  <ContentStyle>
      
// <Avatar variant="rounded"
  
//        >
//        <PersonOutlineIcon  sx={{ fontSize: 1000 }} />
//        </Avatar> 
//   {users.map((user) => (
//       <CardMedia align="center">
//         <Avatar
//           alt="unknown girl icon"
//           src='/pic/unknownIcon.png'
//           sx={{ height: 300,
//         width:300 }}
//         />
//       </CardMedia>

//       <CardContent 

//       sx={{
//           display: 'flex',
//           flexWrap: 'wrap', '& > :not(style)': {
//               m: 2,
//               width: 480,
//               height: 150,
//               justifyContent: 'center',
//               alignItems: 'center',
//           },
//       }}>
//         <Typography
//           variant="h2"
//           align="center"
//         >
       
//         </Typography>
//         <Typography
//           variant="h2"
//           align="center"
//         >{user.email}
//         </Typography>
        
       
//       </CardContent>
//     </Card>

//       </ContentStyle>
  
//     </div>
// )

// }
// export default UserProfile;