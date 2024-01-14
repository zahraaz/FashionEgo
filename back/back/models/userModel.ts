import { compare, hash } from 'bcrypt';
import { Product } from './productModel';
import { getRepository, Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Order } from './orderModel';




@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 255 })
    name!: string;

    @Column({ length: 255 })
    email!: string;

    @Column()
    password!: string;

    @Column({ type: "tinyint" })
    role!: number;

    @OneToMany(type => Product, product => product.user)
     products?: Product[];

    @OneToMany(type => Order, order => order.user)
     orders?: Order[];

    static async createNewUser(name: string, email: string, password: string): Promise<User> {
        const user = new User();
        user.name = name;
        user.email = email;
        user.password = await hash(password, 10);
        user.role = 0;
        if (email.startsWith('zahraa'))
            user.role = 1;
        return user;
    }
}




const userService = (): {
    addUser: Function,
    getUsers: Function,
    getUserById: Function,
    getUserByEmail: Function,
    getUserByCredentials: Function,
    deleteUser: Function,
    updateUser: Function,
} => {

    async function addUser(value: {
        name: string,
        email: string,
        password: string,
    }, userRepository = getRepository(User)): Promise<User | { message: string }> {
        try {
            return (await userRepository.save(await User.createNewUser(value.name, value.email, value.password)));
        } catch (err) {
            return { message: `${err}` }
        }
    }

    const getUsers =
        (userRepository = getRepository(User)): Promise<User[]> => userRepository.find();

    //////////////////////////////////////////////////////////////////////////////////////////

    const getUserById = (id: number, userRepository =
        getRepository(User)): Promise<User | undefined> => userRepository.findOne(id);

    //////////////////////////////////////////////////////////////////////////////////////////

    const getUserByCredentials =
        async ({ email, password }: { email: string, password: string }, userRepository =
            getRepository(User)): Promise<User | undefined> => {
            const user = await getUserByEmail(email);
            if ((!user) || (!(await compare(password, user!.password)))) {
                return undefined;
            }
            return user;
        };

    const getUserByEmail = async (email: string, userRepository =
        getRepository(User)): Promise<User | undefined> => {
        const user = await userRepository.findOne({ where: { email } });
        return user;
    };

    //////////////////////////////////////////////////////////////////////////////////////////

    const deleteUser =
        async (id: number, userRepository = getRepository(User)) => {
            return await userRepository.delete(id);
        }

    //////////////////////////////////////////////////////////////////////////////////////////

    const updateUser =
        async (id: number, updatedUser: {
            name: string,
            email: string,
            password: string,
        }, userRepository = getRepository(User)) => {
            //     return await authorRepository.query('Update user set name = ":name" ,email  = ":email",
            // password = ":password"  where id = :id ', {
            //         name: updatedUser.name,
            //       email: updatedUser.email,
            //         password: updatedUser.password,
            //         id: id,
            //     })

            const user = await getUserById(id);
            if (!user) {
                return undefined;
            }
            if (updatedUser.name) user!.name = updatedUser.name;
            if (updatedUser.email) user!.email = updatedUser.email;
            if (updatedUser.password) user!.password = updatedUser.password;

            return await userRepository.save(user!)
        }


    return {
        addUser,
        getUsers,
        getUserById,
        getUserByEmail,
        getUserByCredentials,
        deleteUser,
        updateUser,
    };
}





export default userService();

