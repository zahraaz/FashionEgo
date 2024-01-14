import { Request, Response, NextFunction } from 'express';

import model, { Product } from '../models/productModel';
const { getProducts: getProductsModel, addProduct, getProductById: getProductByIdModel, deleteProduct: deleteProductModel,
     updateProduct: updateProductModel } = model;


function getProducts(req: Request, res: Response, next: NextFunction) {
    getProductsModel().then((products: Product[]) => res.json(products));
}

function getProductById(req: Request, res: Response, next: NextFunction) {
    getProductByIdModel(+req.params.productId).then((product: Product | undefined) => {
        res.json(product ? product :
            { message: "No product found" }
        )
    });
}

function deleteProduct(req: Request, res: Response, next: NextFunction) {
    deleteProductModel(+req.params.productId).then((product) => {
        res.json(product)
    });
}

function createNewProduct(req: Request, res: Response, next: NextFunction) {
    console.log(req.body)
    if (!req.file) {
        return res.status(400).json({ message: "No image provided" });
    }

    const body = req.body;

    if (!body.name)
        return res.status(400).json({ message: "the product name is required" })
    if (body.name.length < 3)
        return res.status(400).json({ message: "Your product name is too short" })
    if (!body.price)
        return res.status(400).json({ message: "Your price is required" })
    if (body.price < 0.99)
        return res.status(400).json({ message: "You price is too low" })
    if (!body.description)
        return res.status(400).json({ message: "the product description is required" })
    if (body.description.length < 3)
        return res.status(400).json({ message: "the product description is suppost to be longer than that" })
    if (!body.size)
        return res.status(400).json({ message: "the product size is required" })
    if (!body.color)
        return res.status(400).json({ message: "the product color is required" })
    if (!body.type)
        return res.status(400).json({ message: "the product type is required" })
    if (!body.designer)
        return res.status(400).json({ message: "the product designer is required" })
    if (!body.quantity)
        return res.status(400).json({ message: "the product quantity is required" })


    addProduct({ ...body, imagePath: req.file.path.substring(req.file.path.indexOf('/images')) }).then(
        (product: Product | { message: string }) => res.json(product)
    );
}

function updateProduct(req: Request, res: Response, next: NextFunction) {
    const body = req.body;

    if (!body.name && !body.price && !body.size && !body.color  && !body.type && !body.fabric && !body.designer && !body.quantity)  
        return res.status(400).json({ message: "No data provided" })
    if (body.name && body.name.length < 3)
        return res.status(400).json({ message: "Your product name is too short" })
    if (body.price && body.price < 0.99)
        return res.status(400).json({ message: "You price is too low" })


    updateProductModel(+req.params.ProductId, body).then((product: Product | undefined) => res.json(product? product:
        { message: "No product found" }
    ))
}

export {
    getProducts,
    getProductById,
    createNewProduct,
    deleteProduct,
    updateProduct,
}