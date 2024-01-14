import { json, Router } from 'express';

const router = Router();

import { getOrders, getOrderById, createNewOrder, deleteOrder, updateOrder } from '../controllers/orderController';



 router.get('/:orderId', getOrderById)
 router.get('/', getOrders);

 router.delete('/:orderId', deleteOrder)

router.use(json());

 router.post('/', createNewOrder)

router.put('/:orderId', updateOrder);



export default router;