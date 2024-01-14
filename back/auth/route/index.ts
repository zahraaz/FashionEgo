import * as express from 'express';
import { body } from 'express-validator';

const router = express.Router();

import { login, signup } from '../controller/index';


// Parse the request body
// then append the data to
// the request object
router.use(express.json());

router.post('/login',
    body('email').isEmail(),
    body('password').trim().isLength({ min: 8, max: 256 }),
    login)
router.post('/signup', signup);

export default router;