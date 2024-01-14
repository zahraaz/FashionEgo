import { join } from 'path';
import { unlinkSync } from 'fs';
import { DeleteResult, getRepository, Repository, Entity, PrimaryGeneratedColumn, Column, ManyToOne ,ManyToMany} from 'typeorm';
import { User } from './userModel';
import { Order } from './orderModel';



@Entity({})
export class Product {
    @PrimaryGeneratedColumn({})
    id!: number;

    @Column('varchar',{ length: 255 })
    name!: string;

    @Column('float')
    price!: number;

    @Column("text")
    imagePath!: string;

    @Column({ length:104567})
    description!: string;

    @Column({ length: 255 })
    size!: string;

    @Column({ length: 255 })
    color!: string;

    @Column({ length: 255 })
    type!: string;

    @Column({ length: 255 })
    fabric!: string;

    @Column({ length: 255 })
    designer!: string;

    @Column('int')
    quantity!: number;

    @ManyToOne(type => User, user => user.products, {
        nullable: false
    })
    user!: number;

    @ManyToMany(type => Order, order => order.products)
    orders!: Order[];


}


const productService = () => {

    async function addProduct(value: {
        name: string,
        price: number,
        imagePath: string,
        description: string,
        size:string,
        color: string,
        type: string,
        fabric: string,
        designer: string,
        quantity: number,
        userId: number,
    }, productRepository: Repository<Product> = getRepository('Product')):
        Promise<Product | { message: string }> {

        const product= new Product();
        product.name = value.name;
        product.price = value.price;
        product.imagePath = value.imagePath;
        product.description = value.description;
        product.size = value.size;
        product.color = value.color;
        product.type = value.type;
        product.fabric = value.fabric;
        product.designer = value.designer;
        product.quantity = value.quantity;
        return await productRepository.save(product);
    }

    const getProducts = async (productRepository: Repository<Product> = getRepository('Product')
    ) => await productRepository.find({
        select: [
            'id',
            'name',
            'price',
            'imagePath',
            'description',
            'size',
            'color',
            'type',
            'fabric',
            'designer',
            'quantity',
        ],
    });
    const getProductById = async (id: number, productRepository: Repository<Product> = getRepository('Product')) =>
     await productRepository.findOne(id);
    const deleteProduct= async (id: number,
        productRepository: Repository<Product> = getRepository('Product')):
        Promise<DeleteResult | undefined> => {
        const product = await productRepository.findOne(id);
        if (!product)
            return undefined;
        let haveError = false;
        try {
            // unlinkSync(join(__dirname, '..', '..', 'public', product.imagePath));
            unlinkSync(join('public', product.imagePath));
            return await productRepository.delete(id);
        } catch (error) {
            return undefined;
        }
    };
    const updateProduct= async (id: number, updatedProduct: {
        name: string,
        price: number,
        description: string,
        size:string,
        color: string,
        type: string,
        fabric: string,
        designer: string,
        quantity: number,

    }, productRepository: Repository<Product> = getRepository('Product')): Promise<Product | undefined> => {
        const product = await getProductById(id);
        if (!product)
            return undefined;
        if (updatedProduct.name) product!.name= updatedProduct.name;
        if (updatedProduct.price) product!.price = updatedProduct.price;
        if (updatedProduct.description) product!.description= updatedProduct.description;
        if (updatedProduct.size) product!.size = updatedProduct.size;
        if (updatedProduct.color) product!.color = updatedProduct.color;
        if (updatedProduct.type) product!.type = updatedProduct.type;
        if (updatedProduct.fabric) product!.fabric = updatedProduct.fabric;
        if (updatedProduct.designer) product!.designer = updatedProduct.designer;
        if (updatedProduct.quantity) product!.quantity = updatedProduct.quantity;
        return await productRepository.save(product!)
    }


    return {
        addProduct,
        getProducts,
        getProductById,
        deleteProduct,
        updateProduct,
    };
}

export default productService();