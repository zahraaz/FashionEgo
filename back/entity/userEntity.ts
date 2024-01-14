import { EntitySchema } from 'typeorm';
import { User } from '../models/userModel';

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
        email: {
            type: "varchar",
            length: 512,
            nullable: false,
        },
        password: {
            type: "varchar",
            length: 70,
            nullable: false,
        },
        role: {
            type: "tinyint", 
            nullable: false,
        },
    },
    name: "user",
    target: User,
});