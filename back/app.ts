import * as express from 'express';
import * as cors from 'cors';
import { join } from 'path';

//* Loads the environment variables from the .env file 
import { config } from 'dotenv';                                                             
config();                                           

import isAuth from './middleware/isAuth';
import productRoutes from './routes/productRoute'
import usersRoutes from './routes/userRoute';
import orderRoutes from './routes/orderRoute';
import authenticationRoutes from './auth/route';
import Product from './entity/productEntity';
import Order from './entity/orderEntity';
import User from './entity/userEntity';
import { createConnection } from "typeorm";

// create backend application
const app = express();
app.use(cors());

// creates connection with the database
createConnection({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "fashionego",
    entities: [
        Product,
        User,
        Order,
    ],
    logger: 'simple-console',
    logging: true,
    synchronize: true,
}).then(connection => {

    
    app.use('/', authenticationRoutes)
    // we used express static middleware here to serve static files
    app.use('/images', express.static(join('public', 'images')))

    // is a middleware for checking whether 
    // the user is logged in or not
    app.use(isAuth);
    app.use('/users', usersRoutes)
    app.use('/products',productRoutes)
    app.use('/orders', orderRoutes)

    app.listen(8000, 'localhost', () => {
        console.log(" 🚀🚀🚀 the server link is " + 'http://localhost:8000');
    })
    
}).catch(error => console.log(error));