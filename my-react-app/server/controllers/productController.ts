import { Request, Response } from "express";
import Product from '../models/Product';

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
    }
}