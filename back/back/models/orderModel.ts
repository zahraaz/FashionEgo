import { join } from 'path';
import { unlinkSync } from 'fs';
import { DeleteResult, getRepository, Repository, Entity, PrimaryGeneratedColumn, Column, ManyToOne , ManyToMany, JoinTable} from 'typeorm';
import { Product } from './productModel';
import { User } from './userModel';


@Entity({})
export class Order {
    @PrimaryGeneratedColumn({})
    id!: number;

    @Column()
    total!: number;

    @Column({ length: 255 })
    address!: string;

    @Column({ length: 255 })
    city!: string;

    @Column({ length: 255 })
    orderDate!:Date;

    @Column({ length: 255 })
    arrivalDate!: Date;

    @ManyToOne(type => User, user => user.orders)
    user!: User;

    @ManyToMany(type => Product, product => product.orders)
    @JoinTable()
    products!: Product[];


static async createNewOrder( total: number, address: string, city: string, orderDate: Date, arrivalDate: Date): Promise<Order> {
    const order = new Order();
    order.total = total;
    order.address = address;
    order.city = city;
    order.orderDate = orderDate;
    order.arrivalDate = arrivalDate;
    return order;
}
}

 
const orderService = (): {
addOrder: Function,
getOrders: Function,
getOrderById: Function,
deleteOrder: Function,
updateOrder: Function,
} => {


    async function addOrder(value: {
       total: number,
       address: string,
       city: string,
        orderDate: Date,
        arrivalDate: Date,
    }, orderRepository: Repository<Order> = getRepository('Order')):
        Promise < Order| { message: string }> {

        const order= new Order();
        order.total = value.total;
        order.address = value.address;
        order.city = value.city;
        order.orderDate = value.orderDate;
        order.arrivalDate = value.arrivalDate;
        return await orderRepository.save(order);
    }


    const getOrders = async (orderRepository: Repository<Order> = getRepository('Order')
    ) => await orderRepository.find({
        select: [
            'id',
            'total',
            'address',
            'city',
            'orderDate',
            'arrivalDate',
        ],
    });
    const getOrderById = async (id: number, orderRepository: Repository<Order> = getRepository('Order')) => await orderRepository.findOne(id);
    
    

    const deleteOrder =
    async (id: number, orderRepository = getRepository(Order)) => {
        return await orderRepository.delete(id);
    }

    const updateOrder= async (id: number, updatedOrder: {
        total: number,
        address:string,
        city: string,
        orderDate: Date,
        arrivalDate: Date,

    }, orderRepository: Repository<Order> = getRepository('Order')): Promise<Order | undefined> => {
        const order = await getOrderById(id);
        if (!order)
            return undefined;
        if (updatedOrder.total) order.total = updatedOrder.total;
        if (updatedOrder.address) order.address = updatedOrder.address;
        if (updatedOrder.city) order.city = updatedOrder.city;
        if (updatedOrder.orderDate) order.orderDate = updatedOrder.orderDate;
        if (updatedOrder.arrivalDate) order.arrivalDate = updatedOrder.arrivalDate;
        return await orderRepository.save(order!)
    }


    return {
        addOrder,
        getOrders,
        getOrderById,
        deleteOrder,
        updateOrder,
    };
}

export default orderService();



