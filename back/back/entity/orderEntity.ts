import { EntitySchema } from 'typeorm';
import { Order } from '../models/orderModel';

export default new EntitySchema({
    columns: {
        id: {
            type: "int",
            primary: true,
            generated: true,
        },
        total: {
            type: "float",
            nullable: false,
        },
        address: {
            type: "varchar",
            length: 512,
            nullable: false,
        },
        city: {
            type: "varchar",
            length: 255,
            nullable: false,
        },
        orderDate: {
            type: "date",
            nullable: false,
        },
        arrivalDate: {
            type: "date",
            nullable: false,
        },
        userId: {
            type: "int",
            nullable: false
        },
        productId: {
            type: "int",
            nullable: false
        },
    },
    name: "order",
    target: Order,
});