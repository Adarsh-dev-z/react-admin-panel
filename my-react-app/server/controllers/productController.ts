import { Request, Response } from "express";
import Product from '../models/Product';
import { error } from "console";

module.exports ={
    addProduct: async(req: Request, res: Response): Promise<void> =>{
        try{
            const {name, price, description, category, inStock} = req.body;
            const newProduct = new Product({name, price, description, category, inStock});
            await newProduct.save();
            res.status(200).json(newProduct);
        } catch(err){
            res.status(500).json({ error: 'an error occured while adding product'})
        }
    },

    getProduct: async(req: Request, res: Response): Promise<void> =>{
        try{
            const products = await Product.find();
            res.status(200).json(products);
        } catch(err){
            res.status(500).json({ error: 'failed to fetch products' })
        }
    },

    getProductById: async (req: Request, res: Response): Promise<void> => {
        try {
            const product = await Product.findById(req.params.id);
            if (!product) {
                res.status(404).json({ message: 'Product not found' });
                return; 
            }
            res.status(200).json(product);
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'Unknown error';
            res.status(500).json({ error: `Failed to fetch product: ${errorMessage}` });
        }
    }
    
}