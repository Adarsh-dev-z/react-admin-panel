import mongoose, { Document, Schema} from "mongoose";

interface IProduct extends Document{
    name: string;
    price: number;
    descrption: string;
    category: string;
    inStock: boolean
}

const ProductSchema: Schema = new Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    description: {type: String, required: true},
    category: {type:String, required: true},
    inStock: {type: Boolean, required: true}
}, {timestamps:true});

const Product = mongoose.model<IProduct>('Product', ProductSchema);
export default Product;