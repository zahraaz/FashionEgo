import { Request, Response, NextFunction } from 'express';
import model, {Order} from '../models/orderModel';


const { getOrders: getOrdersModel, addOrder, getOrderById: getOrderByIdModel,
    deleteOrder: deleteOrderModel,updateOrder: updateOrderModel } = model;

function getOrders(req: Request, res: Response, next: NextFunction) {
    getOrdersModel().then((orders: Order) => res.json(orders));
}


function getOrderById(req: Request, res: Response, next: NextFunction) {
    getOrderByIdModel(+req.params.orderId).then((order : Order | undefined) => {
        res.json( order ? order :
        { message: "No order found"}
         )
        });
    }


function deleteOrder(req: Request, res: Response, next: NextFunction) {
    deleteOrderModel(req.params.orderId).then(
        (deletedOrder: any) => {
            res.status(deletedOrder ? 202 : 404).json(deletedOrder ? deletedOrder :
                { message: 'order not found' });
        }
    )
}



function createNewOrder(req: Request, res: Response, next: NextFunction) {
    const body = req.body;

    if (!body.total)
        return res.status(400).json({ message: "the total is required" });
    if (!body.address)
        return res.status(400).json({ message: "Your address is required" })
    if (!body.city)
        return res.status(400).json({ message: "Your city is required" })
        if (!body.arrivalDate)
        return res.status(400).json({ message: "the arrival Date is required" })
        if (!body.orderDate)
        return res.status(400).json({ message: "the order Date is required" })

        addOrder(body).then((order: Order) => {
        res.json(order);
    })
}




function updateOrder(req: Request, res: Response, next: NextFunction) {
    const body = req.body;

    if (!body.total && !body.address && !body.city && !body.orderDate  && !body.arrivalDate)  
        return res.status(400).json({ message: "No data provided" })

    updateOrderModel(req.params.orderId, body).then(
        (updatedOrder: Order | undefined) => {
            res.status(updatedOrder ? 200 : 404).json(updatedOrder ? updatedOrder:
                { message: "No Order found" });
        });
}


export {
    getOrders,
    getOrderById,
    createNewOrder,
    deleteOrder,
    updateOrder,
}