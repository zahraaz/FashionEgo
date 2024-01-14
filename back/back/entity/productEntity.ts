import { EntitySchema } from 'typeorm';
import { Product } from '../models/productModel';

export default new EntitySchema({
    columns: {
        id: {
            type: "int",
            primary: true,
            generated: true,
        },
        name: {
            type: "varchar",
            length: 255,
            nullable: false,
        },
        price: {
            type: "float",
            nullable: false,
        },
        imagePath: {
            type: "varchar",
            nullable: false,
        },
        description: {
            type: "varchar",
            length: 4084,
            nullable: false,
        },
        size: {
            type: "varchar",
            length: 255,
            nullable: false,
        },
        color: {
            type: "varchar",
            length: 255,
            nullable: false,
        },
        type: {
            type: "varchar",
            length: 255,
            nullable: false,
        },
        fabric: {
            type: "varchar",
            length: 255,
            nullable: false,
        },
        designer: {
            type: "varchar",
            length: 255,
            nullable: false,
        },
        quantity: {
            type: "varchar",
            length: 255,
            nullable: false,
        },
    },
    name: "product",
    target: Product,
});