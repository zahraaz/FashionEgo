import { json, Router } from 'express';

const router = Router();

import { getUsers, getUserById, createNewUser, deleteUser, updateUser } from '../controllers/userController';
import isAdmin from '../middleware/isAdmin';

router.get('/:userId', getUserById)
router.get('/', getUsers);

router.delete('/:userId', deleteUser)

router.use(json());

// a hand written middleware for checking the permissions
router.use(isAdmin);

router.post('/',
    createNewUser)

router.put('/:userId', updateUser);

export default router;